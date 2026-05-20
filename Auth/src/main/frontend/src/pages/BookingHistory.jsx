import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8081/api/bookings";

export default function BookingHistory({ navigate }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API}/user/1`); // hardcode userId=1 until JWT ready
      setBookings(res.data);
    } catch (err) {
      console.error("Could not load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await axios.put(`${API}/${id}/cancel`);
      fetchBookings();
    } catch (err) {
      alert("Failed to cancel.");
    }
  };

  const packageNames = {
    1: "Sigiriya Explorer",
    2: "Ella Mountain Retreat",
    3: "Mirissa Beach Escape",
    4: "Kandy Cultural Tour",
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>My Bookings</h2>
        <p>Track and manage all your travel bookings</p>
      </div>

      {loading && <p style={{ textAlign: "center", color: "#6b8078" }}>Loading your bookings...</p>}

      {!loading && bookings.length === 0 && (
        <div className="empty-state">
          <span>🧳</span>
          <h3>No bookings yet</h3>
          <p>Start planning your next adventure!</p>
        </div>
      )}

      {bookings.map((b) => (
        <div className="booking-card" key={b.id}>
          <div className="booking-info">
            <h3>{packageNames[b.packageId] || `Package #${b.packageId}`}</h3>
            <div className="booking-meta">
              <span>📅 {b.travelDate}</span>
              <span>👥 {b.groupSize} people</span>
              <span>🆔 Booking #{b.id}</span>
            </div>
          </div>

          <div className="booking-right">
            <span className={`status-badge status-${b.status}`}>{b.status}</span>
            <div className="booking-price">${b.totalPrice}</div>
            <div className="action-btns">
              {(b.status === "PENDING" || b.status === "CONFIRMED") && (
                <button className="btn-pay" onClick={() => navigate("payment", b)}>
                  Pay Now
                </button>
              )}
              {b.status !== "CANCELLED" && b.status !== "PAID" && (
                <button className="btn-cancel" onClick={() => handleCancel(b.id)}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
