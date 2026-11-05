import { useEffect, useRef } from "react";
import { button } from "./UI";
export default function ConfirmDelete({
  description,
  busy,
  error,
  onCancel,
  onConfirm,
}: {
  description: string;
  busy: boolean;
  error: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    const dialog = ref.current;
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        if (!busy) onCancel();
      }}
      aria-labelledby="delete-title"
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-7 text-emerald-950 backdrop:bg-black/40"
    >
      <h2 id="delete-title" className="text-2xl font-semibold">
        Excluir esta conta?
      </h2>
      <p className="my-5">{description} Esta ação não pode ser desfeita.</p>
      {error && (
        <p role="alert" className="mb-4 text-red-700">
          {error}
        </p>
      )}
      <div className="flex gap-4">
        <button autoFocus disabled={busy} onClick={onCancel} className={button}>
          Cancelar
        </button>
        <button
          disabled={busy}
          onClick={onConfirm}
          className="rounded-xl bg-red-700 px-5 py-3 text-white"
        >
          {busy ? "Excluindo…" : "Excluir"}
        </button>
      </div>
    </dialog>
  );
}
