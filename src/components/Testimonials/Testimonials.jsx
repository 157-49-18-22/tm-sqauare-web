import React, { useState, useEffect, useRef } from 'react';
import Reveal from '../Reveal/Reveal';

const ScrollFillText = ({ children, fontSize }) => {
  const ref = useRef(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (winH - rect.top) / (winH * 0.85)));
      setFill(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', lineHeight: 0.88 }}>
      <div style={{ fontSize, color: 'transparent', WebkitTextStroke: '2px #1EA1B6', userSelect: 'none', lineHeight: 0.88 }}>{children}</div>
      <div style={{ position: 'absolute', inset: 0, fontSize, color: '#f5f5f5', lineHeight: 0.88, clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)`, transition: 'clip-path 0.04s linear', pointerEvents: 'none' }}>{children}</div>
    </div>
  );
};

const TESTIMONIALS = [
  { name:'Rajesh Malhotra', role:'Operations Director, LogiTrans India', stars:5, quote:'"The TPMS kits from TM Square have significantly improved our fleet\'s safety metrics. Their technical support is truly 24/7 as advertised."', avatar:'https://lh3.googleusercontent.com/aida-public/AB6AXuDH3Wv06Io32TDVfRH4FAzFth49RPq9v6oDeRmARQYmZC8mooURqkLZB3E3CWqcfk4GziT0STY9OyHrIUJf8fLnzJtev1YN1sh7iDjOGBWG8V2f89fVpTjT0S7Uy6ZNqJ-oSKk4sAzm5mHU68Lc7GLUACr8I7DBTvyq8o1gi5OPREVLK5FMboPb7Ybd5YRgkASNBi1yBJFM7NF38gmCI8J6F26z5pwCPl-lvYn-vf3gjI0Cn4Mun65CBCAibl8AMLhsqvki81bLLSU' },
  { name:'Priya Sharma', role:'Procurement Head, PrintSolutions Hub', stars:5, quote:'"Incredible turnaround time on bulk copier paper orders. We\'ve never had a supply chain issue since switching to TM Square for our 50+ centers."', avatar:'https://lh3.googleusercontent.com/aida-public/AB6AXuDOmNuo4quwlWOv9ocvoAWQhqAQo53gd3Mw8IYONlwsLyfDBqJs5bnFxWsE1HCs_WUn1vln9w972_YnjEI61ClQJBf0rWEEDPinstl335vPuFRRTSgb9D7wXFjIFKJGwWXgXE1gNB5IJDAWwCMPiML4amRRYOVWB7R2GxLHFBlTPUZbwfWcuC5fE4AG7UWMzfvmmPWVnZH705VYbCFVmQVRzHIbj9f4tzj7rwzaJvCQiI2fKhF83LuqnCHSVaVUqSrkGyY3kLqdsAQ' },
  { name:'Anil Kapoor', role:'Fleet Manager, TransIndia Pvt Ltd', stars:5, quote:'"FASTag activation was seamless for our entire fleet of 200 trucks. The HPCL fuel card savings have been remarkable."', avatar:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
  { name:'Sunita Patel', role:'Admin Head, CopyExpress Chain', stars:5, quote:'"Best-in-class paper quality with zero jamming. Our photocopiers have never been more efficient. TM Square is our go-to vendor now."', avatar:'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200' },
];

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const visible = [TESTIMONIALS[idx % TESTIMONIALS.length], TESTIMONIALS[(idx + 1) % TESTIMONIALS.length]];

  return (
    <section style={{ background: 'var(--bg)', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        <Reveal variant="up" delay={80} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>CLIENT FEEDBACK</span>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.03em', lineHeight: 0.88 }}>
              <div style={{ fontSize: 'clamp(36px,5vw,68px)', color: '#f5f5f5', display: 'block' }}>TRUSTED BY</div>
              <ScrollFillText fontSize="clamp(36px,5vw,68px)">INDUSTRY LEADERS</ScrollFillText>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[['←', () => setIdx(p => (p - 2 + TESTIMONIALS.length) % TESTIMONIALS.length)],
              ['→', () => setIdx(p => (p + 2) % TESTIMONIALS.length)]].map(([arrow, fn], i) => (
              <button key={i} onClick={fn} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(30,161,182,0.4)', background: 'transparent', color: 'var(--accent)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}>
                {arrow}
              </button>
            ))}
          </div>
        </Reveal>

        <div data-reveal-stagger style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {visible.map((t, i) => (
            <Reveal key={i} variant="scale" delay={200 + i * 120} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '36px 40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 16, right: 24, fontFamily: "'Bebas Neue',sans-serif", fontSize: '7rem', color: 'rgba(30,161,182,0.06)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>"</div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: 16, fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p style={{ color: '#bbb', fontSize: '0.92rem', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 28 }}>{t.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(30,161,182,0.25)', flexShrink: 0 }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f5f5f5' }}>{t.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#555', marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
