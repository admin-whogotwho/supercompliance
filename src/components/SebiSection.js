import React, { useState, useEffect } from 'react';
import SEO from './SEO';

const SebiSection = ({ darkMode }) => {
  const [entityType, setEntityType] = useState('listed_company');
  const [transactionType, setTransactionType] = useState('takeover_disclosure');
  const [sharesPercentage, setSharesPercentage] = useState(5);
  const [marketCapRank, setMarketCapRank] = useState(250); // For BRSR/ESG logic
  const [result, setResult] = useState(null);

  const calculateSebi = () => {
    let status = "Compliant";
    let color = "text-emerald-500";
    let alerts = [];
    let regs = [];
    let timeline = "";

    // 1. SAST (Takeover) Logic - 2026 Standards
    if (transactionType === 'takeover_disclosure') {
      regs.push("SEBI (SAST) Regulations, 2011");
      if (sharesPercentage >= 25) {
        status = "TRIGGER TRIGGERED";
        color = "text-red-500";
        alerts.push("Mandatory Open Offer triggered (Reg 3).", "Public Announcement (PA) required within 5 working days.", "Offer size: Min 26% of total voting capital.");
      } else if (sharesPercentage >= 5) {
        status = "DISCLOSURE REQUIRED";
        color = "text-orange-500";
        alerts.push("Initial disclosure under Reg 29(1).", "Submit to SE and Target Co within 2 working days.");
      } else {
        alerts.push("Below 5% threshold. No immediate SAST disclosure.");
      }
    }

    // 2. PIT (Insider Trading) - 2026 Standards
    if (transactionType === 'insider_trading_disclosure') {
      regs.push("SEBI (PIT) Regulations, 2015");
      status = "MONITORING";
      color = "text-blue-500";
      alerts.push("SDD (Structured Digital Database) entry mandatory.", "Trading Window closure applies during UPSI (Financials/M&A).");
      if (sharesPercentage > 0) {
        alerts.push("Continual Disclosure (Form C) if trade value > ₹10 Lakhs in a quarter.");
      }
    }

    // 3. LODR & ESG - High Complexity Logic
    if (transactionType === 'financial_results') {
      regs.push("SEBI (LODR) Regulations, 2015", "BRSR Framework");
      timeline = "45 Days (Quarterly) / 60 Days (Annual)";
      alerts.push("Board intimation 5 working days in advance.", "Audit Committee review is mandatory.");
      
      // ESG/BRSR Core Logic (New for 2026)
      if (marketCapRank <= 500) {
        status = "BRSR CORE MANDATORY";
        color = "text-purple-500";
        alerts.push("Top 500 entity: Reasonable Assurance of 'BRSR Core' required for FY 25-26.");
      }
      if (marketCapRank <= 1000) {
        alerts.push("Mandatory ESG Value Chain disclosures (Reg 34) for top 1000.");
      }
    }

    // 4. RPT (Related Party) New 2026 Rules
    if (transactionType === 'rpt_approval') {
      regs.push("Reg 23 of LODR (2025-26 Amendment)");
      status = "RESTRICTED";
      color = "text-yellow-600";
      alerts.push("Material RPT threshold: Lower of ₹1000 Cr or 10% of annual turnover.", "Prior Audit Committee approval mandatory (only independent members vote).");
    }

    setResult({ status, color, alerts, regs, timeline });
  };

  useEffect(calculateSebi, [entityType, transactionType, sharesPercentage, marketCapRank]);

  return (
    <div className={`p-8 rounded-[3rem] border transition-all duration-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white shadow-2xl'}`}>
      <SEO title="SEBI Compliance Hub 2026" />
      
      <div className="flex flex-col md:flex-row gap-12">
        {/* INPUT: COMPLIANCE CONFIGURATOR */}
        <div className="w-full md:w-1/2 space-y-8">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Compliance <span className="text-purple-600">Engine</span></h2>
            <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Master Directions 2026 v4.2</p>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 block mb-2 group-hover:text-purple-500 transition-colors">Target Framework</label>
              <select 
                value={transactionType} 
                onChange={(e) => setTransactionType(e.target.value)}
                className={`w-full p-4 rounded-2xl border-2 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-100'} font-bold focus:border-purple-500 outline-none transition-all`}
              >
                <option value="takeover_disclosure">SAST: Takeover & Acquisitions</option>
                <option value="insider_trading_disclosure">PIT: Insider Trading / SDD</option>
                <option value="financial_results">LODR: Financials & BRSR/ESG</option>
                <option value="rpt_approval">LODR: Related Party (RPT)</option>
              </select>
            </div>

            {transactionType === 'financial_results' && (
              <div className="animate-in slide-in-from-left duration-300">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 block mb-2">Market Cap Rank (Top X)</label>
                <input 
                  type="range" min="1" max="2000" value={marketCapRank} 
                  onChange={(e) => setMarketCapRank(Number(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-[10px] font-bold mt-2 opacity-60">
                  <span>Top 100 (Blue Chip)</span>
                  <span>Rank: {marketCapRank}</span>
                </div>
              </div>
            )}

            {(transactionType.includes('disclosure')) && (
              <div className="animate-in slide-in-from-left duration-300">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 block mb-2">Shareholding: {sharesPercentage}%</label>
                <input 
                  type="range" min="0" max="100" value={sharesPercentage} 
                  onChange={(e) => setSharesPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* OUTPUT: REAL-TIME ADVISORY */}
        <div className={`w-full md:w-1/2 p-10 rounded-[2.5rem] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'} relative overflow-hidden`}>
          {result && (
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-start">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border-2 ${result.color} border-current uppercase`}>
                  {result.status}
                </span>
                <span className="text-3xl">⚖️</span>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Directives & Actions</p>
                <div className="space-y-3">
                  {result.alerts.map((alert, i) => (
                    <div key={i} className="flex gap-3 text-sm font-bold leading-tight">
                      <span className="text-purple-500">▶</span> {alert}
                    </div>
                  ))}
                </div>
              </div>

              {result.timeline && (
                <div className={`p-4 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-white shadow-sm'} border-l-4 border-purple-500`}>
                  <p className="text-[10px] font-black uppercase opacity-50">Statutory Timeline</p>
                  <p className="text-lg font-black tracking-tight">{result.timeline}</p>
                </div>
              )}

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <p className="text-[10px] font-black uppercase opacity-40 mb-2">Legal References</p>
                <div className="flex flex-wrap gap-2">
                  {result.regs.map(r => <span key={r} className="text-[9px] bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-md font-bold">{r}</span>)}
                </div>
              </div>
            </div>
          )}
          
          {/* Subtle background decoration */}
          <div className="absolute -bottom-10 -right-10 text-9xl font-black opacity-[0.03] select-none uppercase italic">SEBI</div>
        </div>
      </div>

      

      {/* FOOTER INFO TILES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
        {[
          { icon: "🛡️", title: "SDD Compliance", desc: "Structured Digital Database logs mandatory for all UPSI." },
          { icon: "🌍", title: "ESG/BRSR", desc: "Core assurance required for Top 500 listed entities." },
          { icon: "⚡", title: "T+0 Settlement", desc: "Shortened cycles affecting margin and trade reporting." },
          { icon: "🚨", title: "Penalty Matrix", desc: "Violations can trigger Section 15HB proceedings." }
        ].map((item, idx) => (
          <div key={idx} className={`p-5 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-transparent'} hover:scale-105 transition-transform cursor-pointer`}>
            <div className="text-2xl mb-2">{item.icon}</div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">{item.title}</h4>
            <p className="text-[10px] font-medium opacity-60 leading-normal">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SebiSection;