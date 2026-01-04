import React from 'react';

const StatCard = ({ title, value, change, icon, darkMode }) => {
  // Logic to determine color based on content
  const isPositive = change && (change.startsWith('+') || change.toLowerCase().includes('bullish'));
  const isNegative = change && (change.startsWith('-') || change.toLowerCase().includes('risk') || change.toLowerCase().includes('high'));

  const changeColorClass = isPositive
    ? 'text-emerald-500'
    : isNegative
      ? 'text-rose-500'
      : 'text-slate-400';

  return (
    <div className={`rounded-[2rem] p-8 transition-all hover:scale-[1.02] border-2 ${
      darkMode ? 'bg-slate-900 border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-100 text-slate-900 shadow-xl'
    }`}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className={`text-[10px] font-black uppercase tracking-widest opacity-50`}>{title}</p>
          <p className="text-4xl font-black italic tracking-tighter">{value}</p>
        </div>
        <span className="text-4xl grayscale opacity-50">{icon}</span>
      </div>
      {change && (
        <p className={`mt-6 text-[10px] font-black uppercase tracking-widest ${changeColorClass}`}>
          {change}
        </p>
      )}
    </div>
  );
};

export default StatCard;