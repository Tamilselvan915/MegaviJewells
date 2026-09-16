import React, { useState } from 'react';
import { X, Check, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { JEWELLERY_TYPES, METALS, OCCASIONS, GENDERS, DESIGNS, PRICE_TIERS } from '../../data/products';

export default function MobileFilterModal({
  isOpen,
  onClose,
  selectedCategories,
  setSelectedCategories,
  selectedTypes,
  setSelectedTypes,
  selectedMetals,
  setSelectedMetals,
  selectedPriceTier,
  setSelectedPriceTier,
  selectedOccasions,
  setSelectedOccasions,
  selectedGenders,
  setSelectedGenders,
  selectedDesigns,
  setSelectedDesigns,
  onResetFilters,
  totalFilteredCount
}) {
  const [activeTab, setActiveTab] = useState('category');

  if (!isOpen) return null;

  const toggleMultiSelect = (item, currentList, setter) => {
    if (currentList.includes(item)) {
      setter(currentList.filter((i) => i !== item));
    } else {
      setter([...currentList, item]);
    }
  };

  const tabs = [
    { id: 'category', label: 'Category', count: selectedCategories.length },
    { id: 'price', label: 'Price', count: selectedPriceTier ? 1 : 0 },
    { id: 'type', label: 'Type', count: selectedTypes.length },
    { id: 'metal', label: 'Metal', count: selectedMetals.length },
    { id: 'occasion', label: 'Occasion', count: selectedOccasions.length },
    { id: 'gender', label: 'Gender', count: selectedGenders.length },
    { id: 'design', label: 'Design', count: selectedDesigns.length }
  ];

  return (
    <div className="bottom-sheet-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Filter Options">
      <div className="bottom-sheet-content animate-bottom-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bottom-sheet-header">
          <div className="flex-center" style={{ gap: '0.5rem' }}>
            <SlidersHorizontal size={18} color="#C5A059" />
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>Filter Jewellery</h3>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2-Column Filter Body for Mobile Ease */}
        <div className="mobile-filter-layout">
          {/* Left Vertical Tabs */}
          <div className="mobile-filter-tabs-col">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`mobile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && <span className="tab-count-badge">{tab.count}</span>}
              </button>
            ))}
          </div>

          {/* Right Content Options */}
          <div className="mobile-filter-options-col custom-scroll">
            {/* 1. Category */}
            {activeTab === 'category' && (
              <div className="mobile-opts-list">
                {CATEGORIES.map((cat) => {
                  const isChecked = selectedCategories.includes(cat.name);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`mobile-opt-row ${isChecked ? 'selected' : ''}`}
                      onClick={() => toggleMultiSelect(cat.name, selectedCategories, setSelectedCategories)}
                    >
                      <span>{cat.name}</span>
                      <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. Price */}
            {activeTab === 'price' && (
              <div className="mobile-opts-list">
                {PRICE_TIERS.map((tier) => {
                  const isChecked = selectedPriceTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      className={`mobile-opt-row ${isChecked ? 'selected' : ''}`}
                      onClick={() => setSelectedPriceTier(isChecked ? null : tier.id)}
                    >
                      <span>{tier.label}</span>
                      <span className={`custom-radio ${isChecked ? 'checked' : ''}`} />
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3. Type */}
            {activeTab === 'type' && (
              <div className="mobile-opts-list">
                {JEWELLERY_TYPES.map((type) => {
                  const isChecked = selectedTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      className={`mobile-opt-row ${isChecked ? 'selected' : ''}`}
                      onClick={() => toggleMultiSelect(type, selectedTypes, setSelectedTypes)}
                    >
                      <span>{type}</span>
                      <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 4. Metal */}
            {activeTab === 'metal' && (
              <div className="mobile-opts-list">
                {METALS.map((metal) => {
                  const isChecked = selectedMetals.includes(metal);
                  return (
                    <button
                      key={metal}
                      type="button"
                      className={`mobile-opt-row ${isChecked ? 'selected' : ''}`}
                      onClick={() => toggleMultiSelect(metal, selectedMetals, setSelectedMetals)}
                    >
                      <span>{metal}</span>
                      <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 5. Occasion */}
            {activeTab === 'occasion' && (
              <div className="mobile-opts-list">
                {OCCASIONS.map((occ) => {
                  const isChecked = selectedOccasions.includes(occ);
                  return (
                    <button
                      key={occ}
                      type="button"
                      className={`mobile-opt-row ${isChecked ? 'selected' : ''}`}
                      onClick={() => toggleMultiSelect(occ, selectedOccasions, setSelectedOccasions)}
                    >
                      <span>{occ}</span>
                      <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 6. Gender */}
            {activeTab === 'gender' && (
              <div className="mobile-opts-list">
                {GENDERS.map((gen) => {
                  const isChecked = selectedGenders.includes(gen);
                  return (
                    <button
                      key={gen}
                      type="button"
                      className={`mobile-opt-row ${isChecked ? 'selected' : ''}`}
                      onClick={() => toggleMultiSelect(gen, selectedGenders, setSelectedGenders)}
                    >
                      <span>{gen}</span>
                      <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 7. Design */}
            {activeTab === 'design' && (
              <div className="mobile-opts-list">
                {DESIGNS.map((dsgn) => {
                  const isChecked = selectedDesigns.includes(dsgn);
                  return (
                    <button
                      key={dsgn}
                      type="button"
                      className={`mobile-opt-row ${isChecked ? 'selected' : ''}`}
                      onClick={() => toggleMultiSelect(dsgn, selectedDesigns, setSelectedDesigns)}
                    >
                      <span>{dsgn}</span>
                      <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bottom-sheet-footer">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onResetFilters}
          >
            <RotateCcw size={13} /> Reset
          </button>
          <button
            type="button"
            className="btn btn-gold btn-sm"
            onClick={onClose}
          >
            Show ({totalFilteredCount}) Products
          </button>
        </div>
      </div>
    </div>
  );
}
