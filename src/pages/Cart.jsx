import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Gift,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../data/products';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    itemCount,
    subtotal,
    discountAmount,
    taxAmount,
    shippingFee,
    finalTotal,
    coupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { toggleWishlist } = useWishlist();
  const [couponCode, setCouponCode] = useState('');
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  const handleSaveForLater = (item) => {
    toggleWishlist(item.product);
    removeFromCart(item.product.id, item.selectedSize);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-page container section-spacing">
        <div className="cart-empty-box card-luxury">
          <ShoppingBag size={52} strokeWidth={1} color="#C5A059" />
          <h1 className="heading-section">Your Shopping Bag is Empty</h1>
          <p className="text-secondary" style={{ maxWidth: '480px', margin: '0.75rem auto 1.5rem' }}>
            There are no pieces in your bag. Explore our hallmarked gold, diamond solitaires and bridal jewellery to find your story.
          </p>
          <Link to="/shop" className="btn btn-gold">
            Discover Fine Jewellery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-root">
      <div className="container section-spacing">
        {/* Page Heading */}
        <div className="cart-page-header flex-between mb-4 flex-wrap" style={{ gap: '1rem' }}>
          <div>
            <span className="subheading-section" style={{ textAlign: 'left' }}>CHECKOUT SUMMARY</span>
            <h1 className="heading-section" style={{ textAlign: 'left' }}>
              Shopping Bag ({itemCount} {itemCount === 1 ? 'Piece' : 'Pieces'})
            </h1>
          </div>
          <Link to="/shop" className="btn btn-outline btn-sm">
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        <div className="cart-layout-grid">
          {/* Left Column: Items List */}
          <div className="cart-items-column">
            {/* Free Shipping Highlight */}
            <div className="cart-perk-banner">
              <ShieldCheck size={20} color="#1D5C42" />
              <div>
                <strong>Complimentary 100% Insured Delivery Unlocked</strong>
                <p>Fully covered against transit loss or damage with discreet tamper-evident packaging.</p>
              </div>
            </div>

            {/* List of Cart Items */}
            <div className="cart-items-table">
              {cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="cart-row-card card-luxury"
                >
                  <Link to={`/product/${item.product.id}`} className="cart-row-thumb-link">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="cart-row-thumb"
                    />
                  </Link>

                  <div className="cart-row-details">
                    <div className="flex-between">
                      <h3 className="cart-row-title">
                        <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                      </h3>
                      <button
                        type="button"
                        className="cart-row-del-btn"
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="cart-row-attributes">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>{item.product.purity}</span>
                      <span>•</span>
                      <span>Gross Wt: {item.product.grossWeight}</span>
                    </div>

                    <div className="cart-row-pricing-stepper flex-between flex-wrap mt-3" style={{ gap: '1rem' }}>
                      {/* Quantity Stepper */}
                      <div className="cart-qty-control flex-center">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Line Subtotal */}
                      <div className="cart-row-line-price">
                        <span className="cart-unit-calc">
                          {formatINR(item.product.price)} x {item.quantity} =
                        </span>
                        <span className="cart-line-total">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Secondary Actions */}
                    <div className="cart-row-actions mt-3">
                      <button
                        type="button"
                        className="cart-save-later-btn"
                        onClick={() => handleSaveForLater(item)}
                      >
                        <Heart size={14} /> Move to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Luxury Gift Packaging Add-on */}
            <div className="cart-gift-box card-luxury">
              <label className="cart-gift-label">
                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setIsGiftWrap(e.target.checked)}
                  className="filter-checkbox-input"
                />
                <Gift size={20} color="#C5A059" />
                <div>
                  <strong>Include Aurelia Signature Gift Box & Note (Complimentary)</strong>
                  <p>Hand-tied satin ribbon, velvet pouch and personal handwritten note.</p>
                </div>
              </label>

              {isGiftWrap && (
                <div className="gift-message-input-wrap animate-fade">
                  <textarea
                    rows={2}
                    placeholder="Write your personal gift message here..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="gift-textarea"
                    maxLength={150}
                  />
                  <small>{giftNote.length}/150 characters</small>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="cart-summary-column">
            <div className="order-summary-card card-luxury">
              <h2 className="summary-title">Order Summary</h2>

              {/* Coupon Form */}
              {!coupon ? (
                <form onSubmit={handleApplyCoupon} className="summary-coupon-form">
                  <div className="coupon-input-group">
                    <Tag size={15} className="coupon-lead-icon" />
                    <input
                      type="text"
                      placeholder="Coupon (e.g. AURELIA10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="summary-coupon-input"
                    />
                    <button type="submit" className="summary-coupon-btn">
                      Apply
                    </button>
                  </div>
                  <span className="coupon-hint">Use code <strong>AURELIA10</strong> for 10% privilege discount.</span>
                </form>
              ) : (
                <div className="coupon-active-badge">
                  <div className="flex-center" style={{ gap: '0.4rem' }}>
                    <Tag size={15} color="#1D5C42" />
                    <div>
                      <strong>{coupon.code}</strong>
                      <small className="display-block text-secondary">{coupon.description}</small>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="summary-remove-coupon-btn"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Summary Breakdown Rows */}
              <div className="summary-rows-wrap">
                <div className="flex-between summary-row">
                  <span className="text-secondary">Subtotal ({itemCount} items)</span>
                  <span>{formatINR(subtotal)}</span>
                </div>

                {coupon && (
                  <div className="flex-between summary-row text-ruby">
                    <span>Coupon Discount ({coupon.discountPercent}%)</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex-between summary-row">
                  <span className="text-secondary">GST on Jewellery (3%)</span>
                  <span>{formatINR(taxAmount)}</span>
                </div>

                <div className="flex-between summary-row">
                  <span className="text-secondary">Insured Transit Shipping</span>
                  <span className="text-emerald font-weight-600">FREE</span>
                </div>

                <div className="summary-divider" />

                <div className="flex-between summary-total-row">
                  <strong>Total Amount</strong>
                  <strong className="summary-total-price">{formatINR(finalTotal)}</strong>
                </div>
                <small className="tax-inclusive-text">Includes ₹{formatINR(taxAmount)} in statutory GST</small>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                type="button"
                className="btn btn-gold btn-full btn-checkout"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <div className="summary-trust-footer">
                <div className="flex-center" style={{ gap: '0.4rem' }}>
                  <Lock size={13} color="#C5A059" />
                  <span>256-Bit Bank Grade SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
