import type { Tier } from './user'

export type RewardId = string
export type RewardStatus = 'available' | 'in_progress' | 'locked'
export type Reward = {
  id: RewardId
  title: string
  description: string
  isFeatured?: boolean
  status: RewardStatus
  pointsCost: number
  requirement: string
  requiredTier?: Tier
  progress: { current: number; target: number }
}
