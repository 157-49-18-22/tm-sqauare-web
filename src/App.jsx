import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Products from './components/Products/Products';
import Testimonials from './components/Testimonials/Testimonials';
import Quote from './components/Quote/Quote';
import Footer from './components/Footer/Footer';
import FASTag from './components/FASTag/FASTag';
import TPMS from './components/TPMS/TPMS';
import Paper from './components/Paper/Paper';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Cart from './components/Cart/Cart';
import Account from './components/Account/Account';
import Timeline from './components/Timeline/Timeline';
import Calculator from './components/Calculator/Calculator';
import Faqs from './components/Faqs/Faqs';

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '160px 20px 80px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '4rem', letterSpacing: '0.05em', color: 'var(--accent)', marginBottom: 16 }}>{title}</div>
    <p style={{ color: '#555', fontSize: '1rem', maxWidth: 500 }}>This page is currently being assembled. Stay tuned!</p>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <Products setCurrentPage={setCurrentPage} />
            <Timeline />
            <Calculator />
            <Features />
            <Testimonials />
            <Faqs />
            <Quote setCurrentPage={setCurrentPage} />
          </>
        );
      case 'products':
        return <Products setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'tpms':
        return <TPMS />;
      case 'paper':
        return <Paper />;
      case 'fastag':
        return <FASTag />;
      case 'cart':
        return <Cart setCurrentPage={setCurrentPage} />;
      case 'my-account':
        return <Account setCurrentPage={setCurrentPage} />;
      default:
        return <PlaceholderPage title="404 — Page Not Found" />;
    }
  };

  return (
    <>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartItemsCount={cartItemsCount}
      />

      <main style={{ paddingTop: currentPage === 'home' ? 0 : 100, minHeight: '100vh' }}>
        {renderContent()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
