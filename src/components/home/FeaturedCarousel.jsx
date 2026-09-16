import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../shop/ProductCard';

export default function FeaturedCarousel({ onQuickView }) {
  const [activeTab, setActiveTab] = useState('bestsellers');

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 8);

  const displayedProducts = activeTab === 'bestsellers' ? bestsellers : newArrivals;

  return (
    <section className="section-spacing featured-section" aria-label="Curated Collections">
      <div className="container">
        {/* Tab Controls Header */}
        <div className="flex-between flex-wrap featured-header-row mb-4" style={{ gap: '1rem' }}>
          <div>
            <span className="subheading-section" style={{ textAlign: 'left', display: 'block' }}>
              MOST ADMIRED DESIGNS
            </span>
            <h2 className="heading-section" style={{ textAlign: 'left' }}>
              {activeTab === 'bestsellers' ? 'Loved by Our Customers' : 'Fresh Off the Atelier'}
            </h2>
          </div>

          <div className="featured-tab-pills">
            <button
              type="button"
              className={`featured-tab-btn ${activeTab === 'bestsellers' ? 'active' : ''}`}
              onClick={() => setActiveTab('bestsellers')}
            >
              <Heart size={14} /> Bestsellers
            </button>
            <button
              type="button"
              className={`featured-tab-btn ${activeTab === 'new' ? 'active' : ''}`}
              onClick={() => setActiveTab('new')}
            >
              <Sparkles size={14} /> New Arrivals
            </button>
          </div>
        </div>

        {/* Product Cards Grid (Horizontal scroll on mobile, 4-col on desktop) */}
        <div className="featured-cards-grid">
          {displayedProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        <div className="section-footer-cta mt-4">
          <Link
            to={`/shop?filter=${activeTab === 'bestsellers' ? 'bestseller' : 'new'}`}
            className="btn btn-primary"
          >
            View All {activeTab === 'bestsellers' ? 'Bestselling Designs' : 'New Additions'} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
