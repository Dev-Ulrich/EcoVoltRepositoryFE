import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { api, post, setToken } from "../../features/account/api";
import { RecoveryCode } from "../../features/account/AuthPage";
import {
  useOperation,
  ErrorMessage,
  Title,
  card,
  primary,
  input,
  muted,
} from "../../features/account/ui";
export default function PerfilPage() {
  const { user, refresh } = useAuth(),
    op = useOperation(),
    [notice, setNotice] = useState(""),
    [recovery, setRecovery] = useState("");
  if (!user) return null;
  if (recovery)
    return (
      <section className={`${card} mx-auto max-w-xl`}>
        <RecoveryCode
          code={recovery}
          onDone={() => {
            setToken("");
            window.location.assign("/login");
          }}
        />
      </section>
    );
  return (
    <section className="mx-auto max-w-3xl">
      <Title
        title="Seu perfil"
        description="Atualize seus dados e mantenha o acesso à sua conta protegido."
      />
      <ErrorMessage message={op.error} />
      {notice && (
        <p role="status" className={`${card} mb-4`}>
          {notice}
        </p>
      )}
      <form
        className={`${card} mb-5`}
        onSubmit={(e) => {
          e.preventDefault();
          const name = new FormData(e.currentTarget).get("name");
          void op.run(async () => {
            await api("/app/perfil", {
              method: "PUT",
              body: JSON.stringify({ name }),
            });
            await refresh();
            setNotice("Nome atualizado com sucesso.");
          });
        }}
      >
        <fieldset disabled={op.busy} className="space-y-4">
          <h2 className="text-xl font-bold">Dados da conta</h2>
          <label className="block text-sm font-semibold">
            Nome completo
            <input
              name="name"
              required
              minLength={2}
              maxLength={120}
              defaultValue={user.displayName}
              className={input}
            />
          </label>
          <p className={muted}>E-mail: {user.email}</p>
          <p className={muted}>
            Liga: {user.tier} · {user.points} pontos · {user.xp} XP
          </p>
          <button className={primary} type="submit">
            {op.busy ? "Salvando…" : "Salvar perfil"}
          </button>
        </fieldset>
      </form>
      <form
        className={`${card} mb-5`}
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          void op.run(async () => {
            if (form.get("password") !== form.get("confirm"))
              throw new Error("As novas senhas precisam ser iguais.");
            const result = await post<{ recoveryCode: string }>("/auth/senha", {
              currentPassword: form.get("current"),
              password: form.get("password"),
            });
            setRecovery(result.recoveryCode);
          });
        }}
      >
        <fieldset disabled={op.busy} className="space-y-4">
          <h2 className="text-xl font-bold">Alterar senha</h2>
          <p className={muted}>
            Após a alteração, entre novamente. Um novo código de recuperação
            será gerado.
          </p>
          <label className="block text-sm font-semibold">
            Senha atual
            <input
              name="current"
              type="password"
              required
              maxLength={128}
              autoComplete="current-password"
              className={input}
            />
          </label>
          <label className="block text-sm font-semibold">
            Nova senha
            <input
              name="password"
              type="password"
              required
              minLength={10}
              maxLength={128}
              autoComplete="new-password"
              className={input}
            />
          </label>
          <label className="block text-sm font-semibold">
            Confirmar nova senha
            <input
              name="confirm"
              type="password"
              required
              minLength={10}
              maxLength={128}
              autoComplete="new-password"
              className={input}
            />
          </label>
          <button className={primary} type="submit">
            {op.busy ? "Salvando…" : "Alterar minha senha"}
          </button>
        </fieldset>
      </form>
      {user.role === "COMUM" && (
        <form
          className={card}
          onSubmit={(e) => {
            e.preventDefault();
            const code = new FormData(e.currentTarget).get("code");
            void op.run(async () => {
              await post("/auth/avaliador", { code });
              await refresh();
              setNotice(
                "Acesso de avaliador ativado. A fila está disponível em Atividades.",
              );
            });
          }}
        >
          <fieldset disabled={op.busy} className="space-y-4">
            <h2 className="text-xl font-bold">
              Recebeu um convite de avaliador?
            </h2>
            <p className={muted}>
              Use o código reservado enviado pela equipe para a sua conta.
            </p>
            <label className="block text-sm font-semibold">
              Código de ativação
              <input
                name="code"
                required
                type="password"
                maxLength={100}
                autoComplete="off"
                className={input}
              />
            </label>
            <button className={primary} type="submit">
              Ativar acesso de avaliador
            </button>
          </fieldset>
        </form>
      )}
    </section>
  );
}
