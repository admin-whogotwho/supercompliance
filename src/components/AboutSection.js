import React from 'react';
import SEO from './SEO';

const AboutSection = ({ darkMode }) => {
  const LINKEDIN_PROFILE = "https://www.linkedin.com/in/saurabh-jain-b5467a3a/";

  return (
    <div className="space-y-16 pb-24">
      <SEO
        title="About WhoGotWho & Saurabh Jain | FDI & M&A Practitioner"
        description="Learn about WhoGotWho.com's mission and the professional profile of Saurabh Jain, specializing in FDI, M&A, and SEBI compliance in India."
      />

      {/* --- HERO: MISSION & IDENTITY --- */}
      <section className="pt-10 space-y-8">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Our Mission</span>
        </div>
        <h2 className={`text-4xl md:text-6xl font-black tracking-tighter italic ${darkMode ? 'text-white' : 'text-indigo-950'}`}>
          DECODING <br/> <span className="text-blue-500 not-italic">REGULATORY TRUTH.</span>
        </h2>
        <p className={`max-w-3xl text-xl font-medium leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <span className="text-blue-500 font-bold">WhoGotWho.com</span> is a practitioner-led utility built to simplify complex 
          Indian regulatory frameworks. We bridge the gap between global capital and Indian compliance.
        </p>
      </section>

      {/* --- PRACTITIONER PROFILE: THE LEADERSHIP --- */}
      <section className={`rounded-[3.5rem] overflow-hidden ${darkMode ? 'bg-slate-900 border border-slate-800' : 'bg-indigo-950'} text-white shadow-2xl`}>
        <div className="p-10 md:p-20 flex flex-col lg:flex-row items-center gap-16">
          <div className="relative flex-shrink-0">
             <div className="w-48 h-48 bg-gradient-to-br from-blue-600 to-emerald-400 rounded-[3rem] flex items-center justify-center text-6xl font-black rotate-3 shadow-2xl">SJ</div>
             <div className="absolute -bottom-2 -right-2 bg-emerald-500 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">Partner</div>
          </div>
          <div className="space-y-6 flex-1 text-center lg:text-left">
            <h3 className="text-4xl font-black tracking-tight">Saurabh Jain, <span className="text-blue-400">CA & CS</span></h3>
            <p className="text-lg text-indigo-100/70 leading-relaxed max-w-2xl">
              Specializing in Global FDI and Strategic Advisory, Saurabh guides manufacturers from East Asia and service firms from Europe 
              through the intricate pathways of Indian entry, FEMA precision, and IPO readiness.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {['Joint Ventures', 'FDI/ODI', 'M&A Advisory', 'SEBI/IPO', 'NCLT Litigation'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">{tag}</span>
              ))}
            </div>
            <div className="pt-4">
               <a href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:scale-105 transition-all">
                  Full Professional Bio ↗
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- RECENT IMPACT: CASE STUDIES (Visualized) --- */}
      <section className="space-y-8">
        <h3 className={`text-2xl font-black uppercase tracking-tighter italic ${darkMode ? 'text-white' : 'text-slate-900'}`}>Recent Impactful Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Taiwanese FDI", detail: "50 Cr Factory setup in Chennai under Automatic Route.", icon: "🇹🇼" },
            { title: "Chinese Inbound", detail: "Secured Govt approval for FDI within just 8 months.", icon: "🇨🇳" },
            { title: "Singapore SaaS", detail: "End-to-end India entry & digital filings in 21 days.", icon: "🇸🇬" },
            { title: "EU Compliance", detail: "Restructured FEMA flows; avoided ₹50L in penalties.", icon: "🇪🇺" },
            { title: "MSME Scale", detail: "IPO readiness & strategic structuring for SEBI listing.", icon: "📈" }
          ].map((caseStudy, i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] border transition-all hover:shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-lg'}`}>
              <div className="text-3xl mb-4">{caseStudy.icon}</div>
              <h4 className="font-black text-lg mb-2">{caseStudy.title}</h4>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{caseStudy.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- DISCLAIMER --- */}
      <section className={`p-8 rounded-[2.5rem] border-2 border-dashed ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-red-50/50 border-red-100'}`}>
        <div className="flex gap-4">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className={`font-black text-sm uppercase tracking-widest mb-1 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Regulatory Disclaimer</h4>
            <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              The information provided on WhoGotWho.com is for general informational purposes only and does not constitute legal, financial, or professional advice. 
              Always consult with qualified practitioners for specific regulatory filings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;