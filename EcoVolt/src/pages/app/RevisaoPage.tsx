import { Link, useNavigate, useParams } from "react-router-dom";
import { post } from "../../features/account/api";
import {
  useOperation,
  ErrorMessage,
  Title,
  card,
  primary,
  secondary,
  input,
} from "../../features/account/ui";
export default function RevisaoPage() {
  const { acaoId } = useParams(),
    op = useOperation(),
    navigate = useNavigate();
  return (
    <section className="mx-auto max-w-2xl">
      <Title
        title="Solicitar revisão"
        description="Explique por que sua ação deve ser reavaliada. O pedido ficará registrado junto à atividade."
      />
      <form
        className={card}
        onSubmit={(e) => {
          e.preventDefault();
          const reason = new FormData(e.currentTarget).get("reason");
          void op.run(async () => {
            await post(`/app/envios/${acaoId}/revisao`, { reason });
            navigate(`/app/validacoes/${acaoId}`, {
              state: {
                notice: "Revisão enviada. Aguarde o retorno do avaliador.",
              },
            });
          });
        }}
      >
        <fieldset disabled={op.busy} className="space-y-4">
          <label className="block text-sm font-semibold">
            Justificativa
            <textarea
              className={input}
              name="reason"
              required
              minLength={10}
              maxLength={500}
              rows={6}
            />
          </label>
          <ErrorMessage message={op.error} />
          <div className="flex gap-3">
            <button type="submit" className={primary}>
              {op.busy ? "Enviando…" : "Enviar revisão"}
            </button>
            <Link to={`/app/validacoes/${acaoId}`} className={secondary}>
              Voltar
            </Link>
          </div>
        </fieldset>
      </form>
    </section>
  );
}
