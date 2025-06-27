import React, { useState } from 'react';
import SEO from './SEO';
import TabButton from './TabButton';

// FdiCalculator: Calculates FDI compliance based on sector and investment percentage.
const FdiCalculator = ({ darkMode }) => {
  const [fdiSector, setFdiSector] = useState('manufacturing');
  const [fdiPercentage, setFdiPercentage] = useState(49);
  const [fdiAmountInr, setFdiAmountInr] = useState(100);
  const [fdiResult, setFdiResult] = useState('');

  const calculateFDI = () => {
    if (isNaN(fdiPercentage) || fdiPercentage < 0 || fdiPercentage > 100) {
      setFdiResult(`<p class="text-red-500 font-bold">Please enter a valid percentage (0-100%)</p>`);
      return;
    }

    let msg = `<div class="${darkMode ? 'text-gray-200' : 'text-gray-800'}">`;
    msg += `<h3 class="text-xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-indigo-700'}">FDI Compliance Result</h3>`;
    msg += `<p><strong>Sector:</strong> ${fdiSector.replace(/_/g, ' ').toUpperCase()}</p>`;
    msg += `<p><strong>Proposed Foreign Investment:</strong> ${fdiPercentage}% (Amount: INR ${fdiAmountInr} Crores)</p>`;

    switch(fdiSector) {
      case 'manufacturing':
        msg += `<p class="text-green-500 font-bold mt-2">100% FDI allowed under Automatic Route</p>`;
        msg += `<p class="mt-2 text-sm">Subject to applicable laws/regulations; compliance with all relevant rules and regulations, security and other conditionalities.</p>`;
        break;
      case 'defence':
        if (fdiPercentage <= 74) {
          msg += `<p class="text-green-500 font-bold mt-2">Up to 74% FDI allowed under Automatic Route</p>`;
        } else {
          msg += `<p class="text-orange-500 font-bold mt-2">Beyond 74% requires Government approval</p>`;
        }
        msg += `<p class="mt-2 text-sm">Access to modern technology, FDI leading to higher domestic content, and export promotion are key considerations.</p>`;
        break;
      case 'insurance':
        if (fdiPercentage <= 74) {
          msg += `<p class="text-green-500 font-bold mt-2">Up to 74% FDI allowed under Automatic Route</p>`;
        } else {
          msg += `<p class="text-red-500 font-bold mt-2">FDI beyond 74% is NOT permitted in Insurance</p>`;
        }
        msg += `<p class="mt-2 text-sm">Requires compliance with IRDAI regulations. Indian management and control criteria apply.</p>`;
        break;
      case 'telecom':
        msg += `<p class="text-green-500 font-bold mt-2">100% FDI allowed under Automatic Route</p>`;
        msg += `<p class="mt-2 text-sm">Subject to licensing and security conditions.</p>`;
        break;
      case 'retail':
        if (fdiPercentage <= 51) {
          msg += `<p class="text-orange-500 font-bold mt-2">Up to 51% FDI allowed under Government Route</p>`;
        } else {
          msg += `<p class="text-red-500 font-bold mt-2">FDI beyond 51% is NOT permitted in Multi-Brand Retail Trading</p>`;
        }
        msg += `<p class="mt-2 text-sm">Subject to various conditions including local sourcing, investment in back-end infrastructure etc.</p>`;
        break;
      default:
        msg += `<p class="text-orange-500 font-bold mt-2">Sector-specific limits and routes apply</p>`;
        msg += `<p class="mt-2 text-sm">Refer to the latest Consolidated FDI Policy Circular issued by DPIIT for exact sectoral limits.</p>`;
    }

    msg += `<p class="mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}"><strong>Reporting Requirements:</strong> Form FCGPR for equity instruments, Annual Return on Foreign Liabilities and Assets (FLA).</p>`;
    msg += `<p class="mt-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-700'} italic">Disclaimer: This is a simplified overview. Always consult with legal experts for specific cases.</p>`;
    msg += `</div>`;

    setFdiResult(msg);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-inner`}>
        <h3 className="text-xl font-semibold mb-4">FDI Parameters</h3>

        <div className="space-y-4">
          <div>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sector of Investment</label>
            <select
              value={fdiSector}
              onChange={(e) => setFdiSector(e.target.value)}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="manufacturing">Manufacturing (100% Automatic)</option>
              <option value="defence">Defence (74% Automatic)</option>
              <option value="insurance">Insurance (74% Automatic)</option>
              <option value="telecom">Telecom (100% Automatic)</option>
              <option value="retail">Retail (51% Govt Route)</option>
            </select>
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Foreign Investment Percentage (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={fdiPercentage}
              onChange={(e) => setFdiPercentage(Number(e.target.value))}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Investment Amount (INR Crores)</label>
            <input
              type="number"
              min="0"
              value={fdiAmountInr}
              onChange={(e) => setFdiAmountInr(Number(e.target.value))}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>

          <button
            onClick={calculateFDI}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Calculate Compliance
          </button>
        </div>
      </div>

      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-inner overflow-auto`}>
        <h3 className="text-xl font-semibold mb-4">Compliance Result</h3>
        <div dangerouslySetInnerHTML={{ __html: fdiResult }} />
      </div>
    </div>
  );
};

