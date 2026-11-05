import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import type { RankingRow } from "../../features/account/types";
import {
  useRemote,
  RemoteState,
  Title,
  card,
  input,
  muted,
  Empty,
} from "../../features/account/ui";
export default function RankingPage() {
  const state = useRemote<RankingRow[]>("/app/ranking"),
    [tier, setTier] = useState(""),
    { user } = useAuth();
  const list = state.data?.filter((r) => !tier || r.tier === tier);
  return (
    <section>
      <Title
        title="Ranking da comunidade"
        description="Classificação geral por pontos acumulados em atividades aprovadas. Empates compartilham a mesma posição."
      />
      <label className="mb-6 block max-w-xs text-sm font-semibold">
        Filtrar por liga
        <select
          className={input}
          value={tier}
          onChange={(e) => setTier(e.target.value)}
        >
          <option value="">Todas as ligas</option>
          {[...new Set(state.data?.map((r) => r.tier))].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <RemoteState state={state} />
      {list?.length === 0 && <Empty>Nenhum participante nesta liga.</Empty>}
      <ol className="space-y-3">
        {list?.map((r) => (
          <li
            key={r.id}
            className={`${card} flex items-center gap-4 ${r.id === user?.id ? "ring-2 ring-emerald-500" : ""}`}
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-800 dark:bg-emerald-900 dark:text-lime-300">
              {r.posicao}º
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="break-words font-bold">
                {r.nome}
                {r.id === user?.id ? " (você)" : ""}
              </h2>
              <p className={muted}>
                {r.tier} · {r.xp} XP
              </p>
            </div>
            <strong className="text-right text-sm">
              {r.pontos}
              <span className={`${muted} block`}>pontos</span>
            </strong>
          </li>
        ))}
      </ol>
    </section>
  );
}
