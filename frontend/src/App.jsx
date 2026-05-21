import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PackageListPage   from './Pages/PackageListPage'
import PackageDetailPage from './Pages/PackageDetailPage'
import AdminPage         from './Pages/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<PackageListPage />} />
        <Route path="/packages/:id" element={<PackageDetailPage />} />
        <Route path="/admin"        element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
