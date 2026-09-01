import { Route, Routes } from 'react-router-dom'

import HomePage from '../pages/public/HomePage'
import PublicLayout from '../components/common/PublicLayout'
import NotFoundPage from '../pages/NotFoundPage'

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