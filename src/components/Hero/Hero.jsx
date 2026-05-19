import React, { useState, useEffect, useRef } from 'react';
import copierPaperHero from '../../assets/copier_paper_hero.png';
import tpmsSensorsHero from '../../assets/tpms_sensors_hero.png';
import fastagPlazaHero from '../../assets/fastag_plaza_hero.png';

const slides = [
  {
    id: 0, 
    badge: 'OFFICE LOGISTICS',
    title: 'CENTURY COPIER',
    subtitle: 'PREMIUM PRINT SHEETS',
    desc: 'Engineered for high-speed commercial printers. Zero jamming guaranteed with ultra-crisp contrast and premium GSM density.',
    btn: 'Explore Paper', page: 'paper', num: '01',
    img: copierPaperHero
  },
  {
    id: 1, 
    badge: 'AUTOMOTIVE SAFETY',
    title: 'TPMS SENSORS',
    subtitle: 'REAL-TIME TYRE PROTECTION',
    desc: 'Solar-powered active monitoring system delivering real-time tire pressure and thermal diagnostics directly to your cockpit.',
    btn: 'Explore TPMS', page: 'tpms', num: '02',
    img: tpmsSensorsHero
  },
  {
    id: 2, 
    badge: 'SMART MOBILITY',
    title: 'FASTAG RFID',
    subtitle: 'CASHLESS HIGHWAY PASS',
    desc: 'Instant cashless electronic toll collection coupled with exclusive HPCL fuel savings across nationwide transit routes.',
    btn: 'Get FASTag', page: 'fastag', num: '03',
    img: fastagPlazaHero
  }
];

const stats = [
  { num: '2L+', label: 'Happy Clients' },
  { num: '28+', label: 'States Covered' },
  { num: '24/7', label: 'Active Support' },
  { num: '99.9%', label: 'Accuracy Rate' },
];

const MARQUEE_ITEMS = ['TPMS SENSORS','COPIER PAPER','FASTAG RFID','PAN INDIA','24/7 SUPPORT','₹149 FASTAG','2L+ CLIENTS'];

const Hero = ({ setCurrentPage }) => {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [revealOrigin, setRevealOrigin] = useState('center'); // 'center', 'left', 'right'
  const isHoveredRef = useRef(false);
  const wheelLockRef = useRef(false);
  const slideDuration = 6500;

  const goTo = (idx, origin = 'center') => {
    if (idx === active || isTransitioning) return;
    setIsTransitioning(true);
    setRevealOrigin(origin);
    setPrevActive(active);
    setActive(idx);
    setProgress(0);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500); // 1.5s luxurious transition duration
  };

  // Handle Mouse Wheel / Trackpad Scroll to navigate slides exactly like Arnaud Rocca
  useEffect(() => {
    const handleWheel = (e) => {
      if (wheelLockRef.current || isTransitioning) return;

      // Only capture wheel events if the window scroll position is at the very top (inside Hero)
      if (window.scrollY < 50) {
        if (Math.abs(e.deltaY) > 30) {
          e.preventDefault(); // Prevent standard vertical page jump during slide transition
          wheelLockRef.current = true;
          
          if (e.deltaY > 0) {
            goTo((active + 1) % slides.length, 'bottom');
          } else {
            goTo((active - 1 + slides.length) % slides.length, 'top');
          }

          setTimeout(() => {
            wheelLockRef.current = false;
          }, 1800);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [active, isTransitioning]);

  // Automated Progress Timer
  useEffect(() => {
    let startTime = Date.now();
    let animFrame;

    const updateTimer = () => {
      if (!isHoveredRef.current && !isTransitioning) {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / slideDuration) * 100, 100);
        setProgress(currentProgress);

        if (elapsed >= slideDuration) {
          goTo((active + 1) % slides.length, 'center');
          startTime = Date.now();
        }
      } else {
        startTime = Date.now() - (progress / 100) * slideDuration;
      }
      animFrame = requestAnimationFrame(updateTimer);
    };

    animFrame = requestAnimationFrame(updateTimer);
    return () => cancelAnimationFrame(animFrame);
  }, [active, progress, isTransitioning]);

  return (
    <>
      {/* ── HERO FULLSCREEN IMMERSIVE SLIDER (Arnaud Rocca Style) ── */}
      <section 
        style={{ 
          height: '100vh', 
          width: '100vw',
          position: 'relative', 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          backgroundColor: '#050505',
        }}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        {/* Fullscreen Background Images with pristine Arnaud Rocca circle/radial expanding mask */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
          {slides.map((s, i) => {
            const isActive = i === active;
            const isPrev = i === prevActive;

            // Determine circle clip path coordinates based on transition direction
            let circleStart = 'circle(0% at 50% 50%)';
            let circleEnd = 'circle(150% at 50% 50%)';
            if (revealOrigin === 'bottom') {
              circleStart = 'circle(0% at 50% 90%)';
              circleEnd = 'circle(160% at 50% 90%)';
            } else if (revealOrigin === 'top') {
              circleStart = 'circle(0% at 50% 10%)';
              circleEnd = 'circle(160% at 50% 10%)';
            }

            return (
              <div
                key={s.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: isActive ? 5 : isPrev ? 2 : 1,
                  /* Luxurious soft circular expanding wipe transition */
                  clipPath: isActive ? circleEnd : circleStart,
                  transition: 'clip-path 1.5s cubic-bezier(0.77, 0, 0.175, 1)',
                  pointerEvents: 'none',
                }}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    /* Continuous cinematic scale zoom & contrast shift */
                    transform: isActive ? 'scale(1)' : 'scale(1.12)',
                    transition: 'transform 1.5s cubic-bezier(0.77, 0, 0.175, 1), filter 1.5s ease',
                    filter: isActive ? 'brightness(0.95)' : 'brightness(0.3) blur(10px)',
                  }}
                />
                {/* Cinematic Vignette Overlay */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(5,5,5,0.85) 95%), linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 50%, rgba(5,5,5,0.95) 100%)' 
                  }} 
                />
              </div>
            );
          })}
        </div>

        {/* Top spacer for navbar */}
        <div style={{ height: 95, zIndex: 10, position: 'relative' }} />

        {/* Empty content area to allow the slider to be fully visible and uncluttered */}
        <div style={{ flex: 1 }} />
      </section>

      {/* ── MARQUEE TICKER ── */}
      <div style={{ background: 'var(--accent)', overflow: 'hidden', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="marquee-inner" style={{ display: 'flex', gap: 0 }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 24, fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.1rem', letterSpacing: '0.15em', color: '#fff', whiteSpace: 'nowrap', paddingRight: 48 }}>
              {item} <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 8 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS BAND ── */}
      <section style={{ background: '#111', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none', paddingRight: i < 3 ? 32 : 0 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 5vw, 72px)', color: 'var(--accent)', lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
