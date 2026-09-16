import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS, formatINR } from '../data/products';

export default function Wishlist() {
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Find all products in wishlist
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToCart = (product) => {
    addToCart(product, 1, product.sizes ? product.sizes[0] : null, true);
    removeFromWishlist(product.id);
  };

  return (
    <div className="wishlist-page-root">
      <div className="container section-spacing">
        <div className="wishlist-header">
          <span className="subheading-section" style={{ textAlign: 'left' }}>YOUR SAVED TREASURES</span>
          <h1 className="heading-section" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
            Wishlist ({wishlistProducts.length})
          </h1>
          <p className="text-secondary">
            Save pieces you love to review later, compare specifications, or move directly to your shopping bag.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="wishlist-empty-state card-luxury">
            <Heart size={48} strokeWidth={1} color="#C5A059" />
            <h2>Your wishlist is empty</h2>
            <p>
              Discover our handcrafted collections of hallmarked gold, solitaires and bridal sets to curate your dream ensemble.
            </p>
            <Link to="/shop" className="btn btn-gold">
              Explore Collections <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="wishlist-card card-luxury">
                <div className="wishlist-card-media">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="wishlist-img"
                    />
                  </Link>
                  <button
                    type="button"
                    className="wishlist-remove-icon-btn"
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="wishlist-card-body">
                  <div className="wishlist-meta">
                    <span>{product.category}</span>
                    <span>•</span>
                    <span className="text-gold font-weight-600">{product.purity}</span>
                  </div>

                  <h3 className="wishlist-prod-title">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>

                  <div className="wishlist-price-row">
                    <span className="wishlist-price">{formatINR(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="price-original">{formatINR(product.originalPrice)}</span>
                    )}
                  </div>

                  <div className="wishlist-specs-preview">
                    <span>Gross Wt: {product.grossWeight}</span>
                    {product.diamondWeight !== 'None' && (
                      <span>• Diamonds: {product.diamondWeight}</span>
                    )}
                  </div>

                  <div className="wishlist-actions">
                    <button
                      type="button"
                      className="btn btn-gold btn-full btn-sm"
                      onClick={() => handleMoveToCart(product)}
                    >
                      <ShoppingBag size={15} /> Move to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
