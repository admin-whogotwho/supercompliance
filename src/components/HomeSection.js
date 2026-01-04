import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO'; 

const HomeSection = ({ darkMode }) => {
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
  }, []);

  return (
    <div className="space-y-16 pb-24 selection:bg-indigo-500 selection:text-white">
      <SEO title="WhoGotWho | Strategic Regulatory Command" />

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
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-none">GLOBAL <br/><span className="text-emerald-400 not-italic uppercase">Entry.</span></h1>
              <p className="text-lg text-indigo-100/70 font-medium leading-relaxed max-w-sm">{geoGreeting.text}</p>
              <a href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-emerald-500 text-indigo-950 font-black rounded-2xl hover:scale-105 transition-all shadow-lg uppercase text-xs tracking-widest">Start India Entry</a>
            </div>
          </div>

          {/* RIGHT: Domestic Hook */}
          <div className="flex-1 p-10 md:p-16 bg-gradient-to-bl from-indigo-500/5 to-transparent">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-400/10 border border-blue-400/20 px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Domestic Corporate</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-none">Indian <br/><span className="text-blue-400 not-italic uppercase">Enterprise.</span></h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-bold text-indigo-100/80">
                <li className="flex items-center gap-2 underline decoration-blue-500/50 underline-offset-4">FEMA Advisory</li>
                <li className="flex items-center gap-2 underline decoration-blue-500/50 underline-offset-4">Tax Litigation</li>
                <li className="flex items-center gap-2 underline decoration-blue-500/50 underline-offset-4">M&A Deals</li>
                <li className="flex items-center gap-2 underline decoration-blue-500/50 underline-offset-4">IPO Readiness</li>
              </ul>
              <a href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-white/10 border border-white/20 text-white font-black rounded-2xl hover:bg-white/20 transition-all uppercase text-xs tracking-widest">Corporate Services</a>
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
          <h3 className="text-2xl font-black tracking-tight uppercase italic">Direct Access to the Practitioner</h3>
          <p className="text-slate-500 dark:text-indigo-200 font-medium">
            Bridging the gap between global capital and Indian regulatory frameworks. 
            No gatekeepers. Directly connect with Saurabh Jain for specialized advisory.
          </p>
        </div>
        <a href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#0077b5] text-white font-black rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-lg text-xs tracking-widest uppercase">
          Connect on LinkedIn ↗
        </a>
      </section>

      {/* --- 3. TRUST STATS --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {[
          { label: 'Company Reg (FDI)', val: '21 Days' },
          { label: 'All Licenses', val: 'Factory & Corp' },
          { label: 'FEMA NCLT', val: 'Litigation' },
          { label: 'IPO Advisory', val: 'MSME' }
        ].map((item, i) => (
          <div key={i} className={`p-8 rounded-[2rem] text-center border-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
            <p className="text-2xl font-black text-indigo-950 dark:text-emerald-400 tracking-tighter uppercase italic">{item.val}</p>
            <div className="w-8 h-1 bg-indigo-500 mx-auto my-3 rounded-full opacity-30"></div>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* --- 4. EXECUTION ARCHITECTURE (REPLACES MARKET PULSE) --- */}
      <section className="space-y-12">
        <div className="text-left space-y-2">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Execution Architecture</h2>
            <p className={`text-lg font-medium max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Move beyond static news. Access the logic used to navigate India's most complex capital routes and regulatory hurdles.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
            {
                title: "The Inbound Route",
                tag: "FDI / FEMA",
                desc: "Navigating Press Note 3 (2020) restrictions and UBO hurdles for bordering nations and sensitive sectors.",
                action: "View Strategy",
                icon: "🎯",
                link: "/fdi-odi",
                color: "hover:border-emerald-500"
            },
            {
                title: "The Tax Bridge",
                tag: "M&A / INCOME TAX",
                desc: "Optimizing Section 50B Slump Sales vs. 47(vi) Demerger neutralities for tax-efficient entity restructuring.",
                action: "Calculate Value",
                icon: "💎",
                link: "/mna",
                color: "hover:border-blue-500"
            },
            {
                title: "The Public Gate",
                tag: "SEBI / SAST",
                desc: "Triggering Regulation 3(1) thresholds and managing open offer pricing under the Takeover Code.",
                action: "Check Triggers",
                icon: "🔒",
                link: "/sebi",
                color: "hover:border-purple-500"
            },
            {
                title: "The Exit Logic",
                tag: "IPO / LISTING",
                desc: "Pre-IPO cap-table hygiene, MSME-to-Mainboard migration, and managing SDD under PIT regulations.",
                action: "Analyze Readiness",
                icon: "🚀",
                link: "/sebi",
                color: "hover:border-indigo-600"
            }
            ].map((item, i) => (
            <Link 
                to={item.link} 
                key={i} 
                className={`group relative p-10 rounded-[3rem] border-2 transition-all duration-500 ${item.color} ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'
                }`}
            >
                <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">{item.tag}</span>
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{item.title}</h3>
                </div>
                <span className="text-4xl opacity-40 group-hover:opacity-100 group-hover:rotate-12 transition-all">{item.icon}</span>
                </div>
                
                <p className={`text-base font-medium mb-8 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {item.desc}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-500">
                <span>{item.action}</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
            </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomeSection;