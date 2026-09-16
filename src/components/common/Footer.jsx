import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, RefreshCw, Truck, Lock, ArrowRight, Instagram, Facebook, Youtube, Twitter, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      addToast('Welcome to the Aurelia Circle! Check your inbox for exclusive privileges.', 'success');
      setEmail('');
    } else {
      addToast('Please enter a valid email address.', 'error');
    }
  };

  return (
    <footer className="footer-luxury" role="contentinfo">
      {/* Brand Assurance Badges Strip */}
      <div className="footer-assurance-strip">
        <div className="container">
          <div className="assurance-grid">
            <div className="assurance-item">
              <ShieldCheck size={22} color="#C5A059" />
              <div>
                <h5>100% BIS Hallmarked</h5>
                <p>Government certified pure gold</p>
              </div>
            </div>
            <div className="assurance-item">
              <Award size={22} color="#C5A059" />
              <div>
                <h5>Certified Diamonds</h5>
                <p>IGI & SGL graded brilliance</p>
              </div>
            </div>
            <div className="assurance-item">
              <Truck size={22} color="#C5A059" />
              <div>
                <h5>Insured Delivery</h5>
                <p>100% safe transit to your doorstep</p>
              </div>
            </div>
            <div className="assurance-item">
              <RefreshCw size={22} color="#C5A059" />
              <div>
                <h5>15-Day Returns</h5>
                <p>Hassle-free exchange policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="container footer-main-content">
        <div className="footer-cols-grid">
          {/* Column 1: Brand & Newsletter */}
          <div className="footer-col brand-col">
            <h3 className="footer-brand-title">AURELIA JEWELS</h3>
            <p className="footer-brand-tagline">Crafted to Last. Designed to Shine.</p>
            <p className="footer-brand-desc">
              Heirloom gold, diamond, and bridal artistry celebrating Indian heritage with contemporary European refinement.
            </p>

            <div className="newsletter-box">
              <span className="newsletter-heading">
                <Sparkles size={14} color="#C5A059" /> Join the Aurelia Circle
              </span>
              <p className="newsletter-sub">Receive new collection updates, bespoke invitations & private preview access.</p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe to newsletter">
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Shopping Categories */}
          <div className="footer-col">
            <h4 className="footer-col-title">Shopping</h4>
            <ul className="footer-links-list">
              <li><Link to="/shop?category=Rings">Rings & Solitaires</Link></li>
              <li><Link to="/shop?category=Earrings">Earrings & Jhumkas</Link></li>
              <li><Link to="/shop?category=Necklaces">Necklaces & Chokers</Link></li>
              <li><Link to="/shop?category=Bracelets">Tennis Bracelets</Link></li>
              <li><Link to="/shop?category=Bangles">Traditional Bangles</Link></li>
              <li><Link to="/shop?occasion=Wedding">Bridal Jewellery</Link></li>
              <li><Link to="/shop?metal=22K Gold">22K Temple Gold</Link></li>
              <li><Link to="/shop?type=Diamond">Certified Diamonds</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Guides */}
          <div className="footer-col">
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links-list">
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/guides">Ring Size Guide</Link></li>
              <li><Link to="/guides">Gold Purity Explained</Link></li>
              <li><Link to="/guides">Diamond 4Cs Guide</Link></li>
              <li><Link to="/guides">Jewellery Care Tips</Link></li>
              <li><Link to="/contact">Shipping & Transit Policy</Link></li>
              <li><Link to="/contact">15-Day Return Policy</Link></li>
              <li><Link to="/contact">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Column 4: Boutiques & About */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Boutiques</h4>
            <ul className="footer-links-list">
              <li><Link to="/stores">Flagship Store Locator</Link></li>
              <li><Link to="/consultation">Book VIP In-Store Appointment</Link></li>
              <li><Link to="/consultation">Virtual Video Styling</Link></li>
              <li><Link to="/about">Our Heritage & Story</Link></li>
              <li><Link to="/about">Artisan Craftsmanship</Link></li>
              <li><Link to="/about">Ethical Sourcing Standards</Link></li>
              <li><a href="tel:18002008899">Concierge: 1800-200-8899</a></li>
            </ul>

            <div className="footer-socials">
              <span className="socials-label">Follow Our Journey</span>
              <div className="social-icons">
                <a href="#instagram" aria-label="Aurelia Jewels on Instagram" className="social-icon-btn">
                  <Instagram size={18} />
                </a>
                <a href="#facebook" aria-label="Aurelia Jewels on Facebook" className="social-icon-btn">
                  <Facebook size={18} />
                </a>
                <a href="#youtube" aria-label="Aurelia Jewels on YouTube" className="social-icon-btn">
                  <Youtube size={18} />
                </a>
                <a href="#twitter" aria-label="Aurelia Jewels on Twitter" className="social-icon-btn">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Security Note */}
      <div className="footer-bottom-bar">
        <div className="container flex-between flex-wrap" style={{ gap: '0.75rem' }}>
          <p className="copyright-text">
            © {new Date().getFullYear()} AURELIA JEWELS PRIVATE LIMITED. All rights reserved.
          </p>
          <div className="footer-security-note">
            <Lock size={13} color="#C5A059" />
            <span>256-Bit SSL Encrypted & PCI-DSS Compliant Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
