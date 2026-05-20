import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isProductsRoute, ROUTES } from '../../config/routes';
import './Navbar.css';

const PRODUCT_LINKS = [
  { icon: 'description', label: 'Copier Paper', sub: 'Premium office supplies', path: ROUTES.paper },
  { icon: 'near_me', label: 'FASTag Services', sub: 'RFID cashless tolls', path: ROUTES.fastag },
];

const NAV_LINKS = [
  { label: 'HOME', path: ROUTES.home },
  { label: 'ABOUT', path: ROUTES.about },
  { label: 'CONTACT', path: ROUTES.contact },
];

const Navbar = ({ cartItemsCount }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [dropdownTimer, setDropdownTimer] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('tm-nav-open', mobileOpen);
    return () => document.body.classList.remove('tm-nav-open');
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimer) clearTimeout(dropdownTimer);
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => setProductsOpen(false), 450);
    setDropdownTimer(timer);
  };

  const go = (path) => {
    if (dropdownTimer) clearTimeout(dropdownTimer);
    navigate(path);
    setMobileOpen(false);
    setProductsOpen(false);
  };

  const isActive = (path) => pathname === path;

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className={`tm-navbar ${scrolled ? 'tm-navbar--scrolled' : ''}`}>
        <div className="tm-navbar__inner">
          <div className="tm-navbar__logo" onClick={() => go(ROUTES.home)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && go(ROUTES.home)}>
            <div className="tm-navbar__logo-icon">
              <span>TM</span>
            </div>
            <div className="tm-navbar__logo-text">
              <span className="tm-navbar__logo-title">TM SQUARE</span>
              <span className="tm-navbar__logo-sub">GLOBAL SOLUTIONS</span>
            </div>
          </div>

          <nav className="tm-navbar__nav" aria-label="Main navigation">
            {NAV_LINKS.filter((item) => item.path !== ROUTES.contact).map((item) => (
              <button
                key={item.path}
                type="button"
                className={`tm-nav-link ${isActive(item.path) ? 'tm-nav-link--active' : ''}`}
                onClick={() => go(item.path)}
              >
                {item.label}
              </button>
            ))}

            <div className="tm-nav-products" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button
                type="button"
                className={`tm-nav-link tm-nav-products-btn ${isProductsRoute(pathname) ? 'tm-nav-link--active' : ''}`}
                onClick={() => go(ROUTES.products)}
              >
                PRODUCTS <span style={{ fontSize: '0.65rem' }}>▾</span>
              </button>

              {productsOpen && (
                <div className="tm-nav-dropdown animate-fadeIn">
                  {PRODUCT_LINKS.map((item) => (
                    <div
                      key={item.path}
                      role="button"
                      tabIndex={0}
                      className={`tm-nav-dropdown-item ${pathname === item.path ? 'tm-nav-dropdown-item--active' : ''}`}
                      onClick={() => go(item.path)}
                      onKeyDown={(e) => e.key === 'Enter' && go(item.path)}
                    >
                      <div className="tm-nav-dropdown-icon">
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <div className="tm-nav-dropdown-label">{item.label}</div>
                        <div className="tm-nav-dropdown-sub">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className={`tm-nav-link ${isActive(ROUTES.contact) ? 'tm-nav-link--active' : ''}`}
              onClick={() => go(ROUTES.contact)}
            >
              CONTACT
            </button>
          </nav>

          <div className="tm-navbar__actions">
            <button
              type="button"
              className={`tm-icon-btn ${isActive(ROUTES.cart) ? 'tm-icon-btn--active' : ''}`}
              onClick={() => go(ROUTES.cart)}
              aria-label="Cart"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>shopping_cart</span>
              {cartItemsCount > 0 && <span className="tm-cart-badge">{cartItemsCount}</span>}
            </button>

            <button
              type="button"
              className={`tm-icon-btn ${isActive(ROUTES.account) ? 'tm-icon-btn--active' : ''}`}
              onClick={() => go(ROUTES.account)}
              aria-label="Account"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>account_circle</span>
            </button>

            <button type="button" className="tm-quote-btn tm-quote-btn--desktop" onClick={() => go(ROUTES.contact)}>
              <span>GET QUOTE</span>
              <span style={{ fontSize: '0.9rem' }}>→</span>
            </button>

            <button
              type="button"
              className="tm-navbar__toggle"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`tm-mobile-overlay ${mobileOpen ? 'is-open' : ''}`}
        onClick={closeMobile}
        aria-hidden={!mobileOpen}
      />

      <aside className={`tm-mobile-drawer ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <nav aria-label="Mobile navigation">
          <ul className="tm-mobile-nav">
            {NAV_LINKS.map((item) => (
              <li key={item.path}>
                <button
                  type="button"
                  className={`tm-mobile-nav-link ${isActive(item.path) ? 'tm-mobile-nav-link--active' : ''}`}
                  onClick={() => go(item.path)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <p className="tm-mobile-products-label">Products</p>
          <div className="tm-mobile-dropdown">
            {PRODUCT_LINKS.map((item) => (
              <button
                key={item.path}
                type="button"
                className={`tm-mobile-dropdown-item ${pathname === item.path ? 'tm-mobile-dropdown-item--active' : ''}`}
                onClick={() => go(item.path)}
              >
                <div className="tm-nav-dropdown-icon">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <div className="tm-nav-dropdown-label">{item.label}</div>
                  <div className="tm-nav-dropdown-sub">{item.sub}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="tm-mobile-drawer-actions">
            <div className="tm-mobile-drawer-icons">
              <button type="button" className={`tm-icon-btn ${isActive(ROUTES.cart) ? 'tm-icon-btn--active' : ''}`} onClick={() => go(ROUTES.cart)} aria-label="Cart">
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>shopping_cart</span>
                {cartItemsCount > 0 && <span className="tm-cart-badge">{cartItemsCount}</span>}
              </button>
              <button type="button" className={`tm-icon-btn ${isActive(ROUTES.account) ? 'tm-icon-btn--active' : ''}`} onClick={() => go(ROUTES.account)} aria-label="Account">
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>account_circle</span>
              </button>
            </div>
            <button type="button" className="tm-quote-btn tm-mobile-quote-btn" onClick={() => go(ROUTES.contact)}>
              <span>GET QUOTE</span>
              <span style={{ fontSize: '0.9rem' }}>→</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
