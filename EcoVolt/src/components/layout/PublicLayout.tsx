import usePublicMotion from '../../hooks/usePublicMotion'
import '../../styles/public-motion.css'
import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'

function PublicLayout() {
  const motionRef = usePublicMotion<HTMLDivElement>()
  return (
    <div ref={motionRef} className="public-motion flex min-h-screen flex-col bg-white text-slate-900 transition-colors dark:bg-emerald-950 dark:text-white">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default PublicLayout