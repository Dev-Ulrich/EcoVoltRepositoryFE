import { api } from "../features/account/api";
export const consultar = <T>(rota: string, signal: AbortSignal): Promise<T> =>
  api<T>(rota, { signal });
