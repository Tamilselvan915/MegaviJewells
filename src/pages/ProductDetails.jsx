import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Star,
  ChevronRight,
  Share2,
  MapPin,
  MessageCircle,
  HelpCircle,
  Check,
  ChevronDown,
  Info
} from 'lucide-react';
import { PRODUCTS, formatINR } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/shop/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState(null);
  const [isPriceBreakdownOpen, setIsPriceBreakdownOpen] = useState(false);
  const [isFindInStoreOpen, setIsFindInStoreOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIdx(0);
    if (product.sizes) setSelectedSize(product.sizes[0]);
    setDeliveryMessage(null);
  }, [id, product]);

  const isLiked = isInWishlist(product.id);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (cleanPin.length === 6 && /^\d+$/.test(cleanPin)) {
      setDeliveryMessage({
        success: true,
        text: `Available! Free Insured Delivery to ${cleanPin} by ${new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}.`
      });
    } else {
      setDeliveryMessage({
        success: false,
        text: 'Please enter a valid 6-digit Indian PIN code.'
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, false);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'success');
    }
  };

  // Related products in the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.metal === product.metal)
  ).slice(0, 4);

  return (
    <div className="product-details-page">
      {/* Breadcrumbs */}
      <nav className="pdp-breadcrumbs container" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={13} />
        <Link to="/shop">Shop</Link>
        <ChevronRight size={13} />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <ChevronRight size={13} />
        <span className="current-crumb">{product.name}</span>
      </nav>

      <div className="container pdp-main-layout">
        {/* Gallery Column (Desktop Left, Mobile Top) */}
        <div className="pdp-gallery-col">
          <div className="pdp-gallery-sticky">
            {/* Main Featured Image */}
            <div className="pdp-main-image-container">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="pdp-main-image"
              />
              <button
                type="button"
                className={`pdp-wishlist-float-btn ${isLiked ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart
                  size={20}
                  fill={isLiked ? '#9A282A' : 'none'}
                  color={isLiked ? '#9A282A' : '#1C1917'}
                />
              </button>
              {product.isBestseller && (
                <span className="badge badge-ruby pdp-badge">Bestseller</span>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="pdp-thumbnails-strip">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pdp-thumb-btn ${activeImageIdx === idx ? 'selected' : ''}`}
                    onClick={() => setActiveImageIdx(idx)}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* In-Store & Video Consultation Highlights */}
            <div className="pdp-experience-box">
              <div className="experience-item">
                <MapPin size={18} color="#C5A059" />
                <div>
                  <strong>Try it on at our boutique</strong>
                  <p>Experience the fit & sparkle at an Aurelia showroom near you.</p>
                  <button
                    type="button"
                    className="pdp-inline-link"
                    onClick={() => setIsFindInStoreOpen(true)}
                  >
                    Find in Store Availability
                  </button>
                </div>
              </div>
              <div className="experience-item">
                <MessageCircle size={18} color="#C5A059" />
                <div>
                  <strong>Need styling guidance?</strong>
                  <p>Our senior gemologists are on standby to answer your questions.</p>
                  <Link to="/consultation" className="pdp-inline-link">
                    Talk to an Expert (Free Video Call)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details & Action Column (Desktop Right) */}
        <div className="pdp-info-col">
          {/* Brand & Category Header */}
          <div className="pdp-header-meta">
            <span className="pdp-metal-tag">{product.metal} • {product.purity}</span>
            <span className="pdp-sku">SKU: {product.id.toUpperCase()}</span>
          </div>

          <h1 className="pdp-title">{product.name}</h1>

          {/* Rating & Reviews */}
          <div className="pdp-rating-row">
            <div className="flex-center" style={{ gap: '3px' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  fill={i < Math.floor(product.rating) ? '#D97706' : 'none'}
                  color="#D97706"
                />
              ))}
            </div>
            <span className="pdp-rating-val">{product.rating}</span>
            <span className="pdp-reviews-count">({product.reviewsCount} customer reviews)</span>
            <span className="pdp-divider">•</span>
            <button
              type="button"
              className="pdp-share-btn flex-center"
              onClick={handleShare}
            >
              <Share2 size={13} /> Share
            </button>
          </div>

          {/* Price Block */}
          <div className="pdp-price-block">
            <div className="pdp-price-line">
              <span className="pdp-price-amount">{formatINR(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="pdp-original-price">{formatINR(product.originalPrice)}</span>
              )}
              {product.originalPrice > product.price && (
                <span className="pdp-savings-badge">
                  Save {formatINR(product.originalPrice - product.price)}
                </span>
              )}
            </div>
            <p className="pdp-tax-caption">
              Price inclusive of all taxes. Free 100% insured delivery across India.
            </p>
          </div>

          {/* Short Narrative */}
          <p className="pdp-description-text">{product.description}</p>

          {/* Size / Variant Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="pdp-size-section">
              <div className="flex-between mb-2">
                <label className="pdp-field-label">
                  Select Size / Specification: <strong>{selectedSize}</strong>
                </label>
                <Link to="/guides#ring-size-guide" className="pdp-guide-link">
                  Size Guide & Chart
                </Link>
              </div>
              <div className="pdp-size-options">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    className={`pdp-size-chip ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Primary CTAs */}
          <div className="pdp-cta-block">
            <div className="pdp-qty-row">
              <label className="pdp-field-label">Quantity:</label>
              <div className="pdp-qty-selector">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  disabled={quantity >= 5}
                >
                  +
                </button>
              </div>
            </div>

            <div className="pdp-buttons-grid">
              <button
                type="button"
                className="btn btn-gold pdp-add-cart-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} /> Add to Bag
              </button>
              <button
                type="button"
                className="btn btn-primary pdp-buy-now-btn"
                onClick={handleBuyNow}
              >
                <Zap size={18} /> Buy Now
              </button>
            </div>
          </div>

          {/* Pincode Delivery Estimator */}
          <div className="pdp-pincode-card">
            <div className="flex-center" style={{ gap: '0.4rem', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
              <Truck size={16} color="#C5A059" />
              <strong>Delivery & Availability</strong>
            </div>
            <form onSubmit={handleCheckPincode} className="pdp-pincode-form">
              <input
                type="text"
                placeholder="Enter 6-digit Indian PIN code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="pdp-pincode-input"
                maxLength={6}
              />
              <button type="submit" className="pdp-pincode-submit">
                Check
              </button>
            </form>
            {deliveryMessage && (
              <p className={`pdp-delivery-alert ${deliveryMessage.success ? 'success' : 'error'}`}>
                {deliveryMessage.success && <Check size={14} />}
                {deliveryMessage.text}
              </p>
            )}
          </div>

          {/* Detailed Specifications Table */}
          <div className="pdp-specs-box">
            <h3 className="pdp-specs-heading">Product Specifications</h3>
            <div className="pdp-specs-table">
              <div className="spec-row">
                <span className="spec-label">Metal Type</span>
                <span className="spec-value">{product.metal} ({product.metalColor})</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Gold Purity</span>
                <span className="spec-value font-weight-600 text-gold">{product.purity}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Gross Weight</span>
                <span className="spec-value">{product.grossWeight}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Net Gold Weight</span>
                <span className="spec-value">{product.netWeight}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Diamond / Gemstone</span>
                <span className="spec-value">{product.diamondWeight}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Stone Clarity / Cut</span>
                <span className="spec-value">{product.diamondClarity}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Government Certification</span>
                <span className="spec-value text-emerald font-weight-600">
                  ✓ {product.certification}
                </span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Occasion Suitability</span>
                <span className="spec-value">{product.occasions.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Transparent Price Breakdown Accordion */}
          {product.breakdown && (
            <div className="pdp-accordion-card">
              <button
                type="button"
                className="pdp-accordion-trigger"
                onClick={() => setIsPriceBreakdownOpen(!isPriceBreakdownOpen)}
                aria-expanded={isPriceBreakdownOpen}
              >
                <div className="flex-center" style={{ gap: '0.4rem' }}>
                  <Info size={16} color="#C5A059" />
                  <strong>Transparent Price Breakdown</strong>
                </div>
                <ChevronDown
                  size={16}
                  style={{
                    transform: isPriceBreakdownOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s'
                  }}
                />
              </button>

              {isPriceBreakdownOpen && (
                <div className="pdp-accordion-content animate-fade">
                  <div className="pdp-breakdown-list">
                    <div className="flex-between breakdown-line">
                      <span>Gold Component Value ({product.netWeight})</span>
                      <span>{formatINR(product.breakdown.goldValue)}</span>
                    </div>
                    {product.breakdown.diamondValue > 0 && (
                      <div className="flex-between breakdown-line">
                        <span>Diamond / Gemstone Value</span>
                        <span>{formatINR(product.breakdown.diamondValue)}</span>
                      </div>
                    )}
                    <div className="flex-between breakdown-line">
                      <span>Artisan Making Charges</span>
                      <span>{formatINR(product.breakdown.makingCharges)}</span>
                    </div>
                    <div className="flex-between breakdown-line">
                      <span>Applicable GST (3%)</span>
                      <span>{formatINR(product.breakdown.gst)}</span>
                    </div>
                    <div className="flex-between breakdown-total">
                      <strong>Total Product Price</strong>
                      <strong className="text-gold">{formatINR(product.price)}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Trust Guarantees on PDP */}
          <div className="pdp-trust-grid">
            <div className="pdp-trust-item">
              <ShieldCheck size={20} color="#C5A059" />
              <span>100% BIS Hallmarked</span>
            </div>
            <div className="pdp-trust-item">
              <Award size={20} color="#C5A059" />
              <span>Certified Diamonds</span>
            </div>
            <div className="pdp-trust-item">
              <RotateCcw size={20} color="#C5A059" />
              <span>15-Day Easy Returns</span>
            </div>
            <div className="pdp-trust-item">
              <Truck size={20} color="#C5A059" />
              <span>Free Insured Transit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <section className="section-spacing bg-subtle pdp-related-section">
          <div className="container">
            <div className="section-header">
              <span className="subheading-section">CURATED HARMONY</span>
              <h2 className="heading-section">You May Also Admire</h2>
              <p>Handcrafted pieces complementing this selection in purity and aesthetic.</p>
            </div>
            <div className="related-prods-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Find In Store Modal */}
      {isFindInStoreOpen && (
        <div className="modal-overlay animate-fade" onClick={() => setIsFindInStoreOpen(false)}>
          <div className="store-check-modal" onClick={(e) => e.stopPropagation()}>
            <div className="flex-between mb-3">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                Boutique Availability
              </h3>
              <button className="icon-btn" onClick={() => setIsFindInStoreOpen(false)}>
                &times;
              </button>
            </div>
            <p className="text-secondary text-sm mb-4">
              "{product.name}" is currently available for viewing and purchase at the following flagship boutiques:
            </p>
            <div className="store-check-list custom-scroll">
              <div className="store-check-item">
                <strong>Mumbai — Bandra West Flagship</strong>
                <p>42, Linking Road, Bandra West • In Stock (Size 12, 14)</p>
                <span className="text-emerald text-sm">Available Today</span>
              </div>
              <div className="store-check-item">
                <strong>Delhi — South Extension Maison</strong>
                <p>E-18, South Extension Part II • In Stock (Size 14, 16)</p>
                <span className="text-emerald text-sm">Available Today</span>
              </div>
              <div className="store-check-item">
                <strong>Bengaluru — Indiranagar Flagship</strong>
                <p>748, 100 Feet Road, Indiranagar • In Stock</p>
                <span className="text-emerald text-sm">Available Today</span>
              </div>
            </div>
            <div className="mt-4 flex-between">
              <Link to="/stores" className="btn btn-outline btn-sm">
                View All Boutiques
              </Link>
              <Link to="/consultation" className="btn btn-gold btn-sm">
                Reserve In-Store Viewing
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
