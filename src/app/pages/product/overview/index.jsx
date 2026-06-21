'use client';

import ProductHero from '../components/ProductHero';
import TechnicalSpecs from '../components/TechnicalSpecs';
import Traceability from '../components/Traceability';
import Logistics from '../components/Logistics';
import RelatedProducts from '../components/RelatedProducts';
import FloatingFAB from '../components/FloatingFAB';

export default function ProductDetails() {
  return (
    <main className="bg-background text-on-surface">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        {/* Breadcrumbs & Category Badges */}
        <div className="pt-32 pb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <nav className="flex items-center gap-2 text-on-surface-variant text-label-sm font-semibold">
            <a href="#" className="hover:text-primary transition-colors">
              Products
            </a>
            <span>›</span>
            <a href="#" className="hover:text-primary transition-colors">
              Textiles
            </a>
            <span>›</span>
            <span className="text-primary">Premium Long-Staple Cotton</span>
          </nav>
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 rounded-full bg-secondary-container/30 border border-secondary-container text-secondary text-label-sm font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary pulse-ring"></span>
              Export Grade
            </span>
            <span className="px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant text-on-surface-variant text-label-sm font-semibold">
              ISO Certified
            </span>
            <span className="px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant text-on-surface-variant text-label-sm font-semibold">
              Sustainability Verified
            </span>
          </div>
        </div>

        {/* Main Content Sections */}
        <ProductHero />
        <TechnicalSpecs />
        <Traceability />
        <Logistics />
        <RelatedProducts />

        {/* Floating Action Button */}
        <FloatingFAB />
      </div>
    </main>
  );
}
