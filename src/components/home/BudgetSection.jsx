import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Wallet } from 'lucide-react';
import { PRICE_TIERS } from '../../data/products';

const TIER_DESCRIPTIONS = {
  "under-25k": "Delicate nose pins, everyday diamond charms & minimalist gold pendants.",
  "25k-50k": "Classic solitaire studs, modern mangalsutras & lightweight office bands.",
  "50k-100k": "Eternity diamond rings, 22K handcrafted chains & cocktail earrings.",
  "above-100k": "Opulent bridal choker sets, heirloom polki & statement solitaires."
};

export default function BudgetSection() {
  const navigate = useNavigate();

  const handleTierClick = (tierId) => {
    navigate(`/shop?price=${tierId}`);
  };

  return (
    <section className="section-spacing budget-section" aria-label="Shop by Price">
      <div className="container">
        <div className="section-header">
          <span className="subheading-section">PRICE DISCOVERY</span>
          <h2 className="heading-section">Shop Within Your Budget</h2>
          <p>
            Certified craftsmanship at every milestone. Select your preferred price tier for instant tailored discovery.
          </p>
        </div>

        <div className="budget-cards-grid">
          {PRICE_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="budget-card"
              onClick={() => handleTierClick(tier.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleTierClick(tier.id);
              }}
            >
              <div className="budget-card-top">
                <span className="budget-tag-pill">Precious Edit</span>
                <Wallet size={20} color="#C5A059" />
              </div>
              <h3 className="budget-card-label">{tier.label}</h3>
              <p className="budget-card-desc">
                {TIER_DESCRIPTIONS[tier.id]}
              </p>
              <div className="budget-card-footer">
                <span>View Matching Designs</span>
                <ArrowRight size={15} className="budget-arrow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
