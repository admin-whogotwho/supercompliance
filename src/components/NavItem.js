import React from 'react';
    import { Link } from 'react-router-dom'; // <--- IMPORTANT: Import Link from react-router-dom

    // NavItem component: Renders a navigation link.
    // It now takes a 'to' prop for the route path (for React Router)
    // and 'active' for styling.
    const NavItem = ({ icon, children, to, active }) => { // Changed 'onClick' to 'to'
      // Base classes for the link
      const baseClasses = `flex items-center text-left px-3 py-2 rounded-lg transition-all`;
      // Classes for active state (white background, blue text, subtle shadow)
      const activeClasses = `bg-white text-blue-800 shadow-md`; // Added shadow for more visual pop
      // Classes for inactive state and hover
      const inactiveClasses = `text-white hover:bg-blue-700`; // Changed text to white for header, hover blue-700

      return (
        <li>
          <Link
            to={to} // <--- Use 'to' prop for the navigation path
            className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
          >
            <span className="mr-2 text-xl">{icon}</span> {/* Icon */}
            {children} {/* Text content like "Insights" */}
          </Link>
        </li>
      );
    };

    export default NavItem; // <--- Export the component