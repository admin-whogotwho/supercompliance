import React, { useState, useEffect } from 'react';
// The @supabase/supabase-js library is installed via npm and resolved during build in a local environment.
// In your local setup (after 'npm install @supabase/supabase-js'), ensure this import is active:
import { createClient } from '@supabase/supabase-js'; // This line is now active

// Initialize Supabase client directly with your credentials.
// You no longer need .env variables for this specific setup as the values are hardcoded.
const supabaseUrl = 'https://fsrgsdxalgbcsfjaxref.supabase.co'; // Your Supabase Project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzcmdzZHhhbGdiY3NmamF4cmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MzgxNzAsImV4cCI6MjA2MDMxNDE3MH0.AnLfcXr_4uVbHWCENDSbJryRZHMKgkG2_C3Ns_YoqTI'; // Your Supabase Anon Public Key

const supabase = createClient(supabaseUrl, supabaseAnonKey);


// ============== COMPONENTS ============== //

// SEO component: Manages document title dynamically.
const SEO = ({ title, description, keywords }) => {
    useEffect(() => {
        document.title = `${title} | WhoGotWho`;
    }, [title, description, keywords]);
    return null;
};

// NavItem component: Renders a navigation link button.
const NavItem = ({ children, icon, active, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`flex items-center text-left px-3 py-2 rounded-lg transition-all ${active ? 'bg-white text-blue-800' : 'hover:bg-blue-700'}`}
    >
      <span className="mr-2 text-xl">{icon}</span>
      {children}
    </button>
  </li>
);

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

// StatCard component: Displays a single statistic with a title, value, change, and icon.
const StatCard = ({ title, value, change, icon, darkMode }) => {
  const isPositive = change.startsWith('+');
  return (
    <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} shadow-lg border ${darkMode ? 'border-gray-600' : 'border-gray-100'}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{title}</p>
          <p className="text-3xl font-extrabold mt-1">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
      <p className={`mt-4 text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {change} from last quarter
      </p>
    </div>
  );
};

// ============== MAIN SECTIONS ============== //

// HomeSection: Displays market insights and latest regulatory news.
// Fetches market data and news from Supabase.
const HomeSection = ({ darkMode }) => {
  const [marketData, setMarketData] = useState([]); // State for market statistics
  const [news, setNews] = useState([]); // State for news updates
  const [loadingMarketData, setLoadingMarketData] = useState(true); // Loading state for market data
  const [loadingNews, setLoadingNews] = useState(true); // Loading state for news
  const [marketError, setMarketError] = useState(null); // Error state for market data fetch
  const [newsError, setNewsError] = useState(null); // Error state for news fetch

  useEffect(() => {
    // Function to fetch market data from Supabase
    const fetchMarketData = async () => {
      setLoadingMarketData(true);
      setMarketError(null); // Reset error state
      try {
        const { data, error } = await supabase
          .from('market_data') // Target Supabase table named 'market_data'
          .select('*'); // Select all columns

        if (error) {
          throw error; // Propagate Supabase errors
        }
        // If data is fetched successfully, use it.
        // Otherwise, the static fallback from marketError will be used.
        setMarketData(data || []);
      } catch (err) {
        console.error("Error fetching market data:", err.message);
        setMarketError("Failed to load market data. Please ensure Supabase is configured correctly and the 'market_data' table exists and is populated.");
        // Fallback to static data on fetch error to ensure display
        setMarketData([
          { title: 'FDI Inflows', value: '$81.72B', change: '+10.2%', icon: '📈' },
          { title: 'M&A Deals', value: '1,240', change: '+15.6%', icon: '💼' },
          { title: 'SEBI Filings', value: '3,458', change: '+5.3%', icon: '📑' }
        ]);
      } finally {
        setLoadingMarketData(false); // End loading regardless of success or failure
      }
    };

    // Function to fetch regulatory news from Supabase
    const fetchNewsData = async () => {
      setLoadingNews(true);
      setNewsError(null); // Reset error state
      try {
        const { data, error } = await supabase
          .from('regulatory_news') // Target Supabase table named 'regulatory_news'
          .select('*') // Select all columns
          .order('date', { ascending: false }); // Order by date, newest first

        if (error) {
          throw error; // Propagate Supabase errors
        }
        setNews(data || []); // Set fetched data, or empty array if null
      } catch (err) {
        console.error("Error fetching news data:", err.message);
        setNewsError("Failed to load regulatory news. Please ensure Supabase is configured correctly and the 'regulatory_news' table exists and is populated.");
        // Fallback to static news data on fetch error
        setNews([
          { id: 'static1', title: 'RBI updates FDI policy framework', date: '2023-06-15', summary: 'The Reserve Bank of India has issued updated guidelines for foreign direct investment in the defense sector.' },
          { id: 'static2', title: 'SEBI tightens takeover regulations', date: '2023-06-10', summary: 'New disclosure requirements announced for substantial acquisitions of shares in listed companies.' },
          { id: 'static3', title: 'M&A activity reaches record high', date: '2023-06-05', summary: 'Indian companies announced mergers worth $50 billion in the first half of 2023.' }
        ]);
      } finally {
        setLoadingNews(false); // End news loading regardless of success or failure
      }
    };

    fetchMarketData(); // Call the fetch function for market data on component mount
    fetchNewsData(); // Call the fetch function for news data on component mount
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-md`}>
      <SEO 
        title="Market Insights Dashboard" 
        description="Latest updates on M&A, FDI/ODI, and SEBI compliances in India"
        keywords="FDI, ODI, SEBI, compliance, India, M&A"
      />
      
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
        <span className="mr-3 text-blue-500">🏠</span> Market Insights Dashboard
      </h2>
      
      {/* THIS IS THE SECTION WITH THE ALIGNMENT FIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"> {/* Added sm:grid-cols-2 for better responsiveness */}
        {loadingMarketData ? ( // Show loading indicator for market data
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Loading market data...</p>
          </div>
        ) : marketError ? ( // Show error message if market data fetch failed
          <div className="col-span-full text-center py-8 text-red-500">
            <p>{marketError}</p>
          </div>
        ) : ( // Render StatCards once data is loaded
          marketData.map((stat, index) => (
          <StatCard 
            key={stat.id || index} // Use stat.id from Supabase if available, else index
            title={stat.title} 
            value={stat.value} 
            change={stat.change} 
            icon={stat.icon} 
            darkMode={darkMode}
          />
        ))
        )}
      </div>
      
      <div className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
          <h3 className="text-2xl font-semibold">Latest Regulatory Updates</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-600">
          {loadingNews ? ( // Show loading indicator for news
            <div className="p-6 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : newsError ? ( // Show error message if news fetch failed
            <div className="col-span-full text-center py-8 text-red-500">
              <p>{newsError}</p>
            </div>
          ) : ( // Render news items once loaded
            news.map(item => (
              <div key={item.id} className="p-6 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h4 className="font-medium text-2xl">{item.title}</h4>
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <button className="mt-3 md:mt-0 md:ml-4 text-blue-600 dark:text-blue-400 hover:underline flex items-center text-base flex-shrink-0"
                      onClick={() => alert(`Full summary for "${item.title}":\n\n${item.summary}`)}
                  >
                    Read more <span className="ml-1">🔗</span>
                  </button>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// MnaSection: Provides information about Mergers & Acquisitions.
const MnaSection = ({ darkMode }) => {
  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-md`}>
      <SEO 
        title="Mergers & Acquisitions" 
        description="Comprehensive guide to M&A regulations and compliance in India"
        keywords="M&A, mergers, acquisitions, India, compliance"
      />
      
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
        <span className="mr-3 text-blue-500">💼</span> Mergers & Acquisitions
      </h2>
      
      <div className={`prose max-w-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="mb-4 leading-relaxed">
          Mergers and acquisitions (M&A) are transactions in which the ownership of companies or their operating units are transferred or consolidated with other entities. As aspects of corporate finance, M&A deals can enable companies to grow or shrink, and change the nature of their business or competitive position.
        </p>
        
        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">Key Aspects of M&A:</h3>
        <ul className="list-disc pl-8 space-y-3">
          <li><strong>Strategic Rationale:</strong> Market expansion, synergy creation, cost reduction, diversification.</li>
          <li><strong>Deal Structuring:</strong> Stock purchase, asset purchase, statutory merger, tender offers.</li>
          <li><strong>Valuation:</strong> Discounted Cash Flow (DCF), comparable company analysis, precedent transactions.</li>
          <li><strong>Due Diligence:</strong> Financial, legal, operational, environmental, and intellectual property reviews.</li>
          <li><strong>Regulatory Approvals:</strong> Competition commission approvals, sectoral regulatory clearances.</li>
        </ul>
        
        <div className={`mt-8 p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} border ${darkMode ? 'border-gray-600' : 'border-blue-200'} shadow-inner`}>
          <p className={`italic ${darkMode ? 'text-gray-300' : 'text-blue-800'}`}>
            For detailed legal procedures and current market trends, please consult with M&A legal and financial advisors. This section provides general information and does not constitute professional advice.
          </p>
        </div>
      </div>
    </div>
  );
};

// FdiOdiSection: Contains calculators for FDI and ODI compliance.
const FdiOdiSection = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('fdi');

  return (
    <div className={`rounded-xl ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-md overflow-hidden`}>
      <SEO 
        title="FDI & ODI Compliance" 
        description="Calculators and guides for Foreign Direct Investment and Overseas Direct Investment in India"
        keywords="FDI, ODI, foreign investment, India, compliance"
      />
      
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px">
          <TabButton active={activeTab === 'fdi'} onClick={() => setActiveTab('fdi')}>
            <span className="text-lg">🧮</span> FDI Calculator
          </TabButton>
          <TabButton active={activeTab === 'odi'} onClick={() => setActiveTab('odi')}>
            <span className="text-lg">🧮</span> ODI Calculator
          </TabButton>
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'fdi' && <FdiCalculator darkMode={darkMode} />}
        {activeTab === 'odi' && <OdiCalculator darkMode={darkMode} />}
      </div>
    </div>
  );
};

// FdiCalculator: Calculates FDI compliance based on sector and investment percentage.
const FdiCalculator = ({ darkMode }) => {
  const [fdiSector, setFdiSector] = useState('manufacturing');
  const [fdiPercentage, setFdiPercentage] = useState(49);
  const [fdiAmountInr, setFdiAmountInr] = useState(100);
  const [fdiResult, setFdiResult] = useState('');

  const calculateFDI = () => {
    if (isNaN(fdiPercentage) || fdiPercentage < 0 || fdiPercentage > 100) {
      setFdiResult(`<p class="text-red-500 font-bold">Please enter a valid percentage (0-100%)</p>`);
      return;
    }

    let msg = `<div class="${darkMode ? 'text-gray-200' : 'text-gray-800'}">`;
    msg += `<h3 class="text-xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-indigo-700'}">FDI Compliance Result</h3>`;
    msg += `<p><strong>Sector:</strong> ${fdiSector.replace(/_/g, ' ').toUpperCase()}</p>`;
    msg += `<p><strong>Proposed Foreign Investment:</strong> ${fdiPercentage}% (Amount: INR ${fdiAmountInr} Crores)</p>`;

    switch(fdiSector) {
      case 'manufacturing':
        msg += `<p class="text-green-500 font-bold mt-2">100% FDI allowed under Automatic Route</p>`;
        msg += `<p class="mt-2 text-sm">Subject to applicable laws/regulations; compliance with all relevant rules and regulations, security and other conditionalities.</p>`;
        break;
      case 'defence':
        if (fdiPercentage <= 74) {
          msg += `<p class="text-green-500 font-bold mt-2">Up to 74% FDI allowed under Automatic Route</p>`;
        } else {
          msg += `<p class="text-orange-500 font-bold mt-2">Beyond 74% requires Government approval</p>`;
        }
        msg += `<p class="mt-2 text-sm">Access to modern technology, FDI leading to higher domestic content, and export promotion are key considerations.</p>`;
        break;
      case 'insurance':
        if (fdiPercentage <= 74) {
          msg += `<p class="text-green-500 font-bold mt-2">Up to 74% FDI allowed under Automatic Route</p>`;
        } else {
          msg += `<p class="text-red-500 font-bold mt-2">FDI beyond 74% is NOT permitted in Insurance</p>`;
        }
        msg += `<p class="mt-2 text-sm">Requires compliance with IRDAI regulations. Indian management and control criteria apply.</p>`;
        break;
      case 'telecom':
        msg += `<p class="text-green-500 font-bold mt-2">100% FDI allowed under Automatic Route</p>`;
        msg += `<p class="mt-2 text-sm">Subject to licensing and security conditions.</p>`;
        break;
      case 'retail':
        if (fdiPercentage <= 51) {
          msg += `<p class="text-orange-500 font-bold mt-2">Up to 51% FDI allowed under Government Route</p>`;
        } else {
          msg += `<p class="text-red-500 font-bold mt-2">FDI beyond 51% is NOT permitted in Multi-Brand Retail Trading</p>`;
        }
        msg += `<p class="mt-2 text-sm">Subject to various conditions including local sourcing, investment in back-end infrastructure etc.</p>`;
        break;
      default:
        msg += `<p class="text-orange-500 font-bold mt-2">Sector-specific limits and routes apply</p>`;
        msg += `<p class="mt-2 text-sm">Refer to the latest Consolidated FDI Policy Circular issued by DPIIT for exact sectoral limits.</p>`;
    }

    msg += `<p class="mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}"><strong>Reporting Requirements:</strong> Form FCGPR for equity instruments, Annual Return on Foreign Liabilities and Assets (FLA).</p>`;
    msg += `<p class="mt-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-700'} italic">Disclaimer: This is a simplified overview. Always consult with legal experts for specific cases.</p>`;
    msg += `</div>`;

    setFdiResult(msg);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-inner`}>
        <h3 className="text-xl font-semibold mb-4">FDI Parameters</h3>
        
        <div className="space-y-4">
          <div>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sector of Investment</label>
            <select
              value={fdiSector}
              onChange={(e) => setFdiSector(e.target.value)}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="manufacturing">Manufacturing (100% Automatic)</option>
              <option value="defence">Defence (74% Automatic)</option>
              <option value="insurance">Insurance (74% Automatic)</option>
              <option value="telecom">Telecom (100% Automatic)</option>
              <option value="retail">Retail (51% Govt Route)</option>
            </select>
          </div>
          
          <div>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Foreign Investment Percentage (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={fdiPercentage}
              onChange={(e) => setFdiPercentage(Number(e.target.value))}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
          
          <div>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Investment Amount (INR Crores)</label>
            <input
              type="number"
              min="0"
              value={fdiAmountInr}
              onChange={(e) => setFdiAmountInr(Number(e.target.value))}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
          
          <button
            onClick={calculateFDI}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Calculate Compliance
          </button>
        </div>
      </div>
      
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-inner overflow-auto`}>
        <h3 className="text-xl font-semibold mb-4">Compliance Result</h3>
        <div dangerouslySetInnerHTML={{ __html: fdiResult }} />
      </div>
    </div>
  );
};

// OdiCalculator: Calculates ODI compliance based on investment amount and net worth.
const OdiCalculator = ({ darkMode }) => {
  const [odiType, setOdiType] = useState('equity');
  const [odiAmountUsd, setOdiAmountUsd] = useState(50);
  const [odiNetWorth, setOdiNetWorth] = useState(100);
  const [odiResult, setOdiResult] = useState('');

  const calculateODI = () => {
    if (isNaN(odiAmountUsd)) {
      setOdiResult('<p class="text-red-500 font-bold">Please enter valid amount</p>');
      return;
    }

    let msg = `<div class="${darkMode ? 'text-gray-200' : 'text-gray-800'}">`;
    msg += `<h3 class="text-xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-indigo-700'}">ODI Compliance Result</h3>`;
    msg += `<p><strong>Type:</strong> ${odiType.replace(/_/g, ' ').toUpperCase()}</p>`;
    msg += `<p><strong>Amount:</strong> USD ${odiAmountUsd} Million</p>`;
    msg += `<p><strong>Net Worth:</strong> USD ${odiNetWorth} Million</p>`;

    const limit = odiNetWorth * 4;
    
    if (odiAmountUsd <= limit) {
      msg += `<p class="text-green-500 font-bold mt-2">Within Automatic Route limit (400% of net worth)</p>`;
      msg += `<p class="mt-2 text-sm">The investment must be in a bonafide business activity abroad. Proper documentation and reporting are crucial.</p>`;
    } else {
      msg += `<p class="text-orange-500 font-bold mt-2">Exceeds Automatic Route limit. Requires RBI approval</p>`;
      msg += `<p class="mt-2 text-sm">Application to RBI with detailed justification needed. This route involves more scrutiny.</p>`;
    }

    msg += `<p class="mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}"><strong>Reporting:</strong> Form ODI Part-I for initial investment, Annual Performance Report (APR) required.</p>`;
    msg += `<p class="mt-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-700'} italic">Disclaimer: This is a simplified overview. Always consult with legal experts for specific cases.</p>`;
    msg += `</div>`;

    setOdiResult(msg);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-inner`}>
        <h3 className="text-xl font-semibold mb-4">ODI Parameters</h3>
        
        <div className="space-y-4">
          <div>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type of ODI</label>
            <select
              value={odiType}
              onChange={(e) => setOdiType(e.target.value)}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="equity">Equity Investment</option>
              <option value="loan">Loan to JV/WOS</option>
              <option value="guarantee">Corporate Guarantee</option>
            </select>
          </div>
          
          <div>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Investment Amount (USD Millions)</label>
            <input
              type="number"
              min="0"
              value={odiAmountUsd}
              onChange={(e) => setOdiAmountUsd(Number(e.target.value))}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
          
          <div>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Indian Entity's Net Worth (USD Millions)</label>
            <input
              type="number"
              min="0"
              value={odiNetWorth}
              onChange={(e) => setOdiNetWorth(Number(e.target.value))}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
          
          <button
            onClick={calculateODI}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Calculate Compliance
          </button>
        </div>
      </div>
      
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-inner overflow-auto`}>
        <h3 className="text-xl font-semibold mb-4">Compliance Result</h3>
        <div dangerouslySetInnerHTML={{ __html: odiResult }} />
        <p className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Note: The overall financial commitment of the Indian Party in all its overseas JV/WOSs shall not exceed 400% of its net worth as per the last audited balance sheet.
        </p>
      </div>
    </div>
  );
};

// SebiSection: Provides a calculator for SEBI compliance based on entity and transaction type.
const SebiSection = ({ darkMode }) => {
  const [entityType, setEntityType] = useState('listed_company');
  const [transactionType, setTransactionType] = useState('board_meeting_intimation');
  const [sharesPercentage, setSharesPercentage] = useState(5);
  const [result, setResult] = useState('');

  const calculateSebi = () => {
    let msg = `<div class="${darkMode ? 'text-gray-200' : 'text-gray-800'}">`;
    msg += `<h3 class="text-xl font-bold mb-4 ${darkMode ? 'text-purple-300' : 'text-purple-700'}">SEBI Compliance Result</h3>`;
    msg += `<p><strong>Entity:</strong> ${entityType.replace(/_/g, ' ').toUpperCase()}</p>`;
    msg += `<p><strong>Transaction:</strong> ${transactionType.replace(/_/g, ' ').toUpperCase()}</p>`;
    
    if (['takeover_disclosure', 'insider_trading_disclosure'].includes(transactionType)) {
      msg += `<p><strong>Shareholding:</strong> ${sharesPercentage}%</p>`;
    }

    if (entityType === 'listed_company') {
      switch(transactionType) {
        case 'takeover_disclosure':
          if (sharesPercentage >= 25) {
            msg += `<p class="text-red-500 font-bold mt-2">Mandatory open offer triggered (25% threshold)</p>`;
            msg += `<ul class="list-disc pl-8 mt-2 space-y-1 text-sm">
              <li>Public announcement within 5 working days</li>
              <li>Detailed disclosure in letter of offer</li>
              <li>Minimum offer period of 10 working days</li>
            </ul>`;
          } else if (sharesPercentage >= 5) {
            msg += `<p class="text-orange-500 font-bold mt-2">Disclosure required under SAST Regulations</p>`;
            msg += `<ul class="list-disc pl-8 mt-2 space-y-1 text-sm">
              <li>Disclosure to company and stock exchanges within 2 working days</li>
              <li>Continual disclosure for every 2% change thereafter (on acquisition or disposal)</li>
              </ul>`;
          } else {
            msg += `<p class="text-green-500 font-bold mt-2">No disclosure requirement under SAST for this threshold</p>`;
          }
          break;
        
        case 'insider_trading_disclosure':
          msg += `<p class="text-blue-500 font-bold mt-2">PIT Regulations apply</p>`;
          if (sharesPercentage > 0.25 || sharesPercentage === 0) {
            msg += `<ul class="list-disc pl-8 mt-2 space-y-1 text-sm">
              <li>Initial disclosure required if becoming KMP/promoter (holding >0.25% equity)</li>
              <li>Continual disclosure for trades exceeding ₹10 lakhs in value over a quarter</li>
              <li>Trading window restrictions apply during unpublished price sensitive information (UPSI) periods</li>
            </ul>`;
          }
          break;
          
        case 'board_meeting_intimation':
          msg += `<p class="text-blue-500 font-bold mt-2">LODR Regulations apply</p>`;
          msg += `<ul class="list-disc pl-8 mt-2 space-y-1 text-sm">
            <li>Intimate stock exchanges at least 5 working days in advance (for financial results, dividend, etc.)</li>
            <li>Disclose outcome within 30 minutes of meeting conclusion to stock exchanges</li>
          </ul>`;
          break;
          
        case 'financial_results':
          msg += `<p class="text-blue-500 font-bold mt-2">LODR Regulations apply</p>`;
          msg += `<ul class="list-disc pl-8 mt-2 space-y-1 text-sm">
            <li>Submit quarterly/half-yearly/annual financial results within prescribed timelines</li>
            <li>Publish extracts in newspapers</li>
            <li>Mandatory review by Audit Committee and approval by Board of Directors</li>
          </ul>`;
          break;
        default:
          msg += `<p class="text-orange-500 font-bold mt-2">General SEBI compliance requirements apply</p>`;
      }
    } else if (entityType === 'investor') {
      if (transactionType === 'takeover_disclosure' && sharesPercentage >= 5) {
        msg += `<p class="text-orange-500 font-bold mt-2">Disclosure required under SAST Regulations (Acquirer)</p>`;
        msg += `<p class="mt-2 text-sm">Submit disclosure to target company and stock exchanges within 2 working days of acquisition/disposal.</p>`;
      } else if (transactionType === 'insider_trading_disclosure' && sharesPercentage > 0.25) {
        msg += `<p class="text-blue-500 font-bold mt-2">PIT Regulations apply (Designated Person / Promoter)</p>`;
        msg += `<p class="mt-2 text-sm">Initial disclosure required if holding >0.25% or upon becoming a designated person. Continual disclosure for trades exceeding ₹10 lakhs.</p>`;
      } else {
        msg += `<p class="text-green-500 font-bold mt-2">No specific disclosure requirement for this threshold/type for Investor.</p>`;
      }
    } else if (entityType === 'intermediary') {
      msg += `<p class="text-blue-500 font-bold mt-2">Intermediaries are subject to specific SEBI regulations.</p>`;
      msg += `<p class="mt-2 text-sm">This includes regulations for Stock Brokers, Merchant Bankers, Registrars, etc. and general obligations under LODR and PIT if applicable.</p>`;
    }

    msg += `<p class="mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}">Refer to SEBI (Substantial Acquisition of Shares and Takeovers) Regulations, 2011, SEBI (Prohibition of Insider Trading) Regulations, 2015 and SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015 for complete details.</p>`;
    msg += `</div>`;

    setResult(msg);
  };

  return (
    <div className={`rounded-xl ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-md overflow-hidden`}>
      <SEO 
        title="SEBI Compliances" 
        description="Calculators and guides for SEBI regulations in India"
        keywords="SEBI, compliance, India, regulations"
      />
      
      <div className="p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
          <span className="mr-3 text-purple-500">⚖️</span> SEBI Compliance Calculator
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-inner`}>
            <h3 className="text-xl font-semibold mb-4">SEBI Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Entity Type</label>
                <select
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-purple-500 focus:border-purple-500`}
                >
                  <option value="listed_company">Listed Company</option>
                  <option value="investor">Investor</option>
                  <option value="intermediary">Intermediary</option>
                </select>
              </div>
              
              <div>
                <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Transaction Type</label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-purple-500 focus:border-purple-500`}
                >
                  <option value="takeover_disclosure">Takeover Disclosure</option>
                  <option value="insider_trading_disclosure">Insider Trading Disclosure</option>
                  <option value="board_meeting_intimation">Board Meeting Intimation</option>
                  <option value="financial_results">Financial Results Filing</option>
                </select>
              </div>
              
              {(transactionType === 'takeover_disclosure' || transactionType === 'insider_trading_disclosure') && (
                <div>
                  <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Shareholding Percentage</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={sharesPercentage}
                    onChange={(e) => setSharesPercentage(Number(e.target.value))}
                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-purple-500 focus:border-purple-500`}
                  />
                </div>
              )}
              
              <button
                onClick={calculateSebi}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
              >
                Check Compliance
              </button>
            </div>
          </div>
          
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-inner overflow-auto`}>
            <h3 className="text-xl font-semibold mb-4">Compliance Result</h3>
            <div dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        </div>
      </div>
    </div>
  );
};

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

// Footer component: Displays copyright and other links.
const Footer = ({ darkMode }) => {
  return (
    <footer className={`py-6 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'} mt-10 rounded-t-xl shadow-inner`}>
      <div className="container mx-auto px-4 text-center text-sm">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
          <span>&copy; {new Date().getFullYear()} WhoGotWho.com</span>
          <a href="#" className="hover:underline text-blue-600 dark:text-blue-400">Privacy Policy</a>
          <a href="#" className="hover:underline text-blue-600 dark:text-blue-400">Terms of Service</a>
          <a href="#" className="hover:underline text-blue-600 dark:text-blue-400">Disclaimer</a>
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

