import { demoCredentials, mockUsers } from '../data/mockUsers.ts'
import type { User } from '../types/user.ts'

type SessionStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>
export const DEMO_SESSION_KEY = 'ecovolt-demo-user-id'

export function authenticateDemo(email: string, password: string): User {
  const user = mockUsers.find(candidate => candidate.email === email.trim().toLowerCase())
  if (!user || password !== demoCredentials.password) {
    throw new Error('E-mail ou senha demonstrativos inválidos. Use os dados exibidos nesta página.')
  }
  return { ...user }
}

export function readDemoSession(storage: SessionStorage): User | null {
  const id = storage.getItem(DEMO_SESSION_KEY)
  const user = mockUsers.find(candidate => String(candidate.id) === id)
  return user ? { ...user } : null
}

export function saveDemoSession(storage: SessionStorage, user: User | null) {
  // Somente o ID fictício é persistido. Não armazenar a senha nem dados de sessão real.
  if (user) storage.setItem(DEMO_SESSION_KEY, String(user.id))
  else storage.removeItem(DEMO_SESSION_KEY)
}
