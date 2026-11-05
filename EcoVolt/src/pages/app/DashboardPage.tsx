import { ArrowRight, Leaf, Plus, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import type { User } from "../../types/user";
import type { Submission } from "../../features/account/types";
import {
  useRemote,
  RemoteState,
  Title,
  card,
  primary,
  secondary,
  muted,
  label,
  Empty,
} from "../../features/account/ui";
export default function DashboardPage() {
  const state = useRemote<{
    user: User;
    pending: number;
    accounts: number;
    recent: Submission[];
  }>("/app/painel");
  return (
    <section>
      <Title
        title={
          state.data
            ? `Olá, ${state.data.user.displayName.split(" ")[0]}!`
            : "Sua jornada"
        }
        description="Cada atitude conta. Acompanhe seu progresso e registre sua próxima ação."
        action={
          <Link to="/app/enviar-acao" className={primary}>
            <Plus size={18} />
            Registrar ação
          </Link>
        }
      />
      <RemoteState state={state} />
      {state.data && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Pontos conquistados", state.data.user.points],
              ["Experiência", `${state.data.user.xp} XP`],
              ["Ações aprovadas", state.data.user.completedActions],
              ["Em avaliação", state.data.pending],
            ].map(([name, value]) => (
              <article className={card} key={name}>
                <p className={muted}>{name}</p>
                <p className="mt-3 text-3xl font-bold text-emerald-700 dark:text-lime-300">
                  {value}
                </p>
              </article>
            ))}
          </div>
          <div className="my-6 grid gap-4 sm:grid-cols-2">
            <Link
              to="/app/missoes"
              className={`${card} flex items-center justify-between gap-4`}
            >
              <span>
                <Leaf className="mb-3 text-emerald-600" />
                <strong>Encontre sua próxima missão</strong>
                <span className={`${muted} mt-2 block`}>
                  {state.data.user.activeMissions} em andamento
                </span>
              </span>
              <ArrowRight />
            </Link>
            <Link
              to="/app/contas"
              className={`${card} flex items-center justify-between gap-4`}
            >
              <span>
                <Zap className="mb-3 text-emerald-600" />
                <strong>Suas contas de energia</strong>
                <span className={`${muted} mt-2 block`}>
                  {state.data.accounts} cadastradas
                </span>
              </span>
              <ArrowRight />
            </Link>
          </div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Atividades recentes</h2>
            <Link to="/app/validacoes" className={secondary}>
              Ver todas
            </Link>
          </div>
          {state.data.recent.length ? (
            <ul className="space-y-3">
              {state.data.recent.map((a) => (
                <li key={a.id}>
                  <Link
                    className={`${card} flex flex-wrap items-center justify-between gap-3`}
                    to={`/app/validacoes/${a.id}`}
                  >
                    <strong>{a.nome}</strong>
                    <span className={muted}>{label(a.status)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>
              Você ainda não enviou uma ação. Registre sua primeira atitude
              sustentável.
            </Empty>
          )}
        </>
      )}
    </section>
  );
}
