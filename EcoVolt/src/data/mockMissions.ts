import type { Mission, MissionDifficulty, MissionStatus } from '../types/mission'

export const missionStatusLabels: Record<MissionStatus, string> = {
  pending: 'Pendente',
  in_progress: 'Em progresso',
  completed: 'Concluída',
}

export const missionDifficultyLabels: Record<MissionDifficulty, string> = {
  easy: 'Fácil',
  medium: 'Média',
  hard: 'Difícil',
}

export const missionStatusVariants = {
  pending: 'neutral',
  in_progress: 'info',
  completed: 'success',
} as const

// Ciclo fixo e fictício; os prazos não são contadores de uma campanha real.
// Status alinhado ao progresso: concluída = meta atingida, em progresso = parcial, pendente = zero.
export const mockMissions: Mission[] = [
  {
    id: 'mission-1',
    userId: 1,
    title: 'Conhecer a proposta EcoVolt',
    difficulty: 'easy',
    status: 'completed',
    progress: { current: 1, target: 1, unit: 'leitura' },
    points: 30,
    xp: 50,
    endsAt: '2026-09-14T23:59:00Z',
  },
  {
    id: 'mission-2',
    criterion: { type: 'approved_actions' },
    userId: 1,
    title: 'Concluir duas ações sustentáveis',
    difficulty: 'medium',
    status: 'in_progress',
    progress: { current: 1, target: 2, unit: 'ações aprovadas' },
    points: 50,
    xp: 100,
    endsAt: '2026-09-14T23:59:00Z',
  },
  {
    id: 'mission-3',
    criterion: { type: 'approved_actions', category: 'composting' },
    userId: 1,
    title: 'Experimentar compostagem',
    difficulty: 'hard',
    status: 'pending',
    progress: { current: 0, target: 1, unit: 'ação aprovada' },
    points: 80,
    xp: 150,
    endsAt: '2026-09-14T23:59:00Z',
  },
]
