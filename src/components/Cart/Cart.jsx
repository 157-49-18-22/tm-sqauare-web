import React, { useState } from 'react';
import { ShoppingCart, Trash2, ArrowRight, ShieldCheck, Cpu, Send, Check } from 'lucide-react';
import './Cart.css';

const Cart = ({ setCurrentPage }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Solar TPMS Monitoring Kit",
      price: 2500,
      qty: 1,
      icon: <Cpu size={32} />
    },
    {
      id: 2,
      title: "FASTag RFID Activation Pass",
      price: 149,
      qty: 2,
      icon: <Send size={32} />
    }
  ]);

  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const updateQty = (id, delta) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const grandTotal = subtotal + tax;

  const whatsappLink = `https://api.whatsapp.com/send?phone=917678400367&text=Hi,%20I%20would%20like%20to%20complete%20checkout%20for%20order%20amounting%20to%20₹${grandTotal}.`;

  if (checkoutComplete) {
    return (
      <div className="cart-page fade-in-up">
        <div className="container">
          <div className="empty-cart-container" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--accent)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
              <Check size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Order Initiated Successfully!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
              We have securely forwarded your cart parameters. An executive is reviewing your address details for immediate processing.
            </p>
            <button className="btn btn-primary" onClick={() => setCurrentPage('home')}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page fade-in-up">
      <div className="container">
        <div className="cart-header">
          <span className="badge badge-cyan">Order Summary</span>
          <h1 className="cart-title">Your Secure Shopping Cart</h1>
          <p style={{ color: 'var(--text-muted)' }}>Review your selected items and proceed to instant secure checkout.</p>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart-container fade-in-up">
            <ShoppingCart size={64} style={{ color: 'var(--text-muted)', margin: '0 auto 20px auto' }} />
            <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Your Cart is Currently Empty</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Looks like you haven't added any automotive sensors or copier supplies yet.</p>
            <button className="btn btn-primary" onClick={() => setCurrentPage('products')}>
              Explore Catalog <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="cart-grid">
            {/* Left Column: Cart Items */}
            <div className="cart-items-container">
              {items.map(item => (
                <div key={item.id} className="cart-item-card fade-in-up">
                  <div className="cart-item-info">
                    <div className="cart-item-icon">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="cart-item-title">{item.title}</h3>
                      <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div className="cart-quantity-controls">
                      <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>-</button>
                      <span className="qty-val">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>

                    <button className="remove-btn" onClick={() => removeItem(item.id)} title="Remove Item">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Order Summary */}
            <div className="order-summary-card fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="summary-title">Payment Calculation</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Estimated Tax (18% GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Express Delivery</span>
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>FREE</span>
              </div>

              <div className="summary-row summary-total">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => setCheckoutComplete(true)} className="btn btn-primary" style={{ padding: '16px', fontSize: '1.1rem', textAlign: 'center', width: '100%', justifyContent: 'center' }}>
                  Proceed to Checkout <ArrowRight size={20} />
                </a>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>
                  <ShieldCheck size={16} style={{ color: 'var(--accent)' }} /> 256-bit Encrypted SSL Gateway
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
