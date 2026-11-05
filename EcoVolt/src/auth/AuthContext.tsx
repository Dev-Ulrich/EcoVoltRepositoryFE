import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./useAuth";
import type { User } from "../types/user";
import { api, post, hasSession, setToken } from "../features/account/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(hasSession),
    [sessionError, setSessionError] = useState("");
  async function refresh() {
    const next = await api<User>("/auth/me");
    setUser(next);
    return next;
  }
  async function restore() {
    setLoading(true);
    setSessionError("");
    try {
      if (hasSession()) await refresh();
    } catch (e) {
      if (hasSession())
        setSessionError(
          e instanceof Error
            ? e.message
            : "Não foi possível restaurar a sessão.",
        );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void restore();
    const expired = () => {
      setUser(null);
      setSessionError("");
    };
    window.addEventListener("ecovolt-session-expired", expired);
    return () => window.removeEventListener("ecovolt-session-expired", expired);
    // Initial session restore only; subsequent refreshes are explicit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function login(email: string, password: string) {
    const session = await post<{ token: string; user: User }>("/auth/login", {
      email,
      password,
    });
    setToken(session.token);
    setUser(session.user);
    setSessionError("");
  }
  async function logout() {
    try {
      await post("/auth/sair");
    } finally {
      setToken("");
      setUser(null);
      setSessionError("");
    }
  }
  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, sessionError, restore, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}
