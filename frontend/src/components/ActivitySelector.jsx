import { useEffect, useState } from "react";
import axios from "axios";

export default function ActivitySelector({ selectedIds, onToggle }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/customization/activities")
      .then(res => setActivities(res.data))
      .catch(err => console.error("Failed to load activities", err))
      .finally(() => setLoading(false));
  }, []);

  // Skeleton Loader for premium feel during API fetch
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(n => (
          <div key={n} className="h-24 bg-gray-100/80 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  // Beautiful empty state
  if (activities.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
        <span className="text-4xl block mb-3">🏝️</span>
        <h3 className="text-lg font-bold text-gray-900 mb-1">No activities found</h3>
        <p className="text-gray-500 text-sm">Please add some activities to your database.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {activities.map(activity => {
        const isSelected = selectedIds.includes(activity.id);

        return (
          <div
            key={activity.id}
            onClick={() => onToggle(activity)}
            className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 group
              ${isSelected
                ? "bg-blue-50 border-2 border-blue-500 shadow-md ring-4 ring-blue-500/10"
                : "bg-white/80 border-2 border-gray-100 hover:border-blue-300 hover:shadow-md hover:-translate-y-1 backdrop-blur-sm"
              }`}
          >
            <div className="flex items-center gap-5">

              {/* Selection Checkmark Indicator */}
              <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300
                ${isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300 group-hover:border-blue-400"}`}>
                {isSelected && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* Activity Details */}
              <div className="flex-1">
                <h3 className={`font-bold text-lg mb-1 transition-colors ${isSelected ? "text-blue-900" : "text-gray-900"}`}>
                  {activity.name}
                </h3>
                <p className={`text-sm ${isSelected ? "text-blue-700/80" : "text-gray-500"}`}>
                  {activity.description}
                </p>
              </div>

              {/* Price Badge */}
              <div className="flex-shrink-0 text-right">
                <span className={`block font-extrabold text-xl ${isSelected ? "text-blue-600" : "text-gray-900"}`}>
                  ${activity.pricePerPerson}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-blue-500" : "text-gray-400"}`}>
                  Per Person
                </span>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}