export async function httpRequest<T>(
  baseUrl: string,
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!baseUrl)
    throw new Error("A conexão com a API ainda não foi configurada.");
  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...options,
      signal: options.signal
          ? AbortSignal.any([options.signal, AbortSignal.timeout(90000)])
          : AbortSignal.timeout(90000),
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw error;
    throw new Error(
      "Não foi possível acessar a API. Verifique a conexão e tente novamente.",
    );
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.detalhe ||
        body?.erro ||
        `Não foi possível concluir a operação (${response.status}).`,
    );
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
