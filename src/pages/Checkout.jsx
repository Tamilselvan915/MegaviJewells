import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../data/products';

export default function Checkout() {
  const { cartItems, subtotal, discountAmount, taxAmount, finalTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    paymentMethod: 'upi'
  });

  const [errors, setErrors] = useState({});

  if (cartItems.length === 0) {
    return (
      <div className="container section-spacing text-center">
        <h2>Your shopping bag is empty</h2>
        <p className="mt-2 text-secondary">Please add jewellery to your bag before checking out.</p>
        <Link to="/shop" className="btn btn-gold mt-4">
          Browse Jewellery
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = 'Valid 10-digit mobile number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.pincode.trim() || formData.pincode.length !== 6)
      newErrors.pincode = 'Valid 6-digit PIN code is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Generate simulated order confirmation ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `AUR-${randomNum}`;

    const orderSummary = {
      orderId,
      items: cartItems,
      total: finalTotal,
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      customer: formData,
      placedAt: new Date().toISOString()
    };

    // Store in sessionStorage for confirmation page
    sessionStorage.setItem('aurelia_latest_order', JSON.stringify(orderSummary));
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="checkout-page-root">
      <div className="container section-spacing">
        {/* Checkout Header */}
        <div className="checkout-top-bar flex-between mb-4">
          <Link to="/cart" className="checkout-back-link">
            <ArrowLeft size={16} /> Back to Bag
          </Link>
          <div className="checkout-secure-pill flex-center" style={{ gap: '0.4rem' }}>
            <Lock size={14} color="#C5A059" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="checkout-stepper">
          <div className={`step-node ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <span className="step-circle">{currentStep > 1 ? <Check size={14} /> : '1'}</span>
            <span className="step-label">Contact</span>
          </div>
          <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`} />
          <div className={`step-node ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <span className="step-circle">{currentStep > 2 ? <Check size={14} /> : '2'}</span>
            <span className="step-label">Delivery Address</span>
          </div>
          <div className={`step-line ${currentStep >= 3 ? 'active' : ''}`} />
          <div className={`step-node ${currentStep === 3 ? 'active' : ''}`}>
            <span className="step-circle">3</span>
            <span className="step-label">Payment</span>
          </div>
        </div>

        {/* Main Grid: Form on Left, Order Summary on Right */}
        <div className="checkout-grid-layout">
          <div className="checkout-main-col card-luxury">
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <form onSubmit={handleNextStep} className="checkout-step-form animate-fade">
                <h2 className="step-section-heading">Step 1: Contact Information</h2>
                <p className="text-secondary text-sm mb-4">
                  We'll send order tracking updates, digital BIS certificates, and invoice to this email and phone number.
                </p>

                <div className="form-group mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Radhika Sharma"
                    className={`form-control ${errors.fullName ? 'error' : ''}`}
                  />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>

                <div className="form-grid-2 mb-3">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. radhika@example.com"
                      className={`form-control ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className={`form-control ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                </div>

                <button type="submit" className="btn btn-gold mt-4">
                  Continue to Delivery Address <ArrowRight size={16} />
                </button>
              </form>
            )}

            {/* Step 2: Delivery Address */}
            {currentStep === 2 && (
              <form onSubmit={handleNextStep} className="checkout-step-form animate-fade">
                <div className="flex-between mb-2">
                  <h2 className="step-section-heading">Step 2: Insured Delivery Address</h2>
                  <button
                    type="button"
                    className="step-edit-prev-btn"
                    onClick={() => setCurrentStep(1)}
                  >
                    Edit Contact
                  </button>
                </div>
                <p className="text-secondary text-sm mb-4">
                  All shipments are hand-delivered in discreet tamper-evident packaging with OTP delivery verification.
                </p>

                <div className="form-group mb-3">
                  <label className="form-label">Flat / House No., Building Name & Street *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. Flat 402, Royal Palms, 14th Road"
                    className={`form-control ${errors.address ? 'error' : ''}`}
                  />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>

                <div className="form-grid-2 mb-3">
                  <div className="form-group">
                    <label className="form-label">Landmark (Optional)</label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      placeholder="e.g. Near St. Paul Church"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g. 400050"
                      maxLength={6}
                      className={`form-control ${errors.pincode ? 'error' : ''}`}
                    />
                    {errors.pincode && <span className="field-error">{errors.pincode}</span>}
                  </div>
                </div>

                <div className="form-grid-2 mb-3">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai"
                      className={`form-control ${errors.city ? 'error' : ''}`}
                    />
                    {errors.city && <span className="field-error">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Maharashtra"
                      className={`form-control ${errors.state ? 'error' : ''}`}
                    />
                    {errors.state && <span className="field-error">{errors.state}</span>}
                  </div>
                </div>

                <div className="checkout-btns-row mt-4">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-gold">
                    Proceed to Payment <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <form onSubmit={handlePlaceOrder} className="checkout-step-form animate-fade">
                <div className="flex-between mb-2">
                  <h2 className="step-section-heading">Step 3: Secure Payment</h2>
                  <button
                    type="button"
                    className="step-edit-prev-btn"
                    onClick={() => setCurrentStep(2)}
                  >
                    Edit Address
                  </button>
                </div>
                <p className="text-secondary text-sm mb-4">
                  Select your preferred payment method. (Demonstration Mode — no real card charge will occur).
                </p>

                <div className="payment-options-list mb-4">
                  {/* Option 1: UPI */}
                  <label className={`payment-option-card ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                    />
                    <QrCode size={22} color="#C5A059" />
                    <div className="payment-opt-info">
                      <strong>Instant UPI & QR (Google Pay, PhonePe, Paytm)</strong>
                      <p>Instant contactless payment with 0% extra surcharge</p>
                    </div>
                  </label>

                  {/* Option 2: Credit/Debit Card */}
                  <label className={`payment-option-card ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <CreditCard size={22} color="#C5A059" />
                    <div className="payment-opt-info">
                      <strong>Credit / Debit Card (Visa, MasterCard, RuPay, Amex)</strong>
                      <p>Secure 3D-Secure 2-factor OTP verified checkout</p>
                    </div>
                  </label>

                  {/* Option 3: Net Banking */}
                  <label className={`payment-option-card ${formData.paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={handleChange}
                    />
                    <Building2 size={22} color="#C5A059" />
                    <div className="payment-opt-info">
                      <strong>Net Banking (50+ Indian Major Banks)</strong>
                      <p>HDFC, ICICI, SBI, Axis, Kotak and all partner institutions</p>
                    </div>
                  </label>

                  {/* Option 4: Cash on Delivery */}
                  <label className={`payment-option-card ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                    />
                    <Banknote size={22} color="#C5A059" />
                    <div className="payment-opt-info">
                      <strong>Cash / Card on Delivery (with OTP Verification)</strong>
                      <p>Pay securely at your doorstep upon inspecting tamper-proof seal</p>
                    </div>
                  </label>
                </div>

                <div className="checkout-btns-row">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-gold btn-place-order">
                    Confirm & Place Order ({formatINR(finalTotal)})
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Mini Order Summary Recap */}
          <div className="checkout-sidebar-col">
            <div className="order-summary-card card-luxury">
              <h3 className="summary-title" style={{ fontSize: '1.25rem' }}>
                Order Recap ({cartItems.length} items)
              </h3>

              <div className="checkout-items-preview custom-scroll mb-3">
                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="checkout-item-line">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="checkout-item-thumb"
                    />
                    <div className="checkout-item-info">
                      <span className="checkout-item-name">{item.product.name}</span>
                      <small className="checkout-item-meta">
                        Size: {item.selectedSize} | Qty: {item.quantity}
                      </small>
                      <strong className="checkout-item-price">
                        {formatINR(item.product.price * item.quantity)}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-rows-wrap pt-2">
                <div className="flex-between summary-row">
                  <span className="text-secondary">Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex-between summary-row text-ruby">
                    <span>Privilege Discount</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex-between summary-row">
                  <span className="text-secondary">GST (3%)</span>
                  <span>{formatINR(taxAmount)}</span>
                </div>
                <div className="flex-between summary-row">
                  <span className="text-secondary">Insured Delivery</span>
                  <span className="text-emerald font-weight-600">FREE</span>
                </div>
                <div className="summary-divider" />
                <div className="flex-between summary-total-row">
                  <strong>Total Payable</strong>
                  <strong className="text-gold">{formatINR(finalTotal)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
