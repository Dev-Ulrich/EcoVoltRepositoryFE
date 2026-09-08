import { useEffect, useState, type ReactNode } from 'react'
import { AuthContext, type User } from './useAuth'

async function loadUser(): Promise<User | null> {
  const response = await fetch('/api/me')
  if (response.status === 401) return null
  if (!response.ok) throw new Error('Sessão indisponível')
  return (await response.json()).user
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function refresh() {
    try {
      setUser(await loadUser())
      setError('')
    } catch {
      setUser(null)
      setError('Não foi possível verificar sua sessão. Confira a conexão e tente novamente.')
    } finally { setLoading(false) }
  }

  useEffect(() => {
    let active = true
    void loadUser().then((currentUser) => {
      if (active) { setUser(currentUser); setLoading(false) }
    }).catch(() => {
      if (active) {
        setError('Não foi possível verificar sua sessão. Confira a conexão e tente novamente.')
        setLoading(false)
      }
    })
    return () => { active = false }
  }, [])

  async function login(username: string, password: string) {
    const response = await fetch('/api/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    setError('')
    setUser(data.user)
  }

  async function logout() {
    const response = await fetch('/api/logout', { method: 'POST' })
    if (!response.ok) throw new Error('Não foi possível sair. Tente novamente.')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, error, refresh, login, logout }}>{children}</AuthContext.Provider>
}

