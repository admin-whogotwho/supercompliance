import React from 'react'; // <--- IMPORTANT: Import React
import SEO from './SEO'; // <--- IMPORTANT: Import SEO component

// MnaSection: Provides information about Mergers & Acquisitions.
const MnaSection = ({ darkMode }) => {
  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-md`}>
      <SEO
        title="Mergers & Acquisitions"
        description="Comprehensive guide to M&A regulations and compliance in India"
        keywords="M&A, mergers, acquisitions, India, compliance"
      />

      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
        <span className="mr-3 text-blue-500">💼</span> Mergers & Acquisitions
      </h2>

      <div className={`prose max-w-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="mb-4 leading-relaxed">
          Mergers and acquisitions (M&A) are transactions in which the ownership of companies or their operating units are transferred or consolidated with other entities. As aspects of corporate finance, M&A deals can enable companies to grow or shrink, and change the nature of their business or competitive position.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">Key Aspects of M&A:</h3>
        <ul className="list-disc pl-8 space-y-3">
          <li><strong>Strategic Rationale:</strong> Market expansion, synergy creation, cost reduction, diversification.</li>
          <li><strong>Deal Structuring:</strong> Stock purchase, asset purchase, statutory merger, tender offers.</li>
          <li><strong>Valuation:</strong> Discounted Cash Flow (DCF), comparable company analysis, precedent transactions.</li>
          <li><strong>Due Diligence:</strong> Financial, legal, operational, environmental, and intellectual property reviews.</li>
          <li><strong>Regulatory Approvals:</strong> Competition commission approvals, sectoral regulatory clearances.</li>
        </ul>

        <div className={`mt-8 p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} border ${darkMode ? 'border-gray-600' : 'border-blue-200'} shadow-inner`}>
          <p className={`italic ${darkMode ? 'text-gray-300' : 'text-blue-800'}`}>
            For detailed legal procedures and current market trends, please consult with M&A legal and financial advisors. This section provides general information and does not constitute professional advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MnaSection; // <--- Export the component
