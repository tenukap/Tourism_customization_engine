import React, { useState } from 'react';
import {
  FiEdit2,
  FiAlertTriangle,
  FiX,
  FiCreditCard
} from 'react-icons/fi';

export default function BookingDashboard() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [dest, setDest] = useState('');
  const [guests, setGuests] = useState(3);
  const [nights, setNights] = useState(5);
  const [newPrice, setNewPrice] = useState(750);
  const [diff, setDiff] = useState(0);

  const BASE_RATE = 50;

  const [bookings, setBookings] = useState([
    {
      id: 'BK-9941',
      status: 'Confirmed',
      destination: 'Customized Sri Lanka Tour Pack...',
      guests: 3,
      nights: 5,
      paidAmount: 750,
      price: 750
    }
  ]);

  const handleEditInit = (b) => {
    setSelectedId(b.id);
    setDest(b.destination);
    setGuests(b.guests || 3);
    setNights(b.nights || 5);
    setNewPrice(b.price);
    setErrorMsg('');
    setIsEditOpen(true);
  };

  const handleValueChange = (g, n) => {
    setGuests(g);
    setNights(n);
    const cost = g * n * BASE_RATE;
    setNewPrice(cost);

    if (cost < 750) {
      setErrorMsg(
        "Can't process with the edit request " +
        "since the total amount is insufficent"
      );
    } else {
      setErrorMsg('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPrice < 750) return;

    if (newPrice > 750) {
      setDiff(newPrice - 750);
      setIsEditOpen(false);
      setIsPayOpen(true);
    } else {
      commitUpdate(750);
    }
  };

  const commitUpdate = (finalCost) => {
    setBookings(
      bookings.map((b) =>
        b.id === selectedId
          ? {
              ...b,
              destination: dest,
              guests,
              nights,
              paidAmount: finalCost,
              price: finalCost,
            }
          : b
      )
    );
    setIsEditOpen(false);
    setIsPayOpen(false);
  };

  return (
    <div
      style={{
        padding: '40px 24px',
        backgroundColor: '#fafafa',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Title Container */}
      <div
        style={{
          maxWidth: '650px',
          margin: '0 auto 32px auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: '900',
            color: '#111827',
            letterSpacing: '-0.025em',
            margin: '0 0 8px 0',
          }}
        >
          Your Travel Dashboard
        </h2>
        <p style={{ fontSize: '15px', color: '#6b7280', margin: 0 }}>
          Review trip statuses or modify configuration metrics.
        </p>
      </div>

      {/* Main Grid View */}
      <div
        style={{
          maxWidth: '650px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {bookings.map((b) => (
          <div
            key={b.id}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              padding: '24px',
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    backgroundColor: '#fff7ed',
                    color: '#ea580c',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                  }}
                >
                  {b.id}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    backgroundColor: '#ffedd5',
                    color: '#c2410c',
                    fontWeight: 'bold',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                  }}
                >
                  {b.status}
                </span>
              </div>
              <h4
                style={{
                  margin: '0 0 6px 0',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1f2937',
                }}
              >
                {b.destination}
              </h4>
              <p style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>
                {b.guests} Guests ({b.nights} Nights) • Paid Tier:{' '}
                <span style={{ color: '#ea580c', fontWeight: 'bold' }}>
                  ${b.price}
                </span>
              </p>
            </div>
            <button
              onClick={() => handleEditInit(b)}
              style={{
                padding: '12px',
                border: 'none',
                background: '#fff7ed',
                borderRadius: '12px',
                cursor: 'pointer',
                color: '#ea580c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiEdit2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* ✏️ EDIT MODAL COMPONENT */}
      {isEditOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 100,
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '28px',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '400px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <button
              onClick={() => setIsEditOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
              }}
            >
              <FiX size={20} />
            </button>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '900',
                color: '#111827',
                margin: '0 0 20px 0',
                textTransform: 'uppercase',
              }}
            >
              Modify Parameters
            </h3>

            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  Destination
                </label>
                <input
                  type="text"
                  required
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  style={{
                    width: '93%',
                    padding: '12px',
                    fontSize: '14px',
                    borderRadius: '10px',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#f9fafb',
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  Guests Count
                </label>
                <select
                  value={guests}
                  onChange={(e) =>
                    handleValueChange(Number(e.target.value), nights)
                  }
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '14px',
                    borderRadius: '10px',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#f9fafb',
                    fontWeight: '600',
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} Guest{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  Nights Duration
                </label>
                <select
                  value={nights}
                  onChange={(e) =>
                    handleValueChange(guests, Number(e.target.value))
                  }
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '14px',
                    borderRadius: '10px',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#f9fafb',
                    fontWeight: '600',
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} Night{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  backgroundColor: '#fff7ed',
                  border: '1px solid #ffedd5',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#c2410c',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Calculated Total:</span>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: '900',
                    color: '#ea580c',
              }}
                >
                  ${newPrice}
                </span>
              </div>

              {errorMsg && (
                <div
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fee2e2',
                    padding: '12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#dc2626',
                    fontWeight: '600',
                    display: 'flex',
                    gap: '8px',
                    lineHeight: '1.4',
                  }}
                >
                  <FiAlertTriangle
                    size={18}
                    style={{ flexShrink: 0, marginTop: '1px' }}
                  />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginTop: '8px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  style={{
                    padding: '12px',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#4b5563',
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!!errorMsg}
                  style={{
                    padding: '12px',
                    fontSize: '13px',
                    fontWeight: '700',
                    backgroundColor: errorMsg ? '#e5e7eb' : '#ea580c',
                    color: errorMsg ? '#9ca3af' : '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: errorMsg ? 'not-allowed' : 'pointer',
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 💳 RE-CHARGE DELTA BALANCE POPUP */}
      {isPayOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 100,
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '28px',
              borderRadius: '28px',
              width: '100%',
              maxWidth: '380px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                color: '#ea580c',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <FiCreditCard size={32} />
            </div>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '900',
                color: '#111827',
                margin: '0 0 4px 0',
              }}
            >
              Extra Payment Required
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: '#6b7280',
                margin: '0 0 20px 0',
              }}
            >
              Please authorize the outstanding delta charge due below.
            </p>

            <div
              style={{
                margin: '0 auto 20px auto',
                backgroundColor: '#0f172a',
                padding: '20px',
                borderRadius: '16px',
                color: '#fff',
                textAlign: 'left',
                fontFamily: 'monospace',
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  color: '#fb923c',
                  fontWeight: 'bold',
                }}
              >
                SECURE GATEWAY
              </span>
              <p style={{ fontSize: '18px', margin: '14px 0' }}>
                •••• •••• •••• 5545
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <div>
                  <span style={{ fontSize: '9px', color: '#94a3b8' }}>
                    DELTA DUE
                  </span>
                  <br />
                  <b style={{ fontSize: '22px', color: '#fb923c' }}>
                    ${diff}
                  </b>
                </div>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  VISA
                </span>
              </div>
            </div>

            <button
              onClick={() => commitUpdate(newPrice)}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#ea580c',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Pay Extra ${diff} & Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}