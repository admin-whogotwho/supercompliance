import React from 'react';

const TabButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-grow py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-4 focus:outline-none ${
      active
        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5'
        : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
    }`}
  >
    {children}
  </button>
);

export default TabButton;