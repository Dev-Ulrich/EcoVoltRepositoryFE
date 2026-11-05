import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import type { Submission } from "../../features/account/types";
import {
  useRemote,
  RemoteState,
  Title,
  card,
  primary,
  secondary,
  input,
  label,
  muted,
  Empty,
} from "../../features/account/ui";
export default function ValidacoesPage() {
  const { user } = useAuth(),
    [queue, setQueue] = useState(false),
    [filter, setFilter] = useState("");
  const evaluator = user?.role === "ADMIN" || user?.role === "FUNCIONARIO";
  const state = useRemote<Submission[]>(
      `/app/envios?queue=${evaluator && queue}`,
    ),
    list = state.data?.filter((a) => !filter || a.status === filter);
  return (
    <section>
      <Title
        title={queue ? "Fila de avaliação" : "Suas atividades"}
        description={
          queue
            ? "Confira as evidências antes de aprovar ou reprovar. Suas próprias ações precisam de outro avaliador."
            : "Acompanhe os envios, os resultados e suas solicitações de revisão."
        }
        action={
          <Link className={primary} to="/app/enviar-acao">
            Nova ação
          </Link>
        }
      />
      <div className="mb-5 flex flex-wrap items-end gap-4">
        {evaluator && (
          <button className={secondary} onClick={() => setQueue((v) => !v)}>
            {queue ? "Ver minhas atividades" : "Abrir fila de avaliação"}
          </button>
        )}
        <label className="text-sm font-semibold">
          Filtrar por situação
          <select
            className={input}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Todas</option>
            {[
              "PENDENTE",
              "EM_VALIDACAO",
              "APROVADO",
              "REPROVADO",
              "CANCELADO",
            ].map((s) => (
              <option key={s} value={s}>
                {label(s)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <RemoteState state={state} />
      {list?.length === 0 && <Empty>Nenhuma atividade encontrada.</Empty>}
      <ul className="space-y-3">
        {list?.map((a) => (
          <li key={a.id}>
            <Link
              className={`${card} flex flex-wrap items-center justify-between gap-4`}
              to={`/app/validacoes/${a.id}`}
            >
              <div>
                <h2 className="font-bold">{a.nome}</h2>
                <p className={`${muted} mt-2`}>
                  {new Date(a.data).toLocaleString("pt-BR")}
                  {queue ? ` · Participante #${a.userId}` : ""}
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                {label(a.status)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