// OdiCalculator: Calculates ODI compliance based on investment amount and net worth.
const OdiCalculator = ({ darkMode }) => {
  const [odiType, setOdiType] = useState('equity');
  const [odiAmountUsd, setOdiAmountUsd] = useState(50);
  const [odiNetWorth, setOdiNetWorth] = useState(100);
  const [odiResult, setOdiResult] = useState('');

  const calculateODI = () => {
    if (isNaN(odiAmountUsd)) {
      setOdiResult('<p class="text-red-500 font-bold">Please enter valid amount</p>');
      return;
    }

    let msg = `<div class="${darkMode ? 'text-gray-200' : 'text-gray-800'}">`;
    msg += `<h3 class="text-xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-indigo-700'}">ODI Compliance Result</h3>`;
    msg += `<p><strong>Type:</strong> ${odiType.replace(/_/g, ' ').toUpperCase()}</p>`;
    msg += `<p><strong>Amount:</strong> USD ${odiAmountUsd} Million</p>`;
    msg += `<p><strong>Net Worth:</strong> USD ${odiNetWorth} Million</p>`;

    const limit = odiNetWorth * 4;

    if (odiAmountUsd <= limit) {
      msg += `<p class="text-green-500 font-bold mt-2">Within Automatic Route limit (400% of net worth)</p>`;
      msg += `<p class="mt-2 text-sm">The investment must be in a bonafide business activity abroad. Proper documentation and reporting are crucial.</p>`;
    } else {
      msg += `<p class="text-orange-500 font-bold mt-2">Exceeds Automatic Route limit. Requires RBI approval</p>`;
      msg += `<p class="mt-2 text-sm">Application to RBI with detailed justification needed. This route involves more scrutiny.</p>`;
    }

    msg += `<p class="mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}"><strong>Reporting:</strong> Form ODI Part-I for initial investment, Annual Performance Report (APR) required.</p>`;
    msg += `<p class="mt-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-700'} italic">Disclaimer: This is a simplified overview. Always consult with legal experts for specific cases.</p>`;
    msg += `</div>`;

    setOdiResult(msg);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-inner`}>
        <h3 className="text-xl font-semibold mb-4">ODI Parameters</h3>

        <div className="space-y-4">
          <div>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type of ODI</label>
            <select
              value={odiType}
              onChange={(e) => setOdiType(e.target.value)}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="equity">Equity Investment</option>
              <option value="loan">Loan to JV/WOS</option>
              <option value="guarantee">Corporate Guarantee</option>
            </select>
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Investment Amount (USD Millions)</label>
            <input
              type="number"
              min="0"
              value={odiAmountUsd}
              onChange={(e) => setOdiAmountUsd(Number(e.target.value))}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Indian Entity's Net Worth (USD Millions)</label>
            <input
              type="number"
              min="0"
              value={odiNetWorth}
              onChange={(e) => setOdiNetWorth(Number(e.target.value))}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>

          <button
            onClick={calculateODI}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Calculate Compliance
          </button>
        </div>
      </div>

      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-inner overflow-auto`}>
        <h3 className="text-xl font-semibold mb-4">Compliance Result</h3>
        <div dangerouslySetInnerHTML={{ __html: odiResult }} />
        <p className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Note: The overall financial commitment of the Indian Party in all its overseas JV/WOSs shall not exceed 400% of its net worth as per the last audited balance sheet.
        </p>
      </div>
    </div>
  );
};

// FdiOdiSection: Contains calculators for FDI and ODI compliance.
const FdiOdiSection = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('fdi');

  return (
    <div className={`rounded-xl ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-md overflow-hidden`}>
      <SEO
        title="FDI & ODI Compliance"
        description="Calculators and guides for Foreign Direct Investment and Overseas Direct Investment in India"
        keywords="FDI, ODI, foreign investment, India, compliance"
      />

      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px">
          <TabButton active={activeTab === 'fdi'} onClick={() => setActiveTab('fdi')}>
            <span className="text-lg">🧮</span> FDI Calculator
          </TabButton>
          <TabButton active={activeTab === 'odi'} onClick={() => setActiveTab('odi')}>
            <span className="text-lg">🧮</span> ODI Calculator
          </TabButton>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'fdi' && <FdiCalculator darkMode={darkMode} />}
        {activeTab === 'odi' && <OdiCalculator darkMode={darkMode} />}
      </div>
    </div>
  );
};

export default FdiOdiSection;
