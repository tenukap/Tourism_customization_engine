import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './Context/AuthContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>   {/* wraps everything so any component can call useAuth() */}
      <App />
    </AuthProvider>
  </StrictMode>,
)
