import React, { useState } from 'react';
import { Send, Headphones, ShieldCheck, Truck, Fuel, Zap, RefreshCw, CreditCard, Star } from 'lucide-react';
import Reveal from '../Reveal/Reveal';
import './FASTag.css';
import Hyperspeed, { hyperspeedPresets } from './Hyperspeed';

const FASTag = () => {
  const whatsappLink = "https://api.whatsapp.com/send?phone=917678400367&text=Hi,%20I%20am%20interested%20in%20Fastag.%20Please%20connect%20with%20me.";
  
  const [vehicleType, setVehicleType] = useState('car');

  const pricingData = {
    car: {
      label: "Car/Jeep/Van",
      standard: 499,
      discount: 350,
      total: 149
    },
    light: {
      label: "Light Commercial",
      standard: 699,
      discount: 450,
      total: 249
    },
    heavy: {
      label: "Bus/Truck",
      standard: 999,
      discount: 500,
      total: 499
    }
  };

  const selectedPrice = pricingData[vehicleType];

  return (
    <div className="fastag-page">
      {/* WebGL Hyperspeed Background (renders behind the containers) */}
      <Hyperspeed effectOptions={hyperspeedPresets.seaBlue} />
      
      <div className="fastag-container">
        
        {/* Hero Section */}
        <Reveal variant="up" delay={60} as="section" className="ft-hero">
          <div className="ft-hero-content">
            <div className="ft-badge">
              <span className="ft-pulse-dot"></span> RFID CASHLESS SYSTEMS
            </div>
            
            <h1 className="ft-hero-title">
              FASTag:<br />
              <span className="ft-text-gradient">Easy to Cruise</span>
            </h1>
            
            <p className="ft-hero-subtitle">
              Seamlessly cruise through tolls with India's fastest RFID processing system.
            </p>
            
            {/* Primary CTA */}
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ft-btn-whatsapp"
            >
              <span>Order via WhatsApp</span>
              <Send size={18} />
            </a>
          </div>
          
          <div className="ft-hero-visual-side">
            {/* Promotional Glass Card */}
            <div className="ft-glass-card ft-promo-card">
              <div className="ft-promo-info">
                <span className="ft-promo-tag">Special Offer</span>
                <div className="ft-promo-price-container">
                  <span className="ft-promo-price">₹149</span>
                  <span className="ft-promo-old-price">₹499</span>
                </div>
              </div>
              
              <div className="ft-promo-visual">
                <div className="ft-promo-glow"></div>
                <img 
                  className="ft-car-img" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtz0qJA70VF7TpVVg_W-tZrTVvbdD7Ymg_dJIXHFRQLeqT20fgYwC193UElnIeZ7yfxfQkQFAD0xb_0XgFsOEGT6mK2IKoWLnNLZS7x95UXgNei3wuGZo7yv810Ebh7nH3Y2W9uD0v5FtR1uQjsW7kzqB0iMo1okFsOxi_oFDNZ9J8yb3UHJH_paUk4CcEhdQdupLpObm6gRjM_s6Vv7quzvmDuPkBtoSw3c6ntYc5wyEp_jUyLcGyVnavNw3cxz496fDdz5dHV7aC" 
                  alt="Car visual" 
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={120} as="section" className="ft-trust-banner">
          <div className="ft-glass-card ft-trust-wrapper">
            <div className="ft-trust-item">
              <div className="ft-trust-icon">
                <Headphones size={20} />
              </div>
              <span className="ft-trust-label">24/7 Support</span>
            </div>
            
            <div className="ft-trust-divider"></div>
            
            <div className="ft-trust-item">
              <div className="ft-trust-icon">
                <ShieldCheck size={20} />
              </div>
              <span className="ft-trust-label">Secure Pay</span>
            </div>
            
            <div className="ft-trust-divider"></div>
            
            <div className="ft-trust-item">
              <div className="ft-trust-icon">
                <Truck size={20} />
              </div>
              <span className="ft-trust-label">Fast Delivery</span>
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={100} as="section" className="ft-section">
          <h2 className="ft-section-title">
            Why <span className="ft-text-gradient">TM Square?</span>
          </h2>
          
          <div className="ft-bento-grid">
            <div className="ft-glass-card ft-bento-card">
              <div className="ft-bento-icon">
                <Fuel size={28} />
              </div>
              <h3 className="ft-bento-heading">HPCL Fuel Discounts</h3>
              <p className="ft-bento-desc">
                Save up to ₹2.5/L on every refill nationwide at HPCL petrol pumps.
              </p>
            </div>
            
            <div className="ft-glass-card ft-bento-card">
              <div className="ft-bento-icon">
                <Zap size={28} />
              </div>
              <h3 className="ft-bento-heading">Contactless Tolls</h3>
              <p className="ft-bento-desc">
                Drive-through lanes with zero stopping required. Automatic payments.
              </p>
            </div>
            
            <div className="ft-glass-card ft-bento-card">
              <div className="ft-bento-icon">
                <RefreshCw size={28} />
              </div>
              <h3 className="ft-bento-heading">Auto-Renewal</h3>
              <p className="ft-bento-desc">
                Never run out of balance with our smart and secure auto-topup.
              </p>
            </div>
            
            <div className="ft-glass-card ft-bento-card">
              <div className="ft-bento-icon">
                <CreditCard size={28} />
              </div>
              <h3 className="ft-bento-heading">Flexible Recharges</h3>
              <p className="ft-bento-desc">
                Seamless payments via UPI, debit/credit cards, or Net Banking 24/7.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal variant="scale" delay={160} as="section" className="ft-section">
          <div className="ft-glass-card ft-calc-card">
            <div className="ft-calc-inputs">
              <h2 className="ft-section-title" style={{ textAlign: 'left', marginBottom: '8px' }}>
                Cost <span className="ft-text-gradient">Calculator</span>
              </h2>
              
              <span className="ft-calc-label">Select Vehicle Type</span>
              
              <div className="ft-calc-tabs">
                <button 
                  onClick={() => setVehicleType('car')}
                  className={`ft-calc-tab-btn ${vehicleType === 'car' ? 'active' : ''}`}
                >
                  {pricingData.car.label}
                </button>
                <button 
                  onClick={() => setVehicleType('light')}
                  className={`ft-calc-tab-btn ${vehicleType === 'light' ? 'active' : ''}`}
                >
                  {pricingData.light.label}
                </button>
                <button 
                  onClick={() => setVehicleType('heavy')}
                  className={`ft-calc-tab-btn ${vehicleType === 'heavy' ? 'active' : ''}`}
                >
                  {pricingData.heavy.label}
                </button>
              </div>
            </div>
            
            <div className="ft-calc-details">
              <div className="ft-calc-row">
                <span>Standard Tag Price</span>
                <span>₹{selectedPrice.standard}</span>
              </div>
              
              <div className="ft-calc-row ft-calc-row-discount">
                <span>TM Square Discount</span>
                <span>-₹{selectedPrice.discount}</span>
              </div>
              
              <div className="ft-calc-row" style={{ paddingTop: '8px' }}>
                <span className="ft-calc-total-label">Total Due</span>
                <span className="ft-calc-total-price">₹{selectedPrice.total}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={120} as="section" className="ft-section">
          <h2 className="ft-section-title">
            Fast-Track <span className="ft-text-gradient">Process</span>
          </h2>
          
          <div className="ft-timeline">
            {/* Step 1 */}
            <div className="ft-timeline-step">
              <div className="ft-timeline-dot" style={{ animationDelay: '0s' }}></div>
              <div className="ft-glass-card ft-timeline-card">
                <h4 className="ft-timeline-step-title">01. Quick Registration</h4>
                <p className="ft-timeline-step-desc">
                  Enter your vehicle details and owner information via our secure WhatsApp portal.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="ft-timeline-step">
              <div className="ft-timeline-dot" style={{ animationDelay: '1s' }}></div>
              <div className="ft-glass-card ft-timeline-card">
                <h4 className="ft-timeline-step-title">02. Digital Verification</h4>
                <p className="ft-timeline-step-desc">
                  Upload RC and ID proofs. Our AI-driven system verifies documents in under 5 minutes.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="ft-timeline-step">
              <div className="ft-timeline-dot" style={{ animationDelay: '2s' }}></div>
              <div className="ft-glass-card ft-timeline-card">
                <h4 className="ft-timeline-step-title">03. Express Delivery</h4>
                <p className="ft-timeline-step-desc">
                  Your activated TM Square FASTag is dispatched and delivered to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={140} as="section" className="ft-section">
          <h2 className="ft-section-title">
            Rider <span className="ft-text-gradient">Feedback</span>
          </h2>
          
          <div className="ft-reviews-container">
            {/* Card 1 */}
            <div className="ft-glass-card ft-review-card">
              <div className="ft-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i}><Star size={16} fill="currentColor" /></span>
                ))}
              </div>
              <p className="ft-review-text">
                "The WhatsApp ordering was insanely fast. Had my tag in 2 days and the fuel cashback is legit!"
              </p>
              <div className="ft-reviewer">
                <div className="ft-reviewer-avatar">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDauFAc90qMQfMEFVDibP95rQcd8dKmq7ZPCgnanZgeWsNBfm47-QFNokfBR0ZTz46GSfUH-SglGavUbvdG0gp9LzObTi0jJ9op_CoBSAfRmSB1U2uaMXLsGbp6xaP0xpITZAOh9DLjeIbF42nEz0GW4O5cAL310YE1WoiTg9Fjyq0C9L4ZtweroxFnQ51ptqBJT4TQLvNkX4eKdfHGyrWk9pPpzKWnW8KWdsPu-Qumddarq0SDbNnhKgv8U9lAGNeOiihSl6kfmq-H" 
                    alt="Arjun K." 
                  />
                </div>
                <div>
                  <p className="ft-reviewer-name">Arjun K.</p>
                  <p className="ft-reviewer-role">Fleet Manager</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="ft-glass-card ft-review-card">
              <div className="ft-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i}><Star size={16} fill="currentColor" /></span>
                ))}
              </div>
              <p className="ft-review-text">
                "Autorecharge feature is a lifesaver. Never have to worry about blacklisting at toll plazas anymore."
              </p>
              <div className="ft-reviewer">
                <div className="ft-reviewer-avatar">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3vicdUFhit0hGNxQwPoylNOkqkRiwxT0KdaXEodQo5-azUUM27UinfXRKIuYIwZJY8NrGvr05ZrHXcGJYAQQOvW87yX116MxNBEL93I_N0YI5Ns2gZmw2hggls5OiuQoF8F8VeZrvHgsFj5QxMPeVzK13p7AWssVYD7hMniMa-Sk49xC44hKzSTtesNc-YGwiPl5_XXXJYFeONHnqR-G7N1OAXgVC8C738qe2HhqfFux_UtQnbPQO8NTaekOM5bC1bQ7ljNg5-YRD" 
                    alt="Priya S." 
                  />
                </div>
                <div>
                  <p className="ft-reviewer-name">Priya S.</p>
                  <p className="ft-reviewer-role">Commuter</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal variant="scale" delay={180} as="section" className="ft-section">
          <div className="ft-glass-card ft-final-cta-card">
            <div className="ft-final-cta-glow"></div>
            <h2>Ready to <br /><span className="ft-text-gradient">Hit the Road?</span></h2>
            <p>Join 100,000+ drivers who enjoy premium benefits with TM Square.</p>
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ft-btn-final"
            >
              Get FASTag Now
            </a>
          </div>
        </Reveal>
        
      </div>
    </div>
  );
};

export default FASTag;
