import React from 'react';
import { ShieldCheck, Award, Lock, RefreshCw, Truck, HeartHandshake } from 'lucide-react';

const PROMISES = [
  {
    icon: Award,
    title: "Certified Jewellery",
    description: "Every piece bears government-recognized BIS hallmarking and natural diamond certification from IGI & SGL."
  },
  {
    icon: ShieldCheck,
    title: "Purity Guaranteed",
    description: "Assayed with precision Karatmeters ensuring you receive exact 22K (916) or 18K (750) purity without compromise."
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "Bank-grade 256-bit SSL encryption across UPI, credit/debit cards, net banking, and verified cash on delivery."
  },
  {
    icon: RefreshCw,
    title: "Easy 15-Day Returns",
    description: "Confidence in every selection. Enjoy hassle-free returns and full exchange flexibility across all boutiques."
  },
  {
    icon: Truck,
    title: "100% Insured Delivery",
    description: "Tamper-evident luxury packaging fully insured until it is safely in your hands anywhere across India."
  },
  {
    icon: HeartHandshake,
    title: "Lifetime Care & Support",
    description: "Complimentary annual ultrasonic cleaning, prong inspection, and polish servicing across all flagship stores."
  }
];

export default function TrustSection() {
  return (
    <section className="section-spacing trust-section bg-subtle" aria-label="Brand Assurances">
      <div className="container">
        <div className="section-header">
          <span className="subheading-section">THE AURELIA ASSURANCE</span>
          <h2 className="heading-section">Our Promise</h2>
          <p>
            Jewellery is an intimate bond of sentiment and enduring value. We uphold the strictest standards of integrity.
          </p>
        </div>

        <div className="trust-cards-grid">
          {PROMISES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="trust-card">
                <div className="trust-icon-wrap">
                  <Icon size={24} color="#C5A059" />
                </div>
                <h3 className="trust-card-title">{item.title}</h3>
                <p className="trust-card-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
