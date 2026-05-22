import { useState } from "react";
import axios from "axios";
import ActivitySelector from "./ActivitySelector";
import PriceDisplay from "./PriceDisplay";

export default function CustomizationWizard() {
  const [step, setStep] = useState(1);
  const [tripName, setTripName] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [saved, setSaved] = useState(false);

  const selectedIds = selectedActivities.map(a => a.id);

  const handleToggle = (activity) => {
    setSelectedActivities(prev =>
      prev.find(a => a.id === activity.id)
        ? prev.filter(a => a.id !== activity.id)
        : [...prev, activity]
    );
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8080/api/customization/draft", {
        userId: 1,
        packageId: 1,
        selectedActivityIds: selectedIds,
        groupSize,
        totalPrice: selectedActivities.reduce(
          (sum, a) => sum + a.pricePerPerson * groupSize, 0
        )
      });
      setSaved(true);
      setStep(4);
    } catch (err) {
      console.error("Failed to save draft", err);
    }
  };

  const totalPrice = selectedActivities.reduce(
    (sum, a) => sum + a.pricePerPerson * groupSize, 0
  );

  const steps = ["Trip Details", "Activities", "Review"];

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-4 flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=2000')" }}
    >
      <div className="max-w-2xl w-full mx-auto p-8 bg-white/80 backdrop-blur-md border border-white/40 shadow-2xl rounded-3xl transition-all duration-500 ease-in-out">

        {/* Header */}
        <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Design Your Journey</h1>
            <p className="text-gray-600 font-medium">Build your perfect travel experience</p>
        </div>

        {/* Step indicator */}
        {step <= 3 && (
          <div className="flex items-center mb-10 px-4">
            {steps.map((label, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-colors duration-300
                    ${step > i + 1 ? "bg-blue-600 text-white" :
                      step === i + 1 ? "bg-gray-900 text-white ring-4 ring-gray-900/20" :
                      "bg-white text-gray-400 border border-gray-200"}`}>
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <span className={`absolute -bottom-6 text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${step >= i + 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded transition-colors duration-300 ${step > i + 1 ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Trip Details */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Name Your Trip</label>
              <input
                type="text"
                placeholder="e.g. Summer Escape 2026"
                value={tripName}
                onChange={e => setTripName(e.target.value)}
                className="w-full bg-white/90 border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Travel Date</label>
              <input
                type="date"
                value={travelDate}
                onChange={e => setTravelDate(e.target.value)}
                className="w-full bg-white/90 border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Group Size</label>
              <div className="flex items-center gap-6 bg-white/90 border border-gray-200 rounded-xl p-3 shadow-sm w-max">
                <button onClick={() => setGroupSize(g => Math.max(1, g - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 text-xl font-bold hover:bg-gray-200 hover:text-gray-900 transition-colors">−</button>
                <span className="text-2xl font-extrabold w-8 text-center text-gray-900">{groupSize}</span>
                <button onClick={() => setGroupSize(g => g + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-900 text-white text-xl font-bold hover:bg-black transition-colors">+</button>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!tripName || !travelDate}
              className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none">
              Choose Activities →
            </button>
          </div>
        )}

        {/* Step 2: Activities */}
        {step === 2 && (
          <div className="animate-fade-in">
            <ActivitySelector selectedIds={selectedIds} onToggle={handleToggle} />
            <div className="mt-8">
              <PriceDisplay selectedActivities={selectedActivities} groupSize={groupSize} />
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setStep(1)}
                className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={selectedActivities.length === 0}
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:hover:shadow-none">
                Review Trip →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white/90 border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Trip Name</span>
                <span className="font-bold text-gray-900 text-lg">{tripName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Travel Date</span>
                <span className="font-bold text-gray-900">{travelDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Group Size</span>
                <span className="font-bold text-gray-900">{groupSize} {groupSize === 1 ? "person" : "people"}</span>
              </div>

              <div className="border-t border-gray-200 my-4" />

              <div>
                <span className="text-gray-500 font-medium block mb-3">Selected Activities</span>
                <div className="space-y-2">
                  {selectedActivities.map(a => (
                    <div key={a.id} className="flex justify-between text-sm items-center bg-gray-50 p-2 rounded-lg">
                      <span className="font-medium text-gray-700">{a.name}</span>
                      <span className="text-gray-900 font-bold">${(a.pricePerPerson * groupSize).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 my-4" />

              <div className="flex justify-between items-center font-extrabold text-xl">
                <span className="text-gray-900">Total</span>
                <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(2)}
                className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                ← Back
              </button>
              <button onClick={handleSave}
                className="flex-[2] bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black hover:shadow-lg transition-all">
                Confirm & Save ✓
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center py-10 animate-fade-in">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">✈️</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Trip Saved!</h2>
            <p className="text-gray-600 mb-8 text-lg">Your itinerary for <strong className="text-gray-900">{tripName}</strong> is locked in.</p>

            <button
              onClick={() => { setStep(1); setTripName(""); setTravelDate(""); setGroupSize(1); setSelectedActivities([]); setSaved(false); }}
              className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all hover:-translate-y-1">
              Plan Another Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}