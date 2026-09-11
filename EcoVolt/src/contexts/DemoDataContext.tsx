import { useReducer, type ReactNode } from 'react'
import { useAuth } from '../auth/useAuth'
import { DemoDataContext } from '../hooks/useDemoData'
import {
  createDemoState,
  createSubmission,
  demoReducer,
  selectDemoUser,
  selectMissions,
  selectRewards,
  selectRanking,
  selectRankingByTier,
  validateReview,
} from '../data/demoState'
import type { ActionId, SubmitActionInput } from '../types/action'

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(demoReducer, undefined, createDemoState)
  const actions = state.actions.filter((action) => action.userId === user?.id)
  const missions = user ? selectMissions(state, user.id) : []

  function submitAction(input: SubmitActionInput): ActionId {
    if (!user)
      throw new Error('Entre na conta demonstrativa para enviar uma ação.')
    const id = `action-${crypto.randomUUID()}`
    const action = createSubmission(
      input,
      user.id,
      id,
      new Date().toISOString(),
    )
    dispatch({ type: 'submit', action })
    return id
  }

  function requestReview(id: ActionId, justification: string) {
    if (!user)
      throw new Error(
        'Entre na conta demonstrativa para solicitar uma revisão.',
      )
    validateReview(actions, user.id, id, justification)
    dispatch({
      type: 'review',
      userId: user.id,
      id,
      justification,
      now: new Date().toISOString(),
    })
  }

  function resolveAction(id: ActionId, approved: boolean, reason = '') {
    if (!user) throw new Error('Entre na demonstração.')
    const action = actions.find((item) => item.id === id)
    if (!action || !['pending', 'in_review'].includes(action.status))
      throw new Error('Esta ação não está aguardando análise.')
    if (!approved && reason.trim().length < 10)
      throw new Error('Informe um motivo com pelo menos 10 caracteres.')
    dispatch({ type: 'resolve', userId: user.id, id, approved, reason })
  }

  return (
    <DemoDataContext.Provider
      value={{
        user: user ? selectDemoUser(state, user) : null,
        actions,
        missions,
        ranking: user ? selectRanking(state, user) : [],
        getRankingByTier: (tier) =>
          user ? selectRankingByTier(state, user, tier) : [],
        rewards: user ? selectRewards(state, user) : [],
        getAction: (id) => actions.find((action) => action.id === id),
        submitAction,
        requestReview,
        resolveAction,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  )
}
