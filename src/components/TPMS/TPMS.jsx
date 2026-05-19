import React from 'react';
import { Cpu, CheckCircle, Shield, Sun, Droplets, ShoppingCart, ArrowRight } from 'lucide-react';
import './TPMS.css';

const TPMS = () => {
  return (
    <div className="tpms-page fade-in-up">
      <div className="container">
        <div className="product-detail-grid">
          
          {/* Left Column: Visual Gallery */}
          <div className="product-gallery">
            <div className="main-icon-wrapper">
              <Cpu size={180} strokeWidth={1} />
            </div>
            {/* Badges floating on image */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', gap: '8px' }}>
              <span className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sun size={12} /> Solar Powered
              </span>
              <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Shield size={12} /> Anti-Theft
              </span>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="product-info">
            <div>
              <span className="product-breadcrumb">Automotive Safety Systems</span>
              <h1 className="product-header-title">Tyre Pressure Monitoring System (TPMS)</h1>
            </div>

            <div className="product-price-large">
              ₹2,500.00 <span>/ complete kit</span>
            </div>

            <p className="product-main-desc">
              Upgrade your vehicle's safety with our state-of-the-art wireless TPMS. 
              Featuring real-time tracking, a bright solar-powered digital display, and four ultra-precision 
              external sensors that alert you instantly to abnormal pressure or temperature changes.
            </p>

            <ul className="feature-list">
              <li className="feature-list-item">
                <CheckCircle className="feature-check" size={24} />
                <div>
                  <span className="feature-text">Solar-Powered Display Unit</span>
                  <span className="feature-sub">Charges automatically on your dashboard, no messy wires required.</span>
                </div>
              </li>
              <li className="feature-list-item">
                <CheckCircle className="feature-check" size={24} />
                <div>
                  <span className="feature-text">4 Anti-Theft External Sensors</span>
                  <span className="feature-sub">Easy to install yourself but securely locked against tampering.</span>
                </div>
              </li>
              <li className="feature-list-item">
                <CheckCircle className="feature-check" size={24} />
                <div>
                  <span className="feature-text">IP67 Waterproof & Dustproof</span>
                  <span className="feature-sub">Engineered to withstand heavy rain, mud, and extreme weather.</span>
                </div>
              </li>
              <li className="feature-list-item">
                <CheckCircle className="feature-check" size={24} />
                <div>
                  <span className="feature-text">Smart Visual & Audio Alarms</span>
                  <span className="feature-sub">Immediate alerts for fast leaks, high pressure, or high temperature.</span>
                </div>
              </li>
            </ul>

            <div className="action-buttons">
              <button className="btn btn-primary" style={{ flex: 1 }}>
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button className="btn btn-secondary">
                Buy Now <ArrowRight size={20} />
              </button>
            </div>

            <div style={{ marginTop: '30px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Technical Specifications</h3>
              <table className="specs-table">
                <tbody>
                  <tr>
                    <th>Operating Voltage</th>
                    <td>3.7V - 5V</td>
                  </tr>
                  <tr>
                    <th>Sensor Battery Life</th>
                    <td>Up to 2 Years (Replaceable CR1632)</td>
                  </tr>
                  <tr>
                    <th>Pressure Range</th>
                    <td>0 - 3.5 Bar (0 - 50 PSI)</td>
                  </tr>
                  <tr>
                    <th>Temperature Accuracy</th>
                    <td>± 3°C</td>
                  </tr>
                  <tr>
                    <th>Display Type</th>
                    <td>LCD Color Digital with Backlight</td>
                  </tr>
                  <tr>
                    <th>Package Contents</th>
                    <td>1x Monitor, 4x Sensors, 4x Anti-theft Nuts, 1x Spanner, 1x Manual</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TPMS;