// ============== MAIN APP COMPONENT ============== //

// Main App component: Manages routing (via state), dark mode, and layout.
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection darkMode={darkMode} />;
      case 'mna':
        return <MnaSection darkMode={darkMode} />;
      case 'fdi-odi':
        return <FdiOdiSection darkMode={darkMode} />;
      case 'sebi':
        return <SebiSection darkMode={darkMode} />;
      case 'about':
        return <AboutSection darkMode={darkMode} />;
      case 'contact':
        return <ContactSection darkMode={darkMode} />;
      default:
        return <HomeSection darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} font-sans antialiased`}>
      <header className="bg-blue-800 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">WhoGotWho.com</h1>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                <NavItem icon={<span>🏠</span>} active={activeSection === 'home'} onClick={() => setActiveSection('home')}>
                  Insights
                </NavItem>
                <NavItem icon={<span>💼</span>} active={activeSection === 'mna'} onClick={() => setActiveSection('mna')}>
                  M&A
                </NavItem>
                <NavItem icon={<span>🧮</span>} active={activeSection === 'fdi-odi'} onClick={() => setActiveSection('fdi-odi')}>
                  FDI & ODI
                </NavItem>
                <NavItem icon={<span>⚖️</span>} active={activeSection === 'sebi'} onClick={() => setActiveSection('sebi')}>
                  SEBI
                </NavItem>
                <NavItem icon={<span>ℹ️</span>} active={activeSection === 'about'} onClick={() => setActiveSection('about')}>
                  About
                </NavItem>
                <NavItem icon={<span>📧</span>} active={activeSection === 'contact'} onClick={() => setActiveSection('contact')}>
                  Contact
                </NavItem>
              </ul>
            </nav>
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
          {renderSection()}
        </main>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;