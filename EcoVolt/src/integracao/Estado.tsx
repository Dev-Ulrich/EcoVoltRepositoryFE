interface Props {
  carregando: boolean;
  erro: string;
  recarregar: () => void;
}

export default function Estado({
  carregando,
  erro,
  recarregar
}: Props) {
  if (carregando) {
    return <p role="status">Carregando…</p>;
  }

  if (erro) {
    return (
      <div role="alert" className="space-y-2">
        <p>{erro}</p>
        <button
          className="rounded border p-2"
          onClick={recarregar}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return null;
}