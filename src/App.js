import React, { useState, useEffect } from 'react';
// Do NOT initialize Supabase client here anymore, as it's now in HomeSection.js

// Import routing components from react-router-dom
import { Routes, Route, Link, useLocation } from 'react-router-dom'; // <--- IMPORTANT: New imports

// Import your individual section components and other shared components
import NavItem from './components/NavItem';          // Corrected path
    import HomeSection from './components/HomeSection';    // Corrected path
    import MnaSection from './components/MnaSection';      // Corrected path
    import FdiOdiSection from './components/FdiOdiSection'; // Corrected path
    import SebiSection from './components/SebiSection';    // Corrected path
    import AboutSection from './components/AboutSection';  // Corrected path
    import ContactSection from './components/ContactSection';// Corrected path
    import Footer from './components/Footer';            // Corrected path
    
// Main App component: Manages routing, dark mode, and layout.
function App() {
  const [darkMode, setDarkMode] = useState(false);
  // useLocation hook to get the current URL path for active navigation styling
  const location = useLocation(); // <--- NEW: Use useLocation for active styling

  // Effect to load dark mode preference from local storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Effect to apply/remove 'dark' class to the HTML document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Store the preference
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} font-sans antialiased`}>
      <header className={`bg-blue-800 text-white p-4 shadow-lg sticky top-0 z-10`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo/Site Title: Links to the home page */}
          <Link to="/" className="text-2xl font-bold">WhoGotWho.com</Link> {/* <--- IMPORTANT: Using Link for logo */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                {/* NavItem components now use 'to' prop for React Router Link */}
                <NavItem icon={<span>🏠</span>} to="/" active={location.pathname === '/'}>
                  Insights
                </NavItem>
                <NavItem icon={<span>💼</span>} to="/mna" active={location.pathname === '/mna'}>
                  M&A
                </NavItem>
                <NavItem icon={<span>🧮</span>} to="/fdi-odi" active={location.pathname === '/fdi-odi'}>
                  FDI & ODI
                </NavItem>
                <NavItem icon={<span>⚖️</span>} to="/sebi" active={location.pathname === '/sebi'}>
                  SEBI
                </NavItem>
                <NavItem icon={<span>ℹ️</span>} to="/about" active={location.pathname === '/about'}>
                  About
                </NavItem>
                <NavItem icon={<span>📧</span>} to="/contact" active={location.pathname === '/contact'}>
                  Contact
                </NavItem>
              </ul>
            </nav>
            {/* Dark mode toggle button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <span className="text-xl">☀️</span> : <span className="text-xl">🌙</span>}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <main className="flex-grow">
          {/* Routes component defines all your application's routes */}
          <Routes> {/* <--- IMPORTANT: Routes wrapper for all your Route components */}
            <Route path="/" element={<HomeSection darkMode={darkMode} />} /> {/* <--- Route for Home */}
            <Route path="/mna" element={<MnaSection darkMode={darkMode} />} />
            <Route path="/fdi-odi" element={<FdiOdiSection darkMode={darkMode} />} />
            <Route path="/sebi" element={<SebiSection darkMode={darkMode} />} />
            <Route path="/about" element={<AboutSection darkMode={darkMode} />} />
            <Route path="/contact" element={<ContactSection darkMode={darkMode} />} />

            {/* Optional: Catch-all route for 404 Not Found */}
            <Route path="*" element={
              <div className="text-center py-20 text-gray-600 dark:text-gray-300">
                <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
                <p className="mb-6">The page you're looking for doesn't exist.</p>
                <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                  <span className="mr-2">🏠</span> Go to Home
                </Link>
              </div>
            } />
          </Routes>
        </main>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
