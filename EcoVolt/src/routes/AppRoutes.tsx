import { Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import PublicLayout from '../components/layout/PublicLayout'
import DashboardPage from '../pages/app/DashboardPage'
import HomePage from '../pages/public/HomePage'
import ComoFuncionaPage from '../pages/public/ComoFuncionaPage'
import SobrePage from '../pages/public/SobrePage'
import FaqPage from '../pages/public/FaqPage'
import NotFoundPage from '../pages/public/NotFoundPage'
import QuemSomosPage from '../pages/public/QuemSomosPage'
import LoginPage from '../pages/public/LoginPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="como-funciona" element={<ComoFuncionaPage />} />
        <Route path="sobre" element={<SobrePage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="quem-somos" element={<QuemSomosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="app" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
