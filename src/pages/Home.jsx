import React, { useState } from 'react';
import GoldRateBanner from '../components/common/GoldRateBanner';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FeaturedCarousel from '../components/home/FeaturedCarousel';
import OccasionSection from '../components/home/OccasionSection';
import BudgetSection from '../components/home/BudgetSection';
import BridalBanner from '../components/home/BridalBanner';
import TrustSection from '../components/home/TrustSection';
import ConsultationCTA from '../components/home/ConsultationCTA';
import JewelleryGuidesPreview from '../components/home/JewelleryGuidesPreview';
import QuickViewModal from '../components/common/QuickViewModal';

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <main className="home-page-root">
      {/* Real-time Precious Metals Rate Ticker */}
      <GoldRateBanner />

      {/* Editorial Luxury Hero */}
      <HeroSection />

      {/* Category Discovery: 10 Categories */}
      <CategorySection />

      {/* Featured: Bestsellers & New Arrivals with Quick View & Add to Bag */}
      <FeaturedCarousel onQuickView={(prod) => setQuickViewProduct(prod)} />

      {/* Curated Occasions: Wedding, Everyday, Office, Festive, etc. */}
      <OccasionSection />

      {/* Price Discovery: Under 25k, 25k-50k, 50k-1L, 1L+ */}
      <BudgetSection />

      {/* High-Impact Bridal Atelier Banner */}
      <BridalBanner />

      {/* 6 Trust / Assurance Promises (BIS Hallmark, 100% Purity, Easy Returns) */}
      <TrustSection />

      {/* Educational Jewellery Guides */}
      <JewelleryGuidesPreview />

      {/* Concierge & Consultation CTA */}
      <ConsultationCTA />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </main>
  );
}
