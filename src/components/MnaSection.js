import React, { useState, useEffect } from 'react';
import SEO from './SEO';

const MnaSection = ({ darkMode }) => {
  const LINKEDIN_PROFILE = "https://www.linkedin.com/in/saurabh-jain-b5467a3a/";
  const [activeTab, setActiveTab] = useState('structuring');

  // --- VALUATION STATE ---
  const [fcf, setFcf] = useState(100); 
  const [growth, setGrowth] = useState(5); 
  const [wacc, setWacc] = useState(10); 
  const [terminalGrowth, setTerminalGrowth] = useState(2);
  
  // --- COMPS & SYNERGY STATE ---
  const [ebitda, setEbitda] = useState(50);
  const [targetMultiple, setTargetMultiple] = useState(12);
  const [synergySavings, setSynergySavings] = useState(10); // ₹ Cr

  // --- LOGIC CALCULATIONS ---
  const calculateDCF = (g = growth, w = wacc) => {
    const projectionYears = 5;
    let pvSum = 0;
    for (let i = 1; i <= projectionYears; i++) {
      const projectedFCF = fcf * Math.pow(1 + g / 100, i);
      pvSum += projectedFCF / Math.pow(1 + w / 100, i);
    }
    const fcfYear5 = fcf * Math.pow(1 + g / 100, 5);
    const terminalValue = (fcfYear5 * (1 + terminalGrowth / 100)) / (w / 100 - terminalGrowth / 100);
    const pvTerminal = terminalValue / Math.pow(1 + w / 100, 5);
    return (pvSum + pvTerminal).toFixed(1);
  };

  const calculateComps = () => (ebitda * targetMultiple).toFixed(1);
  
  const calculateSynergyValue = () => {
    const capitalizedSynergy = (synergySavings / (wacc / 100)).toFixed(1);
    return capitalizedSynergy;
  };

  return (
    <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4">
      <SEO 
        title="M&A Advisory India | Deal Structuring & Strategic Valuation" 
        description="Advanced M&A advisory dashboard for India. Interactive DCF models, market comps, and synergy calculators for strategic acquisitions."
      />

      {/* --- HERO SECTION --- */}
      <section className="pt-10 space-y-6">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Transaction Intelligence 2026</span>
        </div>
        <h2 className={`text-6xl md:text-8xl font-black tracking-tighter italic ${darkMode ? 'text-white' : 'text-indigo-950'}`}>
          STRATEGIC <br/> <span className="text-indigo-500 not-italic">VALUE.</span>
        </h2>
        <p className={`max-w-3xl text-xl font-medium leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Indian M&A is shifting toward high-scrutiny, synergy-driven deals. We provide the quantitative rigor and regulatory roadmap to navigate complex acquisitions.
        </p>
      </section>

      {/* --- INTERACTIVE COMMAND CENTER --- */}
      <section className={`p-6 md:p-12 rounded-[4rem] border-4 transition-all ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100 shadow-2xl'}`}>
        
        {/* NAV TABS */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
          {[
            { id: 'structuring', label: 'Structuring', icon: '🏗️' },
            { id: 'valuation', label: 'DCF Model', icon: '📊' },
            { id: 'comps', label: 'Market Comps', icon: '📈' },
            { id: 'synergy', label: 'Synergy Map', icon: '⚡' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-xl scale-110' 
                : 'bg-slate-100 dark:bg-slate-900 opacity-50 hover:opacity-100'
              }`}
            >
              <span className="mr-2">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* 1. DEAL STRUCTURING MODULE */}
        {activeTab === 'structuring' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in duration-500">
            <div className="space-y-8">
              <h3 className="text-5xl font-black italic uppercase tracking-tighter">Deal <span className="text-indigo-500">Architecture.</span></h3>
              <div className="space-y-6">
                <div className={`p-8 rounded-[2.5rem] border-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100 shadow-inner'}`}>
                  <h4 className="font-black text-2xl mb-2">Stock Purchase</h4>
                  <p className="text-sm opacity-70 leading-relaxed">Direct acquisition of shares. Target entity remains intact. High risk for historical liabilities but preserves tax losses and existing licenses.</p>
                </div>
                <div className={`p-8 rounded-[2.5rem] border-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100 shadow-inner'}`}>
                  <h4 className="font-black text-2xl mb-2">Slump Sale (Asset)</h4>
                  <p className="text-sm opacity-70 leading-relaxed">Lump-sum purchase of a business undertaking. Ideal for 'Cherry Picking' assets. Governed by IT Act Section 50B for capital gains.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
               
            </div>
          </div>
        )}

        {/* 2. DCF & SENSITIVITY MODULE */}
        {activeTab === 'valuation' && (
          <div className="space-y-16 animate-in slide-in-from-bottom-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="text-5xl font-black italic uppercase tracking-tighter">DCF <span className="text-emerald-500">Engine.</span></h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase opacity-50">Free Cash Flow (₹ Cr)</label>
                    <input type="number" value={fcf} onChange={(e) => setFcf(Number(e.target.value))} className="w-full bg-transparent border-b-4 border-emerald-500 text-4xl font-black focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase opacity-50">5Y Growth (%)</label>
                    <input type="number" value={growth} onChange={(e) => setGrowth(Number(e.target.value))} className="w-full bg-transparent border-b-4 border-emerald-500 text-4xl font-black focus:outline-none" />
                  </div>
                </div>
              </div>
              <div className={`p-16 rounded-[4rem] border-8 border-emerald-500/20 flex flex-col justify-center items-center ${darkMode ? 'bg-slate-950' : 'bg-white shadow-2xl'}`}>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Enterprise Value Estimate</p>
                <p className="text-8xl md:text-9xl font-black text-emerald-500 tracking-tighter">₹{calculateDCF()}<span className="text-3xl ml-2">Cr</span></p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xs font-black uppercase tracking-[0.5em] opacity-30 italic">Sensitivity Matrix: WACC vs Growth</p>
              <div className="overflow-hidden rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800">
                <table className="w-full text-xs font-bold">
                  <thead className="bg-slate-100 dark:bg-slate-900">
                    <tr>
                      <th className="p-6 border-r dark:border-slate-800 font-black">WACC ↓ / Growth →</th>
                      {[growth - 2, growth, growth + 2].map(g => <th key={g} className="p-6">{g}%</th>)}
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {[wacc + 1, wacc, wacc - 1].map(w => (
                      <tr key={w} className="border-t dark:border-slate-800">
                        <td className="p-6 bg-slate-100 dark:border-slate-900 border-r dark:border-slate-800 font-black">{w}%</td>
                        {[growth - 2, growth, growth + 2].map(g => (
                          <td key={g} className={`p-6 transition-all ${w === wacc && g === growth ? 'bg-emerald-500/20 text-emerald-500 text-xl font-black shadow-inner' : 'opacity-60'}`}>
                            ₹{calculateDCF(g, w)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. COMPS ANALYSIS */}
        {activeTab === 'comps' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in zoom-in-95 duration-700">
            <div className="space-y-10">
              <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Market <br/><span className="text-blue-500">Multiples.</span></h3>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black uppercase opacity-50 block mb-3">Target EBITDA (₹ Cr)</label>
                  <input type="number" value={ebitda} onChange={(e) => setEbitda(Number(e.target.value))} className="w-full bg-transparent border-b-4 border-blue-500 text-5xl font-black focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase opacity-50 block mb-3">Industry EV/EBITDA Multiple</label>
                  <input type="number" value={targetMultiple} onChange={(e) => setTargetMultiple(Number(e.target.value))} className="w-full bg-transparent border-b-4 border-blue-500 text-5xl font-black focus:outline-none" />
                </div>
              </div>
            </div>
            <div className={`p-16 rounded-[4rem] border-8 border-blue-500/20 flex flex-col justify-center items-center ${darkMode ? 'bg-slate-900' : 'bg-blue-50/30'}`}>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Relative Market Value</p>
              <p className="text-8xl md:text-9xl font-black text-blue-500 tracking-tighter">₹{calculateComps()}<span className="text-3xl ml-2">Cr</span></p>
              <div className="mt-10 flex gap-4">
                 <span className="text-[10px] font-black px-4 py-2 bg-blue-500 text-white rounded-full uppercase tracking-widest">Public Comps</span>
                 <span className="text-[10px] font-black px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-full uppercase tracking-widest">Precedent Transactions</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. SYNERGY CALCULATOR */}
        {activeTab === 'synergy' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in slide-in-from-right-10 duration-500">
             <div className="space-y-10">
                <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Synergy <br/><span className="text-purple-600">Premium.</span></h3>
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-black uppercase opacity-50 block mb-3">Post-Merger Annual Savings (₹ Cr)</label>
                    <input type="number" value={synergySavings} onChange={(e) => setSynergySavings(Number(e.target.value))} className="w-full bg-transparent border-b-4 border-purple-500 text-5xl font-black focus:outline-none" />
                    <p className="text-[10px] font-bold opacity-40 mt-4 leading-relaxed uppercase">Includes: Supply chain optimization, headcount reduction, and consolidated software licenses.</p>
                  </div>
                </div>
             </div>
             <div className={`p-16 rounded-[4rem] bg-purple-600 text-white shadow-[0_30px_60px_-15px_rgba(147,51,234,0.4)] flex flex-col justify-center items-center`}>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-4">Capitalized Synergy Value</p>
                <p className="text-8xl md:text-9xl font-black tracking-tighter">₹{calculateSynergyValue()}<span className="text-3xl ml-2">Cr</span></p>
                <p className="text-[11px] font-bold mt-8 opacity-70 text-center uppercase tracking-widest">Value added to Enterprise value <br/> based on {wacc}% WACC</p>
             </div>
          </div>
        )}
      </section>

      {/* --- M&A EXECUTION FRAMEWORK --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { step: "01", title: "Deal Structuring", desc: "Optimizing stock vs. asset purchases to minimize tax leakage and regulatory friction.", icon: "📑" },
          { step: "02", title: "Valuation & DCF", desc: "Rigorous financial modeling including DCF and comparable transaction analysis for fair pricing.", icon: "📊" },
          { step: "03", title: "Legal Due Diligence", desc: "Deep-dive audits into IP, environmental liabilities, and hidden corporate litigations.", icon: "🔍" },
          { step: "04", title: "Regulatory Approvals", desc: "Navigating NCLT, CCI, and sectoral clearances for cross-border and domestic deals.", icon: "⚖️" },
          { step: "05", title: "FEMA Compliance", desc: "Ensuring capital flow tracking and RBI reporting for inbound/outbound M&A.", icon: "🌍" },
          { step: "06", title: "IPO Readiness", desc: "Post-merger restructuring to prepare the consolidated entity for public listing.", icon: "📈" },
        ].map((item, i) => (
          <div key={i} className={`p-8 rounded-[2.5rem] border transition-all hover:-translate-y-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
            <div className="flex justify-between items-start mb-6">
              <span className="text-4xl">{item.icon}</span>
              <span className="text-xs font-black text-indigo-500/50 tracking-widest italic">{item.step}</span>
            </div>
            <h4 className="font-black text-2xl mb-3 tracking-tight">{item.title}</h4>
            <p className={`text-sm leading-relaxed font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className={`rounded-[4rem] overflow-hidden ${darkMode ? 'bg-indigo-950/40 border-2 border-indigo-500/20' : 'bg-indigo-950'} text-white shadow-2xl relative`}>
        <div className="p-12 md:p-20 flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-8">
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight italic uppercase">Complex Deal in Sight?</h3>
            <p className="text-xl text-indigo-100/70 leading-relaxed font-medium">
              M&A in India involves multi-layered compliance (Income Tax, SEBI, Companies Act, and FEMA). Get a direct practitioner's perspective before signing the Term Sheet.
            </p>
            <div className="flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-widest text-indigo-400">
              <span className="flex items-center gap-2 underline decoration-2 underline-offset-4">✓ Cross-Border</span>
              <span className="flex items-center gap-2 underline decoration-2 underline-offset-4">✓ NCLT Procedures</span>
              <span className="flex items-center gap-2 underline decoration-2 underline-offset-4">✓ Tax Optimization</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <a 
              href={LINKEDIN_PROFILE} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block px-12 py-6 bg-white text-indigo-950 font-black rounded-3xl hover:scale-110 transition-all shadow-[0_20px_50px_-10px_rgba(255,255,255,0.3)] uppercase tracking-widest text-xs"
            >
              Discuss Your Transaction ↗
            </a>
          </div>
        </div>
        <div className="absolute top-0 right-0 text-[300px] font-black italic opacity-[0.03] select-none pointer-events-none translate-x-1/4 -translate-y-1/4">M&A</div>
      </section>

      {/* --- DISCLAIMER --- */}
      <div className={`p-10 rounded-[2.5rem] border-2 border-dashed ${darkMode ? 'bg-slate-900/50 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-500'} text-xs text-center font-medium leading-relaxed max-w-4xl mx-auto italic opacity-60 uppercase tracking-tighter`}>
        This section provides a general framework for M&A in India and does not constitute financial or legal advice. Valuation and legal procedures vary significantly based on industry sectors, target size, and listed status.
      </div>
    </div>
  );
};

export default MnaSection;