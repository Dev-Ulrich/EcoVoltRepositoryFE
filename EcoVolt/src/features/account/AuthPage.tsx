import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Leaf } from "lucide-react";
import { useAuth } from "../../auth/useAuth";
import ThemeToggle from "../../components/common/ThemeToggle";
import logo from "../../assets/brand/ecovolt-logo-dark.webp";
import background from "../../assets/public/contato/hero-contato-reference.webp";
import { post } from "./api";
import {
  input,
  primary,
  secondary,
  muted,
  ErrorMessage,
  useOperation,
} from "./ui";

export function RecoveryCode({
  code,
  onDone,
}: {
  code: string;
  onDone: () => void;
}) {
  const [saved, setSaved] = useState(false);
  function save() {
    const url = URL.createObjectURL(
      new Blob(
        [
          `EcoVolt — código de recuperação\n${code}\nGuarde em local privado. Quem possui este código e seu e-mail pode redefinir sua senha.\n`,
        ],
        { type: "text/plain" },
      ),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "ecovolt-recuperacao.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="space-y-4" role="status">
      <h2 className="text-2xl font-bold">Guarde seu código de recuperação</h2>
      <p className={muted}>
        Você usará este código caso esqueça sua senha. Ele é exibido somente
        agora. Guarde em local privado.
      </p>
      <code className="block break-all rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
        {code}
      </code>
      <button type="button" className={secondary} onClick={save}>
        Baixar meu código
      </button>
      <label className="flex items-start gap-3 text-sm">
        <input
          className="mt-1"
          type="checkbox"
          checked={saved}
          onChange={(e) => setSaved(e.target.checked)}
        />
        Guardei o código em um local seguro.
      </label>
      <button
        type="button"
        disabled={!saved}
        className={primary}
        onClick={onDone}
      >
        Continuar para o login <ArrowRight size={18} />
      </button>
    </div>
  );
}
export default function AuthPage({
  mode = "login",
}: {
  mode?: "login" | "register" | "recover";
}) {
  const { user, login, loading, sessionError, restore } = useAuth(),
    operation = useOperation();
  const [show, setShow] = useState(false),
    [code, setCode] = useState("");
  const register = mode === "register",
    recover = mode === "recover";
  if (user) return <Navigate to="/app" replace />;
  async function submit(form: HTMLFormElement) {
    const data = new FormData(form),
      email = String(data.get("email")).trim(),
      password = String(data.get("password"));
    if (mode !== "login" && password !== data.get("confirm"))
      throw new Error("As senhas precisam ser iguais.");
    if (register) {
      const result = await post<{ recoveryCode: string }>("/auth/cadastro", {
        name: String(data.get("name")).trim(),
        email,
        password,
        invitation: String(data.get("invitation") ?? "").trim(),
      });
      setCode(result.recoveryCode);
    } else if (recover) {
      const result = await post<{ recoveryCode: string }>("/auth/recuperar", {
        email,
        password,
        code: String(data.get("code")).trim(),
      });
      setCode(result.recoveryCode);
    } else await login(email, password);
  }
  return (
    <main className="min-h-dvh bg-[#f5faf7] text-[#09243a] dark:bg-emerald-950 dark:text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
        <Link
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
          to="/"
        >
          <ArrowLeft size={18} />
          Voltar ao início
        </Link>
        <ThemeToggle />
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <div className="grid overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl lg:grid-cols-2 dark:border-emerald-800 dark:bg-[#07372d]">
          <aside className="relative isolate flex min-h-52 flex-col justify-between overflow-hidden bg-emerald-950 p-8 text-white lg:min-h-[650px] lg:p-12">
            <img
              src={background}
              alt=""
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950 via-emerald-950/80 to-emerald-950/50" />
            <div>
              <Link to="/" aria-label="EcoVolt - Início">
                <img
                  src={logo}
                  alt="EcoVolt"
                  className="h-12 w-40 object-contain object-left"
                />
              </Link>
              <p className="mt-10 text-xs font-bold uppercase tracking-widest text-lime-300">
                Pequenas ações. Grandes mudanças.
              </p>
              <h2 className="mt-4 max-w-sm text-3xl font-bold leading-tight sm:text-4xl">
                Seu próximo passo para um futuro mais verde.
              </h2>
            </div>
            <p className="mt-8 hidden text-sm text-emerald-100 lg:block">
              Suas ações, suas conquistas e sua evolução em um só lugar.
            </p>
          </aside>
          <section className="p-6 sm:p-10 lg:p-12">
            {code ? (
              <RecoveryCode
                code={code}
                onDone={() => {
                  window.location.assign("/login");
                }}
              />
            ) : (
              <>
                <Leaf
                  className="mb-5 text-emerald-600 dark:text-lime-300"
                  size={32}
                />
                <h1 className="text-3xl font-bold">
                  {register
                    ? "Crie sua conta"
                    : recover
                      ? "Recupere seu acesso"
                      : "Boas-vindas de volta!"}
                </h1>
                <p className={`${muted} mt-3`}>
                  {register
                    ? "Comece sua jornada e acompanhe seu impacto."
                    : recover
                      ? "Informe o código que você guardou ao criar sua conta. Ao concluir, você receberá um novo código."
                      : "Entre para acompanhar suas ações, missões e conquistas."}
                </p>
                {loading ? (
                  <p role="status" className="mt-6">
                    Verificando sua sessão…
                  </p>
                ) : sessionError ? (
                  <div>
                    <ErrorMessage message={sessionError} />
                    <button
                      className={secondary}
                      onClick={() => void restore()}
                    >
                      Tentar novamente
                    </button>
                  </div>
                ) : (
                  <form
                    className="mt-7 space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      void operation.run(() => submit(form));
                    }}
                  >
                    <fieldset disabled={operation.busy} className="space-y-5">
                      {register && (
                        <label className="block text-sm font-semibold">
                          Nome completo
                          <input
                            name="name"
                            required
                            minLength={2}
                            maxLength={120}
                            autoComplete="name"
                            className={input}
                          />
                        </label>
                      )}
                      <label className="block text-sm font-semibold">
                        E-mail
                        <input
                          name="email"
                          required
                          type="email"
                          maxLength={150}
                          autoComplete="username"
                          className={input}
                        />
                      </label>
                      {recover && (
                        <label className="block text-sm font-semibold">
                          Código de recuperação
                          <input
                            name="code"
                            required
                            maxLength={100}
                            autoComplete="off"
                            className={input}
                          />
                        </label>
                      )}
                      <label className="block text-sm font-semibold">
                        {recover ? "Nova senha" : "Senha"}
                        <span className="relative block">
                          <input
                            name="password"
                            required
                            minLength={mode === "login" ? 1 : 10}
                            maxLength={128}
                            type={show ? "text" : "password"}
                            autoComplete={
                              mode === "login"
                                ? "current-password"
                                : "new-password"
                            }
                            className={`${input} pr-14`}
                          />
                          <button
                            type="button"
                            aria-label={
                              show ? "Ocultar senha" : "Mostrar senha"
                            }
                            onClick={() => setShow((v) => !v)}
                            className="absolute inset-y-1 right-1 flex w-11 items-center justify-center rounded-lg"
                          >
                            {show ? <EyeOff size={19} /> : <Eye size={19} />}
                          </button>
                        </span>
                      </label>
                      {mode !== "login" && (
                        <>
                          <p className={muted}>
                            Use uma senha com pelo menos 10 caracteres.
                          </p>
                          <label className="block text-sm font-semibold">
                            Confirmar senha
                            <input
                              name="confirm"
                              type={show ? "text" : "password"}
                              required
                              minLength={10}
                              maxLength={128}
                              autoComplete="new-password"
                              className={input}
                            />
                          </label>
                        </>
                      )}
                      {register && (
                        <label className="block text-sm font-semibold">
                          Código de convite (opcional)
                          <input
                            name="invitation"
                            maxLength={100}
                            autoComplete="off"
                            className={input}
                          />
                          <span className={`${muted} mt-2 block`}>
                            Preencha somente se recebeu um convite de avaliador.
                          </span>
                        </label>
                      )}
                      <ErrorMessage message={operation.error} />
                      <button className={`${primary} w-full`} type="submit">
                        {operation.busy
                          ? "Aguarde…"
                          : register
                            ? "Criar minha conta"
                            : recover
                              ? "Redefinir senha"
                              : "Entrar"}
                        <ArrowRight size={18} />
                      </button>
                    </fieldset>
                  </form>
                )}
                <div className="mt-6 flex flex-wrap justify-between gap-3 text-sm font-semibold">
                  {mode === "login" ? (
                    <>
                      <Link className="underline" to="/cadastro">
                        Ainda não tenho conta
                      </Link>
                      <Link className="underline" to="/recuperar-senha">
                        Esqueci minha senha
                      </Link>
                    </>
                  ) : (
                    <Link className="underline" to="/login">
                      Já tenho conta. Entrar
                    </Link>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
