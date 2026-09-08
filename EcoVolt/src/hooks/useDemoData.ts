import { createContext, useContext } from 'react'
import type { ActionId, SubmitActionInput, SustainableAction } from '../types/action'
import type { Mission } from '../types/mission'
import type { RankedEntry } from '../types/ranking'
import type { Reward } from '../types/reward'
import type { User } from '../types/user'

export type DemoData = {
  user: User | null
  actions: readonly SustainableAction[]
  missions: readonly Mission[]
  ranking: readonly RankedEntry[]
  rewards: readonly Reward[]
  getAction: (id: ActionId) => SustainableAction | undefined
  submitAction: (input: SubmitActionInput) => ActionId
  requestReview: (id: ActionId, justification: string) => void
}

export const DemoDataContext = createContext<DemoData | null>(null)

export function useDemoData() {
  const context = useContext(DemoDataContext)
  if (!context) throw new Error('useDemoData precisa de DemoDataProvider')
  return context
}
