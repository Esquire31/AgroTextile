'use client';

import { Download, CheckCircle, Ship, ShoppingBag } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import LazyImage from '@/components/ui/LazyImage';

export default function ProductHero({ product }) {
  const { formatMessage } = useIntl();
  const [selectedImage, setSelectedImage] = useState(0);

  const images = useMemo(() => {
    return product.images && product.images.length > 0 
      ? product.images 
      : [product.thumbnail || product.image];
  }, [product]);

  return (
    <section className="py-2 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-15">
      {/* Left Column - Image Section */}
      <div className="flex flex-col gap-6">
        {/* Main Display Area */}
        <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden glass-card group">
          <img
            src={images[selectedImage]}
            alt={product.title}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--color-background) 10%, transparent), transparent)' }}
          ></div>

          {/* Verified Badge */}
          <div
            className="absolute bottom-6 left-6 flex items-center gap-3 backdrop-blur-md p-3 rounded-xl border"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-surface-container) 70%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-outline-variant) 20%, transparent)',
            }}
          >
            <div className="bg-primary/30 p-1.5 rounded-lg">
              <CheckCircle className="text-primary" size={20} />
            </div>
            <div>
              <p className="type-label text-on-surface-variant">
                {formatMessage({ id: 'app.products.overview.hero.verified_source' })}
              </p>
              <p className="type-body font-bold text-on-surface">{product.details.origin}</p>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all spring-hover bg-surface-container-high ${
                selectedImage === idx
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'hover:border-primary'
              }`}
              style={
                selectedImage === idx
                  ? undefined
                  : { borderColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)' }
              }
            >
              <LazyImage
                src={src}
                alt={`${product.title} detail view ${idx + 1}`}
                rootMargin="600px"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right Column - Product Info */}
      <div className="flex flex-col justify-between">
        {/* Title and Description */}
        <div>
          <h1 className="type-headline text-on-surface mb-4">
            {product.title}
          </h1>
          <p className="type-label text-secondary mb-4 uppercase tracking-[0.2em]">
            {product.subtitle || (
              product.category === 'Textile' 
                ? formatMessage({ id: 'app.products.listing.filter.textile' })
                : formatMessage({ id: 'app.products.listing.filter.agro' })
            )}
          </p>
          <p className="type-body-lg text-on-surface-variant mb-8">
            {product.details.description}
          </p>
        </div>

        {/* Procurement & Logistics Summary */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: 'color-mix(in srgb, var(--color-background) 40%, transparent)' }}>
              <p className="text-xs text-on-surface-variant font-bold mb-2 uppercase tracking-wide">
                {formatMessage({ id: 'app.products.overview.hero.min_order' })}
              </p>
              <p className="text-4xl font-bold text-on-surface tabular-nums">
                {product.details.minOrder.split(' ')[0]} <span className="text-lg">{product.details.minOrder.split(' ')[1] || ''}</span>
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: 'color-mix(in srgb, var(--color-background) 40%, transparent)' }}>
              <p className="text-xs text-on-surface-variant font-bold mb-2 uppercase tracking-wide">
                {formatMessage({ id: 'app.products.overview.hero.lead_time' })}
              </p>
              <p className="text-4xl font-bold text-on-surface tabular-nums">
                {product.details.leadTime.split(' ')[0]} <span className="text-lg">{product.details.leadTime.split(' ')[1] || ''}</span>
              </p>
            </div>
            <div className="p-4 rounded-xl col-span-2" style={{ backgroundColor: 'color-mix(in srgb, var(--color-background) 40%, transparent)' }}>
              <p className="text-xs text-on-surface-variant font-bold mb-3 uppercase tracking-wide">
                {formatMessage({ id: 'app.products.overview.hero.shipping_port' })}
              </p>
              <div className="flex items-center gap-3">
                <Ship className="text-primary" size={24} />
                <span className="text-xl font-bold text-on-surface">{product.details.shippingPorts}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-primary text-on-primary font-bold py-4 rounded-full text-sm hover:bg-primary/90 transition-all spring-hover flex items-center justify-center gap-2">
            <ShoppingBag size={18} />
            {formatMessage({ id: 'app.products.overview.hero.btn.add_to_inquiry' })}
          </button>
          <button
            className="flex-1 border font-bold py-4 rounded-full text-sm hover:bg-surface-container-high transition-all spring-hover flex items-center justify-center gap-2"
            style={{ borderColor: 'var(--color-outline)' }}
          >
            <Download size={18} />
            {formatMessage({ id: 'app.products.overview.hero.btn.technical_sheet' })}
          </button>
        </div>
      </div>
    </section>
  );
}