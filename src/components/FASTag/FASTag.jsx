import React from 'react';
import { Send, CheckCircle, ShieldCheck, Zap, Fuel, RefreshCw, CreditCard } from 'lucide-react';
import './FASTag.css';

const FASTag = () => {
  const whatsappLink = "https://api.whatsapp.com/send?phone=917678400367&text=Hi,%20I%20am%20interested%20in%20Fastag.%20Please%20connect%20with%20me.";

  const benefits = [
    {
      icon: <Fuel size={24} />,
      title: "HPCL Fuel Discounts",
      desc: "Pay for fuel effortlessly and get exclusive cashback and discounts at HPCL petrol pumps nationwide."
    },
    {
      icon: <Zap size={24} />,
      title: "Contactless Toll Payments",
      desc: "Drive through toll plazas without stopping. Your toll fee is automatically deducted from your linked account."
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Auto-Renewal Passes",
      desc: "Manage monthly passes easily with auto-renewal options, ensuring your travel is never interrupted."
    },
    {
      icon: <CreditCard size={24} />,
      title: "Flexible Recharges",
      desc: "Recharge seamlessly via Google Pay, PhonePe, Paytm, Credit Cards, or UPI at any time of day."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Encrypted & Secure",
      desc: "Built on high-grade encrypted technology keeping your transactions and vehicle data 100% secure."
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Instant Activation",
      desc: "Cheapest market rates combined with rapid processing and instant activation via our 24/7 call center."
    }
  ];

  return (
    <div className="fastag-page fade-in-up">
      {/* Page Header */}
      <header className="page-header">
        <div className="container">
          <div className="header-badge">RFID Cashless Systems</div>
          <h1 className="page-title">
            FASTag: <span className="page-title-highlight">Easy to Cruise</span>
          </h1>
          <p className="page-subtitle">
            Cashless is the new convenience. Streamline your highway travel with secure RFID toll payments, quick processing, and dedicated 24x7 assistance.
          </p>

          <div className="pricing-box fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Promotional Offer</span>
            <div className="price-divider"></div>
            <div className="price-value">
              <span className="price-currency">₹</span>149
            </div>
          </div>

          <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
              Order via WhatsApp <Send size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Benefits Grid */}
      <section className="benefits-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Why Buy FASTag From Us?</h2>
            <p style={{ color: 'var(--text-muted)' }}>Experience a hassle-free journey combined with exclusive fuel perks.</p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="benefit-icon">
                  {benefit.icon}
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-desc">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 style={{ marginBottom: '20px' }}>Ready to Hit the Road?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px auto' }}>
            Join thousands of satisfied drivers who enjoy cashless convenience and exclusive discounts. Our support team is ready to activate your tag instantly.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Get Your FASTag Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default FASTag;
