import { useState } from "react";
import BookingForm from "./pages/BookingForm";
import BookingHistory from "./pages/BookingHistory";
import PaymentPage from "./pages/PaymentPage";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const navigate = (p, data = null) => {
    setSelectedBooking(data);
    setPage(p);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand" onClick={() => navigate("home")}>
          <span className="nav-logo">✈</span>
          <span className="nav-title">TourCraft</span>
        </div>
        <div className="nav-links">
          <button className={page === "home" ? "active" : ""} onClick={() => navigate("home")}>Home</button>
          <button className={page === "book" ? "active" : ""} onClick={() => navigate("book")}>Book Now</button>
          <button className={page === "history" ? "active" : ""} onClick={() => navigate("history")}>My Bookings</button>
        </div>
      </nav>

      <main>
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "book" && <BookingForm navigate={navigate} />}
        {page === "history" && <BookingHistory navigate={navigate} />}
        {page === "payment" && <PaymentPage booking={selectedBooking} navigate={navigate} />}
      </main>
    </div>
  );
}

function HomePage({ navigate }) {
  const destinations = [
    { name: "Sigiriya", desc: "Ancient rock fortress", emoji: "🏯", price: 120 },
    { name: "Ella", desc: "Misty mountain paradise", emoji: "⛰️", price: 95 },
    { name: "Mirissa", desc: "Tropical beach escape", emoji: "🏖️", price: 110 },
    { name: "Kandy", desc: "Cultural capital city", emoji: "🕌", price: 85 },
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">Discover Sri Lanka</p>
          <h1 className="hero-title">Your Perfect<br /><span>Journey Awaits</span></h1>
          <p className="hero-sub">Handcrafted travel experiences across the pearl of the Indian Ocean</p>
          <button className="hero-btn" onClick={() => navigate("book")}>Start Booking →</button>
        </div>
        <div className="hero-visual">
          <div className="globe">🌏</div>
          <div className="orbit orbit-1"><span>✈</span></div>
          <div className="orbit orbit-2"><span>🌴</span></div>
        </div>
      </section>

      <section className="destinations">
        <h2 className="section-title">Popular Destinations</h2>
        <div className="cards-grid">
          {destinations.map((d) => (
            <div className="dest-card" key={d.name}>
              <div className="dest-emoji">{d.emoji}</div>
              <h3>{d.name}</h3>
              <p>{d.desc}</p>
              <div className="dest-footer">
                <span className="dest-price">From ${d.price}/person</span>
                <button onClick={() => navigate("book")}>Book</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        <div className="feature"><span>🛡️</span><h4>Secure Payments</h4><p>Your transactions are always protected</p></div>
        <div className="feature"><span>🎯</span><h4>Best Prices</h4><p>Guaranteed lowest rates on all packages</p></div>
        <div className="feature"><span>📞</span><h4>24/7 Support</h4><p>We're here whenever you need us</p></div>
      </section>
    </div>
  );
}
