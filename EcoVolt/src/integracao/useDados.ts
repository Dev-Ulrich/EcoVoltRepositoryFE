import { useEffect, useState } from 'react';

export function useDados<T>(
  carregar: (signal: AbortSignal) => Promise<T>
) {
  const [dados, setDados] = useState<T | null>(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controle = new AbortController();

    setCarregando(true);
    setErro('');
    setDados(null);

    carregar(controle.signal)
      .then(valor => {
        if (!controle.signal.aborted) setDados(valor);
      })
      .catch(() => {
        if (!controle.signal.aborted) {
          setErro('Não foi possível consultar a API.');
        }
      })
      .finally(() => {
        if (!controle.signal.aborted) setCarregando(false);
      });

    return () => controle.abort();
  }, [carregar, tentativa]);

  return {
    dados,
    erro,
    carregando,
    recarregar: () => setTentativa(n => n + 1)
  };
}