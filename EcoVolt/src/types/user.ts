export type UserId = number
export type Tier = 'Ferro' | 'Bronze' | 'Prata' | 'Ouro' | 'Diamante' | 'Sustentabilístico'

export type User = {
  id: UserId
  email: string
  displayName: string
  points: number
  xp: number
  completedActions: number
  activeMissions: number
  tier: Tier
}
