import { useState, type ReactNode } from 'react'
import { authenticateDemo, readDemoSession, saveDemoSession } from './demoAuth'
import { AuthContext } from './useAuth'
import type { User } from '../types/user'

function loadDemoUser(): User | null {
  try {
    return readDemoSession(window.sessionStorage)
  } catch {
    // O navegador pode bloquear o armazenamento. A demo ainda funciona em memória.
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadDemoUser)

  async function login(email: string, password: string) {
    const demoUser = authenticateDemo(email, password)
    try {
      saveDemoSession(window.sessionStorage, demoUser)
    } catch {
      // Sem armazenamento, o acesso dura até recarregar a página.
    }
    setUser(demoUser)
  }

  async function logout() {
    try {
      saveDemoSession(window.sessionStorage, null)
    } catch {
      // Encerrar também a sessão em memória se o armazenamento estiver indisponível.
    }
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
