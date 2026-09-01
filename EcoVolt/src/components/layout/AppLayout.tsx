import { Outlet } from 'react-router-dom'
import AppNavigation from './AppNavigation'
import Footer from './Footer'
import Header from './Header'

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-50">
      <Header />

      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        <aside className="min-w-0">
          <div className="lg:sticky lg:top-24">
            <AppNavigation />
          </div>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default AppLayout