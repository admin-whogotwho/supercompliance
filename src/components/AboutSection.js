    import React from 'react'; // <--- IMPORTANT: Import React
    import SEO from './SEO'; // <--- IMPORTANT: Import SEO component

    // AboutSection: Provides information about the website's mission and disclaimers.
    const AboutSection = ({ darkMode }) => {
      return (
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-md`}>
          <SEO
            title="About Us"
            description="Learn about WhoGotWho and our mission"
            keywords="about, who we are, mission"
          />

          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <span className="mr-3 text-blue-500">ℹ️</span> About WhoGotWho.com
          </h2>

          <div className={`prose max-w-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p className="mb-4 leading-relaxed">
              <strong className={darkMode ? "text-blue-300" : "text-blue-600"}>WhoGotWho.com</strong> is a comprehensive platform dedicated to providing insightful information and illustrative tools related to corporate transactions and regulatory compliances in India.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">Our Mission</h3>
            <p className="leading-relaxed">
              To simplify complex legal and financial concepts in the areas of Mergers & Acquisitions, Foreign Direct Investment (FDI), Overseas Direct Investment (ODI), and SEBI regulations, making them accessible to businesses, investors, and professionals. Our goal is to empower users with quick, actionable insights into Indian regulatory frameworks.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">Disclaimer</h3>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-red-50'} border ${darkMode ? 'border-gray-600' : 'border-red-200'} shadow-inner`}>
              <p className={darkMode ? "text-red-300" : "text-red-700"}><strong className="text-red-500">Important:</strong> The information provided on this website is for general informational purposes only and does not constitute legal, financial, or professional advice. Always consult with qualified professionals for specific situations.</p>
            </div>
          </div>
        </div>
      );
    };

    export default AboutSection; // <--- Export the component
    