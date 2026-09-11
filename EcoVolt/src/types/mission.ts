import type { ActionCategory } from './action'
import type { UserId } from './user'

export type MissionId = string
export type MissionStatus = 'pending' | 'in_progress' | 'completed'
export type MissionDifficulty = 'easy' | 'medium' | 'hard'

export type Mission = {
  id: MissionId
  userId: UserId
  title: string
  difficulty: MissionDifficulty
  status: MissionStatus
  progress: { current: number; target: number; unit: string }
  points: number
  xp: number
  criterion?: { type: 'approved_actions'; category?: ActionCategory }
  endsAt: string
}
