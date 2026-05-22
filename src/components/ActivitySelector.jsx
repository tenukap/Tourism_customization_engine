// src/components/Customization/ActivitySelector.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { GripVertical } from "react-feather";

// Helper to guess category from activity name
const guessCategory = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes("surf") || lower.includes("safari") || lower.includes("hike") || lower.includes("raft")) return "Adventure";
  if (lower.includes("museum") || lower.includes("temple") || lower.includes("heritage")) return "Culture";
  if (lower.includes("beach") || lower.includes("forest") || lower.includes("park")) return "Nature";
  return "Relaxation";
};

const SortableActivity = ({ activity, isSelected, onToggle }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: activity.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={(e) => {
        // Prevent toggling when dragging (click on drag handle)
        if (e.target.closest('.drag-handle')) return;
        onToggle(activity);
      }}
      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
        isSelected ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"
      } ${isDragging ? "shadow-lg" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div {...listeners} {...attributes} className="drag-handle cursor-grab text-gray-400 hover:text-gray-600">
          <GripVertical size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{activity.name}</h3>
          <p className="text-sm text-gray-500">{activity.description}</p>
        </div>
        <span className="text-orange-600 font-bold">${activity.pricePerPerson}/person</span>
      </div>
    </motion.div>
  );
};

export default function ActivitySelector({ selectedIds, onToggle, onReorder }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const [orderedIds, setOrderedIds] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    axios.get("http://localhost:8080/api/customization/activities")
      .then(res => {
        setActivities(res.data);
        const ids = res.data.map(a => a.id);
        setOrderedIds(ids);
        if (onReorder) onReorder(ids);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(activities.map(a => guessCategory(a.name)))];
  const filtered = filterCategory === "All" ? activities : activities.filter(a => guessCategory(a.name) === filterCategory);
  const sortedFiltered = [...filtered].sort((a,b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = orderedIds.indexOf(active.id);
      const newIndex = orderedIds.indexOf(over.id);
      const newOrder = arrayMove(orderedIds, oldIndex, newIndex);
      setOrderedIds(newOrder);
      if (onReorder) onReorder(newOrder);
    }
  };

  if (loading) return <ShimmerLoading />;
  if (activities.length === 0) return <p className="text-gray-500">No activities found.</p>;

  return (
    <div>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              filterCategory === cat
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {sortedFiltered.map(activity => (
              <SortableActivity
                key={activity.id}
                activity={activity}
                isSelected={selectedIds.includes(activity.id)}
                onToggle={onToggle}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

const ShimmerLoading = () => (
  <div className="space-y-4">
    {[1,2,3].map(i => (
      <div key={i} className="animate-pulse p-4 border rounded-xl border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-16 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);