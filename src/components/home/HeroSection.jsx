import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="hero-section" aria-label="Hero Showcase">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Sparkles size={15} color="#C5A059" />
            <span>THE ROYAL HERITAGE COLLECTION</span>
          </div>

          <h1 className="hero-title">
            Jewellery That Becomes <br className="desktop-only" />
            <em>Your Story</em>
          </h1>

          <p className="hero-subtext">
            Timeless pieces crafted for celebrations, milestones, and every beautiful moment in between. Certified pure 22K gold & conflict-free natural diamonds.
          </p>

          <div className="hero-cta-group">
            <Link to="/shop" className="btn btn-gold">
              Shop Jewellery <ArrowRight size={16} />
            </Link>
            <Link to="/shop?occasion=Wedding" className="btn btn-outline hero-secondary-btn">
              Explore Bridal
            </Link>
          </div>

          {/* Quick Trust Highlights below CTAs */}
          <div className="hero-trust-pills">
            <div className="hero-pill">
              <ShieldCheck size={14} color="#1D5C42" />
              <span>100% BIS Hallmarked</span>
            </div>
            <div className="hero-pill">
              <Sparkles size={14} color="#C5A059" />
              <span>Natural Certified Diamonds</span>
            </div>
            <div className="hero-pill">
              <span>Free Insured Shipping</span>
            </div>
          </div>
        </div>

        {/* Hero Image Showcase */}
        <div className="hero-media-wrapper">
          <div className="hero-image-frame">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"
              alt="Aurelia Jewels Heirloom Bridal Masterpiece"
              className="hero-main-img"
              loading="eager"
            />
            {/* Floating Luxury Tag */}
            <div className="hero-floating-card">
              <span className="floating-title">Maharani Emerald Choker</span>
              <span className="floating-sub">Handcrafted in 22K Gold</span>
              <Link to="/product/aur-nck-03" className="floating-link">
                Discover Piece <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
