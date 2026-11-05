import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { download, post } from "../../features/account/api";
import type { Submission } from "../../features/account/types";
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
  label,
  muted,
  Confirm,
} from "../../features/account/ui";
export default function DetalhesAcaoPage() {
  const { acaoId } = useParams(),
    { user } = useAuth(),
    location = useLocation(),
    op = useOperation(),
    [cancel, setCancel] = useState(false);
  const valid = /^\d+$/.test(acaoId ?? ""),
    state = useRemote<Submission>(valid ? `/app/envios/${acaoId}` : null),
    a = state.data;
  if (!valid)
    return <ErrorMessage message="Identificador de atividade inválido." />;
  const owner = a?.userId === user?.id,
    pending = a && ["PENDENTE", "EM_VALIDACAO"].includes(a.status),
    staff = user?.role === "ADMIN" || user?.role === "FUNCIONARIO";
  return (
    <section className="mx-auto max-w-3xl">
      <Link className={secondary} to="/app/validacoes">
        Voltar às atividades
      </Link>
      <div className="mt-6">
        <RemoteState state={state} />
        {a && (
          <>
            <Title
              title={a.nome}
              description={`Enviada em ${new Date(a.data).toLocaleString("pt-BR")}`}
            />
            {location.state?.notice && (
              <p role="status" className={`${card} mb-5`}>
                {String(location.state.notice)}
              </p>
            )}
            <article className={`${card} space-y-4`}>
              <p className="font-bold">
                {label(a.status)} · {a.pontos} pontos previstos
              </p>
              <p className="whitespace-pre-wrap break-words">{a.descricao}</p>
              {a.arquivo && (
                <button
                  disabled={op.busy}
                  className={secondary}
                  onClick={() => void op.run(() => download(a.arquivo!))}
                >
                  Baixar evidência
                </button>
              )}
              {a.feedback && (
                <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/50">
                  <h2 className="font-bold">Retorno da avaliação</h2>
                  <p className={`${muted} mt-2 whitespace-pre-wrap`}>
                    {a.feedback}
                  </p>
                </div>
              )}
              {a.revisao && (
                <div>
                  <h2 className="font-bold">Revisão: {a.revisao}</h2>
                  <p className={`${muted} mt-2`}>{a.motivoRevisao}</p>
                </div>
              )}
              <ErrorMessage message={op.error} />
              <div className="flex flex-wrap gap-3">
                {owner && a.status === "REPROVADO" && (
                  <Link
                    className={primary}
                    to={`/app/validacoes/${a.id}/revisao`}
                  >
                    Solicitar revisão
                  </Link>
                )}
                {owner && pending && (
                  <button
                    disabled={op.busy}
                    className={secondary}
                    onClick={() => setCancel(true)}
                  >
                    Cancelar envio
                  </button>
                )}
              </div>
            </article>
            {staff && !owner && pending && (
              <form
                className={`${card} mt-5 space-y-4`}
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  void op.run(async () => {
                    await post(`/app/envios/${a.id}/avaliar`, {
                      approved: data.get("decision") === "approve",
                      reason: data.get("reason"),
                    });
                    state.reload();
                  });
                }}
              >
                <h2 className="text-xl font-bold">Avaliar evidência</h2>
                <fieldset disabled={op.busy} className="space-y-4">
                  <label className="block text-sm font-semibold">
                    Decisão
                    <select
                      className={input}
                      required
                      name="decision"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Selecione
                      </option>
                      <option value="approve">Aprovar ação</option>
                      <option value="reject">Reprovar ação</option>
                    </select>
                  </label>
                  <label className="block text-sm font-semibold">
                    Justificativa
                    <textarea
                      className={input}
                      name="reason"
                      required
                      minLength={10}
                      maxLength={500}
                      rows={4}
                    />
                  </label>
                  <button className={primary} type="submit">
                    {op.busy ? "Salvando…" : "Salvar avaliação"}
                  </button>
                </fieldset>
              </form>
            )}
            {cancel && (
              <Confirm
                title="Cancelar esta ação?"
                busy={op.busy}
                onCancel={() => setCancel(false)}
                onConfirm={() =>
                  void op.run(async () => {
                    await post(`/app/envios/${a.id}/cancelar`);
                    state.reload();
                    setCancel(false);
                  })
                }
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
