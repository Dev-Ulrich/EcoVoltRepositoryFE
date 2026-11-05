import { useState } from "react";
import { Link } from "react-router-dom";
import type { Reward, Account } from "../../features/account/types";
import { post } from "../../features/account/api";
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
  money,
  label,
  Empty,
} from "../../features/account/ui";
export default function RecompensasPage() {
  const state = useRemote<Reward[]>("/app/recompensas"),
    accounts = useRemote<Account[]>("/app/contas"),
    op = useOperation(),
    [notice, setNotice] = useState("");
  return (
    <section>
      <Title
        title="Suas recompensas"
        description="Acompanhe os benefícios concedidos à sua conta e utilize os que estiverem disponíveis."
      />
      <RemoteState state={state} />
      <ErrorMessage message={op.error} />
      {notice && (
        <p role="status" className={`${card} mb-5`}>
          {notice}
        </p>
      )}
      {state.data?.length === 0 && (
        <Empty>
          Você ainda não recebeu recompensas. Continue participando das missões
          e acompanhando seu progresso.
        </Empty>
      )}
      <ul className="grid gap-5 sm:grid-cols-2">
        {state.data?.map((r) => {
          const needsAccount = ["SUBSIDIO_ENERGIA", "DESCONTO"].includes(
            r.tipo,
          );
          return (
            <li key={r.id} className={card}>
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-lime-300">
                {label(r.status)}
              </p>
              <h2 className="mt-4 text-xl font-bold">
                {r.descricao || r.tipo.replaceAll("_", " ")}
              </h2>
              <p className={`${muted} mt-3`}>Período: {r.periodo}</p>
              <p className="my-4 text-xl font-bold">
                {needsAccount ? money(r.valor) : `Valor: ${r.valor}`}
              </p>
              {r.limite != null && (
                <p className={muted}>Limite: {money(r.limite)}</p>
              )}
              {r.status === "CONCEDIDA" && (
                <form
                  className="mt-4 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const account = new FormData(e.currentTarget).get(
                      "accountId",
                    );
                    void op.run(async () => {
                      await post(`/app/recompensas/${r.id}/resgatar`, {
                        accountId: needsAccount ? Number(account) : null,
                      });
                      setNotice("Recompensa utilizada com sucesso.");
                      state.reload();
                      accounts.reload();
                    });
                  }}
                >
                  <fieldset disabled={op.busy} className="space-y-4">
                    {needsAccount && (
                      <>
                        <RemoteState state={accounts} />
                        <label className="block text-sm font-semibold">
                          Aplicar na conta
                          <select
                            name="accountId"
                            className={input}
                            required
                            defaultValue=""
                          >
                            <option disabled value="">
                              Selecione uma conta pendente
                            </option>
                            {accounts.data
                              ?.filter((c) => c.status === "PENDENTE")
                              .map((c) => (
                                <option value={c.id} key={c.id}>
                                  {c.concessionaria} · {c.mesReferencia} ·{" "}
                                  {money(c.valorConta)}
                                </option>
                              ))}
                          </select>
                        </label>
                        <Link className={secondary} to="/app/contas">
                          Cadastrar conta
                        </Link>
                        <p className={muted}>
                          O benefício será registrado na conta selecionada. O
                          site não realiza pagamentos à concessionária.
                        </p>
                      </>
                    )}
                    <button
                      className={primary}
                      type="submit"
                      disabled={
                        needsAccount &&
                        (!accounts.data?.some((c) => c.status === "PENDENTE") ||
                          accounts.loading)
                      }
                    >
                      {op.busy ? "Salvando…" : "Utilizar recompensa"}
                    </button>
                  </fieldset>
                </form>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
