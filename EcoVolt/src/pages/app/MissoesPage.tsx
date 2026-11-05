import { useState } from "react";
import { Link } from "react-router-dom";
import type { Mission } from "../../features/account/types";
import {
  useRemote,
  RemoteState,
  Title,
  card,
  primary,
  muted,
  label,
  Empty,
  input,
} from "../../features/account/ui";
export default function MissoesPage() {
  const state = useRemote<Mission[]>("/app/missoes"),
    [search, setSearch] = useState(""),
    [status, setStatus] = useState("");
  const list = state.data?.filter(
    (m) =>
      m.nome
        .toLocaleLowerCase("pt-BR")
        .includes(search.toLocaleLowerCase("pt-BR")) &&
      (!status || m.participacao === status),
  );
  return (
    <section>
      <Title
        title="Missões para transformar"
        description="Escolha um desafio, participe e envie suas ações para avaliação."
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Buscar missão
          <input
            className={input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nome da missão"
          />
        </label>
        <label className="text-sm font-semibold">
          Participação
          <select
            className={input}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Todas</option>
            {["DISPONIVEL", "EM_ANDAMENTO", "CONCLUIDA"].map((s) => (
              <option key={s} value={s}>
                {label(s)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <RemoteState state={state} />
      {list?.length === 0 && (
        <Empty>Nenhuma missão encontrada para estes filtros.</Empty>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list?.map((m) => (
          <li key={m.id} className={`${card} flex flex-col`}>
            <div className="flex flex-wrap justify-between gap-2 text-xs font-bold text-emerald-700 dark:text-lime-300">
              <span>{label(m.dificuldade)}</span>
              <span>{label(m.participacao)}</span>
            </div>
            <h2 className="mt-5 text-xl font-bold">{m.nome}</h2>
            <p className={`${muted} mt-3 flex-1`}>{m.descricao}</p>
            <p className="mt-5 text-sm font-semibold">
              {m.pontos} pontos · {m.xp} XP
            </p>
            <progress
              className="my-3 w-full accent-emerald-600"
              max={100}
              value={m.progresso}
              aria-label={`Progresso: ${m.progresso}%`}
            />
            <Link className={primary} to={`/app/missoes/${m.id}`}>
              Ver missão
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
