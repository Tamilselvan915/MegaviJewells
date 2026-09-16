import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { PRODUCTS, formatINR } from '../../data/products';
import { CATEGORIES } from '../../data/categories';

const POPULAR_SEARCHES = [
  "Solitaire Ring",
  "Heritage Jhumka",
  "Polki Bridal Choker",
  "Tennis Bracelet",
  "Daily Mangalsutra",
  "Temple Gold Pendant",
  "Platinum Band"
];

export default function SearchOverlay({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [matchingCategories, setMatchingCategories] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSearchTerm('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      setResults([]);
      setMatchingCategories([]);
      return;
    }

    const matchedProds = PRODUCTS.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.metal.toLowerCase().includes(query) ||
        item.design.toLowerCase().includes(query) ||
        item.occasions.some((occ) => occ.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query))
      );
    }).slice(0, 6);

    const matchedCats = CATEGORIES.filter((cat) =>
      cat.name.toLowerCase().includes(query) ||
      cat.description.toLowerCase().includes(query)
    ).slice(0, 3);

    setResults(matchedProds);
    setMatchingCategories(matchedCats);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
    }
  };

  const handleQuickTermClick = (term) => {
    setSearchTerm(term);
    navigate(`/shop?q=${encodeURIComponent(term)}`);
    onClose();
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    onClose();
  };

  const handleCategoryClick = (catName) => {
    navigate(`/shop?category=${encodeURIComponent(catName)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay-backdrop animate-fade" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search Jewellery">
      <div className="search-overlay-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Search Bar */}
        <form onSubmit={handleSearchSubmit} className="search-form-wrap">
          <Search size={22} className="search-input-icon" />
          <input
            ref={inputRef}
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search gold rings, diamond jhumkas, bridal necklaces..."
            className="search-main-input"
            aria-label="Search query"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            className="search-close-modal-btn"
            onClick={onClose}
            aria-label="Close search overlay"
          >
            Esc
          </button>
        </form>

        <div className="search-overlay-content custom-scroll">
          {/* Default state when empty */}
          {!searchTerm.trim() ? (
            <div className="search-defaults-section">
              <div className="search-group">
                <span className="search-group-title">
                  <Sparkles size={14} color="#C5A059" /> Popular Searches
                </span>
                <div className="search-chips-wrap">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      className="search-chip"
                      onClick={() => handleQuickTermClick(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="search-group">
                <span className="search-group-title">
                  <Tag size={14} color="#C5A059" /> Browse Top Categories
                </span>
                <div className="search-cat-grid">
                  {CATEGORIES.slice(0, 6).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className="search-cat-card"
                      onClick={() => handleCategoryClick(cat.name)}
                    >
                      <img src={cat.image} alt={cat.name} className="search-cat-thumb" />
                      <div>
                        <strong>{cat.name}</strong>
                        <small>{cat.count}</small>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Results view */
            <div className="search-results-section">
              {matchingCategories.length > 0 && (
                <div className="search-group">
                  <span className="search-group-title">Matching Categories</span>
                  <div className="search-chips-wrap">
                    {matchingCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        className="search-chip search-chip-highlight"
                        onClick={() => handleCategoryClick(cat.name)}
                      >
                        In {cat.name} <ArrowRight size={12} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="search-group">
                <div className="flex-between mb-2">
                  <span className="search-group-title">
                    Products ({results.length})
                  </span>
                  {results.length > 0 && (
                    <button
                      type="button"
                      className="see-all-link"
                      onClick={handleSearchSubmit}
                    >
                      See all matching results <ArrowRight size={13} />
                    </button>
                  )}
                </div>

                {results.length === 0 ? (
                  <div className="search-no-results">
                    <p>No jewellery found matching "<strong>{searchTerm}</strong>".</p>
                    <small>Try searching for "Gold", "Solitaire", "Bridal", or "Diamond".</small>
                  </div>
                ) : (
                  <div className="search-prods-grid">
                    {results.map((prod) => (
                      <div
                        key={prod.id}
                        className="search-prod-item"
                        onClick={() => handleProductClick(prod.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="search-prod-thumb"
                          loading="lazy"
                        />
                        <div className="search-prod-info">
                          <span className="search-prod-cat">{prod.category} • {prod.metal}</span>
                          <h4 className="search-prod-name">{prod.name}</h4>
                          <span className="search-prod-price">{formatINR(prod.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
