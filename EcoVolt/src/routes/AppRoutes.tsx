import { Route, Routes } from 'react-router-dom'

import PublicLayout from '../components/layout/PublicLayout'
import HomePage from '../pages/public/HomePage'
import NotFoundPage from '../pages/public/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes