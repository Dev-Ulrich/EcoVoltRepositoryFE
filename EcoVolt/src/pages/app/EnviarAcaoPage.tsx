import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../features/account/api";
import type { Action } from "../../features/account/types";
import {
  useRemote,
  useOperation,
  RemoteState,
  ErrorMessage,
  Title,
  card,
  primary,
  secondary,
  input,
  FileField,
  validateFile,
  muted,
} from "../../features/account/ui";
export default function EnviarAcaoPage() {
  const state = useRemote<Action[]>("/app/acoes"),
    op = useOperation(),
    navigate = useNavigate(),
    [params] = useSearchParams();
  async function submit(form: HTMLFormElement) {
    const data = new FormData(form);
    validateFile(data.get("file") as File, true);
    if (params.get("mission")) data.set("missionId", params.get("mission")!);
    const result = await api<{ id: number }>("/app/envios", {
      method: "POST",
      body: data,
    });
    navigate(`/app/validacoes/${result.id}`, {
      state: {
        notice:
          "Ação enviada com sucesso. Sua evidência foi salva e aguarda avaliação.",
      },
    });
  }
  return (
    <section className="mx-auto max-w-3xl">
      <Title
        title="Registre sua ação"
        description="Conte o que você fez e envie uma evidência. Os pontos serão concedidos após a aprovação."
      />
      <RemoteState state={state} />
      {state.data && (
        <form
          className={card}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            void op.run(() => submit(form));
          }}
        >
          <fieldset disabled={op.busy} className="space-y-5">
            <label className="block text-sm font-semibold">
              Atividade
              <select
                required
                name="actionId"
                className={input}
                defaultValue={params.get("action") ?? ""}
              >
                <option value="" disabled>
                  Selecione uma atividade
                </option>
                {state.data.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nome} · {a.pontos} pontos
                  </option>
                ))}
              </select>
            </label>
            {!state.data.length && (
              <p className={muted}>
                Ainda não há atividades disponíveis para envio.
              </p>
            )}
            <label className="block text-sm font-semibold">
              Conte como foi sua ação
              <textarea
                name="description"
                required
                minLength={10}
                maxLength={500}
                rows={5}
                className={input}
                placeholder="Descreva a atividade, o local e o resultado."
              />
              <span className={muted}>Entre 10 e 500 caracteres.</span>
            </label>
            <FileField required />
            <ErrorMessage message={op.error} />
            <div className="flex flex-wrap gap-3">
              <button
                disabled={!state.data.length}
                className={primary}
                type="submit"
              >
                {op.busy ? "Enviando…" : "Enviar ação"}
              </button>
              <Link className={secondary} to="/app/validacoes">
                Voltar às atividades
              </Link>
            </div>
          </fieldset>
        </form>
      )}
    </section>
  );
}
