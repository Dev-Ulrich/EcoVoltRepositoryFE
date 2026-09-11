import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors dark:bg-emerald-950 dark:text-white">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default PublicLayout