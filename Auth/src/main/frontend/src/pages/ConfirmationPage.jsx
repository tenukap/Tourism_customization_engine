import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiCalendar, FiUsers, FiMapPin, FiHome } from 'react-icons/fi';

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Grab the data forwarded from the payment page
  const tripData = location.state || {
    packageName: "Ella Highlands Adventure",
    totalAmount: 150,
    guests: 1,
    date: "2026-05-23"
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center p-4 font-sans selection:bg-orange-500/20">
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-[32px] p-8 shadow-xl text-center relative overflow-hidden">

        {/* Animated Big Success Badge */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <FiCheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl -z-10" />
          </div>
        </div>

        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Booking Confirmed!</h1>
        <p className="text-xs text-gray-500 mt-1">Your payment was processed successfully. Pack your bags!</p>

        <div className="border-b border-gray-100 my-5" />

        {/* Trip Receipt Details Card */}
        <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-5 text-left space-y-4 shadow-inner">
          <div className="flex items-start gap-2.5">
            <FiMapPin className="text-orange-500 w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Destination</span>
              <span className="text-sm font-bold text-gray-800">{tripData.packageName}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2.5">
              <FiCalendar className="text-orange-500 w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Date</span>
                <span className="text-xs font-semibold text-gray-700">{tripData.date}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <FiUsers className="text-orange-500 w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Group Size</span>
                <span className="text-xs font-semibold text-gray-700">{tripData.guests} Guest(s)</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200/60 pt-3 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500">Amount Paid:</span>
            <span className="text-lg font-black text-emerald-600">${tripData.totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Home Action button */}
        <button
          onClick={() => navigate('/dashboard')} // 🔥 Instantly switches to the historical layout state!
          className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-lg"
        >
          View in Booking History
        </button>
      </div>
    </div>
  );
}