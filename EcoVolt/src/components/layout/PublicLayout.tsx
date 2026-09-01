import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-emerald-50 dark:bg-emerald-950">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default PublicLayout