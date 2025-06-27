import React from 'react'; // <--- IMPORTANT: Import React

// Footer component: Displays copyright and other links.
const Footer = ({ darkMode }) => {
  return (
    <footer className={`py-6 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'} mt-10 rounded-t-xl shadow-inner`}>
      <div className="container mx-auto px-4 text-center text-sm">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
          <span>&copy; {new Date().getFullYear()} WhoGotWho.com</span>
          {/* These are example valid links for SEO and accessibility */}
          <a href="/privacy-policy" className="hover:underline text-blue-600 dark:text-blue-400">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:underline text-blue-600 dark:text-blue-400">Terms of Service</a>
          <a href="/disclaimer" className="hover:underline text-blue-600 dark:text-blue-400">Disclaimer</a>
        </div>
        <p className="mt-4 text-xs max-w-3xl mx-auto leading-relaxed">
          This website provides simplified information and illustrative calculators for M&A, FDI/ODI, and SEBI compliances.
          The content is for general guidance only and should not be considered as professional advice.
        </p>
        <p className="mt-2 text-xs">
          Supabase integration for market data requires setting up your own Supabase project and table.
        </p>
      </div>
    </footer>
  );
};

export default Footer; // <--- Export the component
