import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

export default function GoldRateBanner() {
  return (
    <aside className="gold-rate-ticker" aria-label="Today's Precious Metal Rates">
      <div className="container gold-ticker-inner">
        <div className="ticker-badge">
          <Sparkles size={13} className="gold-sparkle" />
          <span>TODAY'S RATE</span>
        </div>
        <div className="ticker-rates">
          <span className="rate-item">
            <strong>22K Gold:</strong> ₹71,450 / 10g <TrendingUp size={12} className="rate-up" />
          </span>
          <span className="rate-divider">•</span>
          <span className="rate-item">
            <strong>24K Gold:</strong> ₹77,950 / 10g <TrendingUp size={12} className="rate-up" />
          </span>
          <span className="rate-divider">•</span>
          <span className="rate-item">
            <strong>Silver 999:</strong> ₹92,400 / 1kg
          </span>
        </div>
        <span className="ticker-disclaimer">Rates shown for demonstration</span>
      </div>
    </aside>
  );
}
