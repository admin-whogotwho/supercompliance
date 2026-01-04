import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import SEO from './SEO'; 
import StatCard from './StatCard';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://fsrgsdxalgbcsfjaxref.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const HomeSection = ({ darkMode }) => {
  const [marketData, setMarketData] = useState([]);
  const [news, setNews] = useState([]);
  const [geoGreeting, setGeoGreeting] = useState({ lang: 'en', text: 'Practitioner-led India Entry & Compliance Utility.' });

  const LINKEDIN_PROFILE = "https://www.linkedin.com/in/saurabh-jain-b5467a3a/";

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    const hooks = {
      es: "Expertos en cumplimiento de SEBI y entrada al mercado indio (España/México).",
      zh: "專門協助台灣和中國企業快速獲批印度投資（FDI）及工廠設立。",
      ja: "日本企業のインド進出、FDI認可、およびコンプライアンスの専門家。",
      en: "CA-built utility for M&A tracking and India-entry regulations."
    };
    const langKey = Object.keys(hooks).find(key => userLang.startsWith(key)) || 'en';
    setGeoGreeting({ lang: langKey, text: hooks[langKey] });

    const fetchData = async () => {
      try {
        const [marketRes, newsRes] = await Promise.all([
          supabase.from('market_data').select('*'),
          supabase.from('regulatory_news').select('*').order('date', { ascending: false }).limit(3)
        ]);
        setMarketData(marketRes.data || [
          { title: 'FDI Inflows', value: '$9.34B', change: '-4.5%', icon: '📈', id: 1 },
          { title: 'M&A Deals', value: '67', change: '+204%', icon: '💼', id: 2 },
          { title: 'SEBI Filings', value: '46', change: '+200%', icon: '📑', id: 3 }
        ]);
        setNews(newsRes.data || []);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-12 pb-24 selection:bg-emerald-200">
      <SEO title="WhoGotWho | FDI Entry & Domestic Corporate Advisory" />

      {/* --- 1. THE SPLIT HERO SECTION --- */}
      <section className={`relative rounded-[3.5rem] overflow-hidden ${darkMode ? 'bg-slate-900 border border-slate-800' : 'bg-indigo-950'} text-white shadow-2xl`}>
        <div className="flex flex-col lg:flex-row">
          
          {/* LEFT: International Hook */}
          <div className="flex-1 p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-br from-emerald-500/5 to-transparent">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Inbound Investment</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic">GLOBAL <br/><span className="text-emerald-400 not-italic">ENTRY.</span></h1>
              <p className="text-lg text-indigo-100/70 font-medium leading-relaxed">{geoGreeting.text}</p>
              {/* Pointing directly to LinkedIn */}
              <a href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-emerald-500 text-indigo-950 font-black rounded-2xl hover:scale-105 transition-all shadow-lg">Start India Entry</a>
            </div>
          </div>

          {/* RIGHT: Domestic Hook */}
          <div className="flex-1 p-10 md:p-16 bg-gradient-to-bl from-indigo-500/5 to-transparent">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-400/10 border border-blue-400/20 px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Domestic Corporate</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase">Indian <br/><span className="text-blue-400 not-italic">Enterprise.</span></h2>
              <ul className="grid grid-cols-2 gap-3 text-sm font-bold text-indigo-100/80">
                <li className="flex items-center gap-2">🔹 FEMA Advisory</li>
                <li className="flex items-center gap-2">🔹 Tax Litigation</li>
                <li className="flex items-center gap-2">🔹 M&A Deals</li>
                <li className="flex items-center gap-2">🔹 IPO Readiness</li>
              </ul>
              {/* Pointing directly to LinkedIn */}
              <a href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-white/10 border border-white/20 text-white font-black rounded-2xl hover:bg-white/20 transition-all">Corporate Services</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THE CONSULTANT HOOK --- */}
      <section className={`rounded-[3rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 ${darkMode ? 'bg-indigo-950/40 border border-indigo-900 shadow-inner' : 'bg-white border border-slate-100 shadow-xl'}`}>
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-emerald-400 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg rotate-3">SJ</div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900"></div>
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-2xl font-black tracking-tight">Direct Access to the Practitioner</h3>
          <p className="text-slate-500 dark:text-indigo-200 font-medium">
            Bridging the gap between global capital and Indian regulatory frameworks. 
            Connect with Saurabh Jain for specialized advisory.
          </p>
        </div>
        <a href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#0077b5] text-white font-bold rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-lg">
          Connect on LinkedIn ↗
        </a>
      </section>

      {/* --- 3. TRUST STATS (Updated with your requirements) --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {[
          { label: 'Company Reg (FDI)', val: '21 Days' },
          { label: 'All Licenses', val: 'Factory & Corp' },
          { label: 'FEMA NCLT', val: 'Litigation' },
          { label: 'IPO Advisory', val: 'MSME' }
        ].map((item, i) => (
          <div key={i} className={`p-6 rounded-[2rem] text-center border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
            <p className="text-2xl font-black text-indigo-950 dark:text-emerald-400 tracking-tighter">{item.val}</p>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* --- 4. DATA & NEWS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className={`lg:col-span-2 rounded-[3rem] p-10 ${darkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white shadow-xl'} border border-slate-100`}>
          <h3 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter italic">
             <span className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded-2xl text-lg">📉</span> Market Pulse
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {marketData.map((stat) => <StatCard key={stat.id} {...stat} darkMode={darkMode} />)}
          </div>
        </div>
        
        <div className={`rounded-[3rem] p-10 ${darkMode ? 'bg-slate-800' : 'bg-slate-100/50'}`}>
          <h3 className="text-lg font-black mb-8 uppercase tracking-tighter italic">Regulatory News</h3>
          <div className="space-y-8">
            {news.map(item => (
              <div key={item.id} className="group cursor-pointer">
                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">{new Date(item.date).toLocaleDateString()}</p>
                <h4 className="font-bold text-base group-hover:text-indigo-600 transition-colors leading-snug">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;