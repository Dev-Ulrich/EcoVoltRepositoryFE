const base = (import.meta.env.VITE_API_URL ?? "").trim().replace(/\/+$/, "");
const key = "ecovolt-session-v1";
let token = "";
try {
  token = sessionStorage.getItem(key) ?? "";
} catch {
  /* Memory-only session when storage is unavailable. */
}
export function setToken(value: string) {
  token = value;
  try {
    if (value) sessionStorage.setItem(key, value);
    else sessionStorage.removeItem(key);
  } catch {
    /* Keep memory session. */
  }
}
export function hasSession() {
  return Boolean(token);
}
export async function http(path: string, options: RequestInit = {}) {
  if (!base) throw new Error("O endereço da API não foi configurado.");
  const headers = new Headers(options.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (typeof options.body === "string")
    headers.set("Content-Type", "application/json");
  const timeout = AbortSignal.timeout(90000);
  let response: Response;
  try {
    response = await fetch(`${base}${path}`, {
      ...options,
      headers,
      signal: options.signal
        ? AbortSignal.any([options.signal, timeout])
        : timeout,
    });
  } catch (error) {
    if (options.signal?.aborted) throw error;
    throw new Error(
      "Não foi possível acessar o servidor. Aguarde alguns instantes e tente novamente.",
    );
  }
  if (!response.ok) {
    if (response.status === 401 && token) {
      setToken("");
      window.dispatchEvent(new Event("ecovolt-session-expired"));
    }
    const body = (await response.json().catch(() => ({}))) as {
      message?: string;
      detalhe?: string;
    };
    throw new Error(
      body.message ||
        body.detalhe ||
        `Não foi possível concluir a solicitação (${response.status}).`,
    );
  }
  return response;
}
export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await http(path, options);
  return response.status === 204
    ? (undefined as T)
    : (response.json() as Promise<T>);
}
export const post = <T>(path: string, data?: unknown) =>
  api<T>(path, {
    method: "POST",
    body: data === undefined ? undefined : JSON.stringify(data),
  });
export async function download(id: string) {
  const response = await http(`/app/arquivos/${encodeURIComponent(id)}`);
  const blob = await response.blob();
  const disposition = response.headers.get("Content-Disposition") ?? "";
  const encoded = disposition.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  let name = "evidencia";
  try {
    if (encoded) name = decodeURIComponent(encoded);
  } catch {
    /* Fall back to a safe name. */
  }
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
