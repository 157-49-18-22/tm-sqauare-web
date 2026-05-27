import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { pageKeyToPath, ROUTES } from '../../config/routes';
import Reveal from '../Reveal/Reveal';
import './Footer.css';

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

const LINKS = {
  Company: [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Our Products', page: 'products' },
    { label: 'Contact', page: 'contact' },
  ],
  Products: [
    { label: 'Copier Paper', page: 'paper' },
    { label: 'FASTag Services', page: 'fastag' },
    { label: 'Request Quote', page: 'contact' },
  ],
  Policies: [
    { label: 'Privacy Policy' },
    { label: 'Terms & Conditions' },
    { label: 'Cancellation & Refunds' },
    { label: 'Shipping & Delivery' },
  ],
};

const Footer = () => {
  const navigate = useNavigate();
  const go = (page) => navigate(pageKeyToPath(page));

  return (
    <footer className="site-footer">

      {/* Big CTA row */}
      <Reveal variant="up" delay={60} className="footer-cta-wrap">
        <div className="footer-cta">
          <div className="footer-cta-heading">
            <div className="footer-cta-title">
              <div className="footer-cta-line footer-cta-line--solid">LET'S WORK</div>
              <div className="footer-cta-line footer-cta-line--outline">TOGETHER</div>
            </div>
          </div>
          <div className="footer-cta-actions">
            <button
              type="button"
              className="footer-cta-btn"
              onClick={() => navigate(ROUTES.contact)}
            >
              GET A QUOTE <span aria-hidden="true">→</span>
            </button>
            <a href="mailto:support@tmsquare.co.in" className="footer-cta-email">
              support@tmsquare.co.in
            </a>
          </div>
        </div>
      </Reveal>

      <div data-reveal-stagger className="footer-grid-wrap">

        <Reveal variant="up" className="footer-brand-col">
          <div
            className="footer-brand-row"
            onClick={() => navigate(ROUTES.home)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate(ROUTES.home)}
          >
            <img src="/logo1.png" alt="TM Square Logo" style={{ height: '45px', width: 'auto', objectFit: 'contain' }} />
          </div>

          <p className="footer-brand-desc">
            Your one-stop destination for automotive safety systems, office logistics, and digital highway payment solutions across India.
          </p>

          {/* Social icons */}
          <div className="footer-social-row">
            {[
              { icon: 'public', label: 'Web' },
              { icon: 'share', label: 'Share' },
              { icon: 'forum', label: 'Chat' },
            ].map(s => (
              <a key={s.label} href="#" aria-label={s.label}
                style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#555'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{s.icon}</span>
              </a>
            ))}
          </div>
        </Reveal>

        {Object.entries(LINKS).map(([heading, items]) => (
          <Reveal key={heading} variant="up" className="footer-link-col">
            <div className="footer-link-heading">{heading}</div>
            <ul className="footer-link-list">
              {items.map(item => (
                <li key={item.label}>
                  {item.page ? (
                    <span
                      onClick={() => go(item.page)}
                      style={{ color: '#555', fontSize: '0.85rem', cursor: 'pointer', transition: 'color 0.2s', display: 'inline-block' }}
                      onMouseEnter={e => e.target.style.color = '#f5f5f5'}
                      onMouseLeave={e => e.target.style.color = '#555'}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <a href="#" style={{ color: '#555', fontSize: '0.85rem', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#f5f5f5'}
                      onMouseLeave={e => e.target.style.color = '#555'}>
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* Contact strip */}
      <div className="footer-contact-strip">
        {[
          { icon: 'call', label: 'PHONE', value: '+91-7678400367', href: 'tel:+917678400367' },
          { icon: 'mail', label: 'EMAIL', value: 'support@tmsquare.co.in', href: 'mailto:support@tmsquare.co.in' },
          { icon: 'location_on', label: 'ADDRESS', value: ' 2nd Floor, OMAXE WORLD STREET, SCO 30, Sector 79, Faridabad, Haryana – 121004', href: null },
        ].map(c => (
          <div key={c.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 6, background: 'rgba(30,161,182,0.1)', border: '1px solid rgba(30,161,182,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: 18 }}>{c.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>{c.label}</div>
              {c.href ? (
                <a href={c.href} style={{ color: '#888', fontSize: '0.82rem', lineHeight: 1.5, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#f5f5f5'}
                  onMouseLeave={e => e.target.style.color = '#888'}>
                  {c.value}
                </a>
              ) : (
                <span style={{ color: '#888', fontSize: '0.82rem', lineHeight: 1.5 }}>{c.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <span style={{ fontSize: '0.72rem', color: '#333', letterSpacing: '0.08em' }}>© {new Date().getFullYear()} TM SQUARE GLOBAL SOLUTIONS PRIVATE LIMITED. ALL RIGHTS RESERVED.</span>
        <span style={{ fontSize: '0.72rem', color: '#333', letterSpacing: '0.08em' }}>POWERED BY NEXT-GEN WEB SOLUTIONS</span>
      </div>
    </footer>
  );
};

export default Footer;
