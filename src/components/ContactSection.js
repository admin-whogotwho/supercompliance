import React from 'react';
import SEO from './SEO';

const ContactSection = ({ darkMode }) => {
  const LINKEDIN_PROFILE = "https://www.linkedin.com/in/saurabh-jain-b5467a3a/";

  return (
    <div className="space-y-12 pb-24">
      <SEO 
        title="Contact WhoGotWho | Saurabh Jain - India Compliance Advisory" 
        description="Reach out to WhoGotWho for M&A, FDI, and SEBI compliance inquiries. Connect with Saurabh Jain for direct practitioner-led advisory."
      />

      {/* --- HEADER --- */}
      <section className="pt-10 space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Direct Channels</span>
        </div>
        <h2 className={`text-5xl md:text-6xl font-black tracking-tighter italic ${darkMode ? 'text-white' : 'text-indigo-950'}`}>
          GET IN <span className="text-blue-500 not-italic">TOUCH.</span>
        </h2>
        <p className={`max-w-2xl text-lg font-medium leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Have questions regarding M&A, FDI, or SEBI compliance in India? Choose the channel that best fits your inquiry.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-2">
        
        {/* --- PRIMARY: LINKEDIN & FAST CONTACT --- */}
        <div className={`p-8 md:p-10 rounded-[3rem] flex flex-col justify-between transition-all hover:shadow-2xl ${darkMode ? 'bg-blue-600/10 border-blue-500/20' : 'bg-blue-50 border-blue-100 shadow-xl'}`}>
          <div className="space-y-6">
            <div className="w-14 h-14 bg-[#0077b5] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
              <span className="font-black">in</span>
            </div>
            <h3 className="text-3xl font-black tracking-tight">Priority Advisory</h3>
            <p className={`text-base leading-relaxed ${darkMode ? 'text-blue-200/70' : 'text-blue-900/70'}`}>
              For rapid responses regarding **Factory Setups, FDI Approvals, or M&A Strategy**, messaging via LinkedIn is the most efficient route.
            </p>
            
            <div className="space-y-4 pt-4 border-t border-blue-200/30">
               <div className="flex items-center gap-3">
                 <span className="text-xl">📧</span>
                 <a href="mailto:jainsaurabh@bsdgroup.in" className="font-bold hover:underline">jainsaurabh@bsdgroup.in</a>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-xl">📞</span>
                 <span className="font-bold">+91-8108000971</span>
               </div>
            </div>
          </div>
          <div className="pt-10">
            <a 
              href={LINKEDIN_PROFILE} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-4 px-8 py-4 bg-[#0077b5] text-white font-black rounded-2xl hover:scale-105 transition-all shadow-lg"
            >
              Message Saurabh Jain ↗
            </a>
          </div>
        </div>

        {/* --- SECONDARY: REGULATORY RESOURCES --- */}
        <div className={`p-8 md:p-10 rounded-[3rem] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
          <h3 className="text-2xl font-black tracking-tight mb-6">Official Resources</h3>
          <p className={`text-sm mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Monitor live regulatory updates from India's primary governing bodies:
          </p>
          
          <div className="space-y-4">
            {[
              { name: "Reserve Bank of India (RBI)", url: "https://www.rbi.org.in", icon: "🏦" },
              { name: "SEBI (Market Regulator)", url: "https://www.sebi.gov.in", icon: "📊" },
              { name: "DPIIT (FDI Policy)", url: "https://dpiit.gov.in", icon: "🇮🇳" }
            ].map((link) => (
              <a 
                key={link.name}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
              >
                <span className="font-bold text-sm flex items-center gap-3">
                  <span>{link.icon}</span> {link.name}
                </span>
                <span className="text-blue-500 text-xs font-black">VISIT</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* --- NOTE/DISCLAIMER --- */}
      <section className={`p-6 rounded-[2.5rem] border-2 border-dashed ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-yellow-50/50 border-yellow-100'}`}>
        <div className="flex gap-4 items-center">
          <span className="text-2xl">⚖️</span>
          <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <strong className="text-yellow-600 dark:text-yellow-500">Professional Note:</strong> For specific compliance questions, always consult with a qualified professional. Same-day priority is given to global FDI and M&A inquiries.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;