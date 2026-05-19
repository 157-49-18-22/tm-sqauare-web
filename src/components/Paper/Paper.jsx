import React from 'react';
import { FileText, ArrowRight, Printer } from 'lucide-react';
import './Paper.css';

const Paper = () => {
  const paperBrands = [
    { name: 'Century Green', gsm: '70 / 75 / 80 / 85 GSM', sizes: 'A4, A3, FS', color: '#10b981' },
    { name: 'Star', gsm: '70 / 75 GSM', sizes: 'A4, FS', color: '#f59e0b' },
    { name: 'AW (Andhra)', gsm: '70 / 75 GSM', sizes: 'A4', color: '#0ea5e9' },
    { name: 'Elanza', gsm: '70 / 75 GSM', sizes: 'A4, A3', color: '#8b5cf6' },
    { name: 'Century Bond', gsm: '70 / 80 GSM', sizes: 'A4, A3', color: '#ec4899' },
    { name: 'Terra', gsm: '70 GSM', sizes: 'A4', color: '#14b8a6' },
    { name: 'Utsav', gsm: '70 GSM', sizes: 'A4, FS', color: '#ef4444' }
  ];

  const whatsappLink = "https://api.whatsapp.com/send?phone=917678400367&text=Hi,%20I%20would%20like%20to%20get%20a%20bulk%20quote%20for%20Copier%20Paper.";

  return (
    <div className="paper-page fade-in-up">
      <div className="container">
        <div className="paper-header">
          <span className="badge badge-cyan">Commercial Logistics</span>
          <h1 className="paper-title">Premium Copier Paper Supply</h1>
          <p className="paper-subtitle">
            Engineered for high-volume, jam-free commercial printing. We supply bulk orders of the highest-rated paper brands across the nation for corporate offices and digital printing hubs.
          </p>
        </div>

        <div className="paper-grid">
          {paperBrands.map((brand, index) => (
            <div key={index} className="paper-card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="paper-icon" style={{ color: brand.color, background: `${brand.color}15` }}>
                <Printer size={32} />
              </div>
              <h3 className="paper-brand">{brand.name}</h3>
              <div className="paper-spec-list">
                <span className="paper-spec-tag">GSM: {brand.gsm}</span>
                <span className="paper-spec-tag">Sizes: {brand.sizes}</span>
                <span className="paper-spec-tag">Whiteness: 90%+</span>
              </div>
              <div className="paper-action">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Get Bulk Quote <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Paper;
