import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../data/products';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    itemCount,
    subtotal,
    discountAmount,
    taxAmount,
    finalTotal,
    coupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <div className="drawer-backdrop" onClick={closeCart} role="dialog" aria-modal="true" aria-label="Shopping Bag">
      <div className="drawer-content animate-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="flex-center" style={{ gap: '0.6rem' }}>
            <ShoppingBag size={20} color="#C5A059" />
            <h3>Your Shopping Bag ({itemCount})</h3>
          </div>
          <button
            className="icon-btn"
            onClick={closeCart}
            aria-label="Close shopping bag drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Insured Shipping Banner */}
        <div className="drawer-perk-bar">
          <ShieldCheck size={16} color="#1D5C42" />
          <span>Complimentary 100% Insured Delivery Included</span>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div className="drawer-empty-state">
              <ShoppingBag size={48} strokeWidth={1} color="#C5A059" />
              <h4>Your bag is currently empty</h4>
              <p>Explore our handcrafted gold and diamond collections and find a piece that becomes your story.</p>
              <button
                className="btn btn-gold btn-sm"
                onClick={() => {
                  closeCart();
                  navigate('/shop');
                }}
              >
                Discover Jewellery
              </button>
            </div>
          ) : (
            <div className="drawer-items-list">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="drawer-item-card">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="drawer-item-img"
                    onClick={() => {
                      closeCart();
                      navigate(`/product/${item.product.id}`);
                    }}
                  />
                  <div className="drawer-item-details">
                    <div className="flex-between">
                      <h4
                        className="drawer-item-title"
                        onClick={() => {
                          closeCart();
                          navigate(`/product/${item.product.id}`);
                        }}
                      >
                        {item.product.name}
                      </h4>
                      <button
                        className="drawer-remove-btn"
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="drawer-item-specs">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>{item.product.purity}</span>
                    </div>

                    <div className="flex-between mt-2">
                      <div className="drawer-qty-stepper">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span className="drawer-item-price">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="drawer-footer">
            {/* Coupon Code Section */}
            {!coupon ? (
              <form onSubmit={handleApplyCoupon} className="drawer-coupon-form">
                <Tag size={15} className="coupon-icon" />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. AURELIA10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="drawer-coupon-input"
                />
                <button type="submit" className="drawer-coupon-btn">
                  Apply
                </button>
              </form>
            ) : (
              <div className="drawer-coupon-applied">
                <div className="flex-center" style={{ gap: '0.4rem' }}>
                  <Tag size={14} color="#1D5C42" />
                  <span><strong>{coupon.code}</strong> applied ({coupon.discountPercent}% OFF)</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="drawer-coupon-remove"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div className="drawer-calc-rows">
              <div className="flex-between">
                <span className="text-secondary">Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              {coupon && (
                <div className="flex-between text-ruby">
                  <span>Coupon Discount ({coupon.discountPercent}%)</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex-between">
                <span className="text-secondary">GST (3%)</span>
                <span>{formatINR(taxAmount)}</span>
              </div>
              <div className="flex-between">
                <span className="text-secondary">Insured Shipping</span>
                <span className="text-emerald font-weight-600">FREE</span>
              </div>
              <div className="flex-between drawer-total-row">
                <strong>Total Amount</strong>
                <strong className="drawer-final-price">{formatINR(finalTotal)}</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="drawer-actions">
              <button
                className="btn btn-gold btn-full"
                onClick={handleCheckoutClick}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
              <button
                className="btn btn-outline btn-full btn-sm"
                onClick={handleViewCartClick}
              >
                View Full Bag Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
