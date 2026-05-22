// src/components/Customization/PriceDisplay.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function PriceDisplay({ selectedActivities, groupSize, groupDiscountThreshold = 4 }) {
  const discount = groupSize >= groupDiscountThreshold ? 0.9 : 1;
  const total = selectedActivities.reduce((sum, a) => sum + a.pricePerPerson * groupSize * discount, 0);

  const data = selectedActivities.map(a => ({
    name: a.name,
    value: a.pricePerPerson * groupSize * discount,
  }));
  const COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5'];

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
      <h3 className="font-semibold text-orange-800 mb-2">Price Summary</h3>
      {selectedActivities.length === 0 ? (
        <p className="text-gray-500 text-sm">No activities selected</p>
      ) : (
        <>
          <ul className="text-sm text-gray-700 mb-2 space-y-1">
            {selectedActivities.map(a => (
              <li key={a.id} className="flex justify-between">
                <span>{a.name} x {groupSize}</span>
                <span className="flex items-center gap-2">
                  {discount < 1 && <span className="line-through text-gray-400">${(a.pricePerPerson * groupSize).toFixed(2)}</span>}
                  <span className="font-semibold">${(a.pricePerPerson * groupSize * discount).toFixed(2)}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-orange-200 pt-2 flex justify-between font-bold text-orange-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          {/* Mini pie chart */}
          {selectedActivities.length > 0 && (
            <div className="mt-4 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={2} dataKey="value">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
}