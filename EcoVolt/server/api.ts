import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { DatabaseSync } from 'node:sqlite'
import type { IncomingMessage, ServerResponse } from 'node:http'

export function createApi(databasePath = new URL('../data/ecovolt.sqlite', import.meta.url).pathname) {
  const db = new DatabaseSync(databasePath)
  const sessions = new Map<string, { userId: number; expires: number }>()
  const attempts = new Map<string, { count: number; expires: number }>()
  const lifetime = 8 * 60 * 60 * 1000
  const profile = (id: number) => db.prepare(`SELECT id, username, display_name AS displayName,
    points, xp, completed_actions AS completedActions, active_missions AS activeMissions,
    tier FROM users WHERE id = ?`).get(id)

  async function handle(req: IncomingMessage, res: ServerResponse, next: () => void) {
    const path = req.url?.split('?')[0]
    if (!path?.startsWith('/api/')) return next()
    res.setHeader('Cache-Control', 'no-store')
    const send = (status: number, body: unknown) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify(body))
    }
    if (req.method === 'POST' && req.headers.origin) {
      try {
        if (new URL(req.headers.origin).host !== req.headers.host) return send(403, { message: 'Origem não permitida.' })
      } catch { return send(403, { message: 'Origem não permitida.' }) }
    }
    const secure = Boolean((req.socket as typeof req.socket & { encrypted?: boolean }).encrypted)
    const cookie = (token: string, age: number) => res.setHeader('Set-Cookie', `ecovolt_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${age}${secure ? '; Secure' : ''}`)
    const token = req.headers.cookie?.split(';').map(value => value.trim()).find(value => value.startsWith('ecovolt_session='))?.slice('ecovolt_session='.length)
    const now = Date.now()
    for (const [key, session] of sessions) if (session.expires <= now) sessions.delete(key)
    for (const [key, attempt] of attempts) if (attempt.expires <= now) attempts.delete(key)
    const session = token ? sessions.get(token) : undefined

    if (path === '/api/login' && req.method === 'POST') {
      const address = req.socket.remoteAddress ?? 'local'
      const attempt = attempts.get(address)
      if (attempt && attempt.count >= 20) return send(429, { message: 'Muitas tentativas. Aguarde 15 minutos e tente novamente.' })
      try {
        let body = ''
        for await (const chunk of req) {
          body += chunk
          if (body.length > 4096) return send(413, { message: 'Dados de acesso muito longos.' })
        }
        const { username, password } = JSON.parse(body)
        if (typeof username !== 'string' || typeof password !== 'string') return send(400, { message: 'Informe usuário e senha.' })
        const row = db.prepare('SELECT id, password_hash, salt FROM users WHERE username = ?').get(username.trim()) as { id: number; password_hash: string; salt: string } | undefined
        const hash = scryptSync(password, row?.salt ?? 'ecovolt-invalid-user', 64)
        if (!row || !timingSafeEqual(hash, Buffer.from(row.password_hash, 'hex'))) {
          attempts.set(address, { count: (attempt?.count ?? 0) + 1, expires: attempt?.expires ?? now + 15 * 60 * 1000 })
          return send(401, { message: 'Usuário ou senha incorretos.' })
        }
        attempts.delete(address)
        if (token) sessions.delete(token)
        const newToken = randomBytes(32).toString('hex')
        sessions.set(newToken, { userId: row.id, expires: now + lifetime })
        cookie(newToken, lifetime / 1000)
        return send(200, { user: profile(row.id) })
      } catch { return send(400, { message: 'Não foi possível processar o acesso.' }) }
    }
    if (path === '/api/logout' && req.method === 'POST') {
      if (token) sessions.delete(token)
      cookie('', 0)
      return send(200, { ok: true })
    }
    if (path === '/api/me' && req.method === 'GET') {
      if (!session) return send(401, { message: 'Entre na sua conta para continuar.' })
      const user = profile(session.userId)
      if (!user) return send(401, { message: 'Conta não encontrada.' })
      return send(200, { user })
    }
    return send(404, { message: 'Recurso não encontrado.' })
  }
  return { handle, close: () => db.close() }
}
