import React, { useState } from 'react';
import { User, Package, Shield, LogOut, ArrowRight, CheckCircle2, Save } from 'lucide-react';
import './Account.css';

const Account = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [profileSaved, setProfileSaved] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@corporate.in',
    phone: '+91 98765 43210',
    company: 'Prime Logistics India'
  });

  const orders = [
    { id: 'ORD-78921', title: 'Solar TPMS Sensor Kit (4 External Sensors)', date: 'May 14, 2026', total: '₹2,500.00', status: 'Delivered' },
    { id: 'ORD-78890', title: 'FASTag RFID Sticker + HPCL Card', date: 'April 28, 2026', total: '₹149.00', status: 'Delivered' },
    { id: 'ORD-78643', title: 'Century Copier Paper (A4 80GSM - 10 Cartons)', date: 'March 12, 2026', total: 'Corporate Billing', status: 'Delivered' }
  ];

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 4000);
  };

  return (
    <div className="account-page fade-in-up">
      <div className="container">
        <div className="account-header">
          <span className="badge badge-cyan">Client Portal</span>
          <h1 className="account-title">Welcome Back, Rajesh</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your automotive orders, toll passes, and corporate billing profiles.</p>
        </div>

        <div className="account-grid">
          {/* Sidebar Navigation */}
          <aside className="account-sidebar">
            <div className="user-profile-summary">
              <div className="user-avatar">RK</div>
              <div>
                <div className="user-name">{profileData.name}</div>
                <div className="user-role">Corporate Client</div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '0 12px' }} />

            <ul className="account-nav">
              <li className={`account-nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                <Package size={20} /> Order History
              </li>
              <li className={`account-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                <User size={20} /> Profile Settings
              </li>
              <li className={`account-nav-item ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
                <Shield size={20} /> Account Security
              </li>
              <li className="account-nav-item" style={{ color: 'var(--danger)' }} onClick={() => setCurrentPage('home')}>
                <LogOut size={20} /> Log Out
              </li>
            </ul>
          </aside>

          {/* Content Area */}
          <div className="account-content-card">
            {activeTab === 'orders' && (
              <div className="fade-in-up">
                <h2 className="content-section-title"><Package /> Recent Orders</h2>
                <div className="orders-list">
                  {orders.map((ord) => (
                    <div key={ord.id} className="order-card">
                      <div>
                        <div className="order-id">{ord.id}</div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: '4px', color: 'var(--text-main)' }}>{ord.title}</div>
                        <div className="order-date">Ordered on: {ord.date}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem', marginBottom: '8px' }}>{ord.total}</div>
                        <span className="order-status">{ord.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="fade-in-up">
                <h2 className="content-section-title"><User /> Profile Information</h2>
                {profileSaved && (
                  <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-sm)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                    <CheckCircle2 size={20} /> Profile Updated Successfully!
                  </div>
                )}
                <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-control" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-control" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Phone Number</label>
                      <input type="text" className="form-control" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Company Name</label>
                      <input type="text" className="form-control" value={profileData.company} onChange={(e) => setProfileData({ ...profileData, company: e.target.value })} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '14px 28px' }}>
                    <Save size={18} /> Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="fade-in-up">
                <h2 className="content-section-title"><Shield /> Security & Passwords</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Ensure your account uses a secure password combined with 2-Factor Authentication.</p>
                <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '24px', background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Two-Factor Authentication (2FA)</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Protect your account with OTP login verification.</p>
                  </div>
                  <button className="btn btn-accent">Enable 2FA</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
