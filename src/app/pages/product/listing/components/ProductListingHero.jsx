import React from 'react';
import { useIntl } from 'react-intl';
import { motion } from 'motion/react';

export default function ProductListingHero({
  selectedCategory,
  setSelectedCategory,
  onSearchChange,
  searchValue,
}) {
  const { formatMessage } = useIntl();

  return (
    <section className="relative overflow-hidden pt-24 pb-12 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="relative z-10 flex flex-col items-start">
        {/* Pulsating Sync Pip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span
            className="inline-flex items-center gap-2 type-badge px-4 py-2 rounded-full border"
            style={{
              borderColor: 'var(--color-outline-variant)',
              color: 'var(--color-on-surface)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            {formatMessage({ id: 'app.products.listing.hero.live_sync' })}
          </span>
        </motion.div>

        {/* Display Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="type-display text-on-background mb-6 max-w-3xl"
        >
          {formatMessage({ id: 'app.products.listing.hero.title' })}{' '}
          <span className="text-primary">{formatMessage({ id: 'app.products.listing.hero.title_italic' })}</span>
        </motion.h1>

        {/* Slogan & Intro */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="type-body-lg text-on-surface-variant max-w-2xl mb-10"
        >
          {formatMessage({ id: 'app.products.listing.hero.description' })}
        </motion.p>

        {/* Navigation Tabs and Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between"
        >
          {/* Quick-filter Category Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-2 sm:p-1 sm:bg-surface-container sm:rounded-full sm:border sm:border-outline-variant/20 w-full sm:w-fit">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer flex-shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                  : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-primary/30'
              }`}
            >
              {formatMessage({ id: 'app.products.listing.filter.all' })}
            </button>
            <button
              onClick={() => setSelectedCategory('Textile')}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer flex-shrink-0 ${
                selectedCategory === 'Textile'
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                  : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-primary/30'
              }`}
            >
              {formatMessage({ id: 'app.products.listing.filter.textile' })}
            </button>
            <button
              onClick={() => setSelectedCategory('Agro')}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer flex-shrink-0 ${
                selectedCategory === 'Agro'
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                  : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-primary/30'
              }`}
            >
              {formatMessage({ id: 'app.products.listing.filter.agro' })}
            </button>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder={formatMessage({ id: 'app.products.listing.search.placeholder' })}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-surface-container-high text-on-surface placeholder-on-surface-variant/50 px-5 py-3 rounded-full border border-outline-variant/30 focus:outline-none focus:border-primary text-sm transition-all"
            />
            {searchValue && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-xs font-bold"
              >
                {formatMessage({ id: 'app.products.listing.search.clear' })}
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Decorative Atmosphere Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary-container/10 filter blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-10 left-1/3 w-96 h-96 rounded-full bg-secondary-container/15 filter blur-3xl opacity-20 pointer-events-none"></div>
    </section>
  );
}
