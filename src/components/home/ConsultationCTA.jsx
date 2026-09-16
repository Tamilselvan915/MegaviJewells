import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, PhoneCall, Sparkles } from 'lucide-react';

export default function ConsultationCTA() {
  return (
    <section className="section-spacing consultation-cta-section" aria-label="Expert Consultation">
      <div className="container">
        <div className="consultation-card-wrapper">
          <div className="consultation-inner">
            <div className="consultation-text-content">
              <span className="subheading-section" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} color="#C5A059" /> PERSONAL JEWELLERY CONCIERGE
              </span>
              <h2 className="heading-section" style={{ textAlign: 'left', marginBottom: '1rem' }}>
                Need Help Choosing?
              </h2>
              <p className="consultation-p">
                Speak with our jewellery experts and gemologists to find a piece that feels just right. Whether choosing an engagement diamond, customizing a bridal trousseau, or curating an anniversary gift.
              </p>

              <div className="consultation-buttons-wrap">
                <Link to="/consultation" className="btn btn-gold">
                  <Calendar size={16} /> Book an Appointment
                </Link>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-white"
                >
                  <MessageCircle size={16} /> WhatsApp an Expert
                </a>
              </div>
            </div>

            <div className="consultation-perks-list">
              <div className="consultation-perk-item">
                <strong>1-on-1 Virtual Video Call</strong>
                <span>High-definition live camera inspection of pieces with our senior stylist.</span>
              </div>
              <div className="consultation-perk-item">
                <strong>In-Store VIP Salon Experience</strong>
                <span>Private viewing room reserved with refreshments and dedicated trousseau curation.</span>
              </div>
              <div className="consultation-perk-item">
                <strong>Certified Diamond Consultation</strong>
                <span>Learn about cut quality, fluorescence, and certification with our in-house gemologist.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
