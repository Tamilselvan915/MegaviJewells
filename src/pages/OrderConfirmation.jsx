import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ShieldCheck, ArrowRight, Printer } from 'lucide-react';
import { formatINR } from '../data/products';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const saved = sessionStorage.getItem('aurelia_latest_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, [orderId]);

  const deliveryDate = new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="order-confirmation-root container section-spacing">
      <div className="confirmation-card card-luxury">
        <div className="confirmation-header">
          <div className="confirm-icon-wrap">
            <CheckCircle2 size={42} color="#1D5C42" />
          </div>
          <span className="subheading-section" style={{ color: '#1D5C42' }}>
            ORDER CONFIRMED & TRANSIT INSURED
          </span>
          <h1 className="heading-section">Thank You For Your Order</h1>
          <p className="order-id-line">
            Order Reference ID: <strong>{orderId || 'AUR-829140'}</strong>
          </p>
          <p className="order-lead-text">
            A confirmation email with your digital BIS Hallmark Certificate, assay reports and tracking link has been sent to{' '}
            <strong>{order?.customer?.email || 'your email'}</strong>.
          </p>
        </div>

        <div className="confirmation-timeline-box">
          <div className="timeline-item active">
            <div className="timeline-dot" />
            <div className="timeline-text">
              <strong>Order Placed</strong>
              <small>Payment verified & secured</small>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-text">
              <strong>Master Gemologist QC</strong>
              <small>Prong inspection & Hallmark verify</small>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-text">
              <strong>Insured Dispatch</strong>
              <small>Tamper-evident sealed packaging</small>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-text">
              <strong>Expected Delivery</strong>
              <small>{deliveryDate}</small>
            </div>
          </div>
        </div>

        {order && (
          <div className="order-recap-section">
            <div className="flex-between mb-3">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>
                Items Ordered ({order.items.length})
              </h3>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => window.print()}
              >
                <Printer size={13} /> Print Invoice
              </button>
            </div>

            <div className="order-items-table">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item-recap-row flex-between">
                  <div className="flex-center" style={{ gap: '0.8rem' }}>
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="recap-thumb"
                    />
                    <div>
                      <strong>{item.product.name}</strong>
                      <p className="text-secondary text-sm">
                        Size: {item.selectedSize} | Qty: {item.quantity} | Purity: {item.product.purity}
                      </p>
                    </div>
                  </div>
                  <span className="recap-price">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="order-total-recap-box mt-3">
              <div className="flex-between mb-1">
                <span className="text-secondary">Subtotal:</span>
                <span>{formatINR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex-between mb-1 text-ruby">
                  <span>Privilege Discount:</span>
                  <span>-{formatINR(order.discount)}</span>
                </div>
              )}
              <div className="flex-between mb-1">
                <span className="text-secondary">Statutory GST (3%):</span>
                <span>{formatINR(order.tax)}</span>
              </div>
              <div className="flex-between mb-1">
                <span className="text-secondary">Insured Delivery:</span>
                <span className="text-emerald font-weight-600">FREE</span>
              </div>
              <div className="summary-divider" />
              <div className="flex-between font-weight-700">
                <span>Grand Total Paid:</span>
                <span className="text-gold" style={{ fontSize: '1.25rem' }}>
                  {formatINR(order.total)}
                </span>
              </div>
            </div>

            {order.customer && (
              <div className="order-shipping-dest-box mt-4">
                <h4>Delivering To:</h4>
                <p>
                  <strong>{order.customer.fullName}</strong> ({order.customer.phone})<br />
                  {order.customer.address}, {order.customer.landmark ? `${order.customer.landmark}, ` : ''}
                  {order.customer.city}, {order.customer.state} — <strong>{order.customer.pincode}</strong>
                </p>
              </div>
            )}
          </div>
        )}

        <div className="confirmation-cta-row mt-4">
          <Link to="/shop" className="btn btn-gold">
            Continue Discovering Jewellery <ArrowRight size={16} />
          </Link>
          <Link to="/stores" className="btn btn-outline">
            Locate Nearest Flagship Store
          </Link>
        </div>
      </div>
    </div>
  );
}
