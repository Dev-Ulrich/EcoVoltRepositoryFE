import ConfirmDelete from "../components/ConfirmDelete";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { Title, Feedback, Empty, button } from "../components/UI";
import EnergyForm from "../components/EnergyForm";
import { currency, deleteEnergy } from "../services/energy";
import type { Conta } from "../types/api";
export default function Energy() {
  const state = useApi<Conta[]>("/conta-energia");
  const [editing, setEditing] = useState<Conta | null | undefined>(undefined),
    [pending, setPending] = useState<Conta | null>(null),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  async function remove() {
    if (!pending || busy) return;
    setBusy(true);
    setError("");
    try {
      await deleteEnergy(pending.id);
      setPending(null);
      setMessage("Conta excluída.");
      state.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha ao excluir.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-5">
        <Title eyebrow="Consumo consciente" title="Sua energia em dia.">
          Consulte e organize as contas registradas na plataforma.
        </Title>
        <button
          className={button}
          onClick={() => {
            setEditing(null);
            setMessage("");
          }}
        >
          <Plus size={18} />
          Nova conta
        </button>
      </div>
      {message && (
        <p role="status" className="mb-6 rounded-xl bg-emerald-100 p-4">
          {message}
        </p>
      )}
      {editing !== undefined && (
        <EnergyForm
          key={editing?.id ?? "new"}
          conta={editing ?? undefined}
          onCancel={() => setEditing(undefined)}
          onSave={() => {
            setEditing(undefined);
            setMessage("Conta salva com sucesso.");
            state.reload();
          }}
        />
      )}
      <Feedback {...state} />
      {!state.loading &&
        !state.error &&
        (state.data?.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {state.data.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl border border-stone-200 bg-white p-7"
              >
                <div className="flex justify-between gap-4">
                  <h2 className="text-xl font-semibold">{c.concessionaria}</h2>
                  <span className="text-sm text-stone-500">
                    {c.mesReferencia}
                  </span>
                </div>
                <p className="mt-2 text-stone-600">
                  {c.nomeTitular} · {c.numeroInstalacao}
                </p>
                <p className="my-6 text-4xl font-semibold">
                  {currency(c.valorConta ?? 0)}
                </p>
                <p className="text-sm text-emerald-700">
                  {c.statusPagamento} · Subsídio:{" "}
                  {currency(c.valorSubsidio ?? 0)}
                </p>
                <div className="mt-6 flex gap-6 border-t border-stone-100 pt-5">
                  <button
                    className="flex items-center gap-2"
                    onClick={() => setEditing(c)}
                  >
                    <Pencil size={16} />
                    Editar
                  </button>
                  <button
                    className="flex items-center gap-2 text-red-700"
                    onClick={() => {
                      setPending(c);
                      setError("");
                    }}
                  >
                    <Trash2 size={16} />
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <Empty>
            Nenhuma conta cadastrada. Comece adicionando uma nova conta.
          </Empty>
        ))}
      {pending && (
        <ConfirmDelete
          description={`A conta de ${pending.concessionaria}, referência ${pending.mesReferencia}, será removida.`}
          busy={busy}
          error={error}
          onCancel={() => setPending(null)}
          onConfirm={remove}
        />
      )}
    </>
  );
}
