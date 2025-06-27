import React from 'react'; // <--- IMPORTANT: Import React

// TabButton component: Used for tabbed navigation within sections.
const TabButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 flex-grow px-4 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none ${active
      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:text-gray-400'}`}
  >
    {children}
  </button>
);

export default TabButton; // <--- Export the component
