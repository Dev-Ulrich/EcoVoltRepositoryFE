import { consultar } from './api';
import type { Conta } from './tipos';
export const listarContas = (signal: AbortSignal) => consultar<Conta[]>('/conta-energia', signal);