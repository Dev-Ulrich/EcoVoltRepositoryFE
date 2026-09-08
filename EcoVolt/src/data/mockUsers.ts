import type { User } from '../types/user'

// Credenciais públicas e fictícias, exclusivas da demonstração de Front-End.
export const demoCredentials = {
  email: 'demo@ecovolt.example',
  password: 'EcoVoltDemo2026',
}

export const mockUsers: User[] = [{
  id: 1,
  email: demoCredentials.email,
  displayName: 'Participante Demo',
  points: 1240,
  xp: 620,
  completedActions: 16,
  activeMissions: 2,
  tier: 'Bronze',
}]
