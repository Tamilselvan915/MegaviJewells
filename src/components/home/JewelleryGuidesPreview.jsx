import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { GUIDES } from '../../data/guides';

export default function JewelleryGuidesPreview() {
  return (
    <section className="section-spacing guides-preview-section" aria-label="Educational Jewellery Guides">
      <div className="container">
        <div className="section-header">
          <span className="subheading-section">BUYER ASSISTANCE & ADVISORY</span>
          <h2 className="heading-section">The Aurelia Jewellery Guides</h2>
          <p>
            Make informed, confident selections with our master guidebooks written by certified gemologists.
          </p>
        </div>

        <div className="guides-cards-grid">
          {GUIDES.slice(0, 4).map((guide) => (
            <Link
              key={guide.id}
              to={`/guides#${guide.id}`}
              className="guide-card group"
            >
              <div className="guide-card-media">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="guide-card-img"
                  loading="lazy"
                />
                <span className="guide-cat-chip">{guide.category}</span>
              </div>
              <div className="guide-card-body">
                <div className="guide-read-time">
                  <Clock size={12} /> {guide.readTime}
                </div>
                <h3 className="guide-card-title">{guide.title}</h3>
                <p className="guide-card-summary">{guide.summary}</p>
                <span className="guide-read-more">
                  Read Full Guide <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="section-footer-cta mt-4">
          <Link to="/guides" className="btn btn-outline">
            <BookOpen size={16} /> View All 5 Comprehensive Guides
          </Link>
        </div>
      </div>
    </section>
  );
}
