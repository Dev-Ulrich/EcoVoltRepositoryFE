import { consultar } from './api';
import type { Ranking } from './tipos';

export const listarRanking = (signal: AbortSignal) =>
  consultar<Ranking[]>('/ranking', signal);

export const buscarRanking = (id: number, signal: AbortSignal) =>
  consultar<Ranking>(`/ranking/${id}`, signal);
