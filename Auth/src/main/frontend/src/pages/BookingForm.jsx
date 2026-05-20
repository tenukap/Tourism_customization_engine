import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8081/api/bookings";

export default function BookingForm({ navigate }) {
  const [form, setForm] = useState({
    packageId: 1,
    travelDate: "",
    groupSize: 1,
    pricePerPerson: 150,
  });
  const [loading, setLoading] = useState(false);

  const totalPrice = form.groupSize * form.pricePerPerson;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.travelDate) return alert("Please select a travel date!");
    setLoading(true);
    try {
      const res = await axios.post(API, {
        packageId: Number(form.packageId),
        travelDate: form.travelDate,
        groupSize: Number(form.groupSize),
        totalPrice: totalPrice,
      });
      navigate("payment", { ...res.data, totalPrice });
    } catch (err) {
      alert("Booking failed. Make sure the backend is running!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const packages = [
    { id: 1, name: "Sigiriya Explorer", price: 120 },
    { id: 2, name: "Ella Mountain Retreat", price: 95 },
    { id: 3, name: "Mirissa Beach Escape", price: 110 },
    { id: 4, name: "Kandy Cultural Tour", price: 85 },
  ];

  return (
    <div className="page-container">
      <div className="page-card">
        <div className="page-header">
          <h2>Create a Booking</h2>
          <p>Fill in your trip details below</p>
        </div>

        <div className="form-group">
          <label>Select Package</label>
          <select name="packageId" value={form.packageId} onChange={(e) => {
            const pkg = packages.find(p => p.id === Number(e.target.value));
            setForm({ ...form, packageId: e.target.value, pricePerPerson: pkg?.price || 150 });
          }}>
            {packages.map(p => (
              <option key={p.id} value={p.id}>{p.name} — ${p.price}/person</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Travel Date</label>
          <input
            type="date"
            name="travelDate"
            value={form.travelDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="form-group">
          <label>Group Size</label>
          <input
            type="number"
            name="groupSize"
            min={1}
            max={20}
            value={form.groupSize}
            onChange={handleChange}
          />
        </div>

        <div className="price-display">
          <p>Total Price</p>
          <h3>${totalPrice}</h3>
        </div>

        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating Booking..." : "Proceed to Payment →"}
        </button>
      </div>
    </div>
  );
}
