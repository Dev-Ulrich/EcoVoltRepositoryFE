import { consultar } from './api';
import type { Recompensa } from './tipos';

export const listarRecompensas = (signal: AbortSignal) =>
  consultar<Recompensa[]>('/recompensa', signal);

export const buscarRecompensa = (id: number, signal: AbortSignal) =>
  consultar<Recompensa>(`/recompensa/${id}`, signal);
