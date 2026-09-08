import type { ActionCategory, ActionStatus, SustainableAction } from '../types/action'

// Exemplos fictícios. As evidências descrevem arquivos, sem armazenar ou enviar vídeos.
export const actionCategories: Record<ActionCategory, { title: string; ods: number; points: number }> = {
  recycling: { title: 'Reciclagem de resíduos', ods: 12, points: 70 },
  water: { title: 'Economia de água', ods: 6, points: 85 },
  transport: { title: 'Transporte sustentável', ods: 11, points: 75 },
  energy: { title: 'Economia de energia', ods: 7, points: 90 },
  composting: { title: 'Compostagem orgânica', ods: 12, points: 80 },
  planting: { title: 'Plantio de árvores', ods: 15, points: 100 },
}

export const actionStatusLabels: Record<ActionStatus, string> = {
  pending: 'Em análise', approved: 'Aprovada', rejected: 'Recusada', in_review: 'Em revisão',
}

export const mockActions: SustainableAction[] = [
  { id: 'action-1', userId: 1, category: 'recycling', description: 'Separei embalagens para a coleta seletiva.', evidence: { name: 'reciclagem-demo.mp4', type: 'video/mp4', size: 2048 }, submittedAt: '2026-09-08T12:00:00Z', status: 'pending', possiblePoints: 70, awardedPoints: 0, awardedXp: 0 },
  { id: 'action-2', userId: 1, category: 'water', description: 'Reutilizei água para limpar o quintal.', evidence: { name: 'agua-demo.mp4', type: 'video/mp4', size: 4096 }, submittedAt: '2026-09-07T12:00:00Z', status: 'approved', possiblePoints: 85, awardedPoints: 85, awardedXp: 40 },
  { id: 'action-3', userId: 1, category: 'transport', description: 'Usei bicicleta no trajeto para a faculdade.', evidence: { name: 'bicicleta-demo.mp4', type: 'video/mp4', size: 3072 }, submittedAt: '2026-09-06T12:00:00Z', status: 'rejected', possiblePoints: 75, awardedPoints: 0, awardedXp: 0, rejectionReason: 'A evidência demonstrativa não mostra o trajeto.' },
  { id: 'action-4', userId: 1, category: 'energy', description: 'Aproveitei a luz natural durante a tarde.', evidence: { name: 'energia-demo.mp4', type: 'video/mp4', size: 2048 }, submittedAt: '2026-09-05T12:00:00Z', status: 'in_review', possiblePoints: 90, awardedPoints: 0, awardedXp: 0, rejectionReason: 'O ambiente não estava visível na evidência.', review: { justification: 'A gravação mostra as luzes apagadas no final.', requestedAt: '2026-09-06T15:00:00Z' } },
]
