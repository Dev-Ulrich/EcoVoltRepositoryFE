import { after, test } from 'node:test'
import assert from 'node:assert/strict'
import { copyFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createServer } from 'node:http'
import { DatabaseSync } from 'node:sqlite'
import { createApi } from './api.ts'

const directory = mkdtempSync(join(tmpdir(), 'ecovolt-test-'))
const path = join(directory, 'test.sqlite')
copyFileSync(new URL('../data/ecovolt.sqlite', import.meta.url), path)
const fixture = new DatabaseSync(path)
fixture.prepare('UPDATE users SET points = 150 WHERE username = ?').run('Victor Ulrich')
fixture.close()
const api = createApi(path)
const server = createServer((req, res) => { void api.handle(req, res, () => { res.writeHead(404); res.end() }) })
await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
const address = server.address()
if (!address || typeof address === 'string') throw new Error('Servidor indisponível')
const base = `http://127.0.0.1:${address.port}`
const login = (username: string, password: string) => fetch(`${base}/api/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) })
const cookieOf = (response: Response) => response.headers.get('set-cookie')!.split(';')[0]
async function readUser(response: Response) {
  const data: unknown = await response.json()
  assert.ok(data && typeof data === 'object' && 'user' in data)
  assert.ok(data.user && typeof data.user === 'object')
  return data.user as Record<string, unknown>
}
after(async () => {
  await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
  api.close()
  rmSync(directory, { recursive: true })
})

test('recusa acesso anônimo, sessão forjada, senha errada e usuário desconhecido', async () => {
  assert.equal((await fetch(`${base}/api/me`)).status, 401)
  assert.equal((await fetch(`${base}/api/me`, { headers: { Cookie: 'ecovolt_session=1' } })).status, 401)
  assert.equal((await login('Victor Ulrich', 'errada')).status, 401)
  assert.equal((await login('desconhecido', 'errada')).status, 401)
})

test('autentica as seis contas, isola os dados e invalida o logout', async () => {
  const users = [['admEcoVolt', 'EcoVolt2026'], ['Matheus Pereira', '569315'], ['Victor Ulrich', '568634'], ['Matheus Luca', '572228'], ['Arthur da Silva', '571075'], ['Alexandre Carlos', '271280']]
  const ids = new Set()
  for (const [username, password] of users) {
    const response = await login(username, password)
    assert.equal(response.status, 200)
    assert.match(response.headers.get('set-cookie')!, /HttpOnly; SameSite=Strict/)
    const user = await readUser(response)
    ids.add(user.id)
    assert.equal(user.username, username)
    assert.equal(user.password_hash, undefined)
    assert.equal(user.salt, undefined)
    const Cookie = cookieOf(response)
    const me = await fetch(`${base}/api/me?userId=3`, { headers: { Cookie } })
    const current = await readUser(me)
    assert.equal(current.id, user.id)
    assert.equal(current.points, username === 'Victor Ulrich' ? 150 : 0)
    assert.equal((await fetch(`${base}/api/logout`, { method: 'POST', headers: { Cookie } })).status, 200)
    assert.equal((await fetch(`${base}/api/me`, { headers: { Cookie } })).status, 401)
  }
  assert.equal(ids.size, 6)
})

test('bloqueia POST de outra origem e limita tentativas incorretas', async () => {
  assert.equal((await fetch(`${base}/api/logout`, { method: 'POST', headers: { Origin: 'https://example.org' } })).status, 403)
  for (let i = 0; i < 20; i++) assert.equal((await login('inexistente', 'errada')).status, 401)
  assert.equal((await login('inexistente', 'errada')).status, 429)
})
