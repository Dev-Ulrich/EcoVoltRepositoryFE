const base = (import.meta.env.VITE_API_URL ?? '').trim().replace(/\/+$/, '');

export async function consultar<T>(
  rota: string,
  signal: AbortSignal
): Promise<T> {
  if (!base) {
    throw new Error('Configure VITE_API_URL e reinicie o projeto.');
  }

  const resposta = await fetch(`${base}${rota}`, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(90000)]),
    headers: { Accept: 'application/json' },
  });

  if (!resposta.ok) {
    throw new Error(`Falha na consulta (${resposta.status}).`);
  }

  return resposta.json() as Promise<T>;
}