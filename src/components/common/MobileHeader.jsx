import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const MOBILE_CATEGORIES = [
  { label: 'Rings', path: '/shop?category=Rings' },
  { label: 'Earrings', path: '/shop?category=Earrings' },
  { label: 'Necklaces', path: '/shop?category=Necklaces' },
  { label: 'Bracelets', path: '/shop?category=Bracelets' },
  { label: 'Bangles', path: '/shop?category=Bangles' },
  { label: 'Wedding', path: '/shop?occasion=Wedding' },
  { label: '22K Gold', path: '/shop?metal=22K Gold' },
  { label: 'Diamonds', path: '/shop?type=Diamond' },
  { label: 'Pendants', path: '/shop?category=Pendants' },
  { label: 'Mangalsutra', path: '/shop?category=Mangalsutra' }
];

export default function MobileHeader({ onOpenMenu, onOpenSearch }) {
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="mobile-header-wrapper">
      {/* Top Main Mobile Bar */}
      <div className="mobile-header-main">
        {/* Left: Hamburger Menu */}
        <button
          className="mobile-header-btn"
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        {/* Center: Brand Name */}
        <Link to="/" className="mobile-brand-link">
          <span className="mobile-brand-title">AURELIA JEWELS</span>
        </Link>

        {/* Right: Actions (Search, Wishlist, Cart) */}
        <div className="mobile-header-actions">
          <button
            className="mobile-header-btn"
            onClick={onOpenSearch}
            aria-label="Search jewellery"
          >
            <Search size={20} />
          </button>

          <Link
            to="/wishlist"
            className="mobile-header-btn relative-btn"
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="badge-pill">{wishlistCount}</span>
            )}
          </Link>

          <button
            className="mobile-header-btn relative-btn"
            onClick={openCart}
            aria-label={`Shopping bag with ${itemCount} items`}
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="badge-pill">{itemCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* Horizontally Scrollable Category Bar */}
      <nav className="mobile-category-bar hide-scrollbar" aria-label="Quick Category Filter">
        <div className="mobile-cat-scroll-track">
          {MOBILE_CATEGORIES.map((cat) => {
            const isActive = location.search.includes(encodeURIComponent(cat.label.replace('22K ', '')));
            return (
              <button
                key={cat.label}
                type="button"
                className={`mobile-cat-pill ${isActive ? 'active' : ''}`}
                onClick={() => navigate(cat.path)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
