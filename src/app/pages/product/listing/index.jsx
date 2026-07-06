import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ProductListingHero from './components/ProductListingHero';
import ProductCatalog from './components/ProductCatalog';
import TechSheetDrawer from './components/TechSheetDrawer';
import ShipmentBookingModal from './components/ShipmentBookingModal';
import InquiryBasket from './components/InquiryBasket';
import { ShoppingBag, ArrowUp } from 'lucide-react';

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

  // UI Modal / Drawer states
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isTechSheetOpen, setIsTechSheetOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Active selected data for modals
  const [activeProduct, setActiveProduct] = useState(null);
  
  // Basket logic
  const [basket, setBasket] = useState([]);
  const [showBasketAlert, setShowBasketAlert] = useState(false);

  // Scroll visibility for Floating FAB
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Basket Handlers
  const handleAddToBasket = (product, quantity = 1) => {
    setBasket(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { product, quantity, notes: '' }];
    });
    
    // Feedback
    setShowBasketAlert(true);
    setTimeout(() => setShowBasketAlert(false), 3000);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setBasket(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const handleUpdateNotes = (productId, notes) => {
    setBasket(prev => prev.map(item => 
      item.product.id === productId ? { ...item, notes } : item
    ));
  };

  const handleRemoveFromBasket = (productId) => {
    setBasket(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearBasket = () => {
    setBasket([]);
  };

  // Modal Triggers
  const openTechSpecs = (product) => {
    setActiveProduct(product);
    setIsTechSheetOpen(true);
  };

  const openBooking = (product) => {
    setActiveProduct(product);
    setIsBookingOpen(true);
  };

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
        onOpenSpecs={openTechSpecs}
        onOpenBooking={openBooking}
        onAddToBasket={handleAddToBasket}
        basket={basket}
      />

      {/* Persistent Floating Controls (Right Side) */}
      <div className="fixed bottom-8 right-8 z-[90] flex flex-col gap-4">
        {/* Scroll To Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface flex items-center justify-center hover:bg-surface-container-highest transition-all shadow-lg cursor-pointer group"
              title="Return to top"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Inquiry Basket Button */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsBasketOpen(true)}
            className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-2xl shadow-primary/40 cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <ShoppingBag className="w-6 h-6" />
            
            {basket.length > 0 && (
              <span className="absolute top-3.5 right-3.5 w-5 h-5 bg-secondary text-on-secondary text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-primary">
                {basket.length}
              </span>
            )}
          </motion.button>

          {/* Added to basket toast/alert */}
          <AnimatePresence>
            {showBasketAlert && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-20 top-0 whitespace-nowrap bg-on-surface text-surface-container-high px-4 py-2 rounded-lg text-xs font-bold shadow-xl shadow-black/20"
              >
                {formatMessage({ id: 'app.products.item_added_alert' })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals & Overlays */}
      <InquiryBasket 
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        basket={basket}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateNotes={handleUpdateNotes}
        onRemoveItem={handleRemoveFromBasket}
        onClearBasket={handleClearBasket}
      />

      {activeProduct && (
        <>
          <TechSheetDrawer 
            isOpen={isTechSheetOpen}
            onClose={() => setIsTechSheetOpen(false)}
            product={activeProduct}
            onAddToBasket={handleAddToBasket}
          />

          <ShipmentBookingModal 
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            product={activeProduct}
          />
        </>
      )}

      {/* Footer Industrial Badge */}
      <footer className="py-12 px-6 flex flex-col items-center border-t border-outline-variant/10 bg-surface-container-low/30 mt-12">
        <div className="flex items-center gap-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/GOTS_logo.png" alt="GOTS" className="h-8 md:h-10 object-contain" />
           <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/GlobalGAP_Logo.png/220px-GlobalGAP_Logo.png" alt="GAP" className="h-8 md:h-10 object-contain" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/ISO_9001.png" alt="ISO" className="h-8 md:h-10 object-contain" />
        </div>
        <p className="mt-6 text-[10px] font-mono text-on-surface-variant uppercase tracking-[0.2em]">
          Institutional Sourcing & Industrial Logistics Console v2.4.0
        </p>
      </footer>
    </main>
  );
}
