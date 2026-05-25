import React, { useState, useEffect, useRef } from 'react';
import Reveal from '../Reveal/Reveal';
import './Calculator.css';

const Calculator = () => {
  const [rolls, setRolls] = useState(500); // monthly rolls

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

  // Environmental Savings Calculations (Annual)
  const annualRolls = rolls * 12;
  // Approximations per roll for demo impact:
  const treesSaved = (annualRolls * 0.01).toFixed(1);
  const waterSaved = Math.round(annualRolls * 15);
  const co2Saved = (annualRolls * 0.5).toFixed(1);

  return (
    <section className="calculator-section">
      {/* Background glow */}
      <div className="calculator-glow" />

      <div className="calculator-container">
        
        <Reveal variant="up" delay={80} className="calculator-header">
          <span className="calculator-subtitle">IMPACT CALCULATOR</span>
          <h2 className="calculator-title">
            ESTIMATE YOUR{' '}
            <span className="scroll-fill-wrapper" ref={headerRef}>
              <span className="scroll-fill-bg">PLANET SAVINGS</span>
              <span 
                className="scroll-fill-fg"
                style={{ clipPath: `inset(0 ${(1 - fillProgress) * 100}% 0 0)` }}
              >
                PLANET SAVINGS
              </span>
            </span>
          </h2>
          <p className="calculator-desc">
            Adjust the slider below to see how much environmental impact you can make by switching to our eco-friendly tissue paper.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={240} className="calculator-body" style={{ marginTop: '40px' }}>
          
          {/* Left Column: Inputs */}
          <div>
            <h3 className="calculator-inputs-title">MONTHLY USAGE</h3>
            <div className="calculator-input-group">
              <div className="calculator-label-group">
                <span>Number of Tissue Rolls</span>
                <span className="calculator-value-highlight">{rolls} Rolls</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="5000" 
                step="50"
                value={rolls} 
                onChange={e => setRolls(Number(e.target.value))}
                className="calculator-range"
              />
              <div className="calculator-range-labels">
                <span>50 Rolls</span>
                <span>5,000 Rolls</span>
              </div>
            </div>

            <div className="calculator-checklist">
              <div className="calculator-check-item">
                <span className="material-symbols-outlined calculator-check-icon">check_circle</span>
                <span>Made from 100% recycled or sustainable materials.</span>
              </div>
              <div className="calculator-check-item">
                <span className="material-symbols-outlined calculator-check-icon">check_circle</span>
                <span>Significantly reduces deforestation and water pollution.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Savings Results Display */}
          <div className="calculator-results">
            <span className="calculator-results-title">ANNUAL ENVIRONMENTAL IMPACT</span>
            <div className="calculator-savings" style={{ color: '#4CAF50' }}>
              {treesSaved} <span style={{ fontSize: '1.5rem' }}>Trees Saved</span>
            </div>
            <p className="calculator-results-desc">
              Estimated based on standard ecological benchmarks for recycled paper.
            </p>

            <div className="calculator-breakdown">
              <div className="calculator-breakdown-row">
                <span className="calculator-breakdown-label">Water Saved</span>
                <span className="calculator-breakdown-value">{waterSaved.toLocaleString('en-IN')} Liters</span>
              </div>
              <div className="calculator-breakdown-row">
                <span className="calculator-breakdown-label">CO2 Impact Reduced</span>
                <span className="calculator-breakdown-value">{co2Saved.toLocaleString('en-IN')} kg</span>
              </div>
            </div>
          </div>

        </Reveal>

      </div>
    </section>
  );
};

export default Calculator;
