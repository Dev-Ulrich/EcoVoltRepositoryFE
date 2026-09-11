import EnviarAcaoPage from '../pages/app/EnviarAcaoPage'
import ValidacoesPage from '../pages/app/ValidacoesPage'
import DetalhesAcaoPage from '../pages/app/DetalhesAcaoPage'
import RevisaoPage from '../pages/app/RevisaoPage'
import PerfilPage from '../pages/app/PerfilPage'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import PublicLayout from '../components/layout/PublicLayout'
import DashboardPage from '../pages/app/DashboardPage'
import MissoesPage from '../pages/app/MissoesPage'
import RankingPage from '../pages/app/RankingPage'
import RecompensasPage from '../pages/app/RecompensasPage'
import HomePage from '../pages/public/HomePage'
import ComoFuncionaPage from '../pages/public/ComoFuncionaPage'
import SobrePage from '../pages/public/SobrePage'
import FaqPage from '../pages/public/FaqPage'
import ContatoPage from '../pages/public/ContatoPage'
import NotFoundPage from '../pages/public/NotFoundPage'
import QuemSomosPage from '../pages/public/QuemSomosPage'
import LoginPage from '../pages/public/LoginPage'

function AppRoutes() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="como-funciona" element={<ComoFuncionaPage />} />
        <Route path="sobre" element={<SobrePage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contato" element={<ContatoPage />} />
        <Route path="quem-somos" element={<QuemSomosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="app" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="enviar-acao" element={<EnviarAcaoPage />} />
        <Route path="validacoes" element={<ValidacoesPage />} />
        <Route path="validacoes/:acaoId" element={<DetalhesAcaoPage />} />
        <Route path="validacoes/:acaoId/revisao" element={<RevisaoPage />} />
        <Route path="perfil" element={<PerfilPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="missoes" element={<MissoesPage />} />
        <Route path="ranking" element={<RankingPage />} />
        <Route path="recompensas" element={<RecompensasPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
