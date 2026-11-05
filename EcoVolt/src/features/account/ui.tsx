import { useEffect, useRef, useState, type ReactNode } from "react";
import { api } from "./api";
export const input =
  "mt-2 block w-full rounded-xl border border-emerald-200 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-white";
export const primary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-lime-300 dark:text-emerald-950 dark:hover:bg-lime-200";
export const secondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-300 px-4 py-2 text-sm font-semibold hover:bg-emerald-50 dark:border-emerald-700 dark:hover:bg-emerald-900 disabled:opacity-50";
export const card =
  "rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/50";
export const muted =
  "text-sm leading-relaxed text-slate-600 dark:text-emerald-200/80";
export const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const labels: Record<string, string> = {
  PENDENTE: "Pendente",
  EM_VALIDACAO: "Em avaliação",
  APROVADO: "Aprovado",
  REPROVADO: "Reprovado",
  CANCELADO: "Cancelado",
  DISPONIVEL: "Disponível",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDA: "Concluída",
  CONCEDIDA: "Disponível para resgate",
  UTILIZADA: "Utilizada",
  CANCELADA: "Cancelada",
  FACIL: "Fácil",
  MEDIA: "Média",
  DIFICIL: "Difícil",
  PAGO: "Pago",
};
export const label = (value: string) => labels[value] ?? value;
export function Title({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-lime-300">
          EcoVolt · sua jornada
        </p>
        <h1 className="font-bold">{title}</h1>
        <p className={`${muted} mt-3 max-w-2xl`}>{description}</p>
      </div>
      {action}
    </header>
  );
}
export function ErrorMessage({ message }: { message: string }) {
  return message ? (
    <p
      role="alert"
      className="my-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
    >
      {message}
    </p>
  ) : null;
}
export function useRemote<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [version, setVersion] = useState(0);
  useEffect(() => {
    if (!path) {
      setLoading(false);
      setData(null);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setData(null);
    api<T>(path, { signal: controller.signal })
      .then((value) => {
        if (!controller.signal.aborted) setData(value);
      })
      .catch((e) => {
        if (!controller.signal.aborted)
          setError(
            e instanceof Error ? e.message : "Falha ao carregar os dados.",
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [path, version]);
  return { data, error, loading, reload: () => setVersion((v) => v + 1) };
}
export function RemoteState({
  state,
}: {
  state: { loading: boolean; error: string; reload: () => void };
}) {
  if (state.loading)
    return (
      <p role="status" className={`${card} ${muted}`}>
        Carregando seus dados… O primeiro acesso pode levar alguns instantes.
      </p>
    );
  if (state.error)
    return (
      <div className={card}>
        <ErrorMessage message={state.error} />
        <button className={secondary} onClick={state.reload}>
          Tentar novamente
        </button>
      </div>
    );
  return null;
}
export function useOperation() {
  const lock = useRef(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function run(fn: () => Promise<void>) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      await fn();
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Não foi possível concluir a operação.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return { busy, error, run };
}
export function Empty({ children }: { children: ReactNode }) {
  return <div className={`${card} ${muted} py-10 text-center`}>{children}</div>;
}
export function validateFile(file: File | null, required = false) {
  if (!file || file.size === 0) {
    if (required) throw new Error("Adicione um arquivo de evidência.");
    return;
  }
  if (file.size > 5 * 1024 * 1024)
    throw new Error("O arquivo deve ter no máximo 5 MB.");
  if (
    ![
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
      "video/mp4",
    ].includes(file.type)
  )
    throw new Error("Envie JPG, PNG, WEBP, PDF ou MP4.");
}
export function FileField({ required = false }: { required?: boolean }) {
  return (
    <label className="block text-sm font-semibold">
      {required ? "Evidência da ação" : "Comprovante (opcional)"}
      <input
        name="file"
        type="file"
        required={required}
        accept="image/jpeg,image/png,image/webp,application/pdf,video/mp4"
        className={input}
      />
      <span className={`${muted} mt-2 block`}>
        JPG, PNG, WEBP, PDF ou MP4. Até 5 MB.
      </span>
    </label>
  );
}
export function Confirm({
  title,
  onConfirm,
  onCancel,
  busy,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  busy: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        if (!busy) onCancel();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-6 text-slate-900 shadow-2xl backdrop:bg-black/50 dark:bg-emerald-950 dark:text-white"
      aria-labelledby="confirm-title"
    >
      <h2 id="confirm-title" className="text-xl font-bold">
        {title}
      </h2>
      <p className={`${muted} mt-3`}>
        Confira antes de continuar. Esta ação será salva na sua conta.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          autoFocus
          disabled={busy}
          className={secondary}
          onClick={onCancel}
        >
          Voltar
        </button>
        <button disabled={busy} className={primary} onClick={onConfirm}>
          {busy ? "Salvando…" : "Confirmar"}
        </button>
      </div>
    </dialog>
  );
}
