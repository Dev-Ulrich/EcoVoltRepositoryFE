import { AuthProvider } from './auth/AuthContext'
import { useAuth } from './auth/useAuth'
import { DemoDataProvider } from './contexts/DemoDataContext'
import AppRoutes from './routes/AppRoutes'

function DemoSession() {
  const { user } = useAuth()
  // Reinicia os mocks ao sair ou trocar de conta; mudanças de rota preservam o estado.
  return <DemoDataProvider key={user?.id ?? 'guest'}><AppRoutes /></DemoDataProvider>
}

function App() {
  return <AuthProvider><DemoSession /></AuthProvider>
}

export default App
