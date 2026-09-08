import { createContext, useContext } from 'react'
import type { User } from '../types/user'

type Auth = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<Auth | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth precisa de AuthProvider')
  return context
}
