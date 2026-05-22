import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ActivitySelector from "./ActivitySelector";
import PriceDisplay from "./PriceDisplay";
import { Sun, Moon, Download, Share2 } from "react-feather";

export default function CustomizationWizard() {
  const [step, setStep] = useState(1);
  const [groupSize, setGroupSize] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activityOrder, setActivityOrder] = useState([]);

  const selectedIds = selectedActivities.map(a => a.id);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleToggle = (activity) => {
    setSelectedActivities(prev =>
      prev.find(a => a.id === activity.id)
        ? prev.filter(a => a.id !== activity.id)
        : [...prev, activity]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post("http://localhost:8080/api/customization/draft", {
        userId: 1,
        packageId: 1,
        selectedActivityIds: selectedIds,
        groupSize,
        totalPrice: selectedActivities.reduce((sum, a) => sum + a.pricePerPerson * groupSize, 0)
      });
      setSaved(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#f97316', '#fb923c'] });
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Customization Draft", 20, 20);
    doc.text(`Group Size: ${groupSize}`, 20, 40);
    doc.text(`Total Price: $${selectedActivities.reduce((sum, a) => sum + a.pricePerPerson * groupSize, 0).toFixed(2)}`, 20, 50);
    const tableData = selectedActivities.map(a => [a.name, `$${a.pricePerPerson}`, `${a.pricePerPerson * groupSize}`]);
    autoTable(doc, {
      startY: 60,
      head: [["Activity", "Price/Person", "Total"]],
      body: tableData,
    });
    doc.save("travel-draft.pdf");
  };

  const copyShareLink = () => {
    const link = `${window.location.origin}/share?activities=${selectedIds.join(',')}&size=${groupSize}`;
    navigator.clipboard.writeText(link);
    alert("Share link copied to clipboard!");
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="flex justify-end gap-2 mb-4">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {selectedActivities.length > 0 && (
          <>
            <button onClick={exportPDF} className="p-2 rounded-full bg-orange-100 text-orange-600"><Download size={18} /></button>
            <button onClick={copyShareLink} className="p-2 rounded-full bg-orange-100 text-orange-600"><Share2 size={18} /></button>
          </>
        )}
      </div>

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Customize Your Trip</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Select group size and activities</p>

      <div className="flex gap-2 mb-6">
        {[1, 2].map(s => (
          <div key={s} className={`h-2 flex-1 rounded-full transition-all ${step >= s ? "bg-orange-500" : "bg-gray-200 dark:bg-gray-700"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Step 1: Group Size</h2>
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setGroupSize(g => Math.max(1, g-1))} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-xl font-bold">−</button>
              <span className="text-2xl font-bold w-12 text-center dark:text-white">{groupSize}</span>
              <button onClick={() => setGroupSize(g => g+1)} className="w-10 h-10 rounded-full bg-orange-500 text-white text-xl font-bold">+</button>
            </div>
            {groupSize >= 4 && <p className="text-green-600 text-sm mb-4">✨ 10% group discount applied!</p>}
            <button onClick={() => setStep(2)} className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition">Next →</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Step 2: Select & Reorder Activities</h2>
            <ActivitySelector
              selectedIds={selectedIds}
              onToggle={handleToggle}
              onReorder={setActivityOrder}
            />
            <div className="mt-6">
              <PriceDisplay selectedActivities={selectedActivities} groupSize={groupSize} />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 dark:border-gray-600 dark:text-white">← Back</button>
              <button onClick={handleSave} disabled={selectedActivities.length === 0 || saving} className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-50">
                {saving ? "Saving..." : "Save Draft"}
              </button>
            </div>
            {saved && <p className="text-green-600 text-center mt-3 font-semibold animate-pulse">✓ Draft saved! 🎉</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}