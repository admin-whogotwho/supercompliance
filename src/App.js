import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// Import your individual section components and other shared components
import NavItem from './components/NavItem';
import HomeSection from './components/HomeSection';
import MnaSection from './components/MnaSection';
import FdiOdiSection from './components/FdiOdiSection';
import SebiSection from './components/SebiSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
// No longer importing LogoPreview as it's for temporary preview only

// Main App component: Manages routing, dark mode, mobile navigation, and layout.
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const location = useLocation(); // Hook to get the current URL path

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
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} font-sans antialiased`}>
      <header className={`bg-blue-800 text-white p-4 shadow-lg sticky top-0 z-10`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Permanent Logo Integration: Logo Option 3 */}
          <Link to="/" className="text-2xl font-bold z-20 flex items-center">
            <div className="w-8 h-8 mr-2 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-base">
              WGW
            </div>
            <span>WhoGotWho.com</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
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

            {/* Mobile Menu Button (Hamburger) */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 z-20"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <span className="text-xl">✕</span> // Close icon
              ) : (
                <span className="text-xl">☰</span> // Hamburger icon
              )}
            </button>

            {/* Dark mode toggle button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 z-20"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <span className="text-xl">☀️</span> : <span className="text-xl">🌙</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-95 z-40 flex flex-col items-center justify-center transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <nav className="text-white text-center">
          <ul className="flex flex-col space-y-6 text-xl">
            <li>
              <Link to="/" onClick={toggleMobileMenu} className="block py-2 hover:text-blue-400 transition-colors flex items-center justify-center">
                <span className="mr-3 text-2xl">🏠</span> Insights
              </Link>
            </li>
            <li>
              <Link to="/mna" onClick={toggleMobileMenu} className="block py-2 hover:text-blue-400 transition-colors flex items-center justify-center">
                <span className="mr-3 text-2xl">💼</span> M&A
              </Link>
            </li>
            <li>
              <Link to="/fdi-odi" onClick={toggleMobileMenu} className="block py-2 hover:text-blue-400 transition-colors flex items-center justify-center">
                <span className="mr-3 text-2xl">🧮</span> FDI & ODI
              </Link>
            </li>
            <li>
              <Link to="/sebi" onClick={toggleMobileMenu} className="block py-2 hover:text-blue-400 transition-colors flex items-center justify-center">
                <span className="mr-3 text-2xl">⚖️</span> SEBI
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMobileMenu} className="block py-2 hover:text-blue-400 transition-colors flex items-center justify-center">
                <span className="mr-3 text-2xl">ℹ️</span> About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleMobileMenu} className="block py-2 hover:text-blue-400 transition-colors flex items-center justify-center">
                <span className="mr-3 text-2xl">📧</span> Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <main className="flex-grow">
          {/* Removed temporary LogoPreview component */}

          <Routes>
            <Route path="/" element={<HomeSection darkMode={darkMode} />} />
            <Route path="/mna" element={<MnaSection darkMode={darkMode} />} />
            <Route path="/fdi-odi" element={<FdiOdiSection darkMode={darkMode} />} />
            <Route path="/sebi" element={<SebiSection darkMode={darkMode} />} />
            <Route path="/about" element={<AboutSection darkMode={darkMode} />} />
            <Route path="/contact" element={<ContactSection darkMode={darkMode} />} />

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
