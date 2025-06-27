import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import SEO from './SEO';
import StatCard from './StatCard';

// Initialize Supabase client for HomeSection
// Using environment variables for production, hardcoded for local fallback.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://fsrgsdxalgbcsfjaxref.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzcmdzZHhhbGdiY3NmamF4cmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MzgxNzAsImV4cCI6MjA2MDMxNDE3MH0.AnLfcXr_4uVbHWCENDSbJryRZHMKgkG2_C3Ns_YoqTI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// HomeSection: Displays market insights and latest regulatory news.
// Fetches market data and news from Supabase.
const HomeSection = ({ darkMode }) => {
  const [marketData, setMarketData] = useState([]);
  const [news, setNews] = useState([]);
  const [loadingMarketData, setLoadingMarketData] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [marketError, setMarketError] = useState(null);
  const [newsError, setNewsError] = useState(null);

  useEffect(() => {
    // Function to fetch market data from Supabase
    const fetchMarketData = async () => {
      setLoadingMarketData(true);
      setMarketError(null);
      try {
        const { data, error } = await supabase
          .from('market_data')
          .select('*');

        if (error) {
          throw error;
        }
        setMarketData(data || []);
      } catch (err) {
        console.error("Error fetching market data:", err.message);
        setMarketError("Failed to load market data. Please ensure Supabase is configured correctly and the 'market_data' table exists and is populated.");
        setMarketData([
          { title: 'FDI Inflows', value: '$9.34B', change: '4.5% drop year-over-year (YOY)', icon: '📈', id: 'static_fdi_inflow' },
          { title: 'M&A Deals', value: '67 deals, total value US $5.3 bn', change: '+204% increase', icon: '💼', id: 'static_mna_deals' },
          { title: 'SEBI Filings', value: '46 filings in Q1 2025', change: '+200-300% increase', icon: '📑', id: 'static_sebi_filings' }
        ]);
      } finally {
        setLoadingMarketData(false);
      }
    };

    // Function to fetch regulatory news from Supabase
    const fetchNewsData = async () => {
      setLoadingNews(true);
      setNewsError(null);
      try {
        const { data, error } = await supabase
          .from('regulatory_news')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          throw error;
        }
        setNews(data || []);
      } catch (err) {
        console.error("Error fetching news data:", err.message);
        setNewsError("Failed to load regulatory news. Please ensure Supabase is configured correctly and the 'regulatory_news' table exists and is populated.");
        setNews([
          { id: 'static1', title: 'RBI updates FDI policy framework', date: '2023-06-15', summary: 'The Reserve Bank of India has issued updated guidelines for foreign direct investment in the defense sector.' },
          { id: 'static2', title: 'SEBI tightens takeover regulations', date: '2023-06-10', summary: 'New disclosure requirements announced for substantial acquisitions of shares in listed companies.' },
          { id: 'static3', title: 'M&A activity reaches record high', date: '2023-06-05', summary: 'Indian companies announced mergers worth $50 billion in the first half of 2023.' }
        ]);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchMarketData();
    fetchNewsData();
  }, []);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {loadingMarketData ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Loading market data...</p>
          </div>
        ) : marketError ? (
          <div className="col-span-full text-center py-8 text-red-500">
            <p>{marketError}</p>
          </div>
        ) : (
          marketData.map((stat, index) => (
            <StatCard
              key={stat.id || index}
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
          {loadingNews ? (
            <div className="p-6 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : newsError ? (
            <div className="col-span-full text-center py-8 text-red-500">
              <p>{newsError}</p>
            </div>
          ) : (
            news.map(item => (
              <div key={item.id} className="p-6 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h4 className="font-medium text-xl">{item.title}</h4>
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

export default HomeSection;
