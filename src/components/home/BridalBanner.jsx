import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function BridalBanner() {
  return (
    <section className="bridal-banner-section" aria-label="Bridal Haute Joaillerie">
      <div className="container bridal-banner-container">
        <div className="bridal-banner-card">
          <div className="bridal-banner-media">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"
              alt="Aurelia Bridal Trousseau Collection"
              className="bridal-banner-img"
              loading="lazy"
            />
            <div className="bridal-banner-overlay" />
          </div>

          <div className="bridal-banner-content">
            <div className="bridal-eyebrow">
              <Sparkles size={14} color="#D4AF37" />
              <span>THE BRIDAL ATELIER</span>
            </div>

            <h2 className="bridal-title">
              Made for Your <em>Forever</em>
            </h2>

            <p className="bridal-text">
              "From the first celebration to the moment you say forever, discover jewellery created for unforgettable beginnings." Handcrafted polki collars, sacred temple necklaces and certified solitaire engagement rings.
            </p>

            <div className="bridal-actions">
              <Link to="/shop?occasion=Wedding" className="btn btn-gold">
                Explore Bridal Collection <ArrowRight size={16} />
              </Link>
              <Link to="/consultation" className="btn btn-outline-white">
                Book Bridal Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
