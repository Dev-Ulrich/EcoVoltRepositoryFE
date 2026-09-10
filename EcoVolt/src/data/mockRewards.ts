import type { Reward } from '../types/reward'

// Catálogo fictício: não concede benefícios reais nem realiza resgates.
export const mockRewards: Reward[] = [
  { id: 'reward-1', title: 'Badge EcoStarter', description: 'Reconhecimento pela primeira ação aprovada.', isFeatured: true, status: 'available', pointsCost: 0, requirement: 'Concluir uma ação sustentável.', progress: { current: 1, target: 1 } },
  { id: 'reward-2', title: 'Energia constante', description: 'Conquista por completar as missões do ciclo demonstrativo.', status: 'in_progress', pointsCost: 0, requirement: 'Concluir as três missões.', progress: { current: 1, target: 3 } },
  { id: 'reward-3', title: 'Cupom sustentável', description: 'Exemplo de benefício para uma etapa futura.', status: 'locked', pointsCost: 200, requirement: 'Atingir o tier Prata e ter 200 pontos.', requiredTier: 'Prata', progress: { current: 115, target: 200 } },
]
