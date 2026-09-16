import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin, ChevronDown, CheckCircle2, Clock } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const FAQS = [
  {
    q: 'How do I verify the authenticity and hallmarking of my jewellery?',
    a: 'Every gold piece from Aurelia Jewels carries the official 3-symbol BIS Hallmark: the BIS triangular logo, purity grade in karats and fineness (e.g. 22K916 or 18K750), and a unique 6-digit laser HUID (Hallmark Unique Identification) code. You can verify this HUID code on the government BIS Care mobile application anytime.'
  },
  {
    q: 'How long does insured shipping take across India?',
    a: 'Ready-to-ship pieces are dispatched within 24–48 hours via specialized armed insured couriers (such as Sequel Logistics and BVC Logistics). Delivery typically takes 3 to 5 business days depending on your PIN code. Shipments require OTP verification upon delivery.'
  },
  {
    q: 'What is your 15-day return and exchange policy?',
    a: 'If you are not completely enchanted with your purchase, you may initiate an exchange or return within 15 days of delivery, provided the security tag and tamper-evident seal remain intact alongside the original certificate and invoice.'
  },
  {
    q: 'Can I customize a ring or necklace in a different metal or diamond carat?',
    a: 'Yes! Our bespoke atelier accommodates custom requests, including resizing, changing metal from yellow to rose gold or platinum, and setting higher carat solitaire stones. Book a consultation or WhatsApp our stylist to discuss.'
  },
  {
    q: 'Do you offer lifetime cleaning and maintenance?',
    a: 'Yes, we provide complimentary lifetime ultrasonic cleaning, stone security inspections, and rhodium polishing at any of our flagship boutiques across India.'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please complete all mandatory fields (*)', 'error');
      return;
    }
    setIsSubmitted(true);
    addToast('Message received! Our customer concierge will respond within 4 business hours.', 'success');
  };

  return (
    <div className="contact-page-root">
      {/* Hero */}
      <section className="contact-hero bg-subtle">
        <div className="container text-center">
          <span className="subheading-section">WE ARE HERE FOR YOU</span>
          <h1 className="heading-section">Connect With Aurelia Jewels</h1>
          <p className="text-secondary" style={{ maxWidth: '640px', margin: '0.5rem auto 1.5rem' }}>
            Have questions about an order, diamond specifications, custom sizing, or boutique visits? Our customer concierge team is at your service.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section-spacing">
        <div className="container contact-grid-layout">
          {/* Left Column: Direct Channels & Form */}
          <div className="contact-form-col card-luxury">
            {isSubmitted ? (
              <div className="contact-success-box text-center py-5">
                <CheckCircle2 size={48} color="#1D5C42" style={{ margin: '0 auto 1rem' }} />
                <h2 className="heading-card" style={{ fontSize: '1.6rem' }}>
                  Thank You, {formData.name}
                </h2>
                <p className="text-secondary mt-2">
                  Your inquiry regarding "{formData.subject}" has been delivered to our senior concierge desk. A dedicated specialist will reach out to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  className="btn btn-gold mt-4"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-inquiry-form">
                <h2 className="step-section-heading mb-3">Send Us a Message</h2>
                <div className="form-group mb-3">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
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
                    <label className="form-label">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Inquiry Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="General Inquiry">General Product Inquiry</option>
                    <option value="Order Tracking">Existing Order Tracking / Delivery</option>
                    <option value="Custom Sizing">Ring Sizing & Customization</option>
                    <option value="Boutique Visit">Flagship Boutique Appointment</option>
                    <option value="Return / Exchange">15-Day Return or Exchange</option>
                  </select>
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Your Message *</label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    placeholder="How may we assist you today?"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn btn-gold btn-full">
                  Send Inquiry Message
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Cards & Support Info */}
          <div className="contact-info-col">
            <div className="contact-channels-grid mb-4">
              <div className="contact-channel-card card-luxury">
                <Phone size={22} color="#C5A059" />
                <div>
                  <strong>Toll-Free Concierge</strong>
                  <a href="tel:18002008899" className="channel-link">1800-200-8899</a>
                  <small>Mon - Sun: 10:00 AM - 8:30 PM IST</small>
                </div>
              </div>

              <div className="contact-channel-card card-luxury">
                <MessageCircle size={22} color="#1D5C42" />
                <div>
                  <strong>Instant WhatsApp Chat</strong>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-link"
                  >
                    +91 98765 43210
                  </a>
                  <small>Live response from senior stylist</small>
                </div>
              </div>

              <div className="contact-channel-card card-luxury">
                <Mail size={22} color="#C5A059" />
                <div>
                  <strong>Direct Email</strong>
                  <a href="mailto:concierge@aureliajewels.com" className="channel-link">
                    concierge@aureliajewels.com
                  </a>
                  <small>Average reply under 4 hours</small>
                </div>
              </div>

              <div className="contact-channel-card card-luxury">
                <MapPin size={22} color="#C5A059" />
                <div>
                  <strong>Corporate Headquarters</strong>
                  <p className="text-secondary text-sm">
                    Aurelia House, Bandra Kurla Complex (BKC), Mumbai, MH 400051
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="contact-faq-wrapper card-luxury">
              <h3 className="heading-card mb-3" style={{ fontSize: '1.25rem' }}>
                Frequently Asked Questions
              </h3>
              <div className="faq-list">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                      aria-expanded={openFaqIdx === idx}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={16}
                        style={{
                          transform: openFaqIdx === idx ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s'
                        }}
                      />
                    </button>
                    {openFaqIdx === idx && (
                      <p className="faq-answer-text animate-fade">{faq.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
