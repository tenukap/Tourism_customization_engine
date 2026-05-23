import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import BookingDashboard from './pages/BookingDashboard';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Forces the app to land directly onto your functional payment gateway screen */}
        <Route path="/" element={<Navigate to="/payment" replace />} />

        {/* Clean, registered app paths */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/dashboard" element={<BookingDashboard />} />
      </Routes>
    </Router>
  );
}