import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pageKeyToPath } from '../../config/routes';
import Reveal from '../Reveal/Reveal';
import copierPaperHero from '../../assets/copier_paper_hero.png';

import fastagPlazaHero from '../../assets/fastag_plaza_hero.png';

const PRODUCTS = [
  {
    num: '01', badge: 'HYGIENE & PAPER',
    title: 'MELANIE TISSUE PAPER',
    desc: 'Premium soft facial and toilet tissue crafted for everyday comfort—strong when wet, gentle on skin. Ideal for homes, offices, hospitality, and retail shelves with consistent quality batch after batch.',
    specs: ['Soft 2-Ply & 3-Ply', 'High Absorbency', 'Bulk & Retail Packs', 'Skin-Friendly'],
    price: 'Get Quote', unit: '/ bulk order',
    page: 'contact',
    img: '/pic.png',
  },
  {
    num: '02', badge: 'OFFICE SUPPLIES',
    title: 'CENTURY PHOTO COPIER PAPER',
    desc: 'High-grade dual-surface copying sheets engineered to run smoothly on high-speed commercial printers, photocopiers, and laser devices. Zero jamming guaranteed.',
    specs: ['A4, A3 & FS Sizes', '70–85 GSM', 'Jam-Free Tech', 'High Whiteness'],
    price: 'Get Quote', unit: '/ bulk order',
    page: 'paper',
    img: copierPaperHero,
  },
  {
    num: '03', badge: 'RFID SERVICES',
    title: 'FASTAG ACTIVATION & HPCL',
    desc: 'Cashless electronic highway toll RFID sticker coupled with HPCL petrol pump fuel discount cards. Seamless registration, 24/7 support, and 99% national toll coverage.',
    specs: ['Instant Approval', 'Fuel & Toll Pay', 'Auto-renew Pass', '99% Coverage'],
    price: '₹149', unit: '/ promo offer',
    page: 'fastag',
    img: fastagPlazaHero,
  },
];

const ProductCard = ({ p, i }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const isEven = i % 2 === 0;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { setRevealed(entry.isIntersecting); },
      { threshold: 0.12 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: 420,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
        background: '#111',
        marginBottom: 3,
      }}
    >
      {/* IMAGE — clip-path wipe in from edge */}
      <div
        style={{
          order: isEven ? 1 : 2,
          position: 'relative',
          overflow: 'hidden',
          clipPath: revealed
            ? 'inset(0% 0% 0% 0% round 0px)'
            : isEven
              ? 'inset(0% 100% 0% 0% round 0px)'
              : 'inset(0% 0% 0% 100% round 0px)',
          transition: 'clip-path 1s cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        <img
          src={p.img}
          alt={p.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: revealed ? 'scale(1)' : 'scale(1.12)',
            transition: 'transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)',
            display: 'block',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: isEven ? 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 60%)' : 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 20, right: isEven ? 'auto' : 20, left: isEven ? 20 : 'auto', fontFamily: "'Bebas Neue',sans-serif", fontSize: '5rem', color: 'rgba(255,255,255,0.12)', lineHeight: 1, userSelect: 'none' }}>{p.num}</div>
      </div>

      {/* TEXT — fade + slide in from opposite side */}
      <div
        style={{
          order: isEven ? 2 : 1,
          padding: '32px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateX(0)' : `translateX(${isEven ? 40 : -40}px)`,
          transition: 'opacity 0.9s ease 0.3s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s',
        }}
      >
        <div>
          {/* Badge + ghost num */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{
              fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--accent)', background: 'rgba(30,161,182,0.1)',
              border: '1px solid rgba(30,161,182,0.25)', padding: '4px 10px', borderRadius: 4,
            }}>{p.badge}</span>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '3rem', color: 'rgba(255,255,255,0.05)', lineHeight: 1, userSelect: 'none' }}>{p.num}</span>
          </div>

          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.4rem, 2vw, 2rem)', letterSpacing: '0.05em', color: '#f5f5f5', marginBottom: 10, lineHeight: 1.05 }}>{p.title}</h3>
          <p style={{ color: '#666', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {p.specs.map(s => (
              <span key={s} style={{
                fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '4px 10px', borderRadius: 4,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#888',
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.6rem', color: 'var(--accent)', lineHeight: 1 }}>{p.price}</div>
            <div style={{ fontSize: '0.58rem', color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>{p.unit}</div>
          </div>
          <button
            onClick={() => navigate(pageKeyToPath(p.page))}
            style={{
              background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6,
              padding: '10px 22px', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#157B8C'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Explore <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const headerRef = useRef(null);
  const [fillProgress, setFillProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      // Start: element bottom enters viewport bottom (rect.bottom = winH)
      // End:   element top reaches 30% from top (rect.top = winH * 0.3)
      const start = winH * 1.0;
      const end = winH * 0.1;
      const current = rect.bottom;
      const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));
      setFillProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section style={{ background: 'var(--bg)', padding: '80px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Section heading with scroll-fill effect */}
        <Reveal variant="up" delay={60} style={{ textAlign: 'center', marginBottom: 48 }}>
          <div ref={headerRef} style={{ fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.04em', lineHeight: 0.88 }}>
            {/* SELECTED — always solid white */}
            <div style={{ fontSize: 'clamp(64px,9vw,130px)', color: '#f5f5f5' }}>SELECTED</div>

            {/* PRODUCTS — orange outline → fills white on scroll */}
            <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0.88 }}>
              {/* Layer 1: orange stroke outline (always visible beneath) */}
              <div style={{
                fontSize: 'clamp(64px,9vw,130px)',
                color: 'transparent',
                WebkitTextStroke: '2px #1EA1B6',
                userSelect: 'none',
              }}>PRODUCTS</div>

              {/* Layer 2: solid white fill, revealed left→right by clip-path */}
              <div style={{
                position: 'absolute', inset: 0,
                fontSize: 'clamp(64px,9vw,130px)',
                color: '#f5f5f5',
                WebkitTextStroke: '0px transparent',
                clipPath: `inset(0 ${(1 - fillProgress) * 100}% 0 0)`,
                transition: 'clip-path 0.05s linear',
                pointerEvents: 'none',
              }}>PRODUCTS</div>
            </div>
          </div>

          <p style={{ color: '#444', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 20 }}>
            Automotive · Office Supplies · RFID
          </p>
        </Reveal>

        {/* Product cards with scroll-reveal wipe animation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.num} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
