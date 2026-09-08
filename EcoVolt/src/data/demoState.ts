import type { ActionId, SubmitActionInput, SustainableAction } from '../types/action.ts'
import type { Mission } from '../types/mission.ts'
import type { RankingEntry, RankedEntry } from '../types/ranking.ts'
import type { Reward } from '../types/reward.ts'
import type { User, UserId } from '../types/user.ts'
import { actionCategories, mockActions } from './mockActions.ts'
import { mockMissions } from './mockMissions.ts'
import { mockRanking } from './mockRanking.ts'
import { mockRewards } from './mockRewards.ts'

export type DemoState = {
  actions: SustainableAction[]
  missions: Mission[]
  ranking: RankingEntry[]
  rewards: Reward[]
}

export function createDemoState(): DemoState {
  return structuredClone({ actions: mockActions, missions: mockMissions, ranking: mockRanking, rewards: mockRewards })
}

export function createSubmission(input: SubmitActionInput, userId: UserId, id: ActionId, now: string): SustainableAction {
  if (!Object.hasOwn(actionCategories, input.category)) throw new Error('Selecione uma categoria válida.')
  if (input.description.trim().length < 10) throw new Error('Descreva a ação com pelo menos 10 caracteres.')
  const { name, type, size } = input.evidence
  if (!name.trim() || !['video/mp4', 'video/quicktime', 'video/x-msvideo'].includes(type)) {
    throw new Error('Selecione um vídeo MP4, MOV ou AVI para a demonstração.')
  }
  if (!Number.isFinite(size) || size <= 0 || size > 100 * 1024 * 1024) throw new Error('O vídeo deve ter até 100 MB e não pode estar vazio.')
  return {
    id, userId, category: input.category, description: input.description.trim(),
    evidence: { name, type, size }, submittedAt: now, status: 'pending',
    possiblePoints: actionCategories[input.category].points, awardedPoints: 0, awardedXp: 0,
  }
}

export function validateReview(actions: readonly SustainableAction[], userId: UserId, id: ActionId, justification: string) {
  const action = actions.find(item => item.id === id && item.userId === userId)
  if (!action) throw new Error('Ação não encontrada.')
  if (action.status !== 'rejected') throw new Error('Somente ações recusadas podem receber uma solicitação de revisão.')
  if (justification.trim().length < 10) throw new Error('Justifique a revisão com pelo menos 10 caracteres.')
}

type DemoEvent =
  | { type: 'submit'; action: SustainableAction }
  | { type: 'review'; userId: UserId; id: ActionId; justification: string; now: string }

export function demoReducer(state: DemoState, event: DemoEvent): DemoState {
  if (event.type === 'submit') {
    if (state.actions.some(action => action.id === event.action.id)) return state
    return { ...state, actions: [event.action, ...state.actions] }
  }
  // Revalidar o estado mais recente impede duas revisões enfileiradas para a mesma ação.
  const target = state.actions.find(action => action.id === event.id && action.userId === event.userId)
  if (!target || target.status !== 'rejected' || event.justification.trim().length < 10) return state
  return {
    ...state,
    actions: state.actions.map(action => action.id === target.id ? {
      ...action, status: 'in_review', review: { justification: event.justification.trim(), requestedAt: event.now },
    } : action),
  }
}

export function selectDemoUser(state: DemoState, user: User): User {
  const approved = state.actions.filter(action => action.userId === user.id && action.status === 'approved')
  const missions = state.missions.filter(mission => mission.userId === user.id)
  const completed = missions.filter(mission => mission.status === 'completed')
  return {
    ...user,
    points: approved.reduce((total, action) => total + action.awardedPoints, 0) + completed.reduce((total, mission) => total + mission.points, 0),
    xp: approved.reduce((total, action) => total + action.awardedXp, 0) + completed.reduce((total, mission) => total + mission.xp, 0),
    completedActions: approved.length,
    activeMissions: missions.filter(mission => mission.status !== 'completed').length,
  }
}

export function selectRanking(state: DemoState, user: User): RankedEntry[] {
  const points = selectDemoUser(state, user).points
  return state.ranking
    .filter(entry => entry.period === 'monthly' && entry.tier === user.tier)
    .map(entry => entry.userId === user.id ? { ...entry, points } : { ...entry })
    .sort((a, b) => b.points - a.points || a.userId - b.userId)
    .map((entry, index) => ({ ...entry, position: index + 1 }))
}
