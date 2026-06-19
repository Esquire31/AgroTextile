import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Factory,
  Search,
  Sprout,
  Globe,
  ShieldCheck,
  Layers,
  Activity,
  RefreshCw,
  FileText,
  Mail,
  SlidersHorizontal,
  ChevronRight,
  X,
  Check,
  Package,
  Clock,
  Building2,
  ArrowUpRight,
  Inbox,
  Share2,
  Languages,
  Info,
  CheckCircle2,
  Truck,
  Leaf,
  Scale,
  Network,
  Calculator,
  User,
  ExternalLink,
  MapPin,
  Flame,
  CornerDownRight
} from "lucide-react";
import { ALL_INITIAL_PRODUCTS, ALL_AVAILABLE_PRODUCTS } from "./data";

export default function ProductListing() {
  // Navigation
  const [activeTab, setActiveTab] = useState("Sourcing");

  // Global search & UI states
  const [searchOpen, setSearchOpen] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState("");
  const [liveInventoryOnly, setLiveInventoryOnly] = useState(false);
  const [loadedMore, setLoadedMore] = useState(false);
  
  // Sourcing Filters
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [activeFilterGroup, setActiveFilterGroup] = useState(null);
  const [selectedVariety, setSelectedVariety] = useState(null);
  const [selectedDurability, setSelectedDurability] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  // Modals
  const [viewingSpecProduct, setViewingSpecProduct] = useState(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState(null);

  // Quote form state
  const [quoteQuantity, setQuoteQuantity] = useState(1000);
  const [quoteUrgent, setQuoteUrgent] = useState(false);
  const [quoteDestination, setQuoteDestination] = useState("Rotterdam Hub (NL)");
  const [quoteCustomNotes, setQuoteCustomNotes] = useState("");
  const [quoteFinished, setQuoteFinished] = useState(null);

  // Track logistics shipment simulator
  const [logisticsWeight, setLogisticsWeight] = useState(18);
  const [logisticsMultiplier, setLogisticsMultiplier] = useState(1);
  const [logisticsSelectedPort, setLogisticsSelectedPort] = useState("West Terminal");

  // Track sustainability carbon calculator
  const [ecoTextileVolume, setEcoTextileVolume] = useState(50000);
  
  // Share notification
  const [shareToast, setShareToast] = useState(false);

  // Auto-close toast
  useEffect(() => {
    if (shareToast) {
      const t = setTimeout(() => setShareToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [shareToast]);

  // Product load state toggle
  const handleLoadMoreProducts = () => {
    setLoadedMore(true);
  };

  // Get active product stream based on load more
  const availableProductsList = useMemo(() => {
    return loadedMore ? ALL_AVAILABLE_PRODUCTS : ALL_INITIAL_PRODUCTS;
  }, [loadedMore]);

  // Unique specifications for deep filtering metadata
  const filterSummary = useMemo(() => {
    const list = ALL_AVAILABLE_PRODUCTS;
    const origins = Array.from(new Set(list.map(p => p.details.origin.split(" (")[0])));
    const certs = Array.from(new Set(list.flatMap(p => p.details.certifications)));
    const durabilities = Array.from(new Set(list.map(p => p.details.durability)));
    const varieties = Array.from(new Set(list.map(p => p.details.variety)));
    
    return { origins, certs, durabilities, varieties };
  }, []);

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return availableProductsList.filter(product => {
      // 1. Category tab filter
      if (selectedCategory !== "All Products") {
        if (product.category !== selectedCategory) return false;
      }

      // 2. Text Search
      if (globalSearchTerm) {
        const query = globalSearchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesOrigin = product.details.origin.toLowerCase().includes(query);
        const matchesSpec = product.specifications.some(
          s => s.label.toLowerCase().includes(query) || s.value.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesCat && !matchesOrigin && !matchesSpec) return false;
      }

      // 3. Live Inventory Only
      if (liveInventoryOnly) {
        if (product.liveInventoryCount < 100) return false;
      }

      // 4. Sidebar Specific Filters
      if (selectedVariety && product.details.variety !== selectedVariety) return false;
      if (selectedDurability && product.details.durability !== selectedDurability) return false;
      if (selectedOrigin && !product.details.origin.includes(selectedOrigin)) return false;
      if (selectedCert && !product.details.certifications.includes(selectedCert)) return false;

      return true;
    });
  }, [availableProductsList, selectedCategory, globalSearchTerm, liveInventoryOnly, selectedVariety, selectedDurability, selectedOrigin, selectedCert]);

  // Clear all filters handy button
  const clearFilters = () => {
    setSelectedVariety(null);
    setSelectedDurability(null);
    setSelectedOrigin(null);
    setSelectedCert(null);
    setGlobalSearchTerm("");
    setLiveInventoryOnly(false);
  };

  const hasActiveFilters = useMemo(() => {
    return !!(selectedVariety || selectedDurability || selectedOrigin || selectedCert || globalSearchTerm || liveInventoryOnly);
  }, [selectedVariety, selectedDurability, selectedOrigin, selectedCert, globalSearchTerm, liveInventoryOnly]);

  // Open direct Quote request
  const handleOpenQuoteForm = (prod = null) => {
    setQuoteProduct(prod || availableProductsList[0]);
    setQuoteQuantity(prod ? (prod.category === "Fresh Produce" ? 2500 : 1500) : 1000);
    setQuoteFinished(null);
    setQuoteModalOpen(true);
  };

  // Submit Simulated Quote Calculation
  const handleCalculateQuote = (e) => {
    e.preventDefault();
    if (!quoteProduct) return;

    // Premium realistic quoting simulation values
    const basePricePerUnit = quoteProduct.category === "Fresh Produce" ? 2.45 : 6.80;
    const itemTotal = quoteQuantity * basePricePerUnit;
    const premiumUrgentSurcharge = quoteUrgent ? itemTotal * 0.15 : 0;
    const complianceFee = 150.00;
    const freightFees = quoteDestination.includes("Rotterdam") ? 1850 : quoteDestination.includes("Singapore") ? 2200 : 3100;
    const finalAmount = itemTotal + premiumUrgentSurcharge + complianceFee + freightFees;

    const summary = {
      invoiceNumber: `ATG-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      productName: quoteProduct.name,
      category: quoteProduct.category,
      origin: quoteProduct.details.origin,
      quantity: quoteQuantity,
      unitPrice: basePricePerUnit.toFixed(2),
      itemSubtotal: itemTotal.toFixed(2),
      urgencyPremium: premiumUrgentSurcharge.toFixed(2),
      freightCost: freightFees.toFixed(2),
      complianceSurcharge: complianceFee.toFixed(2),
      grandTotal: finalAmount.toFixed(2),
      shippingTerminal: quoteDestination,
      estimatedDeliveryDays: quoteUrgent ? "7-9 Days (Priority Sea-Air)" : "18-22 Days (FCL Standard)",
      stampCode: `SECURE_VERIFIED_${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };

    setQuoteFinished(summary);
  };

  // Live countdown generator for ticks (micro animation)
  const [ticks, setTicks] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTicks(t => t + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-surface-dim text-on-surface flex flex-col selection:bg-primary/30 selection:text-primary relative font-sans overflow-x-hidden">
      
      {/* Toast Notification for share action */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 30, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-0 left-1/2 z-50 bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full flex items-center gap-3 border border-primary/20 shadow-xl"
          >
            <Check className="text-primary w-5 h-5 animate-bounce" />
            <span className="font-mono text-sm tracking-wide">COPIED: Secure Industrial Connection Linked!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Interactive Header */}
      <header className="sticky top-0 w-full z-40 bg-surface-container/70 backdrop-blur-md border-b border-outline-variant/20 shadow-2xl transition-all duration-300">
        <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-7xl mx-auto">
          
          {/* Logo */}
          <div 
            onClick={() => { setActiveTab("Sourcing"); clearFilters(); }}
            className="font-title-md text-title-md font-bold text-primary flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="bg-primary-container/20 p-2.5 rounded-xl group-hover:bg-primary-container/40 transition-colors border border-primary/10">
              <Factory className="w-5 h-5 text-primary animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none tracking-tight text-xl font-extrabold text-white">AgroTextile</span>
              <span className="text-xs text-primary/80 font-mono tracking-widest font-semibold">GLOBAL HUB</span>
            </div>
          </div>

          {/* Interactive Navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-on-surface-variant">
            {[
              { id: "Sourcing", icon: Layers, label: "Sourcing" },
              { id: "Logistics", icon: Truck, label: "Logistics Hub" },
              { id: "Sustainability", icon: Leaf, label: "Eco Sustainability" },
              { id: "Compliance", icon: Scale, label: "Customs & Trade" },
              { id: "Network", icon: Network, label: "Global Network" }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-full transition-all duration-300 relative group"
                >
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-primary" : "text-on-surface-variant/70"}`} />
                  <span className={`${isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-white"}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Center with dynamic active toggler */}
          <div className="flex items-center gap-3">
            {/* Live Search Icon */}
            <div className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                className={`p-2.5 rounded-full transition-all border ${
                  searchOpen 
                    ? "bg-primary text-on-primary border-primary" 
                    : "bg-surface-container-high text-on-surface-variant hover:text-primary border-outline-variant/20 hover:border-primary/25"
                }`}
                title="Search catalogs"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Inquiry action */}
            <button
              onClick={() => handleOpenQuoteForm(null)}
              className="bg-primary text-on-primary text-xs md:text-sm font-bold py-2 px-5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-primary/20 shadow-lg border border-primary-fixed-dim/20 hover:shadow-primary/35 flex items-center gap-1.5 cursor-pointer"
            >
              <Activity className="w-4 h-4 animate-pulse text-on-primary" />
              <span>Instant Quote</span>
            </button>
          </div>
        </div>

        {/* Real-time search bar roll-out */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-surface-container-high border-b border-outline-variant/30 overflow-hidden"
            >
              <div className="max-w-4xl mx-auto px-6 py-4 flex gap-3 items-center">
                <Search className="text-primary w-5 h-5 shrink-0" />
                <input
                  type="text"
                  placeholder="Query premium cotton, hemp, pomegranates, specifications, or transit origin zones..."
                  className="bg-transparent text-white border-0 outline-none w-full text-base focus:ring-0 placeholder-on-surface-variant/50 py-1"
                  value={globalSearchTerm}
                  onChange={(e) => {
                    setGlobalSearchTerm(e.target.value);
                    if (activeTab !== "Sourcing") setActiveTab("Sourcing");
                  }}
                  autoFocus
                />
                {globalSearchTerm && (
                  <button 
                    onClick={() => setGlobalSearchTerm("")}
                    className="p-1 hover:bg-surface-container-highest rounded-full text-on-surface-variant"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors font-mono"
                >
                  ESC
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-16 py-10">

        {/* RENDER TAB 1: SOURCING PAGE (PRODUCT HUB) */}
        {activeTab === "Sourcing" && (
          <div className="flex flex-col gap-10">
            
            {/* Category selection and Title summary */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-outline-variant/25">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-0.5 text-xs font-mono tracking-widest uppercase">
                    Industrial Catalog
                  </span>
                  <span className="flex items-center gap-1 text-xs text-on-surface-variant/70 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    SECURE INTERCODE
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                  Industrial Matrix
                </h1>
                <p className="text-on-surface-variant mt-2 text-sm md:text-base max-w-xl">
                  Filter, examine technical specifications, and trigger instant corporate quote inquiries for world-class raw cotton, sustainable hemp, and export agricultural produce.
                </p>
              </div>

              {/* Reset filter state notice */}
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearFilters}
                  className="text-xs font-bold text-red-300 bg-red-950/40 border border-red-900/40 py-2 px-4 rounded-full flex items-center gap-1.5 hover:bg-red-950/70 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset {filteredProducts.length !== availableProductsList.length ? `${availableProductsList.length - filteredProducts.length} filtered` : "Filters"}
                </motion.button>
              )}
            </div>

            {/* Main Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* SIDE FILTER NAVIGATION */}
              <aside className="lg:col-span-1 flex flex-col gap-5 p-5 bg-surface-container-low border border-outline-variant/15 rounded-2xl h-fit sticky top-24">
                <div>
                  <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-primary" />
                    <span>Technical Filters</span>
                  </h2>
                  <p className="text-[11px] text-on-surface-variant/70 font-semibold tracking-wider uppercase mt-1">
                    Industrial Specifications
                  </p>
                </div>

                {/* Main Accordion Tabs */}
                <div className="flex flex-col gap-2">
                  {[
                    { id: "material-variety", label: "Material/Variety", icon: Layers },
                    { id: "durability", label: "Durability/Ripeness", icon: Sprout },
                    { id: "origin", label: "Origin Region", icon: Globe },
                    { id: "certifications", label: "Certifications", icon: ShieldCheck }
                  ].map(group => {
                    const GroupIcon = group.icon;
                    const isGroupActive = activeFilterGroup === group.id;

                    return (
                      <div key={group.id} className="flex flex-col">
                        <button
                          onClick={() => setActiveFilterGroup(activeFilterGroup === group.id ? null : group.id)}
                          className={`w-full rounded-xl p-3 flex items-center justify-between text-left transition-all duration-300 ${
                            isGroupActive 
                              ? "bg-secondary-container text-on-secondary-container font-semibold" 
                              : "text-on-surface-variant hover:bg-surface-container-highest/60 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <GroupIcon className={`w-4 h-4 ${isGroupActive ? "text-primary" : "text-on-surface-variant/80"}`} />
                            <span className="text-xs font-semibold tracking-wide">{group.label}</span>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isGroupActive ? "rotate-90 text-primary" : "text-on-surface-variant/40"}`} />
                        </button>

                        {/* Interactive Suboptions */}
                        <AnimatePresence initial={false}>
                          {isGroupActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-surface-container/40 rounded-b-xl border-l-2 border-primary/20 ml-3 py-1.5 pl-2 flex flex-col gap-1 mt-1"
                            >
                              {/* Variety options */}
                              {group.id === "material-variety" && filterSummary.varieties.map(v => (
                                <button
                                  key={v}
                                  onClick={() => setSelectedVariety(selectedVariety === v ? null : v)}
                                  className={`text-xs text-left px-2.5 py-1.5 rounded-md flex items-center justify-between ${
                                    selectedVariety === v 
                                      ? "text-primary bg-primary/10 font-bold" 
                                      : "text-on-surface-variant/80 hover:text-white hover:bg-surface-container-highest"
                                  }`}
                                >
                                  <span>{v}</span>
                                  {selectedVariety === v && <Check className="w-3 h-3 text-primary" />}
                                </button>
                              ))}

                              {/* Durability options */}
                              {group.id === "durability" && filterSummary.durabilities.map(d => (
                                <button
                                  key={d}
                                  onClick={() => setSelectedDurability(selectedDurability === d ? null : d)}
                                  className={`text-xs text-left px-2.5 py-1.5 rounded-md flex items-center justify-between ${
                                    selectedDurability === d 
                                      ? "text-primary bg-primary/10 font-bold" 
                                      : "text-on-surface-variant/80 hover:text-white hover:bg-surface-container-highest"
                                  }`}
                                >
                                  <span>{d.split(" (")[0]}</span>
                                  {selectedDurability === d && <Check className="w-3 h-3 text-primary" />}
                                </button>
                              ))}

                              {/* Origin options */}
                              {group.id === "origin" && filterSummary.origins.map(org => (
                                <button
                                  key={org}
                                  onClick={() => setSelectedOrigin(selectedOrigin === org ? null : org)}
                                  className={`text-xs text-left px-2.5 py-1.5 rounded-md flex items-center justify-between ${
                                    selectedOrigin === org 
                                      ? "text-primary bg-primary/10 font-bold" 
                                      : "text-on-surface-variant/80 hover:text-white hover:bg-surface-container-highest"
                                  }`}
                                >
                                  <span>{org}</span>
                                  {selectedOrigin === org && <Check className="w-3 h-3 text-primary" />}
                                </button>
                              ))}

                              {/* Certifications options */}
                              {group.id === "certifications" && filterSummary.certs.map(cert => (
                                <button
                                  key={cert}
                                  onClick={() => setSelectedCert(selectedCert === cert ? null : cert)}
                                  className={`text-xs text-left px-2.5 py-1.5 rounded-md flex items-center justify-between ${
                                    selectedCert === cert 
                                      ? "text-primary bg-primary/10 font-bold" 
                                      : "text-on-surface-variant/80 hover:text-white hover:bg-surface-container-highest"
                                  }`}
                                >
                                  <span>{cert}</span>
                                  {selectedCert === cert && <Check className="w-3 h-3 text-primary" />}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Live Inventory Status section */}
                <div className="mt-4 pt-4 border-t border-outline-variant/20 flex flex-col gap-2">
                  <h3 className="text-[11px] font-bold text-on-surface/80 uppercase tracking-widest">
                    Operational Status
                  </h3>
                  
                  <button
                    onClick={() => setLiveInventoryOnly(!liveInventoryOnly)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      liveInventoryOnly 
                        ? "bg-primary/10 border-primary text-primary font-bold" 
                        : "bg-transparent border-outline-variant/30 text-on-surface-variant hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                      </div>
                      <span className="text-xs">Live Factory Inventory</span>
                    </div>
                    <div className={`w-7 h-4 rounded-full p-0.5 transition-colors relative ${liveInventoryOnly ? "bg-primary" : "bg-outline-variant"}`}>
                      <div className={`w-3 h-3 rounded-full bg-surface-dim transition-transform duration-200 ${liveInventoryOnly ? "translate-x-3" : "translate-x-0"}`} />
                    </div>
                  </button>
                  <p className="text-[10px] text-on-surface-variant/60 font-mono italic leading-normal pl-1">
                    *Restricts results to items with &gt; 100 units immediately exportable.
                  </p>
                </div>
              </aside>

              {/* PRODUCTS DISPLAY SECTION */}
              <div className="lg:col-span-3 flex flex-col gap-8">
                
                {/* Horizontal Quick Category Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
                  {[
                    "All Products",
                    "Textiles",
                    "Fresh Produce",
                    "Industrial Wraps",
                    "Logistics Supplies"
                  ].map(tab => {
                    const isSelected = selectedCategory === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setSelectedCategory(tab)}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer hover:scale-102 active:scale-98 ${
                          isSelected 
                            ? "bg-primary text-on-primary shadow-md shadow-primary/15" 
                            : "border border-outline-variant/55 text-on-surface-variant hover:border-primary/50 hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {/* Subtitle count matches */}
                <div className="flex justify-between items-center text-xs text-on-surface-variant/70 font-mono pb-2 border-b border-outline-variant/10">
                  <span>SHOWING {filteredProducts.length} OF {availableProductsList.length} CARGO MATCHES</span>
                  <span>TICKS VALUE SECURE: 2026.06.{(19 + ticks % 10).toString().padStart(2, "0")}</span>
                </div>

                {/* Staggered Products Grid */}
                {filteredProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center bg-surface-container-low/40 rounded-3xl border border-dashed border-outline-variant/50"
                  >
                    <Inbox className="w-12 h-12 text-on-surface-variant/30 mb-4 stroke-[1.5]" />
                    <h3 className="text-lg font-bold text-white">No Matching Industrial Goods</h3>
                    <p className="text-on-surface-variant/80 max-w-sm text-sm mt-1.5 px-4">
                      No products match your custom filters. Adjust your sidebar varieties or category parameters, or click below to reset.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-5 bg-surface-container text-primary border border-primary/20 hover:bg-primary/10 text-xs font-mono py-2 px-4 rounded-full transition-all"
                    >
                      Clear Active Search & Filters
                    </button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                      {filteredProducts.map((product) => {
                        return (
                          <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="glass-card rounded-2xl overflow-hidden group hover:border-primary/40 hover-glow transition-all duration-300 flex flex-col justify-between"
                          >
                            <div>
                              {/* Product Image and status tag */}
                              <div className="relative h-48 overflow-hidden bg-surface-container-lowest">
                                <img
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  referrerPolicy="no-referrer"
                                  src={product.image}
                                  alt={product.name}
                                />
                                <div className="absolute top-4 left-4 bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-primary border border-primary/10 uppercase">
                                  {product.category}
                                </div>
                                <div className="absolute bottom-4 right-4 bg-primary-container/85 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-[10px] font-mono text-on-surface font-extrabold uppercase">
                                  {product.tag}
                                </div>
                              </div>

                              {/* Card Content parameters */}
                              <div className="p-5">
                                <h3 className="font-title-md text-white text-lg font-bold group-hover:text-primary transition-colors leading-snug mb-3">
                                  {product.name}
                                </h3>

                                <div className="flex flex-col gap-2 p-3 bg-surface-container-lowest/60 rounded-xl border border-outline-variant/15">
                                  {product.specifications.map((spec, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs font-mono">
                                      <span className="text-on-surface-variant/80">{spec.label}</span>
                                      <span className="text-primary font-bold">{spec.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* View Specs action buttons */}
                            <div className="px-5 pb-5 pt-1 flex gap-2 items-center">
                              <button
                                onClick={() => setViewingSpecProduct(product)}
                                className="flex-1 py-1.5 text-xs text-center border border-outline-variant/40 rounded-full hover:border-primary hover:text-primary transition-all font-semibold active:scale-95 cursor-pointer bg-surface-container/20 hover:bg-primary/5"
                              >
                                View Specs
                              </button>
                              <button
                                onClick={() => handleOpenQuoteForm(product)}
                                className="px-3.5 py-2 bg-primary text-on-primary rounded-full hover:scale-105 active:scale-95 transition-all text-xs font-bold cursor-pointer hover:shadow-md hover:shadow-primary/20"
                                title="Request quote for this raw cargo"
                              >
                                <Mail className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}

                {/* PAGINATION / LOAD MORE */}
                {!loadedMore && (
                  <div className="mt-10 flex flex-col items-center py-6 bg-surface-container-low/20 rounded-2xl border border-outline-variant/15">
                    <button
                      onClick={handleLoadMoreProducts}
                      className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all group font-mono text-xs font-bold"
                    >
                      <RefreshCw className="w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-700" />
                      <span>Load Technical Specifications for More Products</span>
                    </button>
                    <div className="mt-4 flex gap-2">
                      <div className="w-12 h-1.5 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-6 h-1.5 bg-outline-variant/40 rounded-full"></div>
                      <div className="w-6 h-1.5 bg-outline-variant/40 rounded-full"></div>
                    </div>
                  </div>
                )}

                {loadedMore && (
                  <div className="mt-10 flex flex-col items-center justify-center p-3 text-center bg-primary-container/5 rounded-xl border border-primary/10">
                    <span className="text-xs font-mono text-primary flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      FULL INDUSTRIAL MATRIX EXPANDED (8 HIGH-FIDELITY SPECS LOADED)
                    </span>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* PLACEHOLDER TABS - LOGISTICS, SUSTAINABILITY, COMPLIANCE, NETWORK */}
        {activeTab === "Logistics" && (
          <div className="flex flex-col gap-8">
            <div className="pb-6 border-b border-outline-variant/25">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Logistics Hub</h1>
              <p className="text-on-surface-variant max-w-2xl text-sm mt-2">Coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === "Sustainability" && (
          <div className="flex flex-col gap-8">
            <div className="pb-6 border-b border-outline-variant/25">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Sustainability Platform</h1>
              <p className="text-on-surface-variant max-w-2xl text-sm mt-2">Coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === "Compliance" && (
          <div className="flex flex-col gap-8">
            <div className="pb-6 border-b border-outline-variant/25">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Trade & Compliance Matrix</h1>
              <p className="text-on-surface-variant max-w-2xl text-sm mt-2">Coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === "Network" && (
          <div className="flex flex-col gap-8">
            <div className="pb-6 border-b border-outline-variant/25">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Global Shipping Network</h1>
              <p className="text-on-surface-variant max-w-2xl text-sm mt-2">Coming soon...</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
