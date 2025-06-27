    import React from 'react'; // <--- IMPORTANT: Import React
    import SEO from './SEO'; // <--- IMPORTANT: Import SEO component

    // ContactSection: Provides contact information and links to official resources.
    const ContactSection = ({ darkMode }) => {
      return (
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-md`}>
          <SEO
            title="Contact Us"
            description="Get in touch with WhoGotWho team"
            keywords="contact, support, help"
          />

          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <span className="mr-3 text-blue-500">📧</span> Contact Us
          </h2>

          <div className={`prose max-w-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p className="mb-4 leading-relaxed">
              Have questions or feedback? We'd love to hear from you! Please reach out using the details below.
            </p>

            <div className="mt-6 space-y-6">
              <div className="flex items-start">
                <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-100'} mr-4 flex-shrink-0`}>
                  <span className={`text-xl ${darkMode ? "text-blue-300" : "text-blue-600"}`}>📧</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Email</h4>
                  <a href="mailto:admin@whogotwho.com" className={`block mt-1 ${darkMode ? "text-blue-300 hover:text-blue-200" : "text-blue-600 hover:text-blue-800"} text-base`}>
                    admin@whogotwho.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-100'} mr-4 flex-shrink-0`}>
                  <span className={`text-xl ${darkMode ? "text-blue-300" : "text-blue-600"}`}>🔗</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Official Resources</h4>
                  <div className="space-y-2 mt-2 text-base">
                    <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" className={`block ${darkMode ? "text-blue-300 hover:text-blue-200" : "text-blue-600 hover:text-blue-800"}`}>
                      Reserve Bank of India (RBI)
                    </a>
                    <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" className={`block ${darkMode ? "text-blue-300 hover:text-blue-200" : "text-blue-600 hover:text-blue-800"}`}>
                      Securities and Exchange Board of India (SEBI)
                    </a>
                    <a href="https://dpiit.gov.in" target="_blank" rel="noopener noreferrer" className={`block ${darkMode ? "text-blue-300 hover:text-blue-200" : "text-blue-600 hover:text-blue-800"}`}>
                      Department for Promotion of Industry and Internal Trade (DPIIT)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'} border ${darkMode ? 'border-gray-600' : 'border-yellow-200'} shadow-inner`}>
              <p className={darkMode ? "text-yellow-300" : "text-yellow-700"}><strong className="text-yellow-500">Note:</strong> For specific compliance questions, please consult with qualified legal/financial professionals.</p>
            </div>
          </div>
        </div>
      );
    };

    export default ContactSection; // <--- Export the component
    