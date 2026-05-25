import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { pageKeyToPath } from '../../config/routes';
import Reveal from '../Reveal/Reveal';
import copierPaperHero from '../../assets/copier_paper_hero.png';
import fastagPlazaHero from '../../assets/fastag_plaza_hero.png';
import './Hero.css';

const slides = [
  {
    id: 0,
    badge: 'OFFICE LOGISTICS',
    title: 'CENTURY COPIER',
    subtitle: 'PREMIUM PRINT SHEETS',
    desc: 'Engineered for high-speed commercial printers. Zero jamming guaranteed with ultra-crisp contrast and premium GSM density.',
    btn: 'Explore Paper',
    page: 'paper',
    num: '01',
    img: copierPaperHero,
  },
  {
    id: 2,
    badge: 'SMART MOBILITY',
    title: 'FASTAG RFID',
    subtitle: 'CASHLESS HIGHWAY PASS',
    desc: 'Instant cashless electronic toll collection coupled with exclusive HPCL fuel savings across nationwide transit routes.',
    btn: 'Get FASTag',
    page: 'fastag',
    num: '02',
    img: fastagPlazaHero,
  },
  {
    id: 1,
    badge: 'HYGIENE & PAPER',
    title: 'MELANIE TISSUE',
    subtitle: 'PREMIUM TISSUE PRODUCTS',
    desc: 'Ultra-soft 2-ply and 3-ply tissue sheets designed for premium hygiene. High absorbency, skin-friendly, and perfect for retail and hospitality.',
    btn: 'Get Quote',
    page: 'contact',
    num: '03',
    img: '/pic.png',
  },
];

const stats = [
  { num: '2L+', label: 'Happy Clients' },
  { num: '28+', label: 'States Covered' },
  { num: '24/7', label: 'Active Support' },
  { num: '99.9%', label: 'Accuracy Rate' },
];

const MARQUEE_ITEMS = ['COPIER PAPER', 'FASTAG RFID', 'PAN INDIA', '24/7 SUPPORT', '₹149 FASTAG', '2L+ CLIENTS', 'RFID CASHLESS'];

const CountUpStat = ({ text }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  
  const match = text.match(/([0-9.]+)/);
  const targetNum = match ? parseFloat(match[1]) : 0;
  const isFloat = match && match[1].includes('.');
  const prefix = match ? text.substring(0, match.index) : '';
  const suffix = match ? text.substring(match.index + match[1].length) : text;

  useEffect(() => {
    if (!targetNum) return;
    const el = ref.current;
    
    let startTime;
    let animFrame;
    const duration = 2000;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(targetNum * easeProgress);
      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setVal(targetNum);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animFrame = requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (el) observer.observe(el);

    return () => {
      observer.disconnect();
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [targetNum]);

  if (!targetNum && targetNum !== 0) return <span>{text}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {isFloat ? val.toFixed(1) : Math.floor(val)}
      {suffix}
    </span>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [revealOrigin, setRevealOrigin] = useState('center');
  
  const wheelLockRef = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const slideDuration = 3500;

  const current = slides[active];

  const goTo = (idx, origin = 'center') => {
    if (idx === active || isTransitioning) return;
    setIsTransitioning(true);
    setRevealOrigin(origin);
    setPrevActive(active);
    setActive(idx);
    setProgress(0);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        goTo((active + 1) % slides.length, 'bottom');
      } else {
        goTo((active - 1 + slides.length) % slides.length, 'top');
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (wheelLockRef.current || isTransitioning) return;

      if (window.scrollY < 50) {
        if (Math.abs(e.deltaY) > 30) {
          e.preventDefault();
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

  useEffect(() => {
    let animFrame;
    let lastTime = Date.now();

    const updateTimer = () => {
      if (!isTransitioning) {
        const now = Date.now();
        const delta = now - lastTime;
        lastTime = now;

        setProgress((prev) => {
          const next = prev + (delta / slideDuration) * 100;
          if (next >= 100) {
            goTo((active + 1) % slides.length, 'center');
            return 0;
          }
          return next;
        });
      } else {
        lastTime = Date.now();
      }
      animFrame = requestAnimationFrame(updateTimer);
    };

    animFrame = requestAnimationFrame(updateTimer);
    return () => cancelAnimationFrame(animFrame);
  }, [active, isTransitioning]);

  return (
    <>
      <section
        className="hero-fullscreen"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background slides */}
        <div className="hero-bg-layer">
          {slides.map((s, i) => {
            const isActive = i === active;
            const isPrev = i === prevActive;

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
                className={`hero-slide-layer${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}
                style={{
                  zIndex: isActive ? 5 : isPrev ? 2 : 1,
                  clipPath: isActive ? circleEnd : circleStart,
                  transition: 'clip-path 1.5s cubic-bezier(0.77, 0, 0.175, 1), opacity 1s ease',
                  pointerEvents: 'none',
                }}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(1.12)',
                    transition: 'transform 1.5s cubic-bezier(0.77, 0, 0.175, 1), filter 1.5s ease',
                    filter: isActive ? 'none' : 'brightness(0.3) blur(10px)',
                  }}
                />
                {/* Subtle dark tint — no blur, just darkens slightly for text readability */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.32)',
                  zIndex: 2,
                }} />
              </div>
            );
          })}
        </div>

        <div className="hero-left-gradient" aria-hidden="true" />

        <div className="hero-navbar-spacer" />

        {/* Left content — changes per slide */}
        <div className="hero-content-wrap">
          <div className="hero-content">
            <div key={active} className="hero-content-inner">
              <div className="hero-slide-num">{current.num}</div>
              <span className="hero-slide-badge">{current.badge}</span>
              <h1 className="hero-slide-title">{current.title}</h1>
              <h2 className="hero-slide-subtitle">{current.subtitle}</h2>
              <p className="hero-slide-desc">{current.desc}</p>
              <div className="hero-slide-actions">
                <button
                  type="button"
                  className="hero-cta-btn"
                  onClick={() => navigate(pageKeyToPath(current.page))}
                >
                  {current.btn}
                  <span>→</span>
                </button>
                <button
                  type="button"
                  className="hero-cta-ghost"
                  onClick={() => navigate(pageKeyToPath('contact'))}
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dots + counter */}
        <div className="hero-bottom-bar">
          <div className="hero-slide-counter">
            <span>{String(active + 1).padStart(2, '0')}</span>
            {' / '}
            {String(slides.length).padStart(2, '0')}
          </div>

          <div className="hero-dots" role="tablist" aria-label="Hero slides">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Slide ${i + 1}: ${s.title}`}
                className={`hero-dot ${i === active ? 'hero-dot--active' : ''}`}
                onClick={() => goTo(i, i > active ? 'bottom' : 'top')}
              >
                {i === active && (
                  <span
                    className="hero-dot-progress"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hero-scroll-hint">
            <span>Scroll</span>
            <span className="material-symbols-outlined">keyboard_arrow_down</span>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div
        className="hero-marquee"
        style={{
          background: 'var(--accent)',
          overflow: 'hidden',
          padding: '14px 0',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <div className="marquee-inner" style={{ display: 'flex', gap: 0 }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 24,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.1rem',
                letterSpacing: '0.15em',
                color: '#fff',
                whiteSpace: 'nowrap',
                paddingRight: 48,
              }}
            >
              {item}{' '}
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 8 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="hero-stats-band">
        <div data-reveal-stagger className="hero-stats-grid">
          {stats.map((s, i) => (
            <Reveal key={i} variant="up" className="hero-stat-item">
              <div className="hero-stat-num"><CountUpStat text={s.num} /></div>
              <div className="hero-stat-label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
