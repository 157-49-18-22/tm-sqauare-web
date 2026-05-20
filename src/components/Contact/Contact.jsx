import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import LineWaves from '../LineWaves/LineWaves';
import './Contact.css';

const ContactHero = ({ children }) => (
  <section className="contact-hero">
    <div className="contact-hero-waves" aria-hidden="true">
      <LineWaves
        speed={0.3}
        innerLineCount={32}
        outerLineCount={36}
        warpIntensity={1}
        rotation={-45}
        edgeFadeWidth={0}
        colorCycleSpeed={1}
        brightness={0.2}
        color1="#1ea1b6"
        color2="#ffffff"
        color3="#1ea1b6"
        enableMouseInteraction
        mouseInfluence={2}
      />
    </div>
    <div className="contact-hero-overlay" aria-hidden="true" />
    <div className="contact-hero-content">
      {children}
    </div>
  </section>
);

/* ─── Main Contact Component ─── */
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 5000);
  };

  const whatsappLink = "https://api.whatsapp.com/send?phone=917678400367&text=Hi,%20I%20have%20an%20inquiry%20regarding%20TM%20Square%20Services.";

  return (
    <div className="contact-page">

      {/* ── Hero Section ── */}
      <ContactHero>
        <span className="contact-badge">24/7 Support Desk</span>
        <motion.h1
          initial={{ opacity: 0.5, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
          className="contact-hero-title"
        >
          Let's Start a<br />Conversation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: 'easeInOut' }}
          className="contact-hero-subtitle"
        >
          Whether you need a custom quote for bulk photo copier paper, support for your
          FASTag account, or technical queries about TPMS sensors — our team is here for you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: 'easeInOut' }}
          className="contact-hero-stats"
        >
          <div className="hero-stat">
            <span className="hero-stat-value">2hr</span>
            <span className="hero-stat-label">Response Time</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">24/7</span>
            <span className="hero-stat-label">Support Available</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">500+</span>
            <span className="hero-stat-label">Happy Clients</span>
          </div>
        </motion.div>
      </ContactHero>

      {/* ── Info Cards + Form ── */}
      <section className="contact-body">
        <div className="container">
          <div className="contact-grid">

            {/* Left: Info Cards */}
            <div className="contact-info-cards">
              <div className="contact-info-card">
                <div className="contact-icon-wrapper phone-icon"><Phone size={26} /></div>
                <div>
                  <h3 className="contact-card-title">Phone &amp; WhatsApp</h3>
                  <p className="contact-card-text">+91-7678400367</p>
                  <p className="contact-card-meta"><Clock size={12} /> Mon–Sat, 9 AM – 8 PM</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon-wrapper mail-icon"><Mail size={26} /></div>
                <div>
                  <h3 className="contact-card-title">Email Inquiries</h3>
                  <p className="contact-card-text">support@tmsquare.co.in</p>
                  <p className="contact-card-text">sales@tmsquare.co.in</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon-wrapper map-icon"><MapPin size={26} /></div>
                <div>
                  <h3 className="contact-card-title">Headquarters</h3>
                  <p className="contact-card-text">
                    Omaxe Spa Village, 702 Aspen D Tower,<br />
                    Sector 78, Greater Faridabad,<br />
                    Haryana – 121001
                  </p>
                </div>
              </div>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                <MessageSquare size={20} /> Chat with Us on WhatsApp
              </a>
            </div>

            {/* Right: Form */}
            <div className="contact-form-card">
              <h2 className="form-title">Send an Inquiry</h2>
              <p className="form-subtitle">Fill out the form below and an expert will reply within 2 business hours.</p>

              {submitted ? (
                <div className="success-box">
                  <CheckCircle2 size={60} className="success-icon" />
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. Our support agent is reviewing your message.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="inquiry-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input type="email" name="email" className="form-control" required value={formData.email} onChange={handleChange} placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input type="text" name="subject" className="form-control" value={formData.subject} onChange={handleChange} placeholder="Product Pricing / FASTag Support" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Your Message *</label>
                    <textarea name="message" className="form-control" rows="5" required value={formData.message} onChange={handleChange} placeholder="Describe your requirement in detail..." />
                  </div>
                  <button type="submit" className="submit-btn">
                    <Send size={18} /> Submit Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="contact-map-section">
        <div className="container">
          <div className="map-header">
            <span className="contact-badge">Find Us</span>
            <h2 className="map-title">Our Location</h2>
            <p className="map-subtitle">
              Omaxe Spa Village, 702 Aspen D Tower, Sector 78, Greater Faridabad, Haryana – 121001
            </p>
          </div>
          <div className="map-wrapper">
            <iframe
              title="TM Square Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.3607505890437!2d77.37!3d28.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdc3c8e06ea69%3A0x9a91f12f1d3a9bcf!2sOmaxe%20Spa%20Village%2C%20Sector%2078%2C%20Faridabad%2C%20Haryana%20121001!5e0!3m2!1sen!2sin!4v1716000000000!5m2!1sen!2sin"
              width="100%" height="480"
              style={{ border: 0 }} allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-card-overlay">
              <MapPin size={20} className="map-overlay-icon" />
              <div>
                <p className="map-overlay-title">TM Square Global Solutions</p>
                <p className="map-overlay-addr">702 Aspen D Tower, Omaxe Spa Village,<br />Sector 78, Greater Faridabad – 121001</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
