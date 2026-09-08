import { createContext, useContext } from 'react'

export type User = {
  id: number
  username: string
  displayName: string
  points: number
  xp: number
  completedActions: number
  activeMissions: number
  tier: string
}

type Auth = {
  user: User | null
  loading: boolean
  error: string
  refresh: () => Promise<void>
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}
export const AuthContext = createContext<Auth | null>(null)


export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth precisa de AuthProvider')
  return context
}
