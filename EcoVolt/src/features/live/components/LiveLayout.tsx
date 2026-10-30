import { NavLink, Outlet } from "react-router-dom";
import { PreferencesProvider } from "../context/Preferences";
export default function LiveLayout() {
  return (
    <PreferencesProvider>
      <main className="min-h-[65vh] bg-[#f7f8f2] text-emerald-950">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <nav
            aria-label="Área conectada"
            className="mb-8 flex flex-wrap gap-4"
          >
            {[
              ["/missoes", "Missões"],
              ["/energia", "Contas de energia"],
            ].map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-full px-5 py-3 font-semibold ${isActive ? "bg-emerald-800 text-white" : "bg-white text-emerald-800"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <Outlet />
        </div>
      </main>
    </PreferencesProvider>
  );
}
