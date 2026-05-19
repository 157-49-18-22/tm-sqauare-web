import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <div className="contact-page fade-in-up">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <span className="badge badge-cyan">24/7 Support Desk</span>
          <h1 className="contact-title">Let's Start a Conversation</h1>
          <p className="contact-subtitle">
            Whether you need a custom quote for bulk photo copier paper, support for your FASTag account, or technical queries about TPMS sensors, our team is here for you.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Contacts */}
          <div className="contact-info-cards">
            <div className="contact-info-card fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="contact-icon-wrapper">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="contact-card-title">Phone & WhatsApp</h3>
                <p className="contact-card-text">+91-7678400367</p>
                <p className="contact-card-text" style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '4px' }}>Available Mon-Sat, 9 AM - 8 PM</p>
              </div>
            </div>

            <div className="contact-info-card fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="contact-icon-wrapper">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="contact-card-title">Email Inquiries</h3>
                <p className="contact-card-text">support@tmsquare.co.in</p>
                <p className="contact-card-text">sales@tmsquare.co.in</p>
              </div>
            </div>

            <div className="contact-info-card fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="contact-icon-wrapper">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="contact-card-title">Headquarters</h3>
                <p className="contact-card-text">BH-1109, Puri Business Hub, High Street, Sector-81, Faridabad, Haryana 121002</p>
              </div>
            </div>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-accent fade-in-up" style={{ padding: '16px', fontSize: '1.05rem', animationDelay: '0.4s' }}>
              <MessageSquare size={20} /> Chat with Support on WhatsApp
            </a>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-card fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="form-title">Send an Inquiry</h2>
            <p className="form-subtitle">Fill out the form below and an expert will reply within 2 business hours.</p>

            {submitted ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)' }}>
                <CheckCircle2 size={64} style={{ color: 'var(--accent)', margin: '0 auto 16px auto' }} />
                <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', marginBottom: '8px' }}>Message Sent Successfully!</h3>
                <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. Our support agent is reviewing your message.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-row">
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Full Name *</label>
                    <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Email Address *</label>
                    <input type="email" name="email" className="form-control" required value={formData.email} onChange={handleChange} placeholder="john@company.com" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Phone Number</label>
                    <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Subject</label>
                    <input type="text" name="subject" className="form-control" value={formData.subject} onChange={handleChange} placeholder="Product Pricing / FASTag Support" />
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Your Message *</label>
                  <textarea name="message" className="form-control" rows="5" required value={formData.message} onChange={handleChange} placeholder="Describe your requirement in detail..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '1.1rem', marginTop: '10px' }}>
                  <Send size={20} /> Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
