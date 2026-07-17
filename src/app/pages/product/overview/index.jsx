'use client';

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import ProductHero from './components/ProductHero';
import TechnicalSpecs from './components/TechnicalSpecs';
import Traceability from './components/Traceability';
import Logistics from './components/Logistics';
import RelatedProducts from './components/RelatedProducts';
import FloatingFAB from './components/FloatingFAB';
import { PRODUCTS } from '../listing/data';
import ErrorPage from '@/app/pages/Error/ErrorPage';
import { useErrorPage } from '@/app/pages/Error/ErrorContext';

export default function ProductDetails() {
  const { slug } = useParams();
  const { formatMessage } = useIntl();
  const { setIsErrorPage } = useErrorPage();

  // Find product by id (using slug as id)
  const product = PRODUCTS.find(p => p.id === slug);

  // Scroll to top on mount or when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Tell App.jsx whether we're currently showing an error, so it
  // can hide the Navbar/Footer even on a "valid" route like this one
  useEffect(() => {
    setIsErrorPage(!product);
    return () => setIsErrorPage(false);
  }, [product, setIsErrorPage]);

  if (!product) {
    return (
      <ErrorPage
        code={404}
        title="Product not found"
        message="This product doesn't exist or may have been removed. Check the link or browse all products."
      />
    );
  }

  return (
    <main className="bg-background text-on-surface">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        {/* Breadcrumbs & Category Badges */}
        <div className="pt-32 pb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <nav className="flex items-center gap-2 text-on-surface-variant text-label-sm font-semibold">
            <Link to="/products" className="hover:text-primary transition-colors">
              {formatMessage({ id: 'app.navbar.tabs.products' })}
            </Link>
            <span>›</span>
            <Link 
              to={`/products?category=${product.category}`}
              className="hover:text-primary transition-colors"
            >
              {product.category === 'Textile' 
                ? formatMessage({ id: 'app.products.listing.filter.textile' })
                : formatMessage({ id: 'app.products.listing.filter.agro' })}
            </Link>
            <span>›</span>
            <span className="text-primary">{product.title}</span>
          </nav>
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 rounded-full bg-secondary-container/30 border border-secondary-container text-secondary text-label-sm font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary pulse-ring"></span>
              {product.details.grade}
            </span>
            {product.details.certifications.map((cert, idx) => (
              <span key={idx} className="px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant text-on-surface-variant text-label-sm font-semibold">
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content Sections */}
        <ProductHero product={product} />
        <TechnicalSpecs product={product} />
        <Traceability product={product} />
        <Logistics product={product} />
        <RelatedProducts currentProduct={product} />

        {/* Floating Action Button */}
        <FloatingFAB product={product} />
      </div>
    </main>
  );
}