import type { RankingEntry } from '../types/ranking'
import { mockUsers } from './mockUsers.ts'

// Participantes fictícios. A posição será calculada ao consumir os dados.
export const mockRanking: RankingEntry[] = [
  { userId: 2, displayName: 'Ana Demo', tier: 'Bronze', points: 180, period: 'monthly' },
  { userId: 3, displayName: 'Lucas Demo', tier: 'Bronze', points: 140, period: 'monthly' },
  { userId: mockUsers[0].id, displayName: mockUsers[0].displayName, tier: mockUsers[0].tier, points: mockUsers[0].points, period: 'monthly' },
  { userId: 4, displayName: 'Marina Demo', tier: 'Bronze', points: 95, period: 'monthly' },
  { userId: 5, displayName: 'Joao Demo', tier: 'Ferro', points: 72, period: 'monthly' },
  { userId: 6, displayName: 'Bia Demo', tier: 'Prata', points: 245, period: 'monthly' },
  { userId: 7, displayName: 'Caio Demo', tier: 'Ouro', points: 410, period: 'monthly' },
  { userId: 8, displayName: 'Lia Demo', tier: 'Diamante', points: 680, period: 'monthly' },
  { userId: 9, displayName: 'Ravi Demo', tier: 'Sustentabilístico', points: 920, period: 'monthly' },
]
