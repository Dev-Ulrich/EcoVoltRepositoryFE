import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import Footer from './Footer'
import Header from './Header'

function AppLayout() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="flex min-h-screen flex-col bg-emerald-50 text-slate-900 transition-colors dark:bg-emerald-950 dark:text-white">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10"><Outlet /></main>
      <Footer />
    </div>
  )
}

export default AppLayout
