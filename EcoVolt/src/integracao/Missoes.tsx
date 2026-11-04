import { useState } from 'react';
import { Link } from 'react-router-dom';
import { listarMissoes } from './missoes';
import { useDados } from './useDados';
import Estado from './Estado';

export default function Missoes() {
  const estado = useDados(listarMissoes);
  const [busca, setBusca] = useState('');
  const lista = estado.dados?.filter(m => m.nome.toLowerCase().includes(busca.toLowerCase()));
  return <section className="space-y-4">
    <h1>Missões</h1>
    <label className="block">Buscar missão
      <input className="mt-1 block w-full rounded border p-2" value={busca} onChange={e => setBusca(e.target.value)} />
    </label>
    <Estado {...estado} />
    {lista?.length === 0 && <p>Nenhuma missão encontrada.</p>}
    <ul className="grid gap-3 sm:grid-cols-2">{lista?.map(m => <li className="rounded border p-4" key={m.id}>
      <Link className="underline" to={`/app/missoes/${m.id}`}>{m.nome}</Link>
      <p>{m.pontuacaoRecompensa} pontos · {m.status ? 'Ativa' : 'Inativa'}</p>
    </li>)}</ul>
  </section>;
}