import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ChevronDown, ChevronRight, Phone, MessageCircle, MapPin, Calendar, Sparkles, BookOpen, User } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export default function MobileMenuDrawer({ isOpen, onClose }) {
  const [isJewelleryOpen, setIsJewelleryOpen] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLinkClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="mobile-menu-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Navigation Menu">
      <div className="mobile-menu-panel animate-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Top bar with Brand and close button */}
        <div className="mobile-menu-top">
          <div className="brand-lockup-mobile">
            <span className="brand-name">AURELIA JEWELS</span>
            <span className="brand-tagline">Crafted to Last. Designed to Shine.</span>
          </div>
          <button
            className="icon-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Action Highlights */}
        <div className="mobile-menu-actions-bar">
          <button
            className="mobile-action-pill"
            onClick={() => handleLinkClick('/stores')}
          >
            <MapPin size={14} color="#C5A059" /> Find Store
          </button>
          <button
            className="mobile-action-pill"
            onClick={() => handleLinkClick('/consultation')}
          >
            <Calendar size={14} color="#C5A059" /> Consultation
          </button>
          <button
            className="mobile-action-pill"
            onClick={() => handleLinkClick('/guides')}
          >
            <BookOpen size={14} color="#C5A059" /> Guides
          </button>
        </div>

        {/* Scrollable Navigation Links */}
        <nav className="mobile-nav-links custom-scroll">
          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/')}
          >
            <span>Home</span>
            <ChevronRight size={16} />
          </button>

          {/* Collapsible Jewellery Section */}
          <div className="mobile-nav-group">
            <button
              className="mobile-nav-item mobile-nav-accordion-toggle"
              onClick={() => setIsJewelleryOpen(!isJewelleryOpen)}
              aria-expanded={isJewelleryOpen}
            >
              <span>Shop Jewellery</span>
              <ChevronDown
                size={18}
                style={{
                  transform: isJewelleryOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.25s ease'
                }}
              />
            </button>

            {isJewelleryOpen && (
              <div className="mobile-sub-menu animate-fade">
                <button
                  className="mobile-sub-item highlight"
                  onClick={() => handleLinkClick('/shop')}
                >
                  <Sparkles size={14} color="#C5A059" /> All Jewellery (View All)
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className="mobile-sub-item"
                    onClick={() => handleLinkClick(`/shop?category=${encodeURIComponent(cat.name)}`)}
                  >
                    <span>{cat.name}</span>
                    <small>{cat.count}</small>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/shop?occasion=Wedding')}
          >
            <span>Wedding & Bridal</span>
            <span className="badge badge-ruby" style={{ fontSize: '0.65rem' }}>Heirloom</span>
          </button>

          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/shop?metal=22K Gold')}
          >
            <span>22K Gold</span>
            <ChevronRight size={16} />
          </button>

          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/shop?type=Diamond')}
          >
            <span>Diamond Solitaires</span>
            <ChevronRight size={16} />
          </button>

          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/shop?occasion=Gifting')}
          >
            <span>Gifting Moments</span>
            <ChevronRight size={16} />
          </button>

          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/about')}
          >
            <span>About Us & Heritage</span>
            <ChevronRight size={16} />
          </button>

          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/stores')}
          >
            <span>Boutiques & Store Locator</span>
            <ChevronRight size={16} />
          </button>

          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/contact')}
          >
            <span>Contact & Support</span>
            <ChevronRight size={16} />
          </button>
        </nav>

        {/* Footer Support Concierge */}
        <div className="mobile-menu-footer">
          <p className="concierge-tag">Concierge & Virtual Stylist</p>
          <div className="concierge-buttons">
            <a
              href="tel:18002008899"
              className="btn btn-outline btn-sm"
              style={{ flex: 1, fontSize: '0.78rem' }}
            >
              <Phone size={14} /> Call Us
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-sm"
              style={{ flex: 1, fontSize: '0.78rem' }}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
          <span className="bis-hallmark-tag">✓ 100% Certified & BIS Hallmarked</span>
        </div>
      </div>
    </div>
  );
}
