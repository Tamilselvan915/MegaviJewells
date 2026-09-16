import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Sparkles, HeartHandshake, ArrowRight, Check } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page-root">
      {/* Hero */}
      <section className="about-hero bg-subtle">
        <div className="container text-center">
          <span className="subheading-section">THE AURELIA HERITAGE</span>
          <h1 className="heading-section">Crafted to Last. Designed to Shine.</h1>
          <p className="text-secondary" style={{ maxWidth: '680px', margin: '0.75rem auto 1.5rem' }}>
            Founded on an unwavering devotion to ethical craftsmanship, Aurelia Jewels marries India's millennium-old goldsmith traditions with contemporary European architectural elegance.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="section-spacing">
        <div className="container about-split-grid">
          <div className="about-media-frame">
            <img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
              alt="Aurelia master artisan hand-carving gold filigree"
              className="about-img card-luxury"
              loading="lazy"
            />
          </div>
          <div className="about-text-content">
            <span className="subheading-section" style={{ textAlign: 'left' }}>
              OUR PHILOSOPHY
            </span>
            <h2 className="heading-card" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              Heirlooms That Transcend Generations
            </h2>
            <p className="mb-3 text-secondary">
              At Aurelia Jewels, we believe jewellery is never merely decorative. It is an intimate archive of moments — the sacred whisper of wedding vows, the pride of milestone promotions, and the enduring warmth of heirloom gifts passed from mother to daughter.
            </p>
            <p className="mb-4 text-secondary">
              Every single piece is designed and finished by generational karigars (master craftsmen) in Jaipur, Kolkata, and Mumbai. We combine hand repoussé, open-setting uncut polki, and precision laser micro-pavé settings.
            </p>

            <div className="about-highlights-list">
              <div className="flex-center" style={{ gap: '0.6rem', justifyContent: 'flex-start' }}>
                <Check size={18} color="#C5A059" />
                <span>100% Conflict-Free Natural Diamonds certified by IGI & SGL</span>
              </div>
              <div className="flex-center" style={{ gap: '0.6rem', justifyContent: 'flex-start' }}>
                <Check size={18} color="#C5A059" />
                <span>Govt-recognized BIS Hallmarked 22K (916) and 18K (750) pure gold</span>
              </div>
              <div className="flex-center" style={{ gap: '0.6rem', justifyContent: 'flex-start' }}>
                <Check size={18} color="#C5A059" />
                <span>Fair wages, zero child labor & safe working environments for all artisans</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="section-spacing bg-subtle">
        <div className="container">
          <div className="section-header">
            <span className="subheading-section">PILLARS OF DISTINCTION</span>
            <h2 className="heading-section">The Four Aurelia Commitments</h2>
          </div>

          <div className="trust-cards-grid">
            <div className="trust-card">
              <Award size={24} color="#C5A059" />
              <h3 className="trust-card-title">Pure Purity Standard</h3>
              <p className="trust-card-desc">
                Every ounce of gold undergoes automated Karatmeter analysis ensuring 916 and 750 fineness without tolerance for adulteration.
              </p>
            </div>
            <div className="trust-card">
              <ShieldCheck size={24} color="#C5A059" />
              <h3 className="trust-card-title">Transparent Pricing</h3>
              <p className="trust-card-desc">
                No hidden fees. We itemize exact gold weight, diamond value, artisan making charges, and 3% statutory GST right on the product page.
              </p>
            </div>
            <div className="trust-card">
              <Sparkles size={24} color="#C5A059" />
              <h3 className="trust-card-title">Design Originality</h3>
              <p className="trust-card-desc">
                From lightweight daily office bands to opulent bridal necklaces, our in-house design atelier crafts original concepts protected by copyright.
              </p>
            </div>
            <div className="trust-card">
              <HeartHandshake size={24} color="#C5A059" />
              <h3 className="trust-card-title">Lifetime Privilege Care</h3>
              <p className="trust-card-desc">
                Complimentary lifetime ultrasonic cleaning, annual prong integrity checks, and fair buyback exchanges at all flagship showrooms.
              </p>
            </div>
          </div>

          <div className="section-footer-cta mt-5">
            <Link to="/shop" className="btn btn-gold">
              Explore Our Handcrafted Collections <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
