export default function PriceDisplay({ selectedActivities, groupSize }) {
  const total = selectedActivities.reduce(
    (sum, activity) => sum + activity.pricePerPerson * groupSize, 0
  );

  if (selectedActivities.length === 0) {
    return null; // Hide the summary completely if nothing is selected to keep the UI clean
  }

  return (
    <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-extrabold text-gray-900 text-lg mb-4 flex items-center gap-2">
        {/* Receipt Icon */}
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Price Summary
      </h3>

      <ul className="space-y-3 mb-4 animate-fade-in">
        {selectedActivities.map(a => (
          <li key={a.id} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              {a.name} <span className="text-gray-400 text-xs ml-1">x {groupSize}</span>
            </div>
            <span className="text-gray-900 font-bold">${(a.pricePerPerson * groupSize).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-dashed border-gray-300 pt-4 mt-2 flex justify-between items-end">
        <div>
          <span className="block font-bold text-gray-900 text-xl">Total</span>
          <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">Taxes included</span>
        </div>
        <span className="text-3xl font-extrabold text-blue-600">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}