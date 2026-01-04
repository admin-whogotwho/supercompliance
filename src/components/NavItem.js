import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ icon, children, to, active }) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
          active 
            ? 'bg-white text-indigo-700 shadow-lg scale-105' 
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
      >
        <span className="text-xl">{icon}</span>
        {/* 'hidden lg:block' keeps the text visible on large screens but hides it on small mobile screens to prevent overlap */}
        <span className="hidden lg:block text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
          {children}
        </span>
      </Link>
    </li>
  );
};

export default NavItem;