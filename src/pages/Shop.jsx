import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ArrowUpDown, X, LayoutGrid, Grid3X3, Sparkles, RotateCcw } from 'lucide-react';
import { PRODUCTS, PRICE_TIERS } from '../data/products';
import ProductCard from '../components/shop/ProductCard';
import FilterSidebar from '../components/shop/FilterSidebar';
import MobileFilterModal from '../components/shop/MobileFilterModal';
import QuickViewModal from '../components/common/QuickViewModal';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedMetals, setSelectedMetals] = useState([]);
  const [selectedPriceTier, setSelectedPriceTier] = useState(null);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedDesigns, setSelectedDesigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sort & View state
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync state with URL params on mount & param change
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const occasionParam = searchParams.get('occasion');
    const metalParam = searchParams.get('metal');
    const typeParam = searchParams.get('type');
    const priceParam = searchParams.get('price');
    const qParam = searchParams.get('q');
    const filterParam = searchParams.get('filter');

    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }

    if (occasionParam) {
      setSelectedOccasions([occasionParam]);
    } else {
      setSelectedOccasions([]);
    }

    if (metalParam) {
      setSelectedMetals([metalParam]);
    } else {
      setSelectedMetals([]);
    }

    if (typeParam) {
      setSelectedTypes([typeParam]);
    } else {
      setSelectedTypes([]);
    }

    if (priceParam) {
      setSelectedPriceTier(priceParam);
    } else {
      setSelectedPriceTier(null);
    }

    if (qParam) {
      setSearchQuery(qParam);
    } else {
      setSearchQuery('');
    }

    if (filterParam === 'bestseller') {
      setSortBy('bestseller');
    } else if (filterParam === 'new') {
      setSortBy('newest');
    }
  }, [searchParams]);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedMetals([]);
    setSelectedPriceTier(null);
    setSelectedOccasions([]);
    setSelectedGenders([]);
    setSelectedDesigns([]);
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.metal.toLowerCase().includes(q) ||
          item.design.toLowerCase().includes(q) ||
          item.occasions.some((o) => o.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
        return false;
      }

      // Jewellery Type
      if (selectedTypes.length > 0) {
        const matchesType = selectedTypes.some((t) => {
          if (t === 'Gold') return item.metal.includes('Gold');
          if (t === 'Diamond') return item.diamondWeight && item.diamondWeight !== 'None';
          if (t === 'Platinum') return item.metal.includes('Platinum');
          if (t === 'Gemstone') return item.description.toLowerCase().includes('emerald') || item.description.toLowerCase().includes('ruby') || item.description.toLowerCase().includes('pearl');
          if (t === 'Silver') return item.metal.includes('Silver');
          return true;
        });
        if (!matchesType) return false;
      }

      // Metal
      if (selectedMetals.length > 0 && !selectedMetals.includes(item.metal)) {
        return false;
      }

      // Price Tier
      if (selectedPriceTier) {
        const tierObj = PRICE_TIERS.find((t) => t.id === selectedPriceTier);
        if (tierObj) {
          if (item.price < tierObj.min || item.price > tierObj.max) {
            return false;
          }
        }
      }

      // Occasions
      if (selectedOccasions.length > 0) {
        const matchesOccasion = item.occasions.some((occ) => selectedOccasions.includes(occ));
        if (!matchesOccasion) return false;
      }

      // Gender
      if (selectedGenders.length > 0 && !selectedGenders.includes(item.gender) && item.gender !== 'Unisex') {
        return false;
      }

      // Design
      if (selectedDesigns.length > 0 && !selectedDesigns.includes(item.design)) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedCategories,
    selectedTypes,
    selectedMetals,
    selectedPriceTier,
    selectedOccasions,
    selectedGenders,
    selectedDesigns
  ]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'bestseller':
        return list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  // Active filter count for mobile button
  const activeFiltersCount =
    selectedCategories.length +
    selectedTypes.length +
    selectedMetals.length +
    (selectedPriceTier ? 1 : 0) +
    selectedOccasions.length +
    selectedGenders.length +
    selectedDesigns.length;

  const currentTitle = useMemo(() => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    if (selectedCategories.length === 1) return selectedCategories[0];
    if (selectedOccasions.length === 1) return `${selectedOccasions[0]} Jewellery`;
    if (selectedMetals.length === 1) return `${selectedMetals[0]} Collection`;
    return 'All Jewellery';
  }, [searchQuery, selectedCategories, selectedOccasions, selectedMetals]);

  return (
    <div className="shop-page-wrapper">
      {/* Shop Header Banner */}
      <section className="shop-hero-header">
        <div className="container">
          <div className="shop-header-text">
            <span className="subheading-section" style={{ textAlign: 'left' }}>
              CERTIFIED INDIAN ARTISTRY
            </span>
            <h1 className="shop-page-title">{currentTitle}</h1>
            <p className="shop-page-sub">
              Showing {sortedProducts.length} handcrafted pieces with verified BIS hallmarking and natural certified stones.
            </p>
          </div>
        </div>
      </section>

      {/* Main Shop Container */}
      <div className="container shop-body-layout">
        {/* Mobile Filter & Sort Bar (Sticky/Prominent on Mobile) */}
        <div className="mobile-filter-bar">
          <button
            type="button"
            className="mobile-filter-btn"
            onClick={() => setIsMobileFilterOpen(true)}
            aria-label="Open filter menu"
          >
            <Filter size={16} color="#C5A059" />
            <span>FILTER {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          <div className="mobile-sort-select-wrap">
            <ArrowUpDown size={15} color="#8C847B" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mobile-sort-select"
              aria-label="Sort products"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
              <option value="bestseller">Bestsellers</option>
            </select>
          </div>
        </div>

        {/* Desktop Filter Sidebar */}
        <div className="shop-sidebar-col">
          <FilterSidebar
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedMetals={selectedMetals}
            setSelectedMetals={setSelectedMetals}
            selectedPriceTier={selectedPriceTier}
            setSelectedPriceTier={setSelectedPriceTier}
            selectedOccasions={selectedOccasions}
            setSelectedOccasions={setSelectedOccasions}
            selectedGenders={selectedGenders}
            setSelectedGenders={setSelectedGenders}
            selectedDesigns={selectedDesigns}
            setSelectedDesigns={setSelectedDesigns}
            onResetFilters={handleResetFilters}
            totalFilteredCount={sortedProducts.length}
          />
        </div>

        {/* Main Products Grid Column */}
        <main className="shop-grid-col">
          {/* Top Bar for Desktop (Count, Active Chips, Desktop Sort) */}
          <div className="shop-topbar-desktop">
            <div className="shop-prods-count">
              <strong>{sortedProducts.length}</strong> Products Found
            </div>

            <div className="desktop-sort-wrap flex-center" style={{ gap: '0.6rem' }}>
              <span className="text-secondary text-sm">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="desktop-sort-dropdown"
                aria-label="Sort products"
              >
                <option value="featured">Featured & Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating (Highest)</option>
                <option value="newest">New Arrivals</option>
                <option value="bestseller">Bestselling</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="active-chips-strip">
              <span className="chips-label">Active:</span>

              {selectedCategories.map((cat) => (
                <span key={cat} className="filter-chip">
                  {cat}
                  <button onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== cat))}>
                    <X size={12} />
                  </button>
                </span>
              ))}

              {selectedTypes.map((type) => (
                <span key={type} className="filter-chip">
                  {type}
                  <button onClick={() => setSelectedTypes(selectedTypes.filter((t) => t !== type))}>
                    <X size={12} />
                  </button>
                </span>
              ))}

              {selectedMetals.map((metal) => (
                <span key={metal} className="filter-chip">
                  {metal}
                  <button onClick={() => setSelectedMetals(selectedMetals.filter((m) => m !== metal))}>
                    <X size={12} />
                  </button>
                </span>
              ))}

              {selectedPriceTier && (
                <span className="filter-chip">
                  {PRICE_TIERS.find((p) => p.id === selectedPriceTier)?.label}
                  <button onClick={() => setSelectedPriceTier(null)}>
                    <X size={12} />
                  </button>
                </span>
              )}

              {selectedOccasions.map((occ) => (
                <span key={occ} className="filter-chip">
                  {occ}
                  <button onClick={() => setSelectedOccasions(selectedOccasions.filter((o) => o !== occ))}>
                    <X size={12} />
                  </button>
                </span>
              ))}

              {selectedDesigns.map((dsgn) => (
                <span key={dsgn} className="filter-chip">
                  {dsgn}
                  <button onClick={() => setSelectedDesigns(selectedDesigns.filter((d) => d !== dsgn))}>
                    <X size={12} />
                  </button>
                </span>
              ))}

              <button type="button" className="clear-all-chips" onClick={handleResetFilters}>
                Clear All
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {sortedProducts.length === 0 ? (
            <div className="shop-empty-state">
              <Sparkles size={40} color="#C5A059" />
              <h3>No jewellery matches your current filters</h3>
              <p>Try resetting some filters or searching with a different term.</p>
              <button
                type="button"
                className="btn btn-gold btn-sm mt-3"
                onClick={handleResetFilters}
              >
                <RotateCcw size={14} /> Reset All Filters
              </button>
            </div>
          ) : (
            <div className="shop-products-grid">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom-sheet Filter Modal */}
      <MobileFilterModal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        selectedMetals={selectedMetals}
        setSelectedMetals={setSelectedMetals}
        selectedPriceTier={selectedPriceTier}
        setSelectedPriceTier={setSelectedPriceTier}
        selectedOccasions={selectedOccasions}
        setSelectedOccasions={setSelectedOccasions}
        selectedGenders={selectedGenders}
        setSelectedGenders={setSelectedGenders}
        selectedDesigns={selectedDesigns}
        setSelectedDesigns={setSelectedDesigns}
        onResetFilters={handleResetFilters}
        totalFilteredCount={sortedProducts.length}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
