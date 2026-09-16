import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export default function CategorySection() {
  return (
    <section className="section-spacing category-section" aria-label="Shop by Category">
      <div className="container">
        <div className="section-header">
          <span className="subheading-section">SHOP BY CATEGORY</span>
          <h2 className="heading-section">Find Your Perfect Piece</h2>
          <p>
            Explore handcrafted fine jewellery organized by style, curated for every milestone and sentiment.
          </p>
        </div>

        {/* 10 Category Cards Grid (Responsive: 2-col on mobile, 3-col on tablet, 5-col on desktop) */}
        <div className="category-cards-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="category-card group"
            >
              <div className="category-card-media">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-card-img"
                  loading="lazy"
                />
                <div className="category-card-overlay" />
                {cat.tag && (
                  <span className="category-card-tag">{cat.tag}</span>
                )}
              </div>
              <div className="category-card-info">
                <h3 className="category-card-title">{cat.name}</h3>
                <span className="category-card-count">{cat.count}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="section-footer-cta">
          <Link to="/shop" className="btn btn-outline btn-sm">
            Explore All Categories <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
