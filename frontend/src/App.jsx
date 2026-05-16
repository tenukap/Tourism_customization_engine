import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage    from './Pages/landingPage'
import LoginPage      from './Pages/LoginPage'
import PackagePage    from './Pages/PackagePage'
import ProfilePage    from './Pages/ProfilePage'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public — anyone can visit */}
        <Route path="/"       element={<LandingPage />} />
        <Route path="/login"  element={<LoginPage />} />

        {/* Protected — must be logged in, otherwise redirected to /login */}
        <Route path="/packages" element={
          <ProtectedRoute><PackagePage /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><ProfilePage /></ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
