import React, { useState, useEffect, useRef } from 'react';
import Reveal from '../Reveal/Reveal';
import './Quote.css';

const ScrollFillText = ({ children, fontSize }) => {
  const ref = useRef(null);
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const winH = window.innerHeight;
      setFill(Math.max(0, Math.min(1, (winH - rect.top) / (winH * 0.85))));
    };
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', lineHeight: 0.88 }}>
      <div style={{ fontSize, color: 'transparent', WebkitTextStroke: '2px #1EA1B6', userSelect: 'none', lineHeight: 0.88 }}>{children}</div>
      <div style={{ position: 'absolute', inset: 0, fontSize, color: '#f5f5f5', lineHeight: 0.88, clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)`, transition: 'clip-path 0.04s linear', pointerEvents: 'none' }}>{children}</div>
    </div>
  );
};

const SERVICE_OPTIONS = [
  'Automotive Safety (TPMS)',
  'Office Logistics (Paper)',
  'RFID / FASTag Services',
  'Other Inquiry',
];

const ServicePicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('touchstart', close);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`quote-select${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="quote-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value}</span>
        <span className="material-symbols-outlined" aria-hidden="true">expand_more</span>
      </button>
      {open && (
        <ul className="quote-select-menu" role="listbox">
          {SERVICE_OPTIONS.map((opt) => (
            <li key={opt} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === opt}
                className={`quote-select-option${value === opt ? ' is-selected' : ''}`}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Quote = () => {
  const [form, setForm] = useState({ name: '', email: '', service: SERVICE_OPTIONS[0], message: '' });
  const [sent, setSent] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', service: SERVICE_OPTIONS[0], message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="home-quote-section" style={{ background: '#0d0d0d', padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden', width: '100%', maxWidth: '100%' }}>
      <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(30,161,182,0.07) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 400, height: 400, background: 'radial-gradient(circle,rgba(30,161,182,0.05) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="home-quote-grid">
        <Reveal variant="left" delay={80}>
          <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>GET IN TOUCH</span>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", lineHeight: 0.9, letterSpacing: '0.03em', marginBottom: 32 }}>
            <div style={{ fontSize: 'clamp(40px,6vw,80px)', color: '#f5f5f5' }}>SCALE YOUR</div>
            <ScrollFillText fontSize="clamp(40px,6vw,80px)">OPERATIONS</ScrollFillText>
          </div>
          <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 40, maxWidth: 400 }}>
            Join over 2,00,000+ satisfied clients. Whether you need TPMS kits for your fleet or bulk paper for your enterprise — we deliver.
          </p>

          {['Guaranteed quality with 99.9% accuracy rate', 'Pan-India express logistics within 48–72 hours', 'Flexible credit terms for verified corporate partners'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(30,161,182,0.12)', border: '1px solid rgba(30,161,182,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>
              </div>
              <span style={{ color: '#999', fontSize: '0.9rem', lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}

          <div style={{ marginTop: 48, padding: '24px 32px', background: 'rgba(30,161,182,0.06)', border: '1px solid rgba(30,161,182,0.15)', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 20 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: 28 }}>call</span>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>Call Us 24/7</div>
              <a href="tel:+917678400367" style={{ color: '#f5f5f5', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.05em' }}>+91-7678400367</a>
            </div>
          </div>
        </Reveal>

        <Reveal variant="scale" delay={280} className="home-quote-card">
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', letterSpacing: '0.08em', color: '#f5f5f5', marginBottom: 32 }}>REQUEST A CUSTOM QUOTE</h3>

          {sent && (
            <div style={{ marginBottom: 24, padding: '16px 20px', background: 'rgba(30,161,182,0.1)', border: '1px solid rgba(30,161,182,0.3)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12, color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
              Request sent! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={submit} className="home-quote-form">
            <div className="home-quote-form-row">
              {[
                { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
                { label: 'Company Email', name: 'email', type: 'email', placeholder: 'john@company.com' },
              ].map((f) => (
                <div key={f.name} className="home-quote-field">
                  <label>{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={form[f.name]}
                    onChange={change}
                    required
                    placeholder={f.placeholder}
                    className="form-control"
                  />
                </div>
              ))}
            </div>

            <div className="home-quote-field">
              <label>Service Required</label>
              <ServicePicker
                value={form.service}
                onChange={(service) => setForm((prev) => ({ ...prev, service }))}
              />
            </div>

            <div className="home-quote-field">
              <label>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={change}
                rows={4}
                placeholder="Tell us about your requirements..."
                className="form-control"
                style={{ resize: 'none' }}
              />
            </div>

            <button
              type="submit"
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, padding: '16px 32px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.2rem', letterSpacing: '0.15em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, transition: 'all 0.2s', marginTop: 8, width: '100%' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#157B8C'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              SEND REQUEST <span style={{ fontSize: '1.1rem' }}>→</span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Quote;
