import { Link, useParams } from "react-router-dom";
import { post } from "./api";
import type { Mission } from "./types";
import {
  useRemote,
  RemoteState,
  useOperation,
  ErrorMessage,
  Title,
  card,
  primary,
  secondary,
  muted,
  label,
} from "./ui";
export default function MissionDetail() {
  const { id } = useParams(),
    valid = /^\d+$/.test(id ?? "") && Number(id) > 0;
  const state = useRemote<Mission>(valid ? `/app/missoes/${id}` : null),
    op = useOperation();
  if (!valid) return <ErrorMessage message="ID de missão inválido." />;
  const m = state.data;
  return (
    <section>
      <Link className={secondary} to="/app/missoes">
        Voltar às missões
      </Link>
      <div className="mt-6">
        <RemoteState state={state} />
        {m && (
          <>
            <Title title={m.nome} description={m.descricao} />
            <div className={`${card} mb-5`}>
              <p className="font-bold">
                {label(m.participacao)} · {m.progresso}% concluído
              </p>
              <progress
                className="my-4 w-full accent-emerald-600"
                max={100}
                value={m.progresso}
                aria-label="Progresso da missão"
              />
              <p className={muted}>
                {m.pontos} pontos e {m.xp} XP ao concluir todas as atividades
                aprovadas.
              </p>
              {m.participacao !== "CONCLUIDA" &&
                m.participacao !== "EM_ANDAMENTO" &&
                m.status === "ATIVA" && (
                  <button
                    className={`${primary} mt-5`}
                    disabled={op.busy}
                    onClick={() =>
                      void op.run(async () => {
                        await post(`/app/missoes/${id}/participar`);
                        state.reload();
                      })
                    }
                  >
                    {op.busy ? "Salvando…" : "Participar da missão"}
                  </button>
                )}
              <ErrorMessage message={op.error} />
            </div>
            <h2 className="mb-4 text-xl font-bold">Atividades da missão</h2>
            {!m.acoes?.length && (
              <p className={muted}>
                Esta missão ainda não possui atividades disponíveis.
              </p>
            )}
            <ul className="space-y-3">
              {m.acoes?.map((a) => (
                <li className={card} key={a.id}>
                  <h3 className="font-bold">{a.nome}</h3>
                  <p className={`${muted} mt-2`}>{a.descricao}</p>
                  <p className="my-3 text-sm">
                    Quantidade necessária: {a.quantidade}
                  </p>
                  {m.participacao === "EM_ANDAMENTO" &&
                    m.status === "ATIVA" && (
                      <Link
                        className={primary}
                        to={`/app/enviar-acao?mission=${m.id}&action=${a.id}`}
                      >
                        Registrar esta ação
                      </Link>
                    )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
