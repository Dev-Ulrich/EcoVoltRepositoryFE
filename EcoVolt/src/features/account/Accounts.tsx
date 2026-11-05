import { useState } from "react";
import { api, download } from "./api";
import { useAuth } from "../../auth/useAuth";
import type { Account } from "./types";
import {
  useRemote,
  useOperation,
  RemoteState,
  ErrorMessage,
  Title,
  card,
  primary,
  secondary,
  input,
  muted,
  label,
  money,
  Empty,
  FileField,
  validateFile,
  Confirm,
} from "./ui";
export default function Accounts() {
  const { user } = useAuth(),
    state = useRemote<Account[]>("/app/contas"),
    op = useOperation();
  const [editing, setEditing] = useState<Account | "new" | null>(null),
    [deleting, setDeleting] = useState<Account | null>(null),
    [notice, setNotice] = useState("");
  const selected = editing && editing !== "new" ? editing : null;
  async function save(form: HTMLFormElement) {
    const data = new FormData(form),
      file = data.get("file") as File;
    validateFile(file);
    if (!file?.size) data.delete("file");
    await api(selected ? `/app/contas/${selected.id}` : "/app/contas", {
      method: selected ? "PUT" : "POST",
      body: data,
    });
    setEditing(null);
    setNotice(selected ? "Conta atualizada." : "Conta cadastrada.");
    state.reload();
  }
  return (
    <section>
      <Title
        title="Contas de energia"
        description="Cadastre suas contas, anexe comprovantes e acompanhe os benefícios aplicados."
        action={
          <button
            className={primary}
            disabled={op.busy}
            onClick={() => {
              setEditing("new");
              setNotice("");
            }}
          >
            Nova conta
          </button>
        }
      />
      {notice && (
        <p role="status" className={`${card} mb-4`}>
          {notice}
        </p>
      )}
      <ErrorMessage message={op.error} />
      {editing && (
        <form
          key={selected?.id ?? "new"}
          className={`${card} mb-6`}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            void op.run(() => save(form));
          }}
        >
          <h2 className="mb-5 text-xl font-bold">
            {selected ? "Editar conta" : "Cadastrar conta"}
          </h2>
          <fieldset disabled={op.busy} className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Titular
              <input
                required
                name="nomeTitular"
                maxLength={120}
                defaultValue={selected?.nomeTitular ?? user?.displayName}
                className={input}
              />
            </label>
            <label className="text-sm font-semibold">
              Concessionária
              <input
                required
                name="concessionaria"
                maxLength={120}
                defaultValue={selected?.concessionaria ?? ""}
                className={input}
              />
            </label>
            <label className="text-sm font-semibold">
              Número da instalação
              <input
                name="numeroInstalacao"
                maxLength={80}
                defaultValue={selected?.numeroInstalacao ?? ""}
                className={input}
              />
            </label>
            <label className="text-sm font-semibold">
              Mês de referência
              <input
                required
                type="month"
                name="mesReferencia"
                defaultValue={selected?.mesReferencia ?? ""}
                className={input}
              />
            </label>
            <label className="text-sm font-semibold">
              Valor da conta (R$)
              <input
                required
                type="number"
                min="0"
                max="99999999.99"
                step="0.01"
                name="valorConta"
                defaultValue={selected?.valorConta ?? ""}
                className={input}
              />
            </label>
            <FileField />
            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <button className={primary} type="submit">
                {op.busy ? "Salvando…" : "Salvar conta"}
              </button>
              <button
                className={secondary}
                type="button"
                onClick={() => setEditing(null)}
              >
                Cancelar
              </button>
            </div>
          </fieldset>
        </form>
      )}
      <RemoteState state={state} />
      {state.data?.length === 0 && (
        <Empty>Você ainda não cadastrou uma conta de energia.</Empty>
      )}
      <ul className="grid gap-4 sm:grid-cols-2">
        {state.data?.map((c) => (
          <li className={card} key={c.id}>
            <div className="flex flex-wrap justify-between gap-2">
              <h2 className="font-bold">{c.concessionaria}</h2>
              <span className={muted}>{c.mesReferencia}</span>
            </div>
            <p className={`${muted} mt-3`}>
              {c.nomeTitular} ·{" "}
              {c.numeroInstalacao || "Sem instalação informada"}
            </p>
            <p className="mt-4 text-3xl font-bold">{money(c.valorConta)}</p>
            <p className={`${muted} mt-2`}>
              {label(c.status)} · Benefício: {money(c.valorSubsidio)}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {c.arquivo && (
                <button
                  disabled={op.busy}
                  className={secondary}
                  onClick={() => void op.run(() => download(c.arquivo!))}
                >
                  Comprovante
                </button>
              )}
              {c.status === "PENDENTE" && (
                <>
                  <button
                    disabled={op.busy}
                    className={secondary}
                    onClick={() => {
                      setEditing(c);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Editar
                  </button>
                  <button
                    disabled={op.busy}
                    className={secondary}
                    onClick={() => setDeleting(c)}
                  >
                    Excluir
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      {deleting && (
        <Confirm
          title={`Excluir a conta de ${deleting.mesReferencia}?`}
          busy={op.busy}
          onCancel={() => setDeleting(null)}
          onConfirm={() =>
            void op.run(async () => {
              await api(`/app/contas/${deleting.id}`, { method: "DELETE" });
              setDeleting(null);
              setNotice("Conta excluída.");
              state.reload();
            })
          }
        />
      )}
    </section>
  );
}
