import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Common Components
import Navbar from './components/common/Navbar';
import MobileHeader from './components/common/MobileHeader';
import MobileMenuDrawer from './components/common/MobileMenuDrawer';
import SearchOverlay from './components/common/SearchOverlay';
import CartDrawer from './components/common/CartDrawer';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import StoreLocator from './pages/StoreLocator';
import Consultation from './pages/Consultation';
import Guides from './pages/Guides';
import About from './pages/About';
import Contact from './pages/Contact';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <ScrollToTop />

      {/* Desktop Sticky Header */}
      <div className="desktop-header-container">
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      </div>

      {/* Mobile Top Header with Category Pill Bar */}
      <div className="mobile-header-container">
        <MobileHeader
          onOpenMenu={() => setIsMobileMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      </div>

      {/* Mobile Full Navigation Slide-out Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Omnipresent Live Search Modal */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Slide-over Shopping Bag Drawer */}
      <CartDrawer />

      {/* Route Views */}
      <div className="main-content-view">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/stores" element={<StoreLocator />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      {/* Luxury Footer with Assurance & Newsletter */}
      <Footer />
    </div>
  );
}
