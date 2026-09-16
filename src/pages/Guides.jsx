import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Sparkles, Scale, Heart, Gem } from 'lucide-react';
import { GUIDES } from '../data/guides';

export default function Guides() {
  const location = useLocation();
  const [activeGuideId, setActiveGuideId] = useState(GUIDES[0].id);

  // Interactive Ring Sizer State
  const [mmInput, setMmInput] = useState('54');
  const [calculatedSize, setCalculatedSize] = useState('14');

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const found = GUIDES.find((g) => g.id === targetId);
      if (found) {
        setActiveGuideId(found.id);
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  const handleCalculateSize = (mm) => {
    setMmInput(mm);
    const num = parseFloat(mm);
    if (isNaN(num)) {
      setCalculatedSize('—');
      return;
    }
    if (num < 51) setCalculatedSize('10 (Small)');
    else if (num < 53) setCalculatedSize('12 (Small-Medium)');
    else if (num < 55) setCalculatedSize('14 (Standard Women)');
    else if (num < 57) setCalculatedSize('16 (Medium-Large)');
    else if (num < 59) setCalculatedSize('18 (Standard Men / Large)');
    else if (num < 61) setCalculatedSize('20 (Men Medium)');
    else setCalculatedSize('22+ (Men Large)');
  };

  const activeGuide = GUIDES.find((g) => g.id === activeGuideId) || GUIDES[0];

  return (
    <div className="guides-page-root">
      {/* Header */}
      <section className="guides-hero bg-subtle">
        <div className="container text-center">
          <span className="subheading-section">BUYER CONFIDENCE & EDUCATION</span>
          <h1 className="heading-section">The Aurelia Jewellery Guides</h1>
          <p className="text-secondary" style={{ maxWidth: '640px', margin: '0.5rem auto 1.5rem' }}>
            Comprehensive knowledge from our certified gemologists on ring sizing, hallmark purity marks, diamond grading, and wedding trousseau planning.
          </p>

          {/* Quick Guide Navigation Pills */}
          <div className="guides-nav-pills custom-scroll">
            {GUIDES.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`guide-pill ${activeGuideId === g.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveGuideId(g.id);
                  window.location.hash = g.id;
                }}
              >
                {g.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Guide Content */}
      <div className="container section-spacing">
        <div className="guide-article-layout">
          {/* Main Article */}
          <article className="guide-main-card card-luxury" id={activeGuide.id}>
            <div className="guide-article-hero">
              <img
                src={activeGuide.image}
                alt={activeGuide.title}
                className="guide-hero-img"
              />
              <div className="guide-hero-meta">
                <span className="badge badge-gold">{activeGuide.category}</span>
                <span className="guide-time-tag">
                  <Clock size={13} /> {activeGuide.readTime}
                </span>
              </div>
            </div>

            <div className="guide-article-body">
              <h2 className="guide-article-title">{activeGuide.title}</h2>
              <p className="guide-article-summary lead-summary">{activeGuide.summary}</p>

              <div
                className="guide-formatted-content"
                dangerouslySetInnerHTML={{ __html: activeGuide.content }}
              />

              {/* Interactive Widget if Ring Sizing Guide */}
              {activeGuide.id === 'ring-size-guide' && (
                <div className="interactive-calculator-box mt-4">
                  <div className="flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
                    <Scale size={20} color="#C5A059" />
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>
                      Interactive Finger Circumference to Indian Ring Size Calculator
                    </h4>
                  </div>
                  <p className="text-secondary text-sm mb-3">
                    Enter the measured circumference of your finger in millimeters (mm):
                  </p>
                  <div className="calc-controls-row">
                    <input
                      type="number"
                      value={mmInput}
                      onChange={(e) => handleCalculateSize(e.target.value)}
                      placeholder="e.g. 54"
                      className="calc-input"
                      min={40}
                      max={75}
                    />
                    <div className="calc-result-badge">
                      <span>Suggested Indian Size:</span>
                      <strong>Size {calculatedSize}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Article Footer & Shop Prompt */}
              <div className="guide-article-footer mt-5 flex-between flex-wrap" style={{ gap: '1rem' }}>
                <Link to="/shop" className="btn btn-gold btn-sm">
                  Browse Certified Pieces <ArrowRight size={14} />
                </Link>
                <Link to="/consultation" className="btn btn-outline btn-sm">
                  Ask a Gemologist for Guidance
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar with all 5 Guides & Quick Facts */}
          <aside className="guide-sidebar">
            <div className="guide-sidebar-card card-luxury mb-4">
              <h3 className="guide-sidebar-title">Explore All 5 Guides</h3>
              <div className="guide-sidebar-links">
                {GUIDES.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className={`guide-sidebar-item ${activeGuideId === g.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveGuideId(g.id);
                      window.location.hash = g.id;
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                  >
                    <strong>{g.title}</strong>
                    <small>{g.readTime}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="guide-sidebar-card card-luxury">
              <span className="subheading-section" style={{ textAlign: 'left' }}>
                CERTIFIED STANDARDS
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                The Aurelia Benchmark
              </h4>
              <p className="text-secondary text-sm mb-3">
                All gold is assayed under BIS supervision with 6-digit laser HUID numbers. All diamonds are natural, conflict-free, and independently graded.
              </p>
              <Link to="/about" className="btn btn-outline btn-sm btn-full">
                Our Ethical Heritage
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
