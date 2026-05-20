import React, { useEffect, useRef, useState } from 'react';
import Reveal from '../Reveal/Reveal';

// Reusable scroll-fill text component
const ScrollFillText = ({ children, fontSize, delay = 0 }) => {
  const ref = useRef(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const start = winH * 1.0;
      const end = winH * 0.15;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setFill(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', lineHeight: 0.88 }}>
      {/* Orange outline layer */}
      <div style={{ fontSize, color: 'transparent', WebkitTextStroke: '2px #1EA1B6', userSelect: 'none', lineHeight: 0.88 }}>
        {children}
      </div>
      {/* White fill layer, revealed left→right */}
      <div style={{
        position: 'absolute', inset: 0, fontSize, color: '#f5f5f5',
        WebkitTextStroke: '0px transparent', lineHeight: 0.88,
        clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)`,
        transition: 'clip-path 0.04s linear',
        pointerEvents: 'none',
      }}>
        {children}
      </div>
    </div>
  );
};

const FEATURES = [
  { num:'01', icon:'sell', title:'Reasonable Pricing', desc:'Transparent, competitive pricing across all our products and logistics services — no hidden costs.' },
  { num:'02', icon:'local_shipping', title:'Lightning Fast Delivery', desc:'Express processing and timely nationwide delivery for all bulk paper, TPMS kits, and FASTag orders.' },
  { num:'03', icon:'public', title:'Pan India Presence', desc:'Widespread logistics network covering every Indian state — from metros to tier-3 cities.' },
  { num:'04', icon:'verified', title:'2,00,000+ Trusted Clients', desc:'Over two lakh satisfied drivers, businesses, and printing agencies rely on us month after month.' },
];

const Features = () => (
    <section style={{ background: '#0d0d0d', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden', width: '100%', maxWidth: '100%' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%', boxSizing: 'border-box' }}>

        <Reveal variant="up" delay={60} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 32 }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>WHY PARTNER WITH US</span>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.03em', lineHeight: 0.88 }}>
              <div style={{ fontSize: 'clamp(40px,5.5vw,78px)', color: '#f5f5f5', display: 'block' }}>WE DELIVER</div>
              <ScrollFillText fontSize="clamp(40px,5.5vw,78px)">PERFECTION</ScrollFillText>
            </div>
          </div>
          <p style={{ color: '#555', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 360 }}>
            Discover why thousands of Indian enterprises and car owners choose TM Square Global Solutions as their official partner.
          </p>
        </Reveal>

        <div data-reveal-stagger className="home-features-grid">
          {FEATURES.map((f) => (
            <Reveal
              key={f.num}
              variant="up"
              style={{
                background: '#0d0d0d', padding: '36px 28px',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#111'}
              onMouseLeave={e => e.currentTarget.style.background = '#0d0d0d'}
            >
              <div style={{ position: 'absolute', bottom: -8, right: 10, fontFamily: "'Bebas Neue',sans-serif", fontSize: '5rem', color: 'rgba(255,255,255,0.03)', lineHeight: 1, pointerEvents: 'none' }}>{f.num}</div>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: 'rgba(30,161,182,0.1)', border: '1px solid rgba(30,161,182,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: 22 }}>{f.icon}</span>
              </div>
              <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>{f.num}</div>
              <h4 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.05em', color: '#f5f5f5', marginBottom: 10, lineHeight: 1.1 }}>{f.title}</h4>
              <p style={{ color: '#666', fontSize: '0.82rem', lineHeight: 1.7 }}>{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
);

export default Features;
