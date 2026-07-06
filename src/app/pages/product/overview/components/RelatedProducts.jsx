'use client';

import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../listing/data';
import { ArrowRight } from 'lucide-react';
import { useIntl } from 'react-intl';

export default function RelatedProducts({ currentProduct }) {
  const { formatMessage } = useIntl();

  const related = PRODUCTS.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id
  ).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-display-sm font-bold text-on-surface mb-4">
            {formatMessage({ id: 'app.products.overview.related.title' })}
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            {formatMessage(
              { id: 'app.products.overview.related.subtitle' },
              { category: currentProduct.category }
            )}
          </p>
        </div>
        <Link
          to="/products"
          className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
        >
          View Entire Range <ArrowRight size={20} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((prod) => (
          <Link
            key={prod.id}
            to={`/products/${prod.id}`}
            className="glass-card group rounded-2xl overflow-hidden flex flex-col hover:border-primary/30 transition-all"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={prod.thumbnail || prod.image}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest mb-2 block">
                {prod.category}
              </span>
              <h4 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                {prod.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
