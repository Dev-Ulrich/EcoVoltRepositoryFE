import type {
  ActionId,
  SubmitActionInput,
  SustainableAction,
} from '../types/action.ts'
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
  return structuredClone({
    actions: mockActions,
    missions: mockMissions,
    ranking: mockRanking,
    rewards: mockRewards,
  })
}

export function createSubmission(
  input: SubmitActionInput,
  userId: UserId,
  id: ActionId,
  now: string,
): SustainableAction {
  if (!Object.hasOwn(actionCategories, input.category))
    throw new Error('Selecione uma categoria válida.')
  if (input.description.trim().length < 10)
    throw new Error('Descreva a ação com pelo menos 10 caracteres.')
  const { name, type, size } = input.evidence
  if (
    !name.trim() ||
    !['video/mp4', 'video/quicktime', 'video/x-msvideo'].includes(type)
  ) {
    throw new Error('Selecione um vídeo MP4, MOV ou AVI para a demonstração.')
  }
  if (!Number.isFinite(size) || size <= 0 || size > 100 * 1024 * 1024)
    throw new Error('O vídeo deve ter até 100 MB e não pode estar vazio.')
  return {
    id,
    userId,
    category: input.category,
    description: input.description.trim(),
    evidence: { name, type, size },
    submittedAt: now,
    status: 'pending',
    possiblePoints: actionCategories[input.category].points,
    awardedPoints: 0,
    awardedXp: 0,
  }
}

export function validateReview(
  actions: readonly SustainableAction[],
  userId: UserId,
  id: ActionId,
  justification: string,
) {
  const action = actions.find(
    (item) => item.id === id && item.userId === userId,
  )
  if (!action) throw new Error('Ação não encontrada.')
  if (action.status !== 'rejected')
    throw new Error(
      'Somente ações recusadas podem receber uma solicitação de revisão.',
    )
  if (justification.trim().length < 10)
    throw new Error('Justifique a revisão com pelo menos 10 caracteres.')
}

type DemoEvent =
  | {
      type: 'resolve'
      userId: UserId
      id: ActionId
      approved: boolean
      reason: string
    }
  | { type: 'submit'; action: SustainableAction }
  | {
      type: 'review'
      userId: UserId
      id: ActionId
      justification: string
      now: string
    }

export function demoReducer(state: DemoState, event: DemoEvent): DemoState {
  if (event.type === 'submit') {
    if (state.actions.some((action) => action.id === event.action.id))
      return state
    return { ...state, actions: [event.action, ...state.actions] }
  }
  if (event.type === 'resolve') {
    const action = state.actions.find(
      (item) => item.id === event.id && item.userId === event.userId,
    )
    if (!action || !['pending', 'in_review'].includes(action.status))
      return state
    if (!event.approved && event.reason.trim().length < 10) return state
    return {
      ...state,
      actions: state.actions.map((item) =>
        item.id === action.id
          ? {
              ...item,
              status: event.approved ? 'approved' : 'rejected',
              awardedPoints: event.approved ? item.possiblePoints : 0,
              awardedXp: event.approved ? 40 : 0,
              rejectionReason: event.approved ? undefined : event.reason.trim(),
            }
          : item,
      ),
    }
  }
  // Revalidar o estado mais recente impede duas revisões enfileiradas para a mesma ação.
  const target = state.actions.find(
    (action) => action.id === event.id && action.userId === event.userId,
  )
  if (
    !target ||
    target.status !== 'rejected' ||
    event.justification.trim().length < 10
  )
    return state
  return {
    ...state,
    actions: state.actions.map((action) =>
      action.id === target.id
        ? {
            ...action,
            status: 'in_review',
            review: {
              justification: event.justification.trim(),
              requestedAt: event.now,
            },
          }
        : action,
    ),
  }
}

export function selectDemoUser(state: DemoState, user: User): User {
  const approved = state.actions.filter(
    (action) => action.userId === user.id && action.status === 'approved',
  )
  const missions = selectMissions(state, user.id)
  const completed = missions.filter((mission) => mission.status === 'completed')
  return {
    ...user,
    points:
      approved.reduce((total, action) => total + action.awardedPoints, 0) +
      completed.reduce((total, mission) => total + mission.points, 0),
    xp:
      approved.reduce((total, action) => total + action.awardedXp, 0) +
      completed.reduce((total, mission) => total + mission.xp, 0),
    completedActions: approved.length,
    activeMissions: missions.filter((mission) => mission.status !== 'completed')
      .length,
  }
}

export function selectRankingByTier(
  state: DemoState,
  user: User,
  tier: User['tier'],
): RankedEntry[] {
  const points = selectDemoUser(state, user).points
  return state.ranking
    .filter((entry) => entry.period === 'monthly' && entry.tier === tier)
    .map((entry) =>
      entry.userId === user.id ? { ...entry, points } : { ...entry },
    )
    .sort((a, b) => b.points - a.points || a.userId - b.userId)
    .map((entry, index) => ({ ...entry, position: index + 1 }))
}

export function selectRanking(state: DemoState, user: User): RankedEntry[] {
  return selectRankingByTier(state, user, user.tier)
}

export function selectMissions(state: DemoState, userId: UserId): Mission[] {
  return state.missions
    .filter((mission) => mission.userId === userId)
    .map((mission) => {
      if (!mission.criterion) return mission
      const current = Math.min(
        mission.progress.target,
        state.actions.filter(
          (action) =>
            action.userId === userId &&
            action.status === 'approved' &&
            (!mission.criterion?.category ||
              mission.criterion.category === action.category),
        ).length,
      )
      return {
        ...mission,
        progress: { ...mission.progress, current },
        status:
          current >= mission.progress.target
            ? 'completed'
            : current > 0
              ? 'in_progress'
              : 'pending',
      }
    })
}

export function selectRewards(state: DemoState, user: User): Reward[] {
  const participant = selectDemoUser(state, user)
  const missions = selectMissions(state, user.id)
  return state.rewards.map((reward) => {
    const current =
      reward.id === 'reward-1'
        ? participant.completedActions
        : reward.id === 'reward-2'
          ? missions.filter((mission) => mission.status === 'completed').length
          : participant.points
    const target =
      reward.id === 'reward-2' ? missions.length : reward.progress.target
    const tierMet =
      !reward.requiredTier ||
      [
        'Ferro',
        'Bronze',
        'Prata',
        'Ouro',
        'Diamante',
        'Sustentabilístico',
      ].indexOf(user.tier) >=
        [
          'Ferro',
          'Bronze',
          'Prata',
          'Ouro',
          'Diamante',
          'Sustentabilístico',
        ].indexOf(reward.requiredTier)
    return {
      ...reward,
      progress: { current: Math.min(current, target), target },
      status: !tierMet
        ? 'locked'
        : current >= target
          ? 'available'
          : 'in_progress',
    }
  })
}
