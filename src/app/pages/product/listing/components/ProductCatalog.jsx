import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import ProductCard from '@/app/pages/product/components/ProductCard';
import { PRODUCTS } from '../data';

export default function ProductCatalog({
  selectedCategory,
  searchValue,
}) {
  const { formatMessage } = useIntl();

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

      return true;
    });
  }, [selectedCategory, searchValue]);

  return (
    <section className="px-6 md:px-16 max-w-7xl mx-auto mb-24">
      <div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
              />
            ))}
          </div>
        ) : (
          /* Empty Search Results View */
          <div className="bg-surface-container/20 border border-outline-variant/15 rounded-2xl py-20 text-center text-on-surface-variant space-y-3">
            <p className="text-sm">{formatMessage({ id: 'app.products.listing.catalog.empty' })}</p>
          </div>
        )}

      </div>
    </section>
  );
}
