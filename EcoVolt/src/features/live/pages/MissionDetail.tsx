import { Link, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { Title, Feedback, button } from "../components/UI";
import type { Missao } from "../types/api";
function Detail({ id }: { id: string }) {
  const state = useApi<Missao>(`/missao/${id}`);
  const m = state.data;
  return (
    <>
      <Feedback {...state} />
      {m && (
        <>
          <Title eyebrow={`${m.tipo} · ${m.dificuldade}`} title={m.nome}>
            {m.descricao}
          </Title>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Pontos", m.pontuacaoRecompensa],
              ["Experiência", `${m.xpRecompensa} XP`],
              ["Situação", m.status ? "Ativa" : "Inativa"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white p-8">
                <p className="text-stone-500">{label}</p>
                <p className="mt-4 text-3xl font-bold">{value}</p>
              </div>
            ))}
          </div>
          <p className="my-8 text-stone-600">
            Frequência semanal: {m.quantidadeSemanal}. Nível necessário:{" "}
            {m.idNivel}. Liga: {m.idTier}.
          </p>
        </>
      )}
      <Link className={`${button} mt-6`} to="/missoes">
        Voltar às missões
      </Link>
    </>
  );
}
export default function MissionDetail() {
  const { id } = useParams();
  return id && /^[1-9]\d*$/.test(id) ? (
    <Detail id={id} />
  ) : (
    <>
      <Title eyebrow="Missão" title="Identificador inválido." />
      <Link to="/missoes">Ver todas as missões</Link>
    </>
  );
}
