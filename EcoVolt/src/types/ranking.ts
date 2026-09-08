import type { Tier, UserId } from './user'

export type RankingEntry = {
  userId: UserId
  displayName: string
  tier: Tier
  points: number
  period: 'weekly' | 'monthly'
}
export type RankedEntry = RankingEntry & { position: number }
