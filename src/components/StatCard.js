    import React from 'react'; // <--- IMPORTANT: Import React

    // StatCard component: Displays a single statistic with a title, value, change, and icon.
    const StatCard = ({ title, value, change, icon, darkMode }) => {
      // Check if the change string starts with a '+' or if the numeric value is positive.
      // This ensures 'increase' lines are green, 'decrease' are red, and others (like 'flat') are grey.
      const isPositive = change && change.startsWith('+');
      const isNegative = change && (change.startsWith('-') || change.toLowerCase().includes('drop') || change.toLowerCase().includes('decrease'));

      const changeColorClass = isPositive
        ? 'text-green-500 dark:text-green-400'
        : isNegative
          ? 'text-red-500 dark:text-red-400'
          : 'text-gray-500 dark:text-gray-400'; // Neutral color for no significant change or "drop" without '+'

      return (
        <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} shadow-lg border ${darkMode ? 'border-gray-600' : 'border-gray-100'}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{title}</p>
              <p className="text-3xl font-extrabold mt-1">{value}</p>
            </div>
            <span className="text-4xl">{icon}</span>
          </div>
          <p className={`mt-4 text-sm font-semibold ${changeColorClass}`}>
            {change} from last quarter
          </p>
        </div>
      );
    };

    export default StatCard; // <--- Export the component
    