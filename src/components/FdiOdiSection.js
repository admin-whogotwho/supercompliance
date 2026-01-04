import React, { useState, useEffect } from 'react';
import SEO from './SEO';

const FdiCalculator = ({ darkMode }) => {
  const [fdiSector, setFdiSector] = useState('manufacturing');
  const [fdiPercentage, setFdiPercentage] = useState(100);
  const [isLandBorder, setIsLandBorder] = useState(false);
  const [instrument, setInstrument] = useState('equity');
  const [fdiResult, setFdiResult] = useState(null);

  const calculateFDI = () => {
    let status = "Allowed";
    let route = "100% Automatic";
    let color = "text-emerald-500";
    let logicNote = "";
    let checklist = ["KYC of Investor", "UBO Declaration", "Valuation Certificate (DCF)"];

    // 1. Prohibited Sector Check
    const prohibited = ['lottery', 'gambling', 'chit_fund', 'tobacco', 'real_estate_business'];
    if (prohibited.includes(fdiSector)) {
      setFdiResult({
        status: "PROHIBITED",
        route: "FDI Not Permitted",
        color: "text-red-500",
        note: "This sector is on the FDI Negative List. No foreign investment is permitted under any route.",
        checklist: []
      });
      return;
    }

    // 2. Press Note 3 Logic
    if (isLandBorder) {
      status = "RESTRICTED";
      route = "Government Approval Required";
      color = "text-orange-500";
      logicNote = "Mandatory prior Government clearance under Press Note 3 (2020) due to land-border sharing status.";
    } else {
      // 3. Sector Specific Mastery
      if (fdiSector === 'defence') {
        if (fdiPercentage <= 74) route = "Automatic Route";
        else { route = "Govt Route"; logicNote = "Beyond 74% requires modern technology justification."; }
      } else if (fdiSector === 'insurance') {
        if (fdiPercentage <= 74) route = "Automatic Route";
        else { status = "EXCEEDED"; color = "text-red-500"; logicNote = "Cap is 74% per Insurance Act."; }
      } else if (fdiSector === 'ecom_inventory') {
        status = "PROHIBITED";
        color = "text-red-500";
        logicNote = "FDI in Inventory-based E-commerce is not permitted. Only Marketplace models allowed.";
      } else if (fdiSector === 'broadcasting' && fdiPercentage > 49) {
        route = "Government Route";
      } else {
        logicNote = "100% Automatic Route permitted for most manufacturing and tech activities.";
      }
    }

    setFdiResult({ status, route, note: logicNote, color, checklist });
  };

  useEffect(calculateFDI, [fdiSector, fdiPercentage, isLandBorder]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* INPUT PANEL */}
        <div className={`p-8 rounded-[3rem] ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'} border space-y-6 shadow-inner`}>
          <h3 className="text-xl font-black italic tracking-tighter uppercase">Inbound Setup</h3>
          
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">Target Sector</label>
              <select value={fdiSector} onChange={(e) => setFdiSector(e.target.value)} className={`w-full p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} font-bold focus:ring-2 ring-blue-500`}>
                <optgroup label="Popular Sectors">
                  <option value="manufacturing">Manufacturing / Industrial</option>
                  <option value="it_software">IT / SaaS / Software</option>
                  <option value="ecommerce_market">E-commerce (Marketplace)</option>
                  <option value="defence">Defence Production</option>
                </optgroup>
                <optgroup label="Regulated/Restricted">
                  <option value="insurance">Insurance / Intermediaries</option>
                  <option value="broadcasting">Broadcasting (News)</option>
                  <option value="ecom_inventory">E-commerce (Inventory)</option>
                  <option value="real_estate_business">Real Estate Business</option>
                  <option value="gambling">Lottery / Gambling</option>
                </optgroup>
              </select>
            </div>

            <div className={`p-5 rounded-2xl border flex items-center justify-between transition-all ${isLandBorder ? 'bg-orange-500/10 border-orange-500' : 'bg-slate-200/20 border-transparent'}`}>
              <div className="flex items-center gap-3">
                <span className="text-xl">🚩</span>
                <span className="text-xs font-black uppercase">Land Border / PN3 Country?</span>
              </div>
              <input type="checkbox" checked={isLandBorder} onChange={(e) => setIsLandBorder(e.target.checked)} className="w-6 h-6 rounded-lg accent-orange-600 cursor-pointer" />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">Equity Stake: {fdiPercentage}%</label>
              <input type="range" min="1" max="100" value={fdiPercentage} onChange={(e) => setFdiPercentage(e.target.value)} className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </div>
          </div>
        </div>

        {/* RESULT PANEL */}
        <div className={`p-10 rounded-[3rem] border flex flex-col justify-center relative overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white shadow-2xl'}`}>
          {fdiResult && (
            <div className="space-y-6">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${fdiResult.color} border-current`}>{fdiResult.status}</span>
              <h4 className="text-5xl font-black tracking-tighter leading-none">{fdiResult.route}</h4>
              <p className="text-base font-medium text-slate-500 leading-relaxed">{fdiResult.note}</p>
              
              {fdiResult.checklist.length > 0 && (
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Practitioner's Checklist</p>
                  <div className="grid grid-cols-1 gap-2">
                    {fdiResult.checklist.map(c => <div key={c} className="flex items-center gap-2 text-xs font-bold"><span className="text-emerald-500">✔</span> {c}</div>)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

const OdiCalculator = ({ darkMode }) => {
  const [netWorth, setNetWorth] = useState(100);
  const [commitment, setCommitment] = useState(40);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const limit = netWorth * 4;
    const isAllowed = commitment <= limit;
    const ratio = (commitment / limit) * 100;
    setResult({ limit, isAllowed, utilization: ratio.toFixed(1) });
  }, [netWorth, commitment]);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`p-8 rounded-[3rem] ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'} border space-y-8 shadow-inner`}>
          <h3 className="text-xl font-black italic tracking-tighter uppercase">Outbound (OI Rules 2022)</h3>
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">Indian Entity Net Worth (Cr)</label>
              <input type="number" value={netWorth} onChange={(e) => setNetWorth(Number(e.target.value))} className={`w-full p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} font-bold`} />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">Total Financial Commitment (Cr)</label>
              <input type="number" value={commitment} onChange={(e) => setCommitment(Number(e.target.value))} className={`w-full p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} font-bold`} />
            </div>
          </div>
        </div>

        <div className={`p-10 rounded-[3rem] border flex flex-col justify-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white shadow-2xl'}`}>
          {result && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Limit Utilization</span>
                <span className={`font-black ${result.isAllowed ? 'text-emerald-500' : 'text-red-500'}`}>{result.utilization}%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1">
                <div className={`h-full rounded-full transition-all duration-1000 ${result.isAllowed ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${Math.min(result.utilization, 100)}%` }} />
              </div>
              <div className="space-y-4">
                <h4 className="text-5xl font-black tracking-tighter leading-tight">
                  {result.isAllowed ? 'Automatic' : 'Approval'} <span className="text-blue-500">Route.</span>
                </h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {result.isAllowed 
                    ? `Compliant with the 400% Net Worth threshold. Reporting via Form OI-Part I to AD Bank within 30 days.`
                    : `Threshold exceeded (${result.limit} Cr). Prior RBI approval is mandatory under Rule 10 of OI Rules.`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

const FdiOdiSection = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('fdi');

  return (
    <div className="space-y-12 pb-24">
      <SEO title="FEMA Compliance Utility | FDI/ODI Regulator 2026" />

      {/* TABS */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6">
        <div className="bg-slate-200/50 dark:bg-slate-800/50 p-2 rounded-3xl flex gap-2 border border-slate-200 dark:border-slate-800">
          <button onClick={() => setActiveTab('fdi')} className={`px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'fdi' ? 'bg-white dark:bg-slate-700 shadow-xl scale-105' : 'opacity-40 hover:opacity-100'}`}>Inbound (FDI)</button>
          <button onClick={() => setActiveTab('odi')} className={`px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'odi' ? 'bg-white dark:bg-slate-700 shadow-xl scale-105' : 'opacity-40 hover:opacity-100'}`}>Outbound (ODI)</button>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Engine</p>
          <p className="text-xs font-bold opacity-50 uppercase tracking-tighter">Master Directions 2026 Ready</p>
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'fdi' ? <FdiCalculator darkMode={darkMode} /> : <OdiCalculator darkMode={darkMode} />}
      </div>

      {/* MASTER DATA INDICATORS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "PN3 Clearance", val: "8-12 Months", desc: "Average time for border country FDI" },
          { label: "ODI Reporting", val: "30 Days", desc: "Mandatory timeline for Form OI" },
          { label: "FC-GPR Filing", val: "Delayed Fine", desc: "LPR (Late Submission Fees) apply" }
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-lg'}`}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{stat.label}</p>
            <p className="text-xl font-black text-blue-600">{stat.val}</p>
            <p className="text-xs font-medium text-slate-400 mt-2">{stat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FdiOdiSection;