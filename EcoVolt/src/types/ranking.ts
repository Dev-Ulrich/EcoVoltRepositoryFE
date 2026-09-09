import type { Tier, UserId } from './user'

export type RankingPeriod = 'weekly' | 'monthly'

export type RankingEntry = {
  userId: UserId
  displayName: string
  tier: Tier
  points: number
  period: RankingPeriod
}
export type RankedEntry = RankingEntry & { position: number }
