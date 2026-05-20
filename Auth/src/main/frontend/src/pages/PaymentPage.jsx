import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8081/api/bookings";

export default function PaymentPage({ booking, navigate }) {
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setCard({ ...card, [e.target.name]: e.target.value });

  const formatCardNumber = (val) =>
    val.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);

  const handlePay = async () => {
    if (!card.name || !card.number || !card.expiry || !card.cvv) {
      return alert("Please fill in all card details.");
    }
    setLoading(true);
    try {
      await axios.put(`${API}/${booking?.id}/pay`);
      setSuccess(true);
    } catch (err) {
      alert("Payment failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="page-container">
        <div className="page-card">
          <div className="success-screen">
            <div className="success-icon">✅</div>
            <h2>Payment Successful!</h2>
            <p>Your booking has been confirmed. Have an amazing trip!</p>
            <button className="submit-btn" onClick={() => navigate("history")}>
              View My Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayNumber = card.number
    ? formatCardNumber(card.number)
    : "•••• •••• •••• ••••";

  return (
    <div className="page-container">
      <div className="page-card">
        <div className="page-header">
          <h2>Payment</h2>
          <p>Enter your card details to complete booking</p>
        </div>

        {/* Card Preview */}
        <div className="card-preview">
          <div className="card-chip">💳</div>
          <div className="card-number">{displayNumber}</div>
          <div className="card-bottom">
            <div>
              <p>Card Holder</p>
              <h4>{card.name || "YOUR NAME"}</h4>
            </div>
            <div>
              <p>Expires</p>
              <h4>{card.expiry || "MM/YY"}</h4>
            </div>
            <div>
              <p>Amount</p>
              <h4>${booking?.totalPrice || 0}</h4>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Cardholder Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={card.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="number"
            placeholder="1234 5678 9012 3456"
            value={formatCardNumber(card.number)}
            onChange={(e) => setCard({ ...card, number: e.target.value.replace(/\s/g, "") })}
            maxLength={19}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={card.expiry}
              onChange={handleChange}
              maxLength={5}
            />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input
              type="password"
              name="cvv"
              placeholder="•••"
              value={card.cvv}
              onChange={handleChange}
              maxLength={3}
            />
          </div>
        </div>

        <div className="price-display" style={{ margin: "20px 0" }}>
          <p>Total to Pay</p>
          <h3>${booking?.totalPrice || 0}</h3>
        </div>

        <button className="submit-btn" onClick={handlePay} disabled={loading}>
          {loading ? "Processing Payment..." : `Pay $${booking?.totalPrice || 0} Now 🔒`}
        </button>
      </div>
    </div>
  );
}
