import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Ensure FiLoader is included inside your top react-icons import block!
import { FiLock, FiCheckCircle, FiLoader, FiCreditCard, FiShield } from 'react-icons/fi';

export default function PaymentPage() {
  const navigate = useNavigate();

  const bookingData = {
    packageName: "Customized Sri Lanka Tour Package",
    totalAmount: 750,
    guests: 3,
    date: "2026-06-20",
    nights: 5
  };

  const [cardHolder, setCardHolder] = useState('CHATHURA SANJAYA');
  const [cardNumber, setCardNumber] = useState('4486 4658 6549 5545');
  const [expiry, setExpiry] = useState('08/29');
  const [cvv, setCvv] = useState('•••');

  // State control triggers for processing loops and custom modal view
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate standard card processing cycle duration
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccessModalOpen(true); // 🔥 TRIPPED INITIAL MODAL POPUP! No more alert() windows.
    }, 1200);
  };

  const handleModalCloseAndRedirect = () => {
    setIsSuccessModalOpen(false);
    navigate('/dashboard'); // Route directly to dashboard view upon acknowledgment
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 font-sans relative select-none">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-[32px] p-6 shadow-xl shadow-orange-950/5 relative">

        {/* 🟠 Orange Header Styling Accents */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider mb-2">
            <FiLock className="w-3 h-3" /> Secure Gateway
          </div>
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
            Checkout Order
          </h2>
        </div>

        {/* 💳 Vibrant Premium Orange & Gold Accent Card Visual Layout */}
        <div className="w-full bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 rounded-2xl p-5 text-white shadow-lg shadow-orange-600/20 relative mb-6 flex flex-col justify-between aspect-[1.6/1]">
          <div className="flex justify-between items-start">
            <div className="text-lg font-mono tracking-widest text-orange-50 font-bold">
              {cardNumber || '•••• •••• •••• ••••'}
            </div>
            <span className="text-xs font-black tracking-widest text-orange-100 bg-white/10 px-2.5 py-0.5 rounded border border-white/10">
              VISA
            </span>
          </div>

          <div className="mt-4">
            <p className="text-[8px] uppercase tracking-widest text-orange-200 font-bold">Card Holder</p>
            <p className="text-sm font-mono truncate text-white uppercase font-semibold mt-0.5">{cardHolder}</p>
          </div>

          <div className="border-t border-white/10 pt-2.5 mt-2 flex items-center justify-between">
            <div>
              <p className="text-[8px] uppercase text-orange-200">Selected Trip</p>
              <p className="text-xs text-white font-medium truncate max-w-[185px]">{bookingData.packageName}</p>
            </div>
            <div className="text-right">
              <span className="text-[9px] uppercase font-bold text-orange-200 block leading-none">Total</span>
              <span className="text-xl font-black text-white tracking-tight mt-0.5 block">${bookingData.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Interactive Orange Form Sheet */}
        <form onSubmit={handleSubmitPayment} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Cardholder Name</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              required
              className="w-full bg-gray-50/70 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-medium text-gray-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="w-full bg-gray-50/70 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-mono text-gray-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Expiry Date</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
                className="w-full bg-gray-50/70 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-mono text-gray-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                className="w-full bg-gray-50/70 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-mono text-gray-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="bg-orange-50/40 border border-orange-100 rounded-xl p-3 flex justify-between items-center text-[11px] text-orange-800 font-semibold">
            <span>Date: <b className="text-gray-800">{bookingData.date}</b></span>
            <span>Guests: <b className="text-gray-800">{bookingData.guests}</b> ({bookingData.nights} Nights)</span>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full mt-2 text-white font-bold py-3.5 text-xs rounded-xl shadow-lg uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              isProcessing
                ? 'bg-orange-400 cursor-wait'
                : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/10'
            }`}
          >
            {isProcessing ? (
              <span>Verifying Assets...</span>
            ) : (
              <>
                <FiShield className="w-3.5 h-3.5" />
                <span>Pay ${bookingData.totalAmount}</span>
              </>
            )}
          </button>
        </form>

      </div>

      {/* ========================================================================= */}
      {/* 🟠 HIGH-END CUSTOM SUCCESS OVERLAY MODAL (REPLACES BROWSER ALERT)         */}
      {/* ========================================================================= */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-gray-900/30 animate-fade-in">
          <div className="w-full max-w-sm bg-white border border-gray-100 rounded-[32px] p-6 shadow-2xl text-center transform scale-100 transition-all">

            {/* Pulsing Orange Check Icon */}
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <FiCheckCircle className="w-7 h-7" />
            </div>

            {/* Modal Heading and Messages */}
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">
              Payment Successful!
            </h3>
            <p className="text-xs text-gray-400 mt-1.5 px-2 leading-relaxed">
              Your payment has been successfully processed. Your customized package details have been mapped into your active timeline data profile.
            </p>

            {/* Orange Themed Redirect Control Button */}
            <button
              type="button"
              onClick={handleModalCloseAndRedirect}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20"
            >
              Go to Travel Dashboard
            </button>

          </div>
        </div>
      )}

    </div>
  );
}