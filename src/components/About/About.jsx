import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Shield, Truck, Settings, FileText, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './About.css';
import vehicleData from '../../../public/vehicle.json';

const About = () => {
  const [storySlide, setStorySlide] = useState(0);
  const tlSectionRef = useRef(null);
  const tlTrackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const lottieAnimRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* av-reveal animations handled globally by SmoothScroll */

  // Dynamically load Lottie Player CDN
  useEffect(() => {
    if (window.lottie) {
      setLottieLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
    script.async = true;
    script.onload = () => setLottieLoaded(true);
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Initialize Lottie Animation once script is loaded
  useEffect(() => {
    if (!lottieLoaded || !window.lottie) return;
    const container = document.getElementById('lottie-vehicle');
    if (!container) return;

    lottieAnimRef.current = window.lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: vehicleData // direct bundle import: 100% reliable, zero network/CORS issues!
    });

    return () => {
      if (lottieAnimRef.current) {
        lottieAnimRef.current.destroy();
      }
    };
  }, [lottieLoaded]);

  // Scroll-driven horizontal timeline
  useEffect(() => {
    const section = tlSectionRef.current;
    const track = tlTrackRef.current;
    if (!section || !track) return;

    const onScroll = () => {
      const section = tlSectionRef.current;
      const track = tlTrackRef.current;
      if (!section || !track) return;
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const winH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (sectionH - winH)));
      setScrollProgress(progress);
      
      const maxX = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(-${progress * maxX}px)`;
      // progress bar
      const bar = document.getElementById('tlProgressBar');
      if (bar) bar.style.width = `${progress * 100}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Call once initially to lay out progress correctly
    onScroll();
    // Also request an animation frame to run once layout dimensions are established
    const rafId = requestAnimationFrame(onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  const storySlides = [
    { quote: "TM Square started with a simple observation: core business operations—highway tolling, transit safety, and daily documentation—were still running on disjointed systems that couldn't scale.", sub: "Most tools were hard to deploy and even harder to trust at scale." },
    { quote: "We set out to change that. Today, TM Square offers a unified suite of TPMS sensors, high-grade photocopier papers, and automated RFID FASTag services.", sub: "Our platform removes supply complexity so your team can focus on relationships, not logistics." },
    { quote: "Our founders spent years in logistics and automotive, witnessing firsthand the inefficiencies of fragmented supply chains across India's largest industrial hubs.", sub: "They're obsessed with one goal: making supply chain management reliable and commercially impactful." },
    { quote: "Serving over 2,00,000 clients across 28+ states, TM Square has become a trusted partner for fleets, corporate offices, and logistics operators nationwide.", sub: "We continue to expand our product lineup and distribution network to serve every corner of India." }
  ];

  const timeline = [
    { year: "2018", title: "The Problem Becomes Clear", desc: "Founders witness how slow RFID activation and fragmented supply chains disrupt transport operations across industrial hubs." },
    { year: "2019", title: "Concept Takes Shape", desc: "We design a unified platform to bundle RFID FASTag, TPMS, and premium print supplies under one roof." },
    { year: "2021", title: "Warehouse Integration", desc: "First automated dispatch system launched with fulfillment warehouses in Faridabad and Greater Haryana." },
    { year: "2023", title: "Official Launch & Scale", desc: "TM Square goes live. Over 50 commercial fleets and print houses adopt the stack for 24/7 supply lines." },
    { year: "Now", title: "Expansion & Partnerships", desc: "Serving 2,00,000+ customers across India, expanding into real estate and corporate parks." }
  ];

  const teamMembers = [
    { name: "Jason Richter", role: "CEO", img: "/team_ceo.png", desc: "Jason leads the team with over 15 years of supply chain expertise and deep market insights across corporate and industrial sectors." },
    { name: "Babak Abbaschian", role: "Technical Director", img: "/team_director.png", desc: "Babak oversees hardware calibration, sensor tech systems, and fleet logistics cloud databases." },
    { name: "Sina Savaedi", role: "Lead Architect", img: "/team_architect.png", desc: "Sina designs high-performance automated networks and integrates enterprise-grade APIs." },
    { name: "Amir Ahani", role: "Senior Software Engineer", img: "/team_engineer.png", desc: "Amir manages our front-end interfaces, telemetry feeds, and real-time support systems." }
  ];


  const startOffset = isMobile ? 180 : 600;
  const spacing = isMobile ? 360 : 550;
  const totalTravel = spacing * (timeline.length - 1);

  return (
    <div className="av-root">
      {/* Ambient blobs */}
      <div className="av-blob av-blob-1"></div>
      <div className="av-blob av-blob-2"></div>
      <div className="av-blob av-blob-3"></div>

      {/* Hero Right — Tech Logistics Graphic */}
      <div className="av-hero-img-wrap av-reveal">
        <div className="av-hero-img-frame">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" alt="TM Square Corporate Team" className="av-hero-img" />
        </div>
        <div className="av-hero-img-glow"></div>
      </div>

      {/* ── HERO ── */}
      <div className="av-container">
        <section className="av-hero av-reveal">
          <h1 className="av-hero-title">
            Meet the Team That Refuses <br />
            <span className="av-grad">to Let Operations Slow Down</span>
          </h1>
          <p className="av-hero-sub">
            We're operators, builders, and problem-solvers who got tired of watching businesses lose revenue to unreliable logistics. TM Square is what happens when you build the solution you wish existed.
          </p>
        </section>
      </div>      {/* ── CORE PILLARS ── */}
      <section className="av-pillars av-reveal">
        <div className="av-container">
          <div className="av-badge"><span>Our Core Pillars</span></div>
          <h2 className="av-sec-title">What Drives TM Square</h2>
          <p className="av-sec-sub">Our commitment to speed, safety, and reliability is built on three core operational foundations.</p>
          
          <div className="av-pillars-grid">
            <div className="av-pillar-card">
              <div className="av-pillar-icon-wrap">
                <Shield className="av-pillar-icon" size={24} />
              </div>
              <h3 className="av-pillar-title">Precision</h3>
              <p className="av-pillar-desc">We guarantee 100% calibration accuracy across our advanced TPMS sensors and real-time fleet telemetry systems.</p>
            </div>
            
            <div className="av-pillar-card">
              <div className="av-pillar-icon-wrap">
                <Truck className="av-pillar-icon" size={24} />
              </div>
              <h3 className="av-pillar-title">Velocity</h3>
              <p className="av-pillar-desc">Instant RFID FASTag activation and automated dispatch pipelines designed to reduce supply chain delays to absolute zero.</p>
            </div>
            
            <div className="av-pillar-card">
              <div className="av-pillar-icon-wrap">
                <Settings className="av-pillar-icon" size={24} />
              </div>
              <h3 className="av-pillar-title">Trust</h3>
              <p className="av-pillar-desc">Proudly serving over 2,00,000 satisfied corporate fleet operators and distributors nationwide with certified premium supplies.</p>
            </div>
          </div>
        </div>
      </section>
      {/* ── STORY — light bg + slider ── */}
      <section className="av-story av-reveal">
        <div className="av-story-inner">
          <div className="av-story-left">
            <div className="av-badge dark"><span>Our Story</span></div>
            <h2 className="av-story-title">Why We Built TM Square</h2>
            <p className="av-story-sub">From fragmented supply chains to a focused, tech-first logistics stack.</p>
            <div className="av-story-nav">
              <button className="av-nav-btn" onClick={() => setStorySlide(s => (s - 1 + storySlides.length) % storySlides.length)}><ChevronLeft size={20}/></button>
              <button className="av-nav-btn av-nav-active" onClick={() => setStorySlide(s => (s + 1) % storySlides.length)}><ChevronRight size={20}/></button>
            </div>
          </div>
          <div className="av-story-right">
            <div className="av-story-icon">◎</div>
            {storySlides.map((sl, i) => (
              <div key={i} className={`av-slide ${i === storySlide ? 'av-slide-on' : ''}`}>
                <p className="av-slide-q">{sl.quote}</p>
                <p className="av-slide-s">{sl.sub}</p>
              </div>
            ))}
            <div className="av-slide-pag">{storySlide + 1}/{storySlides.length}</div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE — horizontal zig-zag layout ── */}
      <section className="av-tl-section" ref={tlSectionRef}>
        <div className="av-tl-sticky">

          {/* Sticky Header stays fixed on bottom-left */}
          <div className="av-tl-header">
            <div className="av-badge"><span>Timeline</span></div>
            <h2 className="av-sec-title">How We Got Here</h2>
            <p className="av-tl-hint">Scroll down to explore →</p>
          </div>

          {/* Timeline Viewport */}
          <div className="av-tl-viewport">
            <div
              className="av-tl-track"
              ref={tlTrackRef}
              style={{ width: `${startOffset + totalTravel + (isMobile ? 320 : 600)}px` }}
            >
              {/* Continuous horizontal baseline */}
              <div className="av-tl-line"></div>

              {/* Dynamic Lottie driving vehicle! */}
              <div
                id="lottie-vehicle"
                className="av-tl-vehicle"
                style={{ left: `${startOffset + scrollProgress * totalTravel}px` }}
              ></div>

              {timeline.map((item, i) => {
                const isAbove = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`av-tl-node ${isAbove ? 'node-above' : 'node-below'}`}
                    style={{ left: `${startOffset + i * spacing}px` }}
                  >
                    {/* Glassmorphic Card */}
                    <div className="av-tl-card">
                      <div className="av-tl-card-dot"></div>
                      <h3 className="av-tl-head">{item.title}</h3>
                      <p className="av-tl-desc">{item.desc}</p>
                    </div>

                    {/* Dotted vertical connector */}
                    <div className="av-tl-connector"></div>

                    {/* Rounded Year Pill on the baseline */}
                    <div className="av-tl-year-pill">{item.year}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="av-tl-progress-wrap">
            <div className="av-tl-progress-bar" id="tlProgressBar"></div>
          </div>

        </div>
      </section>

      {/* ── TEAM — staggered cards ── */}
      <section className="av-team-section av-reveal">
        <div className="av-container">
          <h2 className="av-team-heading">The People Behind<br /><span className="av-grad">TM Square</span></h2>
          <div className="av-team-grid">
            {teamMembers.map((member, i) => (
              <div key={i} className={`av-team-card ${i % 2 === 1 ? 'av-team-offset' : ''}`}>
                <div className="av-team-img-area">
                  <img src={member.img} alt={member.name} className="av-team-img" />
                </div>
                <div className="av-team-info">
                  <h3 className="av-team-name">{member.name}</h3>
                  <div className="av-team-role">{member.role}</div>
                  <p className="av-team-desc">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── CTA ── */}
      <section className="av-cta-section av-reveal">
        <div className="av-container">
          <div className="av-cta-box">
            <div className="av-cta-glow"></div>
            <div className="av-badge" style={{marginBottom:'24px'}}><span>Get Started</span></div>
            <h2 className="av-cta-title">Optimize Your Operations This Week</h2>
            <p className="av-cta-desc">See results in days, not months. Join the network of 2,00,000+ satisfied clients across India.</p>
            <button className="av-cta-btn" onClick={() => window.location.hash='#contact'}>Contact us <ArrowRight size={16}/></button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
