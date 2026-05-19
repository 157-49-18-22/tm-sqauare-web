import React, { useState, useEffect, useRef } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [activeTab, setActiveTab] = useState('tpms'); // 'tpms' or 'fuel'
  const [trucks, setTrucks] = useState(15);
  const [fuelSpend, setFuelSpend] = useState(250000); // monthly fuel spend in INR

  const headerRef = useRef(null);
  const [fillProgress, setFillProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const start = winH * 1.0;
      const end = winH * 0.1;
      const current = rect.bottom;
      const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));
      setFillProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // TPMS Savings Calculations
  const tyreSavings = trucks * 18000; // Rs 18,000 saved per truck per year on tyres
  const fuelSavingsTpms = trucks * 12500; // Rs 12,500 saved on fuel per year
  const downtimeSavings = trucks * 8000; // Rs 8,000 saved on breakdown downtime
  const totalTpmsSavings = tyreSavings + fuelSavingsTpms + downtimeSavings;

  // FASTag & Fuel Card Savings
  const cashBack = (fuelSpend * 12) * 0.015; // 1.5% cashback/benefits
  const adminSavings = 45000; // operational savings from centralized billing
  const totalFuelSavings = cashBack + adminSavings;

  return (
    <section className="calculator-section">
      {/* Background glow */}
      <div className="calculator-glow" />

      <div className="calculator-container">
        
        {/* Section Header */}
        <div className="calculator-header">
          <span className="calculator-subtitle">ROI CALCULATOR</span>
          <h2 className="calculator-title">
            ESTIMATE YOUR{' '}
            <span className="scroll-fill-wrapper" ref={headerRef}>
              <span className="scroll-fill-bg">ANNUAL SAVINGS</span>
              <span 
                className="scroll-fill-fg"
                style={{ clipPath: `inset(0 ${(1 - fillProgress) * 100}% 0 0)` }}
              >
                ANNUAL SAVINGS
              </span>
            </span>
          </h2>
          <p className="calculator-desc">
            Adjust the sliders below to calculate how much your organization can save by partnering with TM Square Global Solutions.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="calculator-tabs">
          <button 
            onClick={() => setActiveTab('tpms')}
            className={`calculator-tab ${activeTab === 'tpms' ? 'active' : ''}`}
          >
            TPMS FLEET SAFETY
          </button>
          <button 
            onClick={() => setActiveTab('fuel')}
            className={`calculator-tab ${activeTab === 'fuel' ? 'active' : ''}`}
          >
            FASTAG & FUEL CARDS
          </button>
        </div>

        {/* Calculator Body */}
        <div className="calculator-body">
          
          {/* Left Column: Inputs */}
          <div>
            {activeTab === 'tpms' ? (
              <div>
                <h3 className="calculator-inputs-title">FLEET PARAMETERS</h3>
                <div className="calculator-input-group">
                  <div className="calculator-label-group">
                    <span>Number of Commercial Vehicles</span>
                    <span className="calculator-value-highlight">{trucks} Trucks</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="300" 
                    step="5"
                    value={trucks} 
                    onChange={e => setTrucks(Number(e.target.value))}
                    className="calculator-range"
                  />
                  <div className="calculator-range-labels">
                    <span>5 Trucks</span>
                    <span>300 Trucks</span>
                  </div>
                </div>

                <div className="calculator-checklist">
                  <div className="calculator-check-item">
                    <span className="material-symbols-outlined calculator-check-icon">check_circle</span>
                    <span>Assumes average tyre cost of ₹22,000 with 15% life extension via TPMS.</span>
                  </div>
                  <div className="calculator-check-item">
                    <span className="material-symbols-outlined calculator-check-icon">check_circle</span>
                    <span>Includes 2% fuel economy gain from optimal tyre inflation maintenance.</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="calculator-inputs-title">FUEL & TOLL SPEND</h3>
                <div className="calculator-input-group">
                  <div className="calculator-label-group">
                    <span>Monthly Fuel & Toll Budget</span>
                    <span className="calculator-value-highlight">₹{fuelSpend.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" 
                    min="50000" 
                    max="2000000" 
                    step="50000"
                    value={fuelSpend} 
                    onChange={e => setFuelSpend(Number(e.target.value))}
                    className="calculator-range"
                  />
                  <div className="calculator-range-labels">
                    <span>₹50,000</span>
                    <span>₹20,00,000</span>
                  </div>
                </div>

                <div className="calculator-checklist">
                  <div className="calculator-check-item">
                    <span className="material-symbols-outlined calculator-check-icon">check_circle</span>
                    <span>Centralized dashboard saves ~80 administrative hours annually.</span>
                  </div>
                  <div className="calculator-check-item">
                    <span className="material-symbols-outlined calculator-check-icon">check_circle</span>
                    <span>1.5% cashback & co-branded discounts on HPCL fuel networks.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Savings Results Display */}
          <div className="calculator-results">
            <span className="calculator-results-title">ESTIMATED ANNUAL SAVINGS</span>
            <div className="calculator-savings">
              ₹{(activeTab === 'tpms' ? totalTpmsSavings : totalFuelSavings).toLocaleString('en-IN')}
            </div>
            <p className="calculator-results-desc">
              Calculated based on standard industrial optimization benchmarks for enterprise partners.
            </p>

            <div className="calculator-breakdown">
              {activeTab === 'tpms' ? (
                <>
                  <div className="calculator-breakdown-row">
                    <span className="calculator-breakdown-label">Tyre Wear Optimization</span>
                    <span className="calculator-breakdown-value">₹{tyreSavings.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="calculator-breakdown-row">
                    <span className="calculator-breakdown-label">Fuel Efficiency Gain</span>
                    <span className="calculator-breakdown-value">₹{fuelSavingsTpms.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="calculator-breakdown-row">
                    <span className="calculator-breakdown-label">Breakdown Prevention</span>
                    <span className="calculator-breakdown-value">₹{downtimeSavings.toLocaleString('en-IN')}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="calculator-breakdown-row">
                    <span className="calculator-breakdown-label">HPCL Cashback & Toll Rebates</span>
                    <span className="calculator-breakdown-value">₹{cashBack.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="calculator-breakdown-row">
                    <span className="calculator-breakdown-label">Administrative Ops Savings</span>
                    <span className="calculator-breakdown-value">₹{adminSavings.toLocaleString('en-IN')}</span>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Calculator;
