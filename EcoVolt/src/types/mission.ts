import type { UserId } from './user'

export type MissionId = string
export type MissionStatus = 'pending' | 'in_progress' | 'completed'
export type Mission = {
  id: MissionId
  userId: UserId
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  status: MissionStatus
  progress: { current: number; target: number; unit: string }
  points: number
  xp: number
  endsAt: string
}
