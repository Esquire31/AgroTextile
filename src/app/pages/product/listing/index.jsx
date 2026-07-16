import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ProductListingHero from './components/ProductListingHero';
import ProductCatalog from './components/ProductCatalog';
import { ArrowUp } from 'lucide-react';

function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="h-full w-full text-primary" viewBox="0 0 696 316" fill="none" aria-hidden="true">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, 0.6, 0.25],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 18 + ((path.id % 8) + 1),
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function BackgroundPaths() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}

export default function ProductListing() {
  const { formatMessage } = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab & Search states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [searchValue, setSearchValue] = useState('');

  // Update URL search params when category changes in UI
  useEffect(() => {
    if (selectedCategory === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', selectedCategory);
    }
    setSearchParams(searchParams, { replace: true });
  }, [selectedCategory, searchParams, setSearchParams]);

  // Sync category state if URL changes externally (like breadcrumb click)
  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    if (cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams, selectedCategory]);

  // Scroll visibility for Floating FAB
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen bg-surface-container-lowest text-on-surface selection:bg-primary/20 pt-20">
      <BackgroundPaths />
      
      {/* Hero: Category filters and search */}
      <ProductListingHero 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      {/* Main Catalog & Sidebar */}
      <ProductCatalog 
        selectedCategory={selectedCategory}
        searchValue={searchValue}
      />

      {/* Persistent Floating Controls (Right Side) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-90 w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface flex items-center justify-center hover:bg-surface-container-highest transition-all shadow-lg cursor-pointer group"
            title="Return to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
