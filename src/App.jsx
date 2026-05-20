import React, { useEffect, useState } from 'react';
import Reveal from './components/Reveal/Reveal';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Products from './components/Products/Products';
import Testimonials from './components/Testimonials/Testimonials';
import Quote from './components/Quote/Quote';
import Footer from './components/Footer/Footer';
import FASTag from './components/FASTag/FASTag';
import Paper from './components/Paper/Paper';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Cart from './components/Cart/Cart';
import Account from './components/Account/Account';
import Timeline from './components/Timeline/Timeline';
import Calculator from './components/Calculator/Calculator';
import Faqs from './components/Faqs/Faqs';
import { FULL_BLEED_PATHS, ROUTE_TITLES, ROUTES } from './config/routes';

const SITE_NAME = 'TM Square Global Solutions';

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '160px 20px 80px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
    <Reveal variant="scale" delay={80}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '4rem', letterSpacing: '0.05em', color: 'var(--accent)', marginBottom: 16 }}>{title}</div>
    </Reveal>
    <Reveal variant="up" delay={220}>
      <p style={{ color: '#555', fontSize: '1rem', maxWidth: 500 }}>This page is currently being assembled. Stay tuned!</p>
    </Reveal>
  </div>
);

const NotFoundPage = () => <PlaceholderPage title="404 — Page Not Found" />;

const HomePage = () => (
  <>
    <Hero />
    <Products />
    <Timeline />
    <Calculator />
    <Features />
    <Testimonials />
    <Faqs />
    <Quote />
  </>
);

function App() {
  const location = useLocation();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const pageTitle = ROUTE_TITLES[location.pathname] ?? 'Page Not Found';
    document.title = location.pathname === ROUTES.home
      ? `${SITE_NAME} | Home`
      : `${pageTitle} | ${SITE_NAME}`;
  }, [location.pathname]);

  return (
    <>
      <Navbar cartItemsCount={cartItemsCount} />

      <main style={{ paddingTop: FULL_BLEED_PATHS.has(location.pathname) ? 0 : 100, minHeight: '100vh' }}>
        <Routes key={location.pathname}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.products} element={<Products />} />
          <Route path={ROUTES.about} element={<About />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path={ROUTES.paper} element={<Paper />} />
          <Route path={ROUTES.fastag} element={<FASTag />} />
          <Route path={ROUTES.cart} element={<Cart />} />
          <Route path={ROUTES.account} element={<Account />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
