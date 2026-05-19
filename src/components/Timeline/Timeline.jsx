import React, { useEffect, useRef, useState } from 'react';
import './Timeline.css';

const STEPS = [
  {
    num: '01',
    title: 'Consultation & Procurement Strategy',
    desc: 'We analyze your fleet configuration or office logistics needs to draft a custom contract offering optimal credit terms and credit limits.',
    icon: 'chat'
  },
  {
    num: '02',
    title: 'Integration & Supply Chain Setup',
    desc: 'Our logistics managers allocate inventory (Century paper, TPMS sensors, or FASTag kits) and initialize dedicated portal access for your admin team.',
    icon: 'dashboard'
  },
  {
    num: '03',
    title: 'Express Dispatch & Toll Activation',
    desc: 'Express dispatch from our regional warehouses ensures delivery in 48 to 72 hours. FASTag and RFID chips are registered instantly on the NHAI networks.',
    icon: 'local_shipping'
  },
  {
    num: '04',
    title: '24/7 Support & Quality Audits',
    desc: 'Continuous real-time tracking, proactive maintenance updates, and round-the-clock technical helpline support keep your operations running smoothly.',
    icon: 'support_agent'
  }
];

const Timeline = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Check if component is in view
    const observer = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
    }, { threshold: 0.05 });
    if (containerRef.current) observer.observe(containerRef.current);
    
    // Smooth scroll filling line
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      
      // Calculate scroll progress through the timeline container
      const elementHeight = rect.height;
      const startTrigger = winH * 0.85; // starts filling when top of container is 85% down viewport
      const endTrigger = winH * 0.15; // stops filling when bottom of container reaches 15% from top
      
      const distance = startTrigger - rect.top;
      const totalRange = elementHeight + (startTrigger - endTrigger);
      const progress = Math.max(0, Math.min(1, distance / totalRange));
      
      setScrollProgress(progress);
    };

    const handleHeaderScroll = () => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const start = winH * 1.0;
      const end = winH * 0.1;
      const current = rect.bottom;
      const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));
      setFillProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleScroll();
    handleHeaderScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleHeaderScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="timeline-section">
      <div className="timeline-container">
        
        {/* Section Header */}
        <div 
          className="timeline-header" 
          style={{ 
            opacity: inView ? 1 : 0, 
            transform: inView ? 'translateY(0)' : 'translateY(24px)' 
          }}
        >
          <span className="timeline-subtitle">OPERATIONAL WORKFLOW</span>
          <h2 className="timeline-title">
            HOW WE DELIVER{' '}
            <span className="scroll-fill-wrapper" ref={headerRef}>
              <span className="scroll-fill-bg">EXCELLENCE</span>
              <span 
                className="scroll-fill-fg"
                style={{ clipPath: `inset(0 ${(1 - fillProgress) * 100}% 0 0)` }}
              >
                EXCELLENCE
              </span>
            </span>
          </h2>
          <p className="timeline-desc">
            A structured, quality-controlled, and seamless implementation strategy designed for long-term reliability.
          </p>
        </div>

        {/* Timeline Wrapper */}
        <div className="timeline-wrapper">
          
          {/* Main Background Line Track */}
          <div className="timeline-track-bg" />
          
          {/* Active Glowing Cyan Fill Line */}
          <div 
            className="timeline-track-fill"
            style={{ 
              height: `calc(${scrollProgress * 100}% - 40px)`
            }} 
          />

          {/* Timeline Nodes */}
          <div className="timeline-list">
            {STEPS.map((s, idx) => {
              const nodeOffset = (idx + 0.5) / STEPS.length;
              const isPassed = scrollProgress >= nodeOffset;
              
              return (
                <div 
                  key={s.num} 
                  className="timeline-item"
                  style={{ 
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(24px)',
                    transitionDelay: `${idx * 0.15}s`
                  }}
                >
                  
                  {/* Glowing Node Button / Icon */}
                  <div className={`timeline-node ${isPassed ? 'passed' : ''}`}>
                    <span className="material-symbols-outlined timeline-node-icon">
                      {s.icon}
                    </span>
                  </div>

                  {/* Text Details Card */}
                  <div className={`timeline-card ${isPassed ? 'passed' : ''}`}>
                    {/* Node Pointer Triangle */}
                    <div className="timeline-card-arrow" />

                    <div className="timeline-card-header">
                      <h4 className="timeline-card-title">
                        {s.title}
                      </h4>
                      <span className="timeline-card-number">
                        {s.num}
                      </span>
                    </div>
                    <p className="timeline-card-desc">
                      {s.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Timeline;
