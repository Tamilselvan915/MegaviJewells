import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR } from '../../data/products';

export default function ProductCard({ product, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isLiked = isInWishlist(product.id);
  const hasSecondImg = product.images && product.images.length > 1;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes ? product.sizes[0] : null, true);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <article
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="product-card-media">
        <Link to={`/product/${product.id}`} className="product-img-link">
          <img
            src={product.images[0]}
            alt={product.name}
            className={`product-primary-img ${isHovered && hasSecondImg ? 'hover-hidden' : ''}`}
            loading="lazy"
          />
          {hasSecondImg && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className={`product-secondary-img ${isHovered ? 'hover-visible' : ''}`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="product-badges-wrap">
          {product.isBestseller && (
            <span className="badge badge-ruby">Bestseller</span>
          )}
          {product.isNew && !product.isBestseller && (
            <span className="badge badge-emerald">New Arrival</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`product-wishlist-btn ${isLiked ? 'is-active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isLiked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart
            size={18}
            fill={isLiked ? '#9A282A' : 'none'}
            color={isLiked ? '#9A282A' : '#1C1917'}
          />
        </button>

        {/* Desktop Quick View Overlay Action */}
        <div className="product-hover-actions">
          <button
            type="button"
            className="product-quickview-btn"
            onClick={handleQuickViewClick}
          >
            <Eye size={15} /> Quick View
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="product-card-body">
        <div className="product-meta-row">
          <span className="product-category-tag">{product.category}</span>
          <span className="product-purity-tag">{product.purity}</span>
        </div>

        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Rating */}
        <div className="product-rating-row">
          <div className="flex-center" style={{ gap: '2px' }}>
            <Star size={12} fill="#D97706" color="#D97706" />
            <span className="rating-num">{product.rating}</span>
          </div>
          <span className="rating-count">({product.reviewsCount})</span>
        </div>

        {/* Price Row */}
        <div className="product-price-row">
          <span className="product-price">{formatINR(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="product-original-price">{formatINR(product.originalPrice)}</span>
          )}
        </div>

        {/* Card Actions (Mobile & Desktop) */}
        <div className="product-card-buttons">
          <button
            type="button"
            className="btn btn-outline product-btn-add"
            onClick={handleQuickAdd}
          >
            <ShoppingBag size={15} /> Add to Bag
          </button>
          <button
            type="button"
            className="mobile-qv-btn"
            onClick={handleQuickViewClick}
            aria-label="Quick View"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
