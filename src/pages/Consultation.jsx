import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Video,
  Store,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Consultation() {
  const [consultationMode, setConsultationMode] = useState('virtual'); // 'virtual' or 'instore'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    date: '',
    time: '03:00 PM',
    interest: 'Bridal Jewellery Trousseau',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.date) {
      addToast('Please fill all mandatory fields (*)', 'error');
      return;
    }

    const ref = `CNS-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);
    addToast('Consultation appointment confirmed! Our stylist will reach out.', 'success');
  };

  return (
    <div className="consultation-page-root">
      {/* Header Banner */}
      <section className="consultation-hero">
        <div className="container text-center">
          <span className="subheading-section">BESPOKE CONCIERGE SERVICE</span>
          <h1 className="heading-section">Need Help Choosing?</h1>
          <p className="text-secondary" style={{ maxWidth: '640px', margin: '0.5rem auto 1.5rem' }}>
            "Speak with our jewellery experts and find a piece that feels just right." From selecting the ideal diamond cut to curating an entire wedding trousseau, our master gemologists are here to guide you.
          </p>

          <div className="flex-center flex-wrap" style={{ gap: '1.5rem' }}>
            <div className="flex-center text-sm" style={{ gap: '0.4rem' }}>
              <ShieldCheck size={16} color="#C5A059" />
              <span>Complimentary & No Obligation</span>
            </div>
            <div className="flex-center text-sm" style={{ gap: '0.4rem' }}>
              <Award size={16} color="#C5A059" />
              <span>IGI Certified Senior Gemologists</span>
            </div>
            <div className="flex-center text-sm" style={{ gap: '0.4rem' }}>
              <Video size={16} color="#C5A059" />
              <span>High Definition Video Preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="section-spacing">
        <div className="container consultation-layout-grid">
          {/* Left Column: Booking Form */}
          <div className="consultation-form-column card-luxury">
            {isSubmitted ? (
              <div className="consultation-success-state text-center py-5">
                <CheckCircle2 size={54} color="#1D5C42" style={{ margin: '0 auto 1.25rem' }} />
                <span className="subheading-section" style={{ color: '#1D5C42' }}>
                  CONSULTATION BOOKED
                </span>
                <h2 className="heading-card" style={{ fontSize: '1.8rem', marginTop: '0.25rem' }}>
                  We Look Forward to Assisting You
                </h2>
                <p className="mt-2 text-secondary">
                  Booking Reference: <strong>{bookingRef}</strong>
                </p>
                <div className="consultation-summary-box mt-4">
                  <p>
                    <strong>Mode:</strong> {consultationMode === 'virtual' ? 'Live Video Call' : 'Flagship Boutique Salon'}<br />
                    <strong>Date & Time:</strong> {formData.date} at {formData.time}<br />
                    <strong>Focus:</strong> {formData.interest}<br />
                    <strong>Client:</strong> {formData.name} ({formData.phone})
                  </p>
                </div>
                <p className="text-secondary text-sm mt-3">
                  A WhatsApp and calendar invite with meeting access link has been sent to your phone and email.
                </p>
                <button
                  type="button"
                  className="btn btn-gold mt-4"
                  onClick={() => setIsSubmitted(false)}
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="consultation-main-form">
                <h2 className="step-section-heading mb-3">Schedule Your Private Session</h2>

                {/* Consultation Mode Selector */}
                <div className="consultation-mode-toggle mb-4">
                  <button
                    type="button"
                    className={`mode-btn ${consultationMode === 'virtual' ? 'active' : ''}`}
                    onClick={() => setConsultationMode('virtual')}
                  >
                    <Video size={18} />
                    <div>
                      <strong>Virtual Video Call</strong>
                      <small>Live camera preview from home</small>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`mode-btn ${consultationMode === 'instore' ? 'active' : ''}`}
                    onClick={() => setConsultationMode('instore')}
                  >
                    <Store size={18} />
                    <div>
                      <strong>In-Store VIP Salon</strong>
                      <small>Private lounge with boutique stylist</small>
                    </div>
                  </button>
                </div>

                <div className="form-grid-2 mb-3">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Radhika Malhotra"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-grid-2 mb-3">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. radhika@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Mumbai, Delhi, Bengaluru..."
                      value={formData.city}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-grid-2 mb-3">
                  <div className="form-group">
                    <label className="form-label">Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Time *</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="11:30 AM">11:30 AM - 12:30 PM</option>
                      <option value="01:30 PM">01:30 PM - 02:30 PM</option>
                      <option value="03:00 PM">03:00 PM - 04:00 PM</option>
                      <option value="05:30 PM">05:30 PM - 06:30 PM</option>
                      <option value="07:00 PM">07:00 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Jewellery Interest *</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Bridal Jewellery Trousseau">Bridal Jewellery Trousseau (Chokers, Haar, Polki)</option>
                    <option value="Solitaire Engagement Ring">Solitaire Engagement Rings & Couple Bands</option>
                    <option value="Everyday & Office Wear Gold">Everyday & Office Wear Gold & Diamonds</option>
                    <option value="Precious Anniversary or Milestone Gift">Precious Anniversary or Milestone Gift</option>
                    <option value="Custom Bespoke Design Advisory">Custom Bespoke Design & Gemstone Advisory</option>
                  </select>
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Specific Preferences or Message (Optional)</label>
                  <textarea
                    rows={3}
                    name="message"
                    placeholder="Tell us about the occasion, preferred metal (22K gold, platinum, rose gold), budget range, or any specific pieces you liked..."
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn btn-gold btn-full">
                  Request Consultation Appointment
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Instant Concierge */}
          <div className="consultation-info-column">
            <div className="concierge-highlight-card card-luxury mb-4">
              <span className="subheading-section" style={{ textAlign: 'left' }}>
                IMMEDIATE ASSISTANCE
              </span>
              <h3 className="heading-card">Need Answers Right Now?</h3>
              <p className="text-secondary text-sm mb-4">
                Our customer concierge is available 7 days a week from 10:00 AM to 8:30 PM IST.
              </p>

              <div className="concierge-direct-links">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold btn-full mb-2"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp (+91 98765 43210)
                </a>
                <a
                  href="tel:18002008899"
                  className="btn btn-outline btn-full"
                >
                  <PhoneCall size={16} /> Call Toll-Free (1800-200-8899)
                </a>
              </div>
            </div>

            <div className="consultation-faq-preview card-luxury">
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1rem' }}>
                What to Expect
              </h4>
              <ul className="consultation-faq-list">
                <li>
                  <strong>100% Free & Transparent:</strong> No booking fees or purchase obligation whatsoever.
                </li>
                <li>
                  <strong>High-Resolution Detail:</strong> Micro-camera zoom lets you examine diamond cut facets and hallmark stamps as if holding the piece.
                </li>
                <li>
                  <strong>Custom Sizing & Metal Options:</strong> Get real-time quotes on resizing, custom karat weights, or metal changes (rose gold, yellow gold, platinum).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
