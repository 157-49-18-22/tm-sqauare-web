import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Printer, 
  ArrowRight, 
  Check, 
  FileText, 
  Layers, 
  Settings, 
  ShieldCheck, 
  ChevronRight, 
  Send,
  Sparkles,
  Percent,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  ChevronLeft
} from 'lucide-react';
import Reveal from '../Reveal/Reveal';
import './Paper.css';

const Paper = () => {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [volume, setVolume] = useState('50 - 200');
  const [calcBoxes, setCalcBoxes] = useState(150);
  const [targetBrands, setTargetBrands] = useState('');
  const [notes, setNotes] = useState('');

  const heroSlides = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDG4Lx0JlCu2kd3N0V3YbFVoUKk1GyhVrKzV8yB90Z1-E6uKqgJeg5djuTFzjzQtW42RJupvPWX4KfTBRQuzdY72sYB_DSNVGwUBBz54FvzkvbJIKqTKQNBPnxts3op_lZIwR2bJ0FYtcW2PkjvE3A9Vr1wsKZE-yltjuQqmMAERZ9PWvuBC5yyMzYAYP7q-qKm5FFF6UcxUIUXOqzWVhZ4714LnWX0qXgMsMnbXb0n4aL_qihdYswnqNIJDfjIQj8uydHJvXQChs4',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDn7oAgN3DHM5bWnekc5_XFyVKpM01eS4E5hjjwsN627IOb85gcy_bLfTtL7_lhz6xQIs800VcA16e-BdTr66MJ4Qv8hPcLtIFSf73yPJy8I7E5HA7VbBiuOfSgWmQLZBER-JG05nZYfqGQkePPjA6lfkaNOjqOZlWP7eTzHIKv1uGsNibMIIcnGF49tAswZjgd8LLqle2tOW8Um372TT8pDU0_x_OcyrFlumxm_noVwsxvT3LZ1xUd14ilKZNjF50jzfMMM-eSQtk',
    'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=1200'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const catalogBrands = [
    {
      name: 'Navigator Royal',
      gsm: '80 GSM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA44qaauQ011Ri4mZEZXqeP5iCVObTCMAMaFzEzD6EYxmfflXpWcgJX1j_CXXWkfZAB-iD1BQyZi5jm0I7uNjPdoWwaJNLX_PBoJt5_lPPicetUzOMIdIX7kc3lajIEFL1qjCFnC4rjmkFMGRQ-WDa0a7sOF_elDa15oPAAiQpkA-qiWUt43x-tqeDrmV8xUstiJAebMPzbylXQOP3hM2rg9OK25swzxU6hSLnjrAo21ujw7BuJiw8rCN3hMpKrZP5WTbVePLq1xHQ',
      specs: [
        { label: 'Whiteness', value: '169 CIE' },
        { label: 'Opacity', value: '99%' }
      ]
    },
    {
      name: 'Double A',
      gsm: '75 GSM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh5ix8nzj3viacwz_MRzjOua4nHsfdyLy5vbzLsgTkVzuk5dkmqeMgnm9SCjb7C3uUL5_LdKGIwCsMnYvFiBeeayojWFoIJrK5KpW1WiEeyVF-EW2lclGQ_-J8Pgttr4UnLjg39QWF54Z-Mavyk1M2bXp-uiKOLUWKGEFM4pq0XYTsFxtbMn7n8ka1VeMoETzEXgkcYn8bRI-AlZjSJQUreP1M-is8bOJ9dtUtkER9rV4QdmCwrS3rYm0kSDIiEcCXWP2YrAyTxp4',
      specs: [
        { label: 'Whiteness', value: '165 CIE' },
        { label: 'Surface', value: 'Ultra Smooth' }
      ]
    },
    {
      name: 'Bio-Tech Pro',
      gsm: '80 GSM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaOsjZOraaq_C8AFuT8Re2bXCMGGEEAO1funX1YV5IZQjw9xzDW8B_4fpRY-kvKxm2MJPlt8bX8awQVtUlXD5zg5mC4bFQqt1BPcAvRk94ET9JwWTozzuF1YDS7AHX-SACvPLw731JtQw66GlIIZFtDV5FywMGvMnJiCV_I9VFdCpC0ysSEMfsj_lJs9qy7e0AghGpe1kOi5dDygEFCeiGbF6jBt6PPkRPgUjKdl0AJnJU3Hlrv_lua4aGingAYZcVij42py3q5R8',
      specs: [
        { label: 'Eco Rating', value: 'Certified' },
        { label: 'Performance', value: 'High-Speed' }
      ]
    },
    {
      name: 'Century Green',
      gsm: '75 GSM',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
      specs: [
        { label: 'Eco Fiber', value: 'Recycled 100%' },
        { label: 'Brightness', value: '102% ISO' }
      ]
    },
    {
      name: 'Star',
      gsm: '80 GSM',
      image: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&q=80&w=600',
      specs: [
        { label: 'Runnability', value: 'Jam-Free' },
        { label: 'Grade', value: 'Economy Bulk' }
      ]
    },
    {
      name: 'AW (Andhra)',
      gsm: '80 GSM',
      image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?auto=format&fit=crop&q=80&w=600',
      specs: [
        { label: 'Whiteness', value: '160 CIE' },
        { label: 'Caliper', value: '110 mic' }
      ]
    }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  const sendWhatsAppQuote = () => {
    const text = `Hi, I am requesting a bulk quote for TM Square Copier Paper.\n\n- Company: ${companyName || 'N/A'}\n- Contact: ${contactName || 'N/A'}\n- Volume: ${calcBoxes} Boxes (Approx ${(calcBoxes * 11.5).toLocaleString('en-IN')} kg)\n- Target Brands: ${targetBrands || 'N/A'}\n- Notes: ${notes || 'N/A'}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?phone=917678400367&text=${encoded}`, '_blank');
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="paper-page">
      {/* ── Hero Section ── */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '120px 0 80px 0' }}>
        {/* Background Slideshow */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${heroSlides[currentSlide]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(35%)'
              }}
            />
          </AnimatePresence>
          {/* Subtle vignette/gradient overlay for contrast */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 0.4) 0%, #0a0a0a 100%)',
            pointerEvents: 'none'
          }} />
        </div>

        <div className="paper-container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content-centered"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
          >
            <div className="badge-industrial">
              INDUSTRIAL GRADE PRECISION
            </div>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', marginTop: '24px', color: '#fff' }}>
              High-Volume. <span style={{ color: '#00d1ff' }}>Jam-Free</span> Performance.
            </h1>
            <p className="hero-desc" style={{ maxWidth: '640px', margin: '20px auto 32px auto', color: '#bbc9cf', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Engineered for continuous operation in demanding enterprise environments. Our paper solutions deliver mathematical reliability across all high-speed copier brands.
            </p>

            <div className="hero-stats" style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginBottom: '40px' }}>
              <div className="stat-item" style={{ border: 'none', padding: 0 }}>
                <span className="stat-label" style={{ display: 'block', color: '#00d1ff', fontFamily: 'JetBrains Mono', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Opacity</span>
                <span className="stat-value" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>98.5%</span>
              </div>
              <div className="stat-item" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '48px' }}>
                <span className="stat-label" style={{ display: 'block', color: '#00d1ff', fontFamily: 'JetBrains Mono', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>CIE Whiteness</span>
                <span className="stat-value" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>167+</span>
              </div>
            </div>

            <div className="hero-cta-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => scrollToSection('products')} className="btn-primary-cyan">
                Explore Catalog
              </button>
              <button onClick={() => scrollToSection('manufacturing')} className="btn-outline-cyan">
                Tech Specs
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Technical Quality Metrics ── */}
      <Reveal variant="up" delay={80} as="section" className="metrics-section">
        <div className="paper-container">
          <div className="paper-section-title-wrapper">
            <h2 className="paper-section-heading">Technical Quality Metrics</h2>
            <div className="paper-section-bar" />
          </div>

          <div className="metrics-grid">
            <div className="glass-card">
              <div className="metric-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h3 className="metric-title">100% Jam-Free Guarantee</h3>
              <p className="metric-desc">
                Optimized moisture control and smooth surface profile ensure zero-obstruction feeding through ultra-high-speed industrial machinery.
              </p>
            </div>

            <div className="glass-card">
              <div className="metric-icon-box">
                <Layers size={24} />
              </div>
              <h3 className="metric-title">Opacified for Duplexing</h3>
              <p className="metric-desc">
                High fiber density provides superior opacity, preventing ink show-through for professional double-sided printing and heavy graphical output.
              </p>
            </div>

            <div className="glass-card">
              <div className="metric-icon-box">
                <Settings size={24} />
              </div>
              <h3 className="metric-title">Clean Precision Edges</h3>
              <p className="metric-desc">
                Laser-cut finishing technology eliminates paper dust and edge burrs, significantly reducing equipment maintenance and extending printer lifespan.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal variant="up" delay={100} as="section" id="products" className="catalog-section">
        <div className="paper-container">
          <div className="catalog-header-row">
            <div>
              <h2 className="catalog-heading">Premium Copier Brands</h2>
              <p className="catalog-subtitle">Wholesale portfolio of globally recognized industrial paper standards.</p>
            </div>
            <div className="catalog-nav-buttons">
              <button className="catalog-nav-btn">
                <ChevronLeft size={20} />
              </button>
              <button className="catalog-nav-btn">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="catalog-grid">
            {catalogBrands.map((brand, index) => (
              <div key={index} className="catalog-card">
                <div className="catalog-img-wrapper">
                  <img alt={brand.name} className="catalog-img" src={brand.image} />
                  <span className="catalog-card-badge">{brand.gsm}</span>
                </div>
                <div className="catalog-body">
                  <h4 className="catalog-card-title">{brand.name}</h4>
                  <div className="technical-divider" />
                  <ul className="catalog-specs-list">
                    {brand.specs.map((sp, idx) => (
                      <li key={idx} className="catalog-spec-item">
                        <span>{sp.label}</span>
                        <span className="catalog-spec-value">{sp.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal variant="scale" delay={140} as="section" id="manufacturing" className="mfg-section">
        <div className="paper-container mfg-grid">
          <div className="mfg-img-wrapper">
            <div className="mfg-img-glow" />
            <img 
              alt="Precision Facility" 
              className="mfg-img" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn7oAgN3DHM5bWnekc5_XFyVKpM01eS4E5hjjwsN627IOb85gcy_bLfTtL7_lhz6xQIs800VcA16e-BdTr66MJ4Qv8hPcLtIFSf73yPJy8I7E5HA7VbBiuOfSgWmQLZBER-JG05nZYfqGQkePPjA6lfkaNOjqOZlWP7eTzHIKv1uGsNibMIIcnGF49tAswZjgd8LLqle2tOW8Um372TT8pDU0_x_OcyrFlumxm_noVwsxvT3LZ1xUd14ilKZNjF50jzfMMM-eSQtk"
            />
          </div>

          <div className="mfg-content">
            <h2 className="mfg-heading">Precision at Scale</h2>
            <p className="mfg-desc">
              Our manufacturing partners utilize advanced fiber technology and climate-controlled finishing halls to ensure every sheet meets TM Square's rigorous standards.
            </p>

            <div className="mfg-features-list">
              <div className="mfg-feature-item">
                <div className="mfg-feature-icon">
                  <Printer size={28} />
                </div>
                <div>
                  <h5 className="mfg-feature-title">Automated Quality Gates</h5>
                  <p className="mfg-feature-desc">Continuous optical scanning detects micro-defects in real-time during the conversion process.</p>
                </div>
              </div>

              <div className="mfg-feature-item">
                <div className="mfg-feature-icon">
                  <Settings size={28} />
                </div>
                <div>
                  <h5 className="mfg-feature-title">Climate Stabilization</h5>
                  <p className="mfg-feature-desc">Finished stock is conditioned to precise relative humidity to prevent curling and static buildup.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal variant="up" delay={120} as="section" id="contact" className="inquiry-section">
        <div className="inquiry-max">
          <div className="inquiry-split-card">
            {/* Decorative Corner Marks */}
            <div className="corner-tick corner-tl" />
            <div className="corner-tick corner-tr" />
            <div className="corner-tick corner-bl" />
            <div className="corner-tick corner-br" />

            {!inquirySubmitted ? (
              <div className="inquiry-split-layout">
                {/* Form Header and Technical Stats */}
                <div className="inquiry-sidebar">
                  <div>
                    <span className="badge-industrial" style={{ border: 'none', background: 'none', padding: 0, color: '#00d1ff', marginBottom: '16px' }}>
                      Procurement Portal
                    </span>
                    <h2 className="inquiry-heading" style={{ textAlign: 'left', fontSize: '2.5rem', lineHeight: '1.1', marginTop: '8px' }}>
                      Inquire For<br />Bulk Supply
                    </h2>
                    <p style={{ color: '#bbc9cf', fontSize: '15px', lineHeight: '1.6', marginTop: '16px' }}>
                      Connect with our industrial sales team for custom wholesale quotes and logistics coordination.
                    </p>
                  </div>

                  {/* Dynamic Dashboard Metrics */}
                  <div className="inquiry-dashboard-metrics">
                    <div className="metrics-status-row">
                      <div>
                        <p className="metric-lbl">Estimated Net Weight</p>
                        <p className="metric-val-highlight">{(calcBoxes * 11.5).toLocaleString('en-IN', { maximumFractionDigits: 0 })} KG</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p className="metric-lbl">Sheet Count</p>
                        <p className="metric-val-normal">{(calcBoxes * 2500).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <div className="metric-progress-bg">
                      <div 
                        className="metric-progress-bar" 
                        style={{ width: `${Math.min(100, Math.max(5, (calcBoxes / 1000) * 100))}%` }} 
                      />
                    </div>
                    <p className="metric-info-footnote">
                      *Calculations based on standard 85 GSM / {calcBoxes} Box Selection.
                    </p>
                  </div>
                </div>

                {/* Actual Form */}
                <div className="inquiry-form-column">
                  <form onSubmit={handleFormSubmit} className="inquiry-grid-6col">
                    {/* Company Name */}
                    <div className="col-span-3 inquiry-field-group">
                      <div className="inquiry-label-row">
                        <label className="inquiry-label" style={{ marginBottom: 0 }}>Company Name</label>
                        <span className="req-field-tag">[REQ_FIELD_01]</span>
                      </div>
                      <input 
                        type="text"
                        required
                        placeholder="Enter company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="inquiry-input"
                      />
                    </div>

                    {/* Contact Person */}
                    <div className="col-span-3 inquiry-field-group">
                      <div className="inquiry-label-row">
                        <label className="inquiry-label" style={{ marginBottom: 0 }}>Contact Person</label>
                        <span className="req-field-tag">[REQ_FIELD_02]</span>
                      </div>
                      <input 
                        type="text"
                        required
                        placeholder="Full name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="inquiry-input"
                      />
                    </div>

                    {/* Monthly Volume Slider */}
                    <div className="col-span-4 inquiry-field-group">
                      <div className="inquiry-label-row">
                        <label className="inquiry-label" style={{ marginBottom: 0 }}>Estimated Monthly Volume (Boxes)</label>
                        <span style={{ color: '#00d1ff', fontFamily: 'JetBrains Mono', fontSize: '13px', fontWeight: 'bold' }}>
                          {calcBoxes} Boxes
                        </span>
                      </div>
                      <input 
                        type="range"
                        min="10"
                        max="1000"
                        step="10"
                        value={calcBoxes}
                        onChange={(e) => setCalcBoxes(parseInt(e.target.value))}
                        className="range-slider"
                      />
                    </div>

                    {/* Target Brands */}
                    <div className="col-span-2 inquiry-field-group">
                      <label className="inquiry-label">Target Brands</label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Navigator"
                        value={targetBrands}
                        onChange={(e) => setTargetBrands(e.target.value)}
                        className="inquiry-input"
                      />
                    </div>

                    {/* Technical Notes */}
                    <div className="col-span-6 inquiry-field-group">
                      <label className="inquiry-label">Technical Requirements / Additional Notes</label>
                      <textarea 
                        placeholder="Specify GSM, whiteness requirements or delivery timelines..."
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="inquiry-textarea"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-6" style={{ paddingTop: '16px' }}>
                      <button type="submit" className="inquiry-btn-tech">
                        <div className="inquiry-btn-tech-overlay" />
                        <span style={{ position: 'relative', zIndex: 10 }}>Request Technical Quotation</span>
                        <Send size={14} style={{ position: 'relative', zIndex: 10 }} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <div style={{ color: '#00d1ff', marginBottom: 16 }}>
                  <ShieldCheck size={64} style={{ margin: '0 auto' }} />
                </div>
                <h4 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginBottom: 10 }}>
                  Quotation Request Assembled!
                </h4>
                <p style={{ color: '#bbc9cf', fontSize: '0.95rem', marginBottom: 32, maxWidth: 450, margin: '0 auto 32px auto', lineHeight: 1.6 }}>
                  Your technical requirements and volume details are prepared. Press the button below to message our manager directly on WhatsApp.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 350, margin: '0 auto' }}>
                  <button onClick={sendWhatsAppQuote} className="inquiry-submit-btn" style={{ background: '#25D366', color: '#fff', border: 'none', padding: '16px' }}>
                    Send via WhatsApp
                  </button>
                  <button onClick={() => setInquirySubmitted(false)} className="btn-outline-cyan" style={{ padding: '14px' }}>
                    Edit Request
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Paper;
