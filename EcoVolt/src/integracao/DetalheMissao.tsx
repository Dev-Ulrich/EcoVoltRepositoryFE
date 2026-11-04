import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { buscarMissao } from './missoes';
import { useDados } from './useDados';
import Estado from './Estado';
export default function DetalheMissao() {
  const { id } = useParams();
  const numero = /^\d+$/.test(id ?? '') ? Number(id) : NaN;
  const valido = Number.isSafeInteger(numero) && numero > 0;
  const carregar = useCallback((signal: AbortSignal) => {
    if (!valido) return Promise.reject(new Error('ID inválido'));
    return buscarMissao(numero, signal);
  }, [numero, valido]);
  const estado = useDados(carregar);
  return <section className="space-y-4">
    <Link className="underline" to="/app/missoes">Voltar às missões</Link>
    {!valido ? <p role="alert">ID de missão inválido.</p> : <>
      <Estado {...estado} />
      {estado.dados && <><h1>{estado.dados.nome}</h1><p>{estado.dados.descricao}</p>
        <p>{estado.dados.pontuacaoRecompensa} pontos</p></>}
    </>}
  </section>;
}