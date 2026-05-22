import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './Pages/landingPage'
import LoginPage from './Pages/LoginPage'
import PackageListPage from './Pages/PackageListPage'
import PackageDetailPage from './Pages/PackageDetailPage'
import AdminPackages from './Pages/AdminPackages'
import ProfilePage from './Pages/ProfilePage'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* anyone can visit */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* must be logged in */}
        <Route path="/packages" element={
          <ProtectedRoute><PackageListPage /></ProtectedRoute>
        } />
        <Route path="/packages/:id" element={
          <ProtectedRoute><PackageDetailPage /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><ProfilePage /></ProtectedRoute>
        } />
        <Route path="/admin/packages" element={
          <ProtectedRoute requiredRole="ADMIN"><AdminPackages /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
export default App