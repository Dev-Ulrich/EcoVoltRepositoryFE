import type { RankingEntry } from '../types/ranking'
import { mockUsers } from './mockUsers.ts'

// Participantes fictícios. A posição será calculada ao consumir os dados.
export const mockRanking: RankingEntry[] = [
  { userId: 2, displayName: 'Ana Demo', tier: 'Bronze', points: 180, period: 'monthly' },
  { userId: 3, displayName: 'Lucas Demo', tier: 'Bronze', points: 140, period: 'monthly' },
  { userId: mockUsers[0].id, displayName: mockUsers[0].displayName, tier: mockUsers[0].tier, points: mockUsers[0].points, period: 'monthly' },
  { userId: 4, displayName: 'Marina Demo', tier: 'Bronze', points: 95, period: 'monthly' },
]
