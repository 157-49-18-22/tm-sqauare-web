import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const REVEAL_SELECTOR = '[data-reveal]:not(.reveal-visible)';
const AV_REVEAL_SELECTOR = '.av-reveal:not(.av-active)';

const observeAll = (revealObserver, avObserver) => {
  if (revealObserver) {
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => revealObserver.observe(el));
  }
  if (avObserver) {
    document.querySelectorAll(AV_REVEAL_SELECTOR).forEach((el) => avObserver.observe(el));
  }
};

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const revealObserverRef = useRef(null);
  const avObserverRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
      infinite: false,
      autoResize: true,
      stopInertiaOnNavigate: true,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onLenisScroll = () => {
      window.dispatchEvent(new Event('scroll'));
    };
    lenis.on('scroll', onLenisScroll);

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const customDelay = el.getAttribute('data-reveal-delay');
          if (customDelay) {
            el.style.setProperty('--reveal-delay', `${customDelay}ms`);
          }
          el.classList.add('reveal-visible');
          revealObserver.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    const avObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('av-active');
            avObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );

    revealObserverRef.current = revealObserver;
    avObserverRef.current = avObserver;
    observeAll(revealObserver, avObserver);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off('scroll', onLenisScroll);
      revealObserver.disconnect();
      avObserver.disconnect();
      revealObserverRef.current = null;
      avObserverRef.current = null;
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.start();
      requestAnimationFrame(() => lenis.resize());
    } else {
      window.scrollTo(0, 0);
    }

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.remove('reveal-visible');
    });
    document.querySelectorAll('.av-reveal').forEach((el) => {
      el.classList.remove('av-active');
    });

    const refreshObservers = () => {
      observeAll(revealObserverRef.current, avObserverRef.current);
    };

    const timers = [80, 250, 600].map((ms) => setTimeout(() => {
      if (lenis) lenis.resize();
      refreshObservers();
    }, ms));

    return () => timers.forEach(clearTimeout);
  }, [location.pathname]);

  return children;
};

export default SmoothScroll;
