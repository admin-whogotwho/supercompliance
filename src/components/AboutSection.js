import React from 'react';
import SEO from './SEO'; // Ensure SEO is imported

// AboutSection: Provides information about the website's mission, disclaimers, and a professional profile.
const AboutSection = ({ darkMode }) => {
  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-md`}>
      {/* SEO component with specific metadata for the About Us page */}
      <SEO
        title="About WhoGotWho.com & Saurabh Jain's Profile"
        description="Learn about WhoGotWho.com's mission, disclaimers, and the professional profile of Saurabh Jain, specializing in FDI, M&A, and SEBI compliance in India."
        keywords="about us, WhoGotWho, Saurabh Jain, mission, disclaimer, corporate compliance, legal information, financial advisory, India, FEMA, FDI, ODI, IPO Readiness, Digital Governance, M&A Advisory"
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

        {/* Saurabh Jain's Profile Brief */}
        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">About Saurabh Jain</h3>
        <p className="leading-relaxed mb-4">
          Saurabh Jain is a Partner at BSD & Associates Chartered Accountant and Company Secretary, specializing in Global FDI and Strategic Advisory. He guides global clients, from East Asian manufacturers to European service firms, in successfully entering and expanding their operations in India.
        </p>
        <p className="leading-relaxed">
          His expertise simplifies complex legal, regulatory, and compliance pathways across various areas:
        </p>
        <ul className="list-disc pl-8 space-y-2 mt-3">
          <li><strong>FDI-driven Joint Ventures & Factory Setups:</strong> Establishing new manufacturing and operational footprints.</li>
          <li><strong>Service Entity Incorporation:</strong> Specializing in Tech, SaaS, and Financial Services.</li>
          <li><strong>Merger & Acquisition (M&A) Advisory:</strong> Strategic guidance and execution for inorganic growth opportunities.</li>
          <li><strong>Turnkey Compliance Execution:</strong> Comprehensive management of RBI, GST, ROC, and Audits.</li>
          <li><strong>IPO Readiness & Strategic Structuring:</strong> Preparing companies for public listing and sustainable growth.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">Key Expertise & Impact</h3>
        <ul className="list-disc pl-8 space-y-2 mt-3">
          <li>Cultural Fluency: Proven ability to navigate expectations across Chinese, Taiwanese, and Western business cultures.</li>
          <li>FEMA Precision: Expert handling of RBI regulations, banking channels, and capital flow tracking, end-to-end.</li>
          <li>Clarity & Speed: Structured processes, transparent communication, and rapid, same-day responses.</li>
          <li>Governance & Automation: Bridging the gap between legal compliance and modern technology for efficiency.</li>
        </ul>
        <p className="leading-relaxed mt-4">
          **Recent Impactful Work includes:**
        </p>
        <ul className="list-disc pl-8 space-y-2 mt-3">
          <li>Helped a Taiwanese client establish a 50 Cr factory in Chennai under the FDI Automatic Route.</li>
          <li>Secured Government approval for FDI from China to India within just 8 months.</li>
          <li>Managed a Singapore tech firm's India entry and all digital filings, completed within 21 days.</li>
          <li>Restructured FEMA flows for a European company, enabling them to avoid ₹50 Lakh in penalties.</li>
          <li>Guided IPO readiness for an Indian MSME, successfully scaling into SEBI-regulated territory.</li>
        </ul>

        {/* Original Disclaimer */}
        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">Disclaimer</h3>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-red-50'} border ${darkMode ? 'border-gray-600' : 'border-red-200'} shadow-inner`}>
          <p className={darkMode ? "text-red-300" : "text-red-700"}><strong className="text-red-500">Important:</strong> The information provided on this website is for general informational purposes only and does not constitute legal, financial, or professional advice. Always consult with qualified professionals for specific situations.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
