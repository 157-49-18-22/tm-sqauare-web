import React from 'react';
import { Globe, ShieldCheck, Users, Zap, Award, Target } from 'lucide-react';
import './About.css';

const About = () => {
  const values = [
    {
      icon: <ShieldCheck size={28} />,
      title: "Uncompromising Quality",
      desc: "From commercial-grade copier paper to ultra-precise TPMS sensors, we strictly vet every product for superior performance."
    },
    {
      icon: <Globe size={28} />,
      title: "Pan-India Fulfillment",
      desc: "Our robust supply chain network ensures rapid delivery to corporate hubs and individual clients across more than 28 states."
    },
    {
      icon: <Users size={28} />,
      title: "Client-Centric Philosophy",
      desc: "With over 2,00,000 satisfied customers, our mission is to provide transparent pricing and dedicated 24/7 post-sales support."
    },
    {
      icon: <Zap size={28} />,
      title: "Speed & Efficiency",
      desc: "We leverage automated dispatch systems for FASTag activations and instant order tracking to keep your operations moving."
    }
  ];

  return (
    <div className="about-page fade-in-up">
      <div className="container">
        {/* Hero Section */}
        <div className="about-hero">
          <span className="badge badge-cyan">Corporate Overview</span>
          <h1 className="about-title">Empowering Mobility & Office Logistics</h1>
          <p className="about-subtitle">
            TMsquare Global Solutions Private Limited is a premier logistics and technological provider dedicated to upgrading automotive safety systems, electronic highway tolls, and commercial printing supplies across India.
          </p>
        </div>

        {/* Mission Statement Grid */}
        <div className="mission-grid">
          <div className="mission-text">
            <span className="mission-tag">Our Vision & Mission</span>
            <h2 className="mission-heading">Bridging Quality Products With Effortless Accessibility</h2>
            <p className="mission-desc">
              Founded on the principles of speed, accuracy, and nationwide trust, TM Square has evolved into a key partner for leading commercial printing enterprises and vehicle fleets. 
            </p>
            <p className="mission-desc">
              We continually strive to introduce smart innovations—such as solar-powered tire monitoring and cashless RFID systems—that simplify daily operations while reducing costs for our end consumers.
            </p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <Award className="mission-tag" size={24} /> ISO Certified Standards
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <Target className="mission-tag" size={24} /> 100% Genuine Supplies
              </div>
            </div>
          </div>

          <div className="mission-visual">
            <Globe size={200} strokeWidth={1} className="mission-icon-glow" />
          </div>
        </div>

        {/* Core Values Section */}
        <div className="values-section">
          <h2 className="values-title">The Pillars of Our Success</h2>
          <div className="values-grid">
            {values.map((val, idx) => (
              <div key={idx} className="value-card fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="value-icon">
                  {val.icon}
                </div>
                <h3 className="value-title">{val.title}</h3>
                <p className="value-desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
