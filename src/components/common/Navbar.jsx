import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, MapPin } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Navbar({ onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`desktop-navbar-wrapper ${isScrolled ? 'is-sticky' : ''}`}>
      {/* Top Utility Bar */}
      <div className="navbar-top-utility">
        <div className="container flex-between">
          <div className="utility-left">
            <span>Complimentary Insured Shipping Across India</span>
            <span className="utility-divider">•</span>
            <Link to="/guides" className="utility-link">Gold Purity & Sizing Guides</Link>
          </div>
          <div className="utility-right">
            <Link to="/stores" className="utility-link flex-center" style={{ gap: '0.35rem' }}>
              <MapPin size={13} color="#C5A059" /> Find a Boutique
            </Link>
            <span className="utility-divider">•</span>
            <Link to="/consultation" className="utility-link">Book Consultation</Link>
            <span className="utility-divider">•</span>
            <a href="tel:18002008899" className="utility-link">1800-200-8899</a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="navbar-main">
        <div className="container flex-between">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand">
            <span className="navbar-brand-name">AURELIA JEWELS</span>
            <span className="navbar-brand-sub">CRAFTED TO LAST. DESIGNED TO SHINE.</span>
          </Link>

          {/* Navigation Links */}
          <nav className="desktop-nav-links" aria-label="Primary Navigation">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`nav-link ${location.pathname === '/shop' && !location.search ? 'active' : ''}`}
            >
              Jewellery
            </Link>
            <Link
              to="/shop?filter=bestseller"
              className={`nav-link ${location.search.includes('bestseller') ? 'active' : ''}`}
            >
              Collections
            </Link>
            <Link
              to="/shop?occasion=Wedding"
              className={`nav-link ${location.search.includes('Wedding') ? 'active' : ''}`}
            >
              Wedding
            </Link>
            <Link
              to="/shop?metal=22K Gold"
              className={`nav-link ${location.search.includes('22K') ? 'active' : ''}`}
            >
              Gold
            </Link>
            <Link
              to="/shop?type=Diamond"
              className={`nav-link ${location.search.includes('Diamond') ? 'active' : ''}`}
            >
              Diamond
            </Link>
            <Link
              to="/shop?occasion=Gifting"
              className={`nav-link ${location.search.includes('Gifting') ? 'active' : ''}`}
            >
              Gifting
            </Link>
            <Link
              to="/about"
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="navbar-actions">
            <button
              className="icon-btn"
              onClick={onOpenSearch}
              aria-label="Search jewellery"
              title="Search"
            >
              <Search size={20} />
            </button>

            <Link
              to="/wishlist"
              className="icon-btn"
              aria-label={`Wishlist with ${wishlistCount} items`}
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="badge-pill">{wishlistCount}</span>
              )}
            </Link>

            <Link
              to="/consultation"
              className="icon-btn"
              aria-label="Consultation & VIP Concierge"
              title="Consultation"
            >
              <User size={20} />
            </Link>

            <button
              className="icon-btn"
              onClick={openCart}
              aria-label={`Shopping bag with ${itemCount} items`}
              title="Shopping Bag"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="badge-pill">{itemCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
