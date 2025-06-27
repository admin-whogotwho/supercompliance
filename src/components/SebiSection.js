import React, { useState } from 'react';
import SEO from './SEO';

// SebiSection: Provides a calculator for SEBI compliance based on entity and transaction type.
const SebiSection = ({ darkMode }) => {
  const [entityType, setEntityType] = useState('listed_company');
  const [transactionType, setTransactionType] = useState('board_meeting_intimation');
  const [sharesPercentage, setSharesPercentage] = useState(5);
  const [result, setResult] = useState('');

  const calculateSebi = () => {
    let msg = `<div class="${darkMode ? 'text-gray-200' : 'text-gray-800'}">`;
    msg += `<h3 class="text-xl font-bold mb-4 ${darkMode ? 'text-purple-300' : 'text-purple-700'}">SEBI Compliance Result</h3>`;
    msg += `<p><strong>Entity:</strong> ${entityType.replace(/_/g, ' ').toUpperCase()}</p>`;
    msg += `<p><strong>Transaction:</strong> ${transactionType.replace(/_/g, ' ').toUpperCase()}</p>`;

    if (['takeover_disclosure', 'insider_trading_disclosure'].includes(transactionType)) {
      msg += `<p><strong>Shareholding:</strong> ${sharesPercentage}%</p>`;
    }

    if (entityType === 'listed_company') {
      switch(transactionType) {
        case 'takeover_disclosure':
          if (sharesPercentage >= 25) {
            msg += `<p class="text-red-500 font-bold mt-2">Mandatory open offer triggered (25% threshold)</p>`;
            msg += `<ul class="list-disc pl-8 mt-2 space-y-1 text-sm">
              <li>Public announcement within 5 working days</li>
              <li>Detailed disclosure in letter of offer</li>
              <li>Minimum offer period of 10 working days</li>
            </ul>`;
          } else if (sharesPercentage >= 5) {
            msg += `<p class="text-orange-500 font-bold mt-2">Disclosure required under SAST Regulations</p>`;
            msg += `<ul class="list-disc pl-8 mt-2 space-y-1 text-sm">
              <li>Disclosure to company and stock exchanges within 2 working days</li>
              <li>Continual disclosure for every 2% change thereafter (on acquisition or disposal)</li>
              </ul>`;
          } else {
            msg += `<p class="text-green-500 font-bold mt-2">No disclosure requirement under SAST for this threshold</p>`;
          }
          break;

        case 'insider_trading_disclosure':
          msg += `<p class="text-blue-500 font-bold mt-2">PIT Regulations apply</p>`;
          if (sharesPercentage > 0.25 || sharesPercentage === 0) {
            msg += `<ul class="list-disc pl-8 mt-2 space-y-1 text-sm">
              <li>Initial disclosure required if becoming KMP/promoter (holding >0.25% equity)</li>
              <li>Continual disclosure for trades exceeding ₹10 lakhs in value over a quarter</li>
              <li>Trading window restrictions apply during unpublished price sensitive information (UPSI) periods</li>
            </ul>`;
          }
          break;

        case 'board_meeting_intimation':
          msg += `<p class="text-blue-500 font-bold mt-2">LODR Regulations apply</p>`;
          msg += `<ul class="list-disc pl-8 mt-2 space-y-1 text-sm">
            <li>Intimate stock exchanges at least 5 working days in advance (for financial results, dividend, etc.)</li>
            <li>Disclose outcome within 30 minutes of meeting conclusion to stock exchanges</li>
          </ul>`;
          break;

        case 'financial_results':
          msg += `<p class="text-blue-500 font-bold mt-2">LODR Regulations apply</p>`;
          msg += `<ul class="list-disc pl-8 mt-2 space-y-1 text-sm">
            <li>Submit quarterly/half-yearly/annual financial results within prescribed timelines</li>
            <li>Publish extracts in newspapers</li>
            <li>Mandatory review by Audit Committee and approval by Board of Directors</li>
          </ul>`;
          break;
        default:
          msg += `<p class="text-orange-500 font-bold mt-2">General SEBI compliance requirements apply</p>`;
      }
    } else if (entityType === 'investor') {
      if (transactionType === 'takeover_disclosure' && sharesPercentage >= 5) {
        msg += `<p class="text-orange-500 font-bold mt-2">Disclosure required under SAST Regulations (Acquirer)</p>`;
        msg += `<p class="mt-2 text-sm">Submit disclosure to target company and stock exchanges within 2 working days of acquisition/disposal.</p>`;
      } else if (transactionType === 'insider_trading_disclosure' && sharesPercentage > 0.25) {
        msg += `<p class="text-blue-500 font-bold mt-2">PIT Regulations apply (Designated Person / Promoter)</p>`;
        msg += `<p class="mt-2 text-sm">Initial disclosure required if holding >0.25% or upon becoming a designated person. Continual disclosure for trades exceeding ₹10 lakhs.</p>`;
      } else {
        msg += `<p class="text-green-500 font-bold mt-2">No specific disclosure requirement for this threshold/type for Investor.</p>`;
      }
    } else if (entityType === 'intermediary') {
      msg += `<p class="text-blue-500 font-bold mt-2">Intermediaries are subject to specific SEBI regulations.</p>`;
      msg += `<p class="mt-2 text-sm">This includes regulations for Stock Brokers, Merchant Bankers, Registrars, etc. and general obligations under LODR and PIT if applicable.</p>`;
    }

    msg += `<p class="mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}">Refer to SEBI (Substantial Acquisition of Shares and Takeovers) Regulations, 2011, SEBI (Prohibition of Insider Trading) Regulations, 2015 and SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015 for complete details.</p>`;
    msg += `</div>`;

    setResult(msg);
  };

  return (
    <div className={`rounded-xl ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-md overflow-hidden`}>
      <SEO
        title="SEBI Compliances"
        description="Calculators and guides for SEBI regulations in India"
        keywords="SEBI, compliance, India, regulations"
      />

      <div className="p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
          <span className="mr-3 text-purple-500">⚖️</span> SEBI Compliance Calculator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-inner`}>
            <h3 className="text-xl font-semibold mb-4">SEBI Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Entity Type</label>
                <select
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-purple-500 focus:border-purple-500`}
                >
                  <option value="listed_company">Listed Company</option>
                  <option value="investor">Investor</option>
                  <option value="intermediary">Intermediary</option>
                </select>
              </div>

              <div>
                <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Transaction Type</label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-purple-500 focus:border-purple-500`}
                >
                  <option value="takeover_disclosure">Takeover Disclosure</option>
                  <option value="insider_trading_disclosure">Insider Trading Disclosure</option>
                  <option value="board_meeting_intimation">Board Meeting Intimation</option>
                  <option value="financial_results">Financial Results Filing</option>
                </select>
              </div>

              {(transactionType === 'takeover_disclosure' || transactionType === 'insider_trading_disclosure') && (
                <div>
                  <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Shareholding Percentage</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={sharesPercentage}
                    onChange={(e) => setSharesPercentage(Number(e.target.value))}
                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-purple-500 focus:border-purple-500`}
                  />
                </div>
              )}

              <button
                onClick={calculateSebi}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
              >
                Check Compliance
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-inner overflow-auto`}>
            <h3 className="text-xl font-semibold mb-4">Compliance Result</h3>
            <div dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SebiSection;