import React, { useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import ProductCard from '@/app/pages/product/components/ProductCard';
import { Layers, Award, Globe, RotateCcw, ListFilter, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data';

export default function ProductCatalog({
  selectedCategory,
  searchValue,
  onOpenSpecs,
  onOpenBooking,
  onAddToBasket,
  basket,
}) {
  const { formatMessage } = useIntl();

  // Filters sidebar states
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedRipeness, setSelectedRipeness] = useState(null);

  // Dropdown open states for sidebar filters
  const [activeFilterTab, setActiveFilterTab] = useState('material');

  // Filter lists derived dynamically from dataset
  const materials = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.details.material).filter(Boolean))), []);
  const grades = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.details.grade).filter(Boolean))), []);
  const origins = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.details.origin).filter(Boolean))), []);
  const ripenessOptions = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.details.ripeness).filter(Boolean))), []);

  const clearFilters = () => {
    setSelectedMaterial(null);
    setSelectedGrade(null);
    setSelectedOrigin(null);
    setSelectedRipeness(null);
  };

  const hasActiveFilters = selectedMaterial || selectedGrade || selectedOrigin || selectedRipeness;

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod) => {
      // Category tab quick-filter
      if (selectedCategory !== 'All' && prod.category !== selectedCategory) {
        return false;
      }

      // Search matching titles/descriptions
      if (searchValue) {
        const query = searchValue.toLowerCase();
        const matchesTitle = prod.title.toLowerCase().includes(query);
        const matchesDesc = prod.description.toLowerCase().includes(query);
        const matchesOrigin = prod.details.origin.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesOrigin) {
          return false;
        }
      }

      // Sidebar: Material
      if (selectedMaterial && prod.details.material !== selectedMaterial) {
        return false;
      }

      // Sidebar: Grade
      if (selectedGrade && prod.details.grade !== selectedGrade) {
        return false;
      }

      // Sidebar: Origin
      if (selectedOrigin && prod.details.origin !== selectedOrigin) {
        return false;
      }

      // Sidebar: Ripeness
      if (selectedRipeness && prod.details.ripeness !== selectedRipeness) {
        return false;
      }

      return true;
    });
  }, [
    selectedCategory,
    searchValue,
    selectedMaterial,
    selectedGrade,
    selectedOrigin,
    selectedRipeness,
  ]);

  return (
    <section className="px-6 md:px-16 max-w-7xl mx-auto mb-24 font-sans">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar Filter Console */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-surface-container/60 backdrop-blur-md rounded-2xl sticky top-24 border border-outline-variant/10 shadow-2xl p-6">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-primary mb-0.5 flex items-center gap-2">
                  <ListFilter className="w-4 h-4 text-primary" /> {formatMessage({ id: 'app.products.listing.catalog.filters.title' })}
                </h3>
                <p className="text-[11px] text-on-surface-variant uppercase font-mono">
                  {formatMessage({ id: 'app.products.listing.catalog.filters.subtitle' })}
                </p>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="p-1 rounded-full text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  title={formatMessage({ id: 'app.products.listing.catalog.filters.reset' })}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Expandable Parameter Segments */}
            <div className="space-y-3">
              {/* Material Filter */}
              <div className="space-y-1.5">
                <button
                  onClick={() => setActiveFilterTab(activeFilterTab === 'material' ? null : 'material')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    activeFilterTab === 'material'
                      ? 'bg-secondary-container text-on-secondary-container text-primary font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="flex items-center gap-2.5 text-xs font-semibold uppercase font-mono">
                    <Layers className="w-3.5 h-3.5" /> {formatMessage({ id: 'app.products.listing.catalog.filters.material' })}
                  </span>
                  <span className="text-xs font-bold">{activeFilterTab === 'material' ? '−' : '+'}</span>
                </button>
                {activeFilterTab === 'material' && (
                  <div className="px-2 py-1.5 space-y-1 bg-surface-container-low/40 rounded-lg border border-outline-variant/5">
                    {materials.map((mat) => (
                      <button
                        key={mat}
                        onClick={() => setSelectedMaterial(selectedMaterial === mat ? null : mat)}
                        className={`w-full text-left py-1.5 px-2.5 rounded text-xs transition-all flex items-center justify-between ${
                          selectedMaterial === mat
                            ? 'text-primary font-bold bg-primary/5'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        {mat}
                        {selectedMaterial === mat && <span className="h-1 w-1 bg-primary rounded-full"></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Grade Filter */}
              <div className="space-y-1.5">
                <button
                  onClick={() => setActiveFilterTab(activeFilterTab === 'grade' ? null : 'grade')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    activeFilterTab === 'grade'
                      ? 'bg-secondary-container text-on-secondary-container text-primary font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="flex items-center gap-2.5 text-xs font-semibold uppercase font-mono">
                    <Award className="w-3.5 h-3.5" /> {formatMessage({ id: 'app.products.listing.catalog.filters.grade' })}
                  </span>
                  <span className="text-xs font-bold">{activeFilterTab === 'grade' ? '−' : '+'}</span>
                </button>
                {activeFilterTab === 'grade' && (
                  <div className="px-2 py-1.5 space-y-1 bg-surface-container-low/40 rounded-lg border border-outline-variant/5">
                    {grades.map((grd) => (
                      <button
                        key={grd}
                        onClick={() => setSelectedGrade(selectedGrade === grd ? null : grd)}
                        className={`w-full text-left py-1.5 px-2.5 rounded text-xs transition-all flex items-center justify-between ${
                          selectedGrade === grd
                            ? 'text-primary font-bold bg-primary/5'
                            : 'text-on-surface-variant hover:text-on-surface line-clamp-1'
                        }`}
                      >
                        <span className="truncate max-w-[180px]">{grd}</span>
                        {selectedGrade === grd && <span className="h-1 w-1 bg-primary rounded-full"></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Origin Filter */}
              <div className="space-y-1.5">
                <button
                  onClick={() => setActiveFilterTab(activeFilterTab === 'origin' ? null : 'origin')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    activeFilterTab === 'origin'
                      ? 'bg-secondary-container text-on-secondary-container text-primary font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="flex items-center gap-2.5 text-xs font-semibold uppercase font-mono">
                    <Globe className="w-3.5 h-3.5" /> {formatMessage({ id: 'app.products.listing.catalog.filters.origin' })}
                  </span>
                  <span className="text-xs font-bold">{activeFilterTab === 'origin' ? '−' : '+'}</span>
                </button>
                {activeFilterTab === 'origin' && (
                  <div className="px-2 py-1.5 space-y-1 bg-surface-container-low/40 rounded-lg border border-outline-variant/5">
                    {origins.map((orig) => (
                      <button
                        key={orig}
                        onClick={() => setSelectedOrigin(selectedOrigin === orig ? null : orig)}
                        className={`w-full text-left py-1.5 px-2.5 rounded text-xs transition-all flex items-center justify-between ${
                          selectedOrigin === orig
                            ? 'text-primary font-bold bg-primary/5'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        <span className="truncate max-w-[180px]">{orig.split(',')[0]}</span>
                        {selectedOrigin === orig && <span className="h-1 w-1 bg-primary rounded-full"></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Ripeness Filter */}
              {(selectedCategory === 'All' || selectedCategory === 'Agro') && ripenessOptions.length > 0 && (
                <div className="space-y-1.5">
                  <button
                    onClick={() => setActiveFilterTab(activeFilterTab === 'ripeness' ? null : 'ripeness')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                      activeFilterTab === 'ripeness'
                        ? 'bg-secondary-container text-on-secondary-container text-primary font-bold'
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 text-xs font-semibold uppercase font-mono">
                      <Leaf className="w-3.5 h-3.5" /> {formatMessage({ id: 'app.products.listing.catalog.filters.ripeness' })}
                    </span>
                    <span className="text-xs font-bold">{activeFilterTab === 'ripeness' ? '−' : '+'}</span>
                  </button>
                  {activeFilterTab === 'ripeness' && (
                    <div className="px-2 py-1.5 space-y-1 bg-surface-container-low/40 rounded-lg border border-outline-variant/5">
                      {ripenessOptions.map((rip) => (
                        <button
                          key={rip}
                          onClick={() => setSelectedRipeness(selectedRipeness === rip ? null : rip)}
                          className={`w-full text-left py-1.5 px-2.5 rounded text-xs transition-all flex items-center justify-between ${
                            selectedRipeness === rip
                              ? 'text-primary font-bold bg-primary/5'
                              : 'text-on-surface-variant hover:text-on-surface'
                          }`}
                        >
                          {rip}
                          {selectedRipeness === rip && <span className="h-1 w-1 bg-primary rounded-full"></span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Clear All Footer */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-6 w-full py-2.5 text-center border border-outline-variant/30 rounded-full text-xs font-semibold text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors cursor-pointer"
              >
                {formatMessage({ id: 'app.products.listing.catalog.filters.clear_all' })}
              </button>
            )}
          </div>
        </aside>

        {/* Right side: Product grid list */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onOpenSpecs={onOpenSpecs}
                  onOpenBooking={onOpenBooking}
                  onAddToBasket={onAddToBasket}
                  isInBasket={basket.some((item) => item.product.id === prod.id)}
                />
              ))}
            </div>
          ) : (
            /* Empty Search Results View */
            <div className="bg-surface-container/20 border border-outline-variant/15 rounded-2xl py-20 text-center text-on-surface-variant space-y-3">
              <p className="text-sm">{formatMessage({ id: 'app.products.listing.catalog.empty' })}</p>
              <button
                onClick={clearFilters}
                className="text-xs text-primary font-bold hover:underline cursor-pointer uppercase font-mono"
              >
                {formatMessage({ id: 'app.products.listing.catalog.empty_reset' })}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
