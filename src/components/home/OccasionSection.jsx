import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { OCCASIONS_DATA } from '../../data/occasions';

export default function OccasionSection() {
  return (
    <section className="section-spacing occasion-section bg-subtle" aria-label="Shop by Occasion">
      <div className="container">
        <div className="section-header">
          <span className="subheading-section">CURATED CELEBRATIONS</span>
          <h2 className="heading-section">Jewellery for Every Moment</h2>
          <p>
            Whether honoring a lifelong vow, brightening your daily routine, or finding a meaningful gift.
          </p>
        </div>

        {/* Occasions Carousel / Grid */}
        <div className="occasions-grid">
          {OCCASIONS_DATA.map((occ) => (
            <Link
              key={occ.id}
              to={`/shop?occasion=${encodeURIComponent(occ.filterValue)}`}
              className="occasion-card"
            >
              <div className="occasion-card-img-wrap">
                <img
                  src={occ.image}
                  alt={occ.name}
                  className="occasion-card-img"
                  loading="lazy"
                />
                <div className="occasion-card-gradient" />
              </div>
              <div className="occasion-card-content">
                <span className="occasion-card-chip">Curated Edit</span>
                <h3 className="occasion-card-title">{occ.name}</h3>
                <p className="occasion-card-desc">{occ.subtitle}</p>
                <span className="occasion-explore-link">
                  Explore Collection <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
