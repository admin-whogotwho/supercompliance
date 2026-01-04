import React from 'react';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`py-12 mt-20 border-t ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
      <div className="container mx-auto px-6 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8 text-[10px] font-black uppercase tracking-widest">
          <span>&copy; {new Date().getFullYear()} WhoGotWho.com</span>
          <a href="/privacy" className="hover:text-indigo-500 transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-indigo-500 transition-colors">Terms</a>
          <a href="/disclaimer" className="hover:text-indigo-500 transition-colors">Disclaimer</a>
        </div>
        <p className="text-[10px] max-w-2xl mx-auto leading-loose opacity-60 uppercase font-bold">
          The information and calculators provided are for illustrative purposes only and do not constitute legal or financial advice. M&A and Regulatory compliance in India are subject to frequent changes.
        </p>
      </div>
    </footer>
  );
};

export default Footer;