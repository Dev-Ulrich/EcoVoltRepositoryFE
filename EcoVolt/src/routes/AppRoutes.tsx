import { Route, Routes } from 'react-router-dom'

import NotFoundPage from '../pages/NotFoundPage'
import HomePage from '../pages/public/HomePage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes