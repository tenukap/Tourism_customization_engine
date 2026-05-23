import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiCreditCard, FiBriefcase } from 'react-icons/fi';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 font-sans shadow-sm">
      {/* Clicking the Logo sends them right to checkout checkout */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/payment')}>
        <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
        <span className="text-sm font-black text-gray-900 uppercase tracking-widest">TourCraft</span>
      </div>

      <div className="flex items-center gap-4">
        {/* 🔥 FIX: Pointing Book Tour to /payment instead of the old broken form! */}
        <button
          onClick={() => navigate('/payment')}
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all uppercase tracking-wider ${
            isActive('/payment')
              ? 'bg-emerald-50 text-emerald-700'
              : 'text-gray-500 hover:text-emerald-600'
          }`}
        >
          <FiCreditCard className="w-3.5 h-3.5" /> Secure Checkout
        </button>

        {/* Booking History Dashboard Tab Link */}
        <button
          onClick={() => navigate('/dashboard')}
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all uppercase tracking-wider ${
            isActive('/dashboard')
              ? 'bg-emerald-50 text-emerald-700'
              : 'text-gray-500 hover:text-emerald-600'
          }`}
        >
          <FiBriefcase className="w-3.5 h-3.5" /> Booking History
        </button>
      </div>
    </nav>
  );
}