import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR } from '../../data/products';

export default function QuickViewModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes ? product.sizes[0] : 'Standard'
  );
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, true);
    onClose();
  };

  const handleViewFullDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="modal-overlay animate-fade" onClick={onClose} role="dialog" aria-modal="true" aria-label="Quick View">
      <div className="quick-view-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="quick-view-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="quick-view-grid">
          {/* Gallery Column */}
          <div className="quick-view-gallery">
            <div className="quick-view-main-img-wrap">
              <img
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                className="quick-view-main-img"
              />
              {product.isBestseller && (
                <span className="badge badge-ruby qv-badge">Bestseller</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="quick-view-thumbs">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`qv-thumb ${activeImgIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImgIndex(idx)}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Column */}
          <div className="quick-view-info">
            <div className="qv-category-purity">
              <span>{product.category}</span>
              <span>•</span>
              <span className="text-gold font-weight-600">{product.purity}</span>
            </div>

            <h2 className="qv-title">{product.name}</h2>

            <div className="qv-rating-row">
              <div className="qv-stars flex-center" style={{ gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? '#D97706' : 'none'}
                    color="#D97706"
                  />
                ))}
              </div>
              <span className="qv-rating-val">{product.rating}</span>
              <span className="qv-reviews">({product.reviewsCount} reviews)</span>
            </div>

            <div className="qv-price-row">
              <span className="qv-price-current">{formatINR(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="price-original">{formatINR(product.originalPrice)}</span>
              )}
              <span className="qv-tax-note">Inclusive of all taxes & 3% GST</span>
            </div>

            <p className="qv-description">{product.description}</p>

            {/* Quick Specs Snippet */}
            <div className="qv-specs-snippet">
              <div className="qv-spec-item">
                <span className="qv-spec-lbl">Gross Wt:</span>
                <span className="qv-spec-val">{product.grossWeight}</span>
              </div>
              <div className="qv-spec-item">
                <span className="qv-spec-lbl">Diamonds:</span>
                <span className="qv-spec-val">{product.diamondWeight}</span>
              </div>
              <div className="qv-spec-item">
                <span className="qv-spec-lbl">Hallmark:</span>
                <span className="qv-spec-val">{product.certification}</span>
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="qv-size-selector">
                <div className="flex-between mb-1">
                  <span className="size-label">Select Size / Variant:</span>
                  <button
                    type="button"
                    className="size-guide-link"
                    onClick={() => {
                      onClose();
                      navigate('/guides');
                    }}
                  >
                    Size Guide
                  </button>
                </div>
                <div className="size-buttons-wrap">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`size-btn ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="qv-actions-row">
              <button
                className="btn btn-gold btn-full"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} /> Add to Bag
              </button>
              <button
                className={`qv-wishlist-btn ${isLiked ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={20} fill={isLiked ? '#9A282A' : 'none'} color={isLiked ? '#9A282A' : 'currentColor'} />
              </button>
            </div>

            <button
              className="qv-view-full-btn"
              onClick={handleViewFullDetails}
            >
              View Complete Specifications & Price Breakdown <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
