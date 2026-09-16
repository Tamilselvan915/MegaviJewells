import React, { useState } from 'react';
import { ChevronDown, Filter, RotateCcw, Check } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { JEWELLERY_TYPES, METALS, OCCASIONS, GENDERS, DESIGNS, PRICE_TIERS } from '../../data/products';

export default function FilterSidebar({
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
  // Accordion state for collapsible sections
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    type: true,
    metal: true,
    occasion: false,
    gender: false,
    design: false
  });

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const toggleMultiSelect = (item, currentList, setter) => {
    if (currentList.includes(item)) {
      setter(currentList.filter((i) => i !== item));
    } else {
      setter([...currentList, item]);
    }
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedTypes.length > 0 ||
    selectedMetals.length > 0 ||
    selectedPriceTier !== null ||
    selectedOccasions.length > 0 ||
    selectedGenders.length > 0 ||
    selectedDesigns.length > 0;

  return (
    <aside className="filter-sidebar" aria-label="Product Filters">
      {/* Sidebar Header */}
      <div className="filter-sidebar-header flex-between">
        <div className="flex-center" style={{ gap: '0.4rem' }}>
          <Filter size={16} color="#C5A059" />
          <h3 className="filter-sidebar-title">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            className="filter-reset-btn"
            onClick={onResetFilters}
          >
            <RotateCcw size={12} /> Clear All
          </button>
        )}
      </div>

      {/* 1. Category Filter */}
      <div className="filter-group-accordion">
        <button
          type="button"
          className="filter-accordion-toggle"
          onClick={() => toggleSection('category')}
          aria-expanded={openSections.category}
        >
          <span>Category {selectedCategories.length > 0 && `(${selectedCategories.length})`}</span>
          <ChevronDown
            size={16}
            style={{ transform: openSections.category ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
          />
        </button>
        {openSections.category && (
          <div className="filter-options-list animate-fade">
            {CATEGORIES.map((cat) => {
              const isChecked = selectedCategories.includes(cat.name);
              return (
                <label key={cat.id} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleMultiSelect(cat.name, selectedCategories, setSelectedCategories)}
                    className="filter-checkbox-input"
                  />
                  <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span className="filter-label-text">{cat.name}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Price Filter */}
      <div className="filter-group-accordion">
        <button
          type="button"
          className="filter-accordion-toggle"
          onClick={() => toggleSection('price')}
          aria-expanded={openSections.price}
        >
          <span>Price Range {selectedPriceTier && '(1)'}</span>
          <ChevronDown
            size={16}
            style={{ transform: openSections.price ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
          />
        </button>
        {openSections.price && (
          <div className="filter-options-list animate-fade">
            {PRICE_TIERS.map((tier) => {
              const isChecked = selectedPriceTier === tier.id;
              return (
                <label key={tier.id} className="filter-radio-label">
                  <input
                    type="radio"
                    name="desktopPriceTier"
                    checked={isChecked}
                    onChange={() => setSelectedPriceTier(isChecked ? null : tier.id)}
                    className="filter-radio-input"
                  />
                  <span className={`custom-radio ${isChecked ? 'checked' : ''}`} />
                  <span className="filter-label-text">{tier.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Jewellery Type Filter */}
      <div className="filter-group-accordion">
        <button
          type="button"
          className="filter-accordion-toggle"
          onClick={() => toggleSection('type')}
          aria-expanded={openSections.type}
        >
          <span>Jewellery Type {selectedTypes.length > 0 && `(${selectedTypes.length})`}</span>
          <ChevronDown
            size={16}
            style={{ transform: openSections.type ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
          />
        </button>
        {openSections.type && (
          <div className="filter-options-list animate-fade">
            {JEWELLERY_TYPES.map((type) => {
              const isChecked = selectedTypes.includes(type);
              return (
                <label key={type} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleMultiSelect(type, selectedTypes, setSelectedTypes)}
                    className="filter-checkbox-input"
                  />
                  <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span className="filter-label-text">{type}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Metal Filter */}
      <div className="filter-group-accordion">
        <button
          type="button"
          className="filter-accordion-toggle"
          onClick={() => toggleSection('metal')}
          aria-expanded={openSections.metal}
        >
          <span>Metal & Purity {selectedMetals.length > 0 && `(${selectedMetals.length})`}</span>
          <ChevronDown
            size={16}
            style={{ transform: openSections.metal ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
          />
        </button>
        {openSections.metal && (
          <div className="filter-options-list animate-fade">
            {METALS.map((metal) => {
              const isChecked = selectedMetals.includes(metal);
              return (
                <label key={metal} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleMultiSelect(metal, selectedMetals, setSelectedMetals)}
                    className="filter-checkbox-input"
                  />
                  <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span className="filter-label-text">{metal}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Occasion Filter */}
      <div className="filter-group-accordion">
        <button
          type="button"
          className="filter-accordion-toggle"
          onClick={() => toggleSection('occasion')}
          aria-expanded={openSections.occasion}
        >
          <span>Occasion {selectedOccasions.length > 0 && `(${selectedOccasions.length})`}</span>
          <ChevronDown
            size={16}
            style={{ transform: openSections.occasion ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
          />
        </button>
        {openSections.occasion && (
          <div className="filter-options-list animate-fade">
            {OCCASIONS.map((occ) => {
              const isChecked = selectedOccasions.includes(occ);
              return (
                <label key={occ} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleMultiSelect(occ, selectedOccasions, setSelectedOccasions)}
                    className="filter-checkbox-input"
                  />
                  <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span className="filter-label-text">{occ}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Gender Filter */}
      <div className="filter-group-accordion">
        <button
          type="button"
          className="filter-accordion-toggle"
          onClick={() => toggleSection('gender')}
          aria-expanded={openSections.gender}
        >
          <span>Gender {selectedGenders.length > 0 && `(${selectedGenders.length})`}</span>
          <ChevronDown
            size={16}
            style={{ transform: openSections.gender ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
          />
        </button>
        {openSections.gender && (
          <div className="filter-options-list animate-fade">
            {GENDERS.map((gen) => {
              const isChecked = selectedGenders.includes(gen);
              return (
                <label key={gen} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleMultiSelect(gen, selectedGenders, setSelectedGenders)}
                    className="filter-checkbox-input"
                  />
                  <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span className="filter-label-text">{gen}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 7. Design Style Filter */}
      <div className="filter-group-accordion">
        <button
          type="button"
          className="filter-accordion-toggle"
          onClick={() => toggleSection('design')}
          aria-expanded={openSections.design}
        >
          <span>Design Style {selectedDesigns.length > 0 && `(${selectedDesigns.length})`}</span>
          <ChevronDown
            size={16}
            style={{ transform: openSections.design ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
          />
        </button>
        {openSections.design && (
          <div className="filter-options-list animate-fade">
            {DESIGNS.map((dsgn) => {
              const isChecked = selectedDesigns.includes(dsgn);
              return (
                <label key={dsgn} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleMultiSelect(dsgn, selectedDesigns, setSelectedDesigns)}
                    className="filter-checkbox-input"
                  />
                  <span className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span className="filter-label-text">{dsgn}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
