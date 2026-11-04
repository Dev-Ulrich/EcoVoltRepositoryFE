import { consultar } from './api';
import type { Missao } from './tipos';
export const listarMissoes = (signal: AbortSignal) => consultar<Missao[]>('/missao', signal);
export const buscarMissao = (id: number, signal: AbortSignal) => consultar<Missao>(`/missao/${id}`, signal);