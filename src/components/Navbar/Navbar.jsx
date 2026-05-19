import React, { useState, useEffect } from 'react';

const Navbar = ({ currentPage, setCurrentPage, cartItemsCount }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (page) => { setCurrentPage(page); setMobileOpen(false); setProductsOpen(false); };

  return (
    <header
      style={{
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        width: 'calc(100% - 40px)',
        maxWidth: 1200,
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.82)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        borderRadius: '50px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>

        {/* Circular Logo & Name */}
        <div
          onClick={() => go('home')}
          style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}
        >
          {/* White Circular Badge */}
          <div style={{
            background:'#fff',
            width:40,
            height:40,
            borderRadius:'50%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            boxShadow:'0 4px 12px rgba(0,0,0,0.15)',
            flexShrink:0,
          }}>
            <span style={{
              color:'#1EA1B6',
              fontWeight:900,
              fontSize:'1.1rem',
              fontFamily:"'Bebas Neue',sans-serif",
              letterSpacing:'0.02em',
              lineHeight:1,
              marginTop:1
            }}>TM</span>
          </div>

          {/* Text labels */}
          <div style={{ display:'flex', flexDirection:'column' }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.2rem', letterSpacing:'0.12em', color:'#f5f5f5', lineHeight:1 }}>TM SQUARE</span>
            <span style={{ fontSize:'0.52rem', letterSpacing:'0.22em', color:'var(--accent)', fontWeight:700, lineHeight:1, marginTop:2 }}>GLOBAL SOLUTIONS</span>
          </div>
        </div>

        {/* Desktop Nav - Middle */}
        <nav style={{ display:'flex', alignItems:'center', gap:32 }}>
          {[
            { label:'HOME', page:'home' },
            { label:'ABOUT', page:'about' },
          ].map(item => (
            <button
              key={item.page}
              onClick={() => go(item.page)}
              style={{
                background:'none',
                border:'none',
                cursor:'pointer',
                fontFamily:"'Inter',sans-serif",
                fontWeight:600,
                fontSize:'0.72rem',
                letterSpacing:'0.15em',
                textTransform:'uppercase',
                color: currentPage === item.page ? 'var(--accent)' : '#888',
                transition:'color 0.2s',
                padding:0,
              }}
              onMouseEnter={e => { if(currentPage !== item.page) e.target.style.color='#f5f5f5'; }}
              onMouseLeave={e => { if(currentPage !== item.page) e.target.style.color='#888'; }}
            >
              {item.label}
            </button>
          ))}

          {/* Products Dropdown */}
          <div
            style={{ position:'relative' }}
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              onClick={() => go('products')}
              style={{
                background:'none',
                border:'none',
                cursor:'pointer',
                fontFamily:"'Inter',sans-serif",
                fontWeight:600,
                fontSize:'0.72rem',
                letterSpacing:'0.15em',
                textTransform:'uppercase',
                color: ['products','tpms','paper','fastag'].includes(currentPage) ? 'var(--accent)' : '#888',
                transition:'color 0.2s',
                display:'flex',
                alignItems:'center',
                gap:4,
                padding:0,
              }}
            >
              PRODUCTS <span style={{ fontSize:'0.65rem' }}>▾</span>
            </button>

            {productsOpen && (
              <div className="animate-fadeIn" style={{
                position:'absolute',
                top:'calc(100% + 12px)',
                left:'50%',
                transform:'translateX(-50%)',
                background:'#111',
                border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:12,
                padding:'8px',
                width:250,
                boxShadow:'0 20px 60px rgba(0,0,0,0.8)',
              }}>
                {[
                  { icon:'memory', label:'TPMS Sensors', sub:'Automotive safety tech', page:'tpms' },
                  { icon:'description', label:'Copier Paper', sub:'Premium office supplies', page:'paper' },
                  { icon:'near_me', label:'FASTag Services', sub:'RFID cashless tolls', page:'fastag' },
                ].map(item => (
                  <div
                    key={item.page}
                    onClick={() => go(item.page)}
                    style={{
                      display:'flex',
                      alignItems:'center',
                      gap:12,
                      padding:'10px 12px',
                      borderRadius:8,
                      cursor:'pointer',
                      transition:'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(30,161,182,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}
                  >
                    <div style={{
                      width:32,
                      height:32,
                      borderRadius:6,
                      background:'rgba(30,161,182,0.12)',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      flexShrink:0,
                    }}>
                      <span className="material-symbols-outlined" style={{ color:'var(--accent)', fontSize:18 }}>{item.icon}</span>
                    </div>
                    <div>
                      <div style={{ fontSize:'0.78rem', fontWeight:700, color:'#f5f5f5', marginBottom:2 }}>{item.label}</div>
                      <div style={{ fontSize:'0.68rem', color:'#666' }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {[
            { label:'CONTACT', page:'contact' },
          ].map(item => (
            <button
              key={item.page}
              onClick={() => go(item.page)}
              style={{
                background:'none',
                border:'none',
                cursor:'pointer',
                fontFamily:"'Inter',sans-serif",
                fontWeight:600,
                fontSize:'0.72rem',
                letterSpacing:'0.15em',
                textTransform:'uppercase',
                color: currentPage === item.page ? 'var(--accent)' : '#888',
                transition:'color 0.2s',
                padding:0,
              }}
              onMouseEnter={e => { if(currentPage !== item.page) e.target.style.color='#f5f5f5'; }}
              onMouseLeave={e => { if(currentPage !== item.page) e.target.style.color='#888'; }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          {/* Shopping Cart */}
          <button
            onClick={() => go('cart')}
            style={{
              position:'relative',
              background:'none',
              border:'none',
              cursor:'pointer',
              color: currentPage==='cart' ? 'var(--accent)' : '#888',
              padding:8,
              transition:'color 0.2s',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize:20 }}>shopping_cart</span>
            {cartItemsCount > 0 && (
              <span style={{
                position:'absolute',
                top:2,
                right:2,
                background:'var(--accent)',
                color:'#fff',
                fontSize:'0.6rem',
                fontWeight:700,
                width:15,
                height:15,
                borderRadius:'50%',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
              }}>{cartItemsCount}</span>
            )}
          </button>

          {/* Account */}
          <button
            onClick={() => go('my-account')}
            style={{
              background:'none',
              border:'none',
              cursor:'pointer',
              color: currentPage==='my-account' ? 'var(--accent)' : '#888',
              padding:8,
              transition:'color 0.2s'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize:20 }}>account_circle</span>
          </button>

          {/* Pill Capsule Button */}
          <button
            onClick={() => go('contact')}
            style={{
              background:'#fff',
              color:'#050505',
              border:'none',
              borderRadius:'50px',
              padding:'8px 20px',
              fontWeight:700,
              fontSize:'0.7rem',
              letterSpacing:'0.1em',
              textTransform:'uppercase',
              cursor:'pointer',
              transition:'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              display:'flex',
              alignItems:'center',
              gap:6,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--accent)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#050505';
            }}
          >
            <span>GET QUOTE</span>
            <span style={{ fontSize:'0.9rem' }}>→</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
