import { useReducer, type ReactNode } from 'react'
import { useAuth } from '../auth/useAuth'
import { DemoDataContext } from '../hooks/useDemoData'
import { createDemoState, createSubmission, demoReducer, selectDemoUser, selectRanking, validateReview } from '../data/demoState'
import type { ActionId, SubmitActionInput } from '../types/action'

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(demoReducer, undefined, createDemoState)
  const actions = state.actions.filter(action => action.userId === user?.id)
  const missions = state.missions.filter(mission => mission.userId === user?.id)

  function submitAction(input: SubmitActionInput): ActionId {
    if (!user) throw new Error('Entre na conta demonstrativa para enviar uma ação.')
    const id = `action-${crypto.randomUUID()}`
    const action = createSubmission(input, user.id, id, new Date().toISOString())
    dispatch({ type: 'submit', action })
    return id
  }

  function requestReview(id: ActionId, justification: string) {
    if (!user) throw new Error('Entre na conta demonstrativa para solicitar uma revisão.')
    validateReview(actions, user.id, id, justification)
    dispatch({ type: 'review', userId: user.id, id, justification, now: new Date().toISOString() })
  }

  return (
    <DemoDataContext.Provider value={{
      user: user ? selectDemoUser(state, user) : null,
      actions, missions, ranking: user ? selectRanking(state, user) : [],
      rewards: user ? state.rewards : [],
      getAction: id => actions.find(action => action.id === id),
      submitAction, requestReview,
    }}>
      {children}
    </DemoDataContext.Provider>
  )
}
