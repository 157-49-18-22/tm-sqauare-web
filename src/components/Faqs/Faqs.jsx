import React, { useState } from 'react';
import './Faqs.css';

const CATEGORIES = [
  { id: 'all', label: 'ALL DEPARTMENTS', icon: 'apps' },
  { id: 'logistics', label: 'LOGISTICS & DISPATCH', icon: 'local_shipping' },
  { id: 'safety', label: 'AUTOMOTIVE SAFETY', icon: 'security' },
  { id: 'billing', label: 'BILLING & CREDIT', icon: 'payments' }
];

const FAQ_ITEMS = [
  {
    cat: 'logistics',
    q: 'How fast do you dispatch bulk copier paper orders?',
    a: 'For major enterprise hubs in tier-1 and tier-2 cities across India, copier paper is delivered within 48 to 72 hours from dispatch. For bulk orders, credit and transit insurance terms are finalized with a custom logistics roadmap.'
  },
  {
    cat: 'safety',
    q: 'Can TM Square TPMS kits be integrated into existing corporate fleet management software?',
    a: 'Yes, our TPMS sensors support full API integrations and standard hardware telemetry protocols, allowing fleet managers to monitor real-time tyre pressure and temperature directly inside their custom dashboard setups.'
  },
  {
    cat: 'billing',
    q: 'How does the HPCL fuel card benefits program work with FASTag?',
    a: 'Our co-branded FASTag and RFID toll stickers are linked directly to HPCL retail outlets, allowing automated fuel billing alongside toll payments with 1.5% cashback benefits and unified monthly GST invoices.'
  },
  {
    cat: 'billing',
    q: 'Do you offer customized credit terms or credit limits for verified corporate partners?',
    a: 'Absolutely. We offer flexible corporate accounts with customized credit limits (ranging from 15 to 45-day payment cycles) upon verification of registration documents, transaction history, and credit rating audit reports.'
  },
  {
    cat: 'safety',
    q: 'What is the warranty period on your automotive safety TPMS sensors?',
    a: 'All our TPMS kits come with a 1-year replacement warranty covering technical defects or sensor battery failure. Standard support packages also include replacement batteries and anti-theft key accessories.'
  },
  {
    cat: 'logistics',
    q: 'Do you offer doorstep delivery in remote industrial corridors?',
    a: 'Yes. With our co-branded national courier network partnerships, we guarantee transit safety and doorstep delivery even in deep industrial zones, manufacturing plants, and remote highway logistics warehouses.'
  }
];

const Faqs = () => {
  const [activeCat, setActiveCat] = useState('all');
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = idx => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  // Filter items based on active category selection
  const filteredItems = activeCat === 'all' 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter(item => item.cat === activeCat);

  return (
    <section className="faqs-section">
      <div className="faqs-container">
        
        {/* Section Header */}
        <div className="faqs-header">
          <span className="faqs-subtitle">CUSTOMER INQUIRIES</span>
          <h2 className="faqs-title">
            FREQUENTLY ASKED <span className="faqs-title-accent">QUESTIONS</span>
          </h2>
        </div>

        {/* Categories Grid Layout */}
        <div className="faqs-grid">
          
          {/* Sidebar Navigation */}
          <div className="faqs-sidebar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCat(cat.id);
                  setOpenIdx(null); // reset open accordion when changing categories
                }}
                className={`faq-cat-btn ${activeCat === cat.id ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Accordion Panels list */}
          <div className="faq-list-wrapper">
            {filteredItems.map((item, idx) => {
              const isOpen = openIdx === idx;
              // format index to '01', '02' etc.
              const formattedIndex = String(idx + 1).padStart(2, '0');

              return (
                <div 
                  key={`${activeCat}-${idx}`}
                  className={`faq-item-lux ${isOpen ? 'open' : ''} faq-animate`}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  
                  {/* Header Button */}
                  <button
                    onClick={() => toggle(idx)}
                    className="faq-btn-lux"
                  >
                    <span className="faq-index">{formattedIndex}</span>
                    <span className="faq-question-lux">
                      {item.q}
                    </span>
                    
                    {/* Circle Chevron wrapper */}
                    <div className="faq-chevron">
                      <span className="material-symbols-outlined">
                        expand_more
                      </span>
                    </div>
                  </button>

                  {/* Dropdown Answer area */}
                  <div className="faq-content-lux">
                    <div className="faq-answer-lux">
                      {item.a}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Faqs;
