import { useState } from "react";
import axios from "axios";
import ActivitySelector from "./ActivitySelector";

const ACCOMMODATION_OPTIONS = [
  { id: "hotel", label: "Hotel", icon: "🏨" },
  { id: "hostel", label: "Hostel", icon: "🛏️" },
  { id: "resort", label: "Resort", icon: "🌴" },
  { id: "camping", label: "Camping", icon: "⛺" },
];

const TRANSPORT_OPTIONS = [
  { id: "bus", label: "Bus", icon: "🚌" },
  { id: "car", label: "Private Car", icon: "🚗" },
  { id: "van", label: "Van", icon: "🚐" },
];

const MEAL_OPTIONS = [
  { id: "breakfast", label: "Breakfast", icon: "🍳" },
  { id: "lunch", label: "Lunch", icon: "🥗" },
  { id: "dinner", label: "Dinner", icon: "🍽️" },
];

export default function CustomizationWizard() {
  const [step, setStep] = useState(1);
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [accommodation, setAccommodation] = useState("");
  const [transport, setTransport] = useState("");
  const [meals, setMeals] = useState([]);
  const [saved, setSaved] = useState(false);

  const selectedIds = selectedActivities.map(a => a.id);

  const handleToggleActivity = (activity) => {
    setSelectedActivities(prev =>
      prev.find(a => a.id === activity.id)
        ? prev.filter(a => a.id !== activity.id)
        : [...prev, activity]
    );
  };

  const handleToggleMeal = (mealId) => {
    setMeals(prev =>
      prev.includes(mealId) ? prev.filter(m => m !== mealId) : [...prev, mealId]
    );
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8080/api/customization/draft", {
        userId: 1, packageId: 1,
        selectedActivityIds: selectedIds,
        groupSize, totalPrice: 0,
      });
      setSaved(true);
      setStep(5);
    } catch (err) {
      console.error("Failed to save draft", err);
    }
  };

  const steps = ["Trip Info", "Activities", "Preferences", "Review"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="max-w-2xl mx-auto p-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
            ✈️ Trip Customizer
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Customize Your Trip</h1>
          <p className="text-gray-500">Tell us how you'd like your trip — we'll handle the rest</p>
        </div>

        {/* Step Indicator */}
        {step <= 4 && (
          <div className="flex items-center mb-10">
            {steps.map((label, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm
                    ${step > i + 1 ? "bg-green-500 text-white" :
                      step === i + 1 ? "bg-orange-500 text-white shadow-orange-200 shadow-md" :
                      "bg-gray-100 text-gray-400"}`}>
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs mt-1 font-medium whitespace-nowrap
                    ${step === i + 1 ? "text-orange-500" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full transition-all
                    ${step > i + 1 ? "bg-green-400" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Card Wrapper */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-6">

          {/* Step 1: Trip Info */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Trip Info</h2>
                <p className="text-sm text-gray-400">Let's start with the basics</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Trip Name</label>
                <input type="text" placeholder="e.g. Bali Summer Getaway"
                  value={tripName} onChange={e => setTripName(e.target.value)}
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 transition-colors bg-gray-50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 transition-colors bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
                  <input type="date" value={endDate} min={startDate} onChange={e => setEndDate(e.target.value)}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 transition-colors bg-gray-50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Group Size — <span className="text-orange-500">{groupSize} {groupSize === 1 ? "person" : "people"}</span>
                </label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setGroupSize(g => Math.max(1, g - 1))}
                    className="w-11 h-11 rounded-full bg-gray-100 text-xl font-bold hover:bg-gray-200 transition-colors">−</button>
                  <span className="text-3xl font-extrabold text-gray-800 w-8 text-center">{groupSize}</span>
                  <button onClick={() => setGroupSize(g => g + 1)}
                    className="w-11 h-11 rounded-full bg-orange-500 text-white text-xl font-bold hover:bg-orange-600 transition-colors shadow-md">+</button>
                </div>
              </div>

              <button onClick={() => setStep(2)} disabled={!tripName || !startDate || !endDate}
                className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md shadow-orange-200">
                Next: Choose Activities →
              </button>
            </div>
          )}

          {/* Step 2: Activities */}
          {step === 2 && (
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">Select Activities</h2>
                <p className="text-sm text-gray-400">Pick what you'd like to do on your trip</p>
              </div>
              <ActivitySelector selectedIds={selectedIds} onToggle={handleToggleActivity} />
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-100 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">← Back</button>
                <button onClick={() => setStep(3)} disabled={selectedActivities.length === 0}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md shadow-orange-200">
                  Next: Preferences →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Trip Preferences</h2>
                <p className="text-sm text-gray-400">Customize your experience further</p>
              </div>

              {/* Accommodation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">🏠 Accommodation</label>
                <div className="grid grid-cols-2 gap-3">
                  {ACCOMMODATION_OPTIONS.map(opt => (
                    <div key={opt.id} onClick={() => setAccommodation(opt.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer flex items-center gap-3 transition-all
                        ${accommodation === opt.id
                          ? "border-orange-500 bg-orange-50 shadow-sm"
                          : "border-gray-100 hover:border-orange-300 bg-gray-50"}`}>
                      <span className="text-2xl">{opt.icon}</span>
                      <span className={`font-semibold ${accommodation === opt.id ? "text-orange-700" : "text-gray-700"}`}>
                        {opt.label}
                      </span>
                      {accommodation === opt.id && <span className="ml-auto text-orange-500 text-sm">✓</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Transport */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">🚗 Transportation</label>
                <div className="grid grid-cols-3 gap-3">
                  {TRANSPORT_OPTIONS.map(opt => (
                    <div key={opt.id} onClick={() => setTransport(opt.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer flex flex-col items-center gap-2 transition-all
                        ${transport === opt.id
                          ? "border-orange-500 bg-orange-50 shadow-sm"
                          : "border-gray-100 hover:border-orange-300 bg-gray-50"}`}>
                      <span className="text-2xl">{opt.icon}</span>
                      <span className={`text-xs font-semibold text-center ${transport === opt.id ? "text-orange-700" : "text-gray-600"}`}>
                        {opt.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">🍽️ Meals Included</label>
                <div className="grid grid-cols-3 gap-3">
                  {MEAL_OPTIONS.map(opt => (
                    <div key={opt.id} onClick={() => handleToggleMeal(opt.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer flex flex-col items-center gap-2 transition-all
                        ${meals.includes(opt.id)
                          ? "border-green-500 bg-green-50 shadow-sm"
                          : "border-gray-100 hover:border-green-300 bg-gray-50"}`}>
                      <span className="text-2xl">{opt.icon}</span>
                      <span className={`text-xs font-semibold ${meals.includes(opt.id) ? "text-green-700" : "text-gray-600"}`}>
                        {opt.label}
                      </span>
                      {meals.includes(opt.id) && <span className="text-xs text-green-600 font-bold">✓</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)}
                  className="flex-1 border-2 border-gray-100 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">← Back</button>
                <button onClick={() => setStep(4)} disabled={!accommodation || !transport}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 disabled:opacity-40 transition-colors shadow-md shadow-orange-200">
                  Review Trip →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Review Your Customization</h2>
                <p className="text-sm text-gray-400">Everything look good? Save your preferences.</p>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4">
                {[
                  { label: "Trip Name", value: tripName },
                  { label: "Dates", value: `${startDate} → ${endDate}` },
                  { label: "Group Size", value: `${groupSize} ${groupSize === 1 ? "person" : "people"}` },
                  { label: "Accommodation", value: `${ACCOMMODATION_OPTIONS.find(o => o.id === accommodation)?.icon} ${accommodation}` },
                  { label: "Transport", value: `${TRANSPORT_OPTIONS.find(o => o.id === transport)?.icon} ${transport}` },
                  { label: "Meals", value: meals.length === 0 ? "None" : meals.map(m => MEAL_OPTIONS.find(o => o.id === m)?.label).join(", ") },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-500 text-sm">{label}</span>
                    <span className="font-semibold text-gray-800 capitalize">{value}</span>
                  </div>
                ))}

                <div className="pt-2">
                  <span className="text-gray-500 text-sm block mb-2">Activities</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedActivities.map(a => (
                      <span key={a.id} className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {a.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700 flex items-center gap-2">
                <span>ℹ️</span>
                <span>Pricing and booking will be handled separately by the booking system.</span>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(3)}
                  className="flex-1 border-2 border-gray-100 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">← Back</button>
                <button onClick={handleSave}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors shadow-md shadow-green-200">
                  Proceed to Payment ✓
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Customization Saved!</h2>
              <p className="text-gray-500 mb-1">Your trip <strong className="text-orange-500">{tripName}</strong> has been saved.</p>
              <p className="text-gray-500 mb-1">{startDate} → {endDate} · {groupSize} {groupSize === 1 ? "person" : "people"}</p>
              <p className="text-gray-400 text-sm mb-8">The booking team will take it from here!</p>
              <button onClick={() => {
                setStep(1); setTripName(""); setStartDate(""); setEndDate("");
                setGroupSize(1); setSelectedActivities([]); setAccommodation("");
                setTransport(""); setMeals([]); setSaved(false);
              }}
                className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-md shadow-orange-200">
                Plan Another Trip ✈️
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}