import React, { useState, useEffect, useRef } from 'react';

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
    { label:'Home', page:'home' },
    { label:'About Us', page:'about' },
    { label:'Our Products', page:'products' },
    { label:'Contact', page:'contact' },
  ],
  Products: [
    { label:'TPMS Sensors', page:'tpms' },
    { label:'Copier Paper', page:'paper' },
    { label:'FASTag Services', page:'fastag' },
    { label:'Request Quote', page:'contact' },
  ],
  Policies: [
    { label:'Privacy Policy' },
    { label:'Terms & Conditions' },
    { label:'Cancellation & Refunds' },
    { label:'Shipping & Delivery' },
  ],
};

const Footer = ({ setCurrentPage }) => (
  <footer style={{ background:'#080808', borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:80 }}>

    {/* Big CTA row */}
    <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px 64px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:40 }}>
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", lineHeight:0.88, letterSpacing:'0.03em' }}>
            <div style={{ fontSize:'clamp(48px,7vw,110px)', color:'#f5f5f5' }}>LET'S WORK</div>
            <div style={{ fontSize:'clamp(48px,7vw,110px)', color:'transparent', WebkitTextStroke:'2px var(--accent)' }}>TOGETHER</div>
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:16, alignItems:'flex-end' }}>
          <button
            onClick={() => setCurrentPage('contact')}
            style={{ background:'var(--accent)', color:'#fff', border:'none', borderRadius:8, padding:'18px 40px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.3rem', letterSpacing:'0.15em', cursor:'pointer', display:'flex', alignItems:'center', gap:12, transition:'all 0.2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.background='#157B8C'; e.currentTarget.style.transform='translateY(-2px)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.transform='translateY(0)'; }}
          >
            GET A QUOTE <span style={{ fontSize:'1.2rem' }}>→</span>
          </button>
          <a href="mailto:support@tmsquare.co.in" style={{ color:'#555', fontSize:'0.85rem', letterSpacing:'0.05em', transition:'color 0.2s' }}
            onMouseEnter={e=>e.target.style.color='var(--accent)'}
            onMouseLeave={e=>e.target.style.color='#555'}>
            support@tmsquare.co.in
          </a>
        </div>
      </div>
    </div>

    {/* Main grid */}
    <div style={{ maxWidth:1280, margin:'0 auto', padding:'64px 32px 48px', display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1fr', gap:48 }}>

      {/* Brand col */}
      <div>
        <div
          onClick={() => setCurrentPage('home')}
          style={{ display:'inline-flex', alignItems:'center', gap:12, cursor:'pointer', marginBottom:24 }}
        >
          <div style={{ background:'var(--accent)', width:40, height:40, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ color:'#fff', fontWeight:900, fontSize:'1rem', fontFamily:"'Bebas Neue',sans-serif", letterSpacing:'0.05em' }}>TM</span>
          </div>
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.3rem', letterSpacing:'0.12em', color:'#f5f5f5', lineHeight:1 }}>TM SQUARE</div>
            <div style={{ fontSize:'0.52rem', letterSpacing:'0.25em', color:'var(--accent)', fontWeight:700, lineHeight:1, marginTop:3 }}>GLOBAL SOLUTIONS</div>
          </div>
        </div>

        <p style={{ color:'#555', fontSize:'0.85rem', lineHeight:1.8, marginBottom:32, maxWidth:280 }}>
          Your one-stop destination for automotive safety systems, office logistics, and digital highway payment solutions across India.
        </p>

        {/* Social icons */}
        <div style={{ display:'flex', gap:10 }}>
          {[
            { icon:'public', label:'Web' },
            { icon:'share', label:'Share' },
            { icon:'forum', label:'Chat' },
          ].map(s => (
            <a key={s.label} href="#" aria-label={s.label}
              style={{ width:38, height:38, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', color:'#555', transition:'all 0.2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#555'; e.currentTarget.style.transform='translateY(0)'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize:16 }}>{s.icon}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Link cols */}
      {Object.entries(LINKS).map(([heading, items]) => (
        <div key={heading}>
          <div style={{ fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--accent)', marginBottom:24 }}>{heading}</div>
          <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:14 }}>
            {items.map(item => (
              <li key={item.label}>
                {item.page ? (
                  <span
                    onClick={() => setCurrentPage(item.page)}
                    style={{ color:'#555', fontSize:'0.85rem', cursor:'pointer', transition:'color 0.2s', display:'inline-block' }}
                    onMouseEnter={e=>e.target.style.color='#f5f5f5'}
                    onMouseLeave={e=>e.target.style.color='#555'}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a href="#" style={{ color:'#555', fontSize:'0.85rem', transition:'color 0.2s' }}
                    onMouseEnter={e=>e.target.style.color='#f5f5f5'}
                    onMouseLeave={e=>e.target.style.color='#555'}>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Contact strip */}
    <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px 48px', display:'flex', gap:40, flexWrap:'wrap' }}>
      {[
        { icon:'call', label:'PHONE', value:'+91-7678400367', href:'tel:+917678400367' },
        { icon:'mail', label:'EMAIL', value:'support@tmsquare.co.in', href:'mailto:support@tmsquare.co.in' },
        { icon:'location_on', label:'ADDRESS', value:'BH-1109, Puri Business Hub, Sec-81, Faridabad, HR 121002', href:null },
      ].map(c => (
        <div key={c.label} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:6, background:'rgba(30,161,182,0.1)', border:'1px solid rgba(30,161,182,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
            <span className="material-symbols-outlined" style={{ color:'var(--accent)', fontSize:18 }}>{c.icon}</span>
          </div>
          <div>
            <div style={{ fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--accent)', marginBottom:4 }}>{c.label}</div>
            {c.href ? (
              <a href={c.href} style={{ color:'#888', fontSize:'0.82rem', lineHeight:1.5, transition:'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='#f5f5f5'}
                onMouseLeave={e=>e.target.style.color='#888'}>
                {c.value}
              </a>
            ) : (
              <span style={{ color:'#888', fontSize:'0.82rem', lineHeight:1.5 }}>{c.value}</span>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Bottom bar */}
    <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)', padding:'20px 32px', maxWidth:1280, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
      <span style={{ fontSize:'0.72rem', color:'#333', letterSpacing:'0.08em' }}>© {new Date().getFullYear()} TM SQUARE GLOBAL SOLUTIONS PRIVATE LIMITED. ALL RIGHTS RESERVED.</span>
      <span style={{ fontSize:'0.72rem', color:'#333', letterSpacing:'0.08em' }}>POWERED BY NEXT-GEN WEB SOLUTIONS</span>
    </div>
  </footer>
);

export default Footer;
