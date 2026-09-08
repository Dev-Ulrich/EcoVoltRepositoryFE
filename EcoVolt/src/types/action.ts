import type { UserId } from './user'

export type ActionId = string
export type ActionStatus = 'pending' | 'approved' | 'rejected' | 'in_review'
export type ActionCategory = 'recycling' | 'water' | 'transport' | 'energy' | 'composting' | 'planting'
export type Evidence = { name: string; type: string; size: number }
export type ActionReview = { justification: string; requestedAt: string }

export type SustainableAction = {
  id: ActionId
  userId: UserId
  category: ActionCategory
  description: string
  evidence: Evidence
  submittedAt: string
  status: ActionStatus
  possiblePoints: number
  awardedPoints: number
  awardedXp: number
  rejectionReason?: string
  review?: ActionReview
}

export type SubmitActionInput = Pick<SustainableAction, 'category' | 'description' | 'evidence'>
