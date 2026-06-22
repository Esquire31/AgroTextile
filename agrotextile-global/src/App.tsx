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
import { Product, ActiveFilterType } from "./types";
import { ALL_INITIAL_PRODUCTS, ALL_AVAILABLE_PRODUCTS } from "./data";

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<"Sourcing" | "Logistics" | "Sustainability" | "Compliance" | "Network">("Sourcing");

  // Global search & UI states
  const [searchOpen, setSearchOpen] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState("");
  const [liveInventoryOnly, setLiveInventoryOnly] = useState(false);
  const [loadedMore, setLoadedMore] = useState(false);
  
  // Sourcing Filters
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [activeFilterGroup, setActiveFilterGroup] = useState<ActiveFilterType>("material-variety");
  const [selectedVariety, setSelectedVariety] = useState<string | null>(null);
  const [selectedDurability, setSelectedDurability] = useState<string | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // Modals
  const [viewingSpecProduct, setViewingSpecProduct] = useState<Product | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);

  // Quote form state
  const [quoteQuantity, setQuoteQuantity] = useState<number>(1000);
  const [quoteUrgent, setQuoteUrgent] = useState<boolean>(false);
  const [quoteDestination, setQuoteDestination] = useState<string>("Rotterdam Hub (NL)");
  const [quoteCustomNotes, setQuoteCustomNotes] = useState<string>("");
  const [quoteFinished, setQuoteFinished] = useState<any | null>(null);

  // Track logistics shipment simulator
  const [logisticsWeight, setLogisticsWeight] = useState<number>(18);
  const [logisticsMultiplier, setLogisticsMultiplier] = useState<number>(1);
  const [logisticsSelectedPort, setLogisticsSelectedPort] = useState<string>("West Terminal");

  // Track sustainability carbon calculator
  const [ecoTextileVolume, setEcoTextileVolume] = useState<number>(50000); // meters of hemp/cotton
  
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
  const handleOpenQuoteForm = (prod: Product | null = null) => {
    setQuoteProduct(prod || availableProductsList[0]);
    setQuoteQuantity(prod ? (prod.category === "Fresh Produce" ? 2500 : 1500) : 1000);
    setQuoteFinished(null);
    setQuoteModalOpen(true);
  };

  // Submit Simulated Quote Calculation
  const handleCalculateQuote = (e: React.FormEvent) => {
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
            id="company-logo"
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
                  id={`nav-link-${item.id.toLowerCase()}`}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full transition-all duration-300 relative group `}
                >
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-primary" : "text-on-surface-variant/70"}`} />
                  <span className={`${isActive ? "text-primary font-boldScale" : "text-on-surface-variant hover:text-white"}`}>
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
                id="search-toggle-btn"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Inquiry action */}
            <button
              onClick={() => handleOpenQuoteForm(null)}
              className="bg-primary text-on-primary text-xs md:text-sm font-bold py-2 px-5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-primary/20 shadow-lg border border-primary-fixed-dim/20 hover:shadow-primary/35 flex items-center gap-1.5 cursor-pointer"
              id="quote-trigger-header"
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
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block pulse-ring"></span>
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
                          onClick={() => setActiveFilterGroup(activeFilterGroup === group.id ? null : (group.id as ActiveFilterType))}
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


        {/* RENDER TAB 2: LOGISTICS HUB */}
        {activeTab === "Logistics" && (
          <div className="flex flex-col gap-8">
            <div className="pb-6 border-b border-outline-variant/25">
              <span className="bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-0.5 text-xs font-mono tracking-widest uppercase">
                Intermodal Terminal Controls
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
                Logistics Hub
              </h1>
              <p className="text-on-surface-variant max-w-2xl text-sm mt-2">
                Track simulated freight weight, compute container cargo transit variables, and manage multi-layered port coordinates with automated global compliance flags.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Interactive Multiplier Calculator */}
              <div className="bg-surface-container-low border border-outline-variant/25 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-primary" />
                      <span>Volumetric Cargo Weight Tracker</span>
                    </h3>
                    <span className="text-[10px] bg-primary/25 text-primary px-2 py-0.5 rounded font-mono">LIVE</span>
                  </div>

                  <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                    Set cargo container payloads in metric tons. Adjust destination transit routes below to instantly simulate fuel burn, compliance safety levels, and estimated tariff ratings.
                  </p>

                  <div className="flex flex-col gap-5 mb-8">
                    <div>
                      <div className="flex justify-between text-xs text-on-surface-variant font-mono mb-1.5">
                        <span>ESTIMATED FCL VOLUME</span>
                        <span className="text-secondary font-mono font-bold">{logisticsWeight} MT (Metric Tons)</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="40"
                        value={logisticsWeight}
                        onChange={(e) => setLogisticsWeight(Number(e.target.value))}
                        className="w-full accent-primary h-1 bg-surface-container-highest rounded-full cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-on-surface-variant font-mono mb-1.5">
                        <span>FREIGHT TRUCKLOAD CAPACITY MULTIPLIER</span>
                        <span className="text-secondary font-mono font-bold">{logisticsMultiplier}x Trailers</span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 4, 8].map(multiplier => (
                          <button
                            key={multiplier}
                            onClick={() => setLogisticsMultiplier(multiplier)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                              logisticsMultiplier === multiplier 
                                ? "bg-primary text-on-primary font-black scale-102" 
                                : "bg-surface-container-highest text-on-surface-variant hover:text-white"
                            }`}
                          >
                            {multiplier}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/15 font-mono space-y-2 text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Total Net Payload:</span>
                    <span className="text-white">{(logisticsWeight * logisticsMultiplier).toLocaleString()} Tons</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Estimated Fuel Metric:</span>
                    <span className="text-white">{(logisticsWeight * 3.5 * logisticsMultiplier).toFixed(1)} Liters / Hr</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Safety Margin Check:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> APPROVED
                    </span>
                  </div>
                  <div className="pt-2 border-t border-outline-variant/10 flex justify-between text-primary font-bold">
                    <span>Inbound Freight Quote:</span>
                    <span>${(logisticsWeight * 140 * logisticsMultiplier + 1150).toLocaleString()} USD</span>
                  </div>
                </div>
              </div>


              {/* Live Ship Tracker visual map container */}
              <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-outline-variant/25 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <span>Intermodal Logistics Connection Node</span>
                    </h3>
                    <span className="text-[10px] font-mono text-on-surface-variant/70">REF_ID: TERMINAL_ALPHA_22</span>
                  </div>

                  {/* Ports selection bar */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
                    {["West Terminal", "Rotterdam Transit", "Panama Lock", "Singapore Hub"].map(port => (
                      <button
                        key={port}
                        onClick={() => setLogisticsSelectedPort(port)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                          logisticsSelectedPort === port 
                            ? "bg-secondary-container text-on-secondary-container border border-primary/20" 
                            : "bg-surface-container hover:bg-surface-container-highest text-on-surface-variant"
                        }`}
                      >
                        {port}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                    Interactive telemetry simulation for <strong>{logisticsSelectedPort}</strong> node. Displays live custom ports latency, vessel density routing limits, and quarantine clearances.
                  </p>

                  {/* Simulated telemetry grids */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { l: "Vessel Count", v: logisticsSelectedPort.includes("Singapore") ? "34 Inbound" : "12 Inbound", c: "text-white" },
                      { l: "Quarantine Clear Rate", v: "100% SECURE", c: "text-emerald-400 font-bold" },
                      { l: "Port Queue Delay", v: logisticsSelectedPort.includes("Transit") ? "1.2 Hours" : "0.5 Hours", c: "text-primary" },
                      { l: "HS Code Database", v: "v4.16 STABLE", c: "text-on-surface-variant font-mono" }
                    ].map((metric, idx) => (
                      <div key={idx} className="p-3 bg-surface-container/60 rounded-xl border border-outline-variant/20 flex flex-col justify-between">
                        <span className="text-[10px] text-on-surface-variant font-medium tracking-wide leading-tight uppercase">
                          {metric.l}
                        </span>
                        <span className={`text-xs mt-1.5 ${metric.c}`}>
                          {metric.v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animated graphic map panel */}
                <div className="mt-6 p-4 bg-surface-container-lowest/80 rounded-xl border border-outline-variant/15">
                  <div className="flex justify-between items-center text-xs font-mono text-on-surface-variant/70 mb-3 border-b border-outline-variant/10 pb-2">
                    <span>LIVE CONNECTIVITY STREAM DIAGRAM</span>
                    <span className="text-primary text-[10px] tracking-widest uppercase">AUTO TUNING</span>
                  </div>
                  
                  {/* Dynamic graphic visualization */}
                  <div className="h-28 flex items-end justify-between gap-1 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-[10px] font-mono text-primary/10 tracking-[1em] whitespace-nowrap uppercase animate-pulse">
                        AGROTEXTILE GLOBAL TRADING CO
                      </span>
                    </div>

                    {[20, 45, 12, 67, 34, 52, 98, 43, 23, 76, 54, 88, 32, 11, 45, 90, 76, 54, 32, 67, 45, 98, 12, 54, 32].map((val, i) => {
                      const dynamicHeight = (val / 100) * 80 + 10;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <motion.div
                            animate={{ height: `${dynamicHeight}%` }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
                            className={`w-full rounded-t-sm ${
                              i % 4 === 0 
                                ? "bg-primary" 
                                : i % 3 === 0 
                                  ? "bg-secondary-container" 
                                  : "bg-outline-variant/40"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-between text-[10px] text-on-surface-variant/50 font-mono mt-2">
                    <span>NODE_ECU_W4</span>
                    <span>ROUTE CLEARANCE LATENCY OPTIMAL: 34ms</span>
                    <span>NODE_ROT_T5</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}


        {/* RENDER TAB 3: SUSTAINABILITY */}
        {activeTab === "Sustainability" && (
          <div className="flex flex-col gap-8">
            <div className="pb-6 border-b border-outline-variant/25">
              <span className="bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-0.5 text-xs font-mono tracking-widest uppercase">
                Zero Carbon Certification Target
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
                Sustainability Platform
              </h1>
              <p className="text-on-surface-variant max-w-2xl text-sm mt-2">
                We design premium biodegradable agro-textiles and implement carbon trace logs. Calculate the ecological footprint offsets of our natural fibers below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Carbon Footprint Offset Calculator */}
              <div className="bg-surface-container-low border border-outline-variant/25 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-400" />
                      <span>Carbon Trace Offset Calculator</span>
                    </h3>
                    <span className="text-[10px] bg-emerald-900/40 text-emerald-300 border border-emerald-800/50 px-2 py-0.5 rounded font-mono">ECO-CALC</span>
                  </div>

                  <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                    Set estimated sourcing volume of our 100% natural industrial hemp fabric or premium certified cotton to view instant simulated reductions in chemical runoff and CO₂ emissions.
                  </p>

                  <div className="flex flex-col gap-5 mb-8">
                    <div>
                      <div className="flex justify-between text-xs text-on-surface-variant font-mono mb-1.5">
                        <span>SOURCED FIBER VOLUME (SQ METERS)</span>
                        <span className="text-emerald-400 font-mono font-bold">{ecoTextileVolume.toLocaleString()} SQM</span>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="200000"
                        step="5000"
                        value={ecoTextileVolume}
                        onChange={(e) => setEcoTextileVolume(Number(e.target.value))}
                        className="w-full accent-primary h-1 bg-surface-container-highest rounded-full cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/15 font-mono space-y-2.5 text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>100% Biodegradation Period:</span>
                    <span className="text-white font-bold">120 Days in Soil</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>CO₂ sequestered during cultivation:</span>
                    <span className="text-emerald-400 font-bold">{(ecoTextileVolume * 0.012).toFixed(1)} Metric Tons</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Water Saved (vs Synthetic Polyesters):</span>
                    <span className="text-emerald-400 font-bold">{(ecoTextileVolume * 45).toLocaleString()} Liters</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Plastic Reduction Metric:</span>
                    <span className="text-white">{(ecoTextileVolume * 0.18).toFixed(1)} Tons LDPE eliminated</span>
                  </div>
                  <div className="pt-2 border-t border-outline-variant/10 flex justify-between text-primary font-bold">
                    <span>Carbon Credits Generated:</span>
                    <span>{(ecoTextileVolume / 2200).toFixed(2)} CREDITS</span>
                  </div>
                </div>
              </div>

              {/* Eco goals info card */}
              <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-outline-variant/25 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Global Certifications & Zero-Waste Targets</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                    AgroTextile Global complies with rigorous international certifications to keep our physical trades carbon neutral and bio-friendly. View our primary verified goals for 2026.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "GOTS Verified Materials", desc: "Global Organic Textile Standard ensures absolute traceability from direct farming to cargo containers.", code: "CERT_GOTS_98A" },
                      { title: "Water Neutrality Hubs", desc: "Direct closed-loop water usage systems save millions of municipal gallons during cotton spinning.", code: "WTR_NEU_S5" },
                      { title: "Safe Soil Initiative", desc: "Eliminating petrochemical pesticide exposure ensures long-term crop rotation fertility.", code: "SAFE_SOIL_V9" },
                      { title: "Fairtrade Certified", desc: "Guarantees fair agricultural price indexes and transparent labor laws in our West African and South Asian nodes.", code: "FAIR_TRD_B2" }
                    ].map((goal, i) => (
                      <div key={i} className="p-4 bg-surface-container/60 rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {goal.title}
                          </span>
                          <p className="text-[11px] text-on-surface-variant/80 mt-1.5 leading-normal">
                            {goal.desc}
                          </p>
                        </div>
                        <span className="text-[9px] font-mono text-on-surface-variant/30 mt-3 self-end uppercase">
                          {goal.code}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-primary-container/5 rounded-xl p-4 border border-primary/10 gap-4">
                  <div className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-primary shrink-0 animate-pulse" />
                    <p className="text-xs text-on-surface-variant">
                      Sourcing our <strong>Hemp & Organic Cotton</strong> options instantly improves your sustainable supplier portfolio indexing. Download our certified Carbon Audited Report below.
                    </p>
                  </div>
                  <button 
                    onClick={() => { setShareToast(true); }}
                    className="bg-primary hover:bg-primary-container text-on-primary text-xs font-bold font-mono py-2 px-4 rounded-full transition-all whitespace-nowrap"
                  >
                    Download Audit PDF
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}


        {/* RENDER TAB 4: COMPLIANCE */}
        {activeTab === "Compliance" && (
          <div className="flex flex-col gap-8">
            <div className="pb-6 border-b border-outline-variant/25">
              <span className="bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-0.5 text-xs font-mono tracking-widest uppercase">
                Phytosanitary & WTO Tariff Protocols
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
                Trade & Compliance Matrix
              </h1>
              <p className="text-on-surface-variant max-w-2xl text-sm mt-2">
                Review strict international sanitary guidelines, WTO tariff regulations, and active certifications keeping our transcontinental trade routes safe and reliable.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Sanitary controls checklist */}
              <div className="bg-surface-container-low border border-outline-variant/25 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Interactive Quarantine Checklist</span>
                </h3>
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Every transoceanic agricultural block must complete comprehensive phytosanitary checks. Click rows below to view regulatory requirements.
                </p>

                <div className="flex flex-col gap-2 mt-4">
                  {[
                    { rule: "Phytosanitary Fumigation Code", s: "REQUIRED", detail: "Ensures no trans-border insect or parasitic mold egg transfer." },
                    { rule: "Cold-Chain Core Integrity Check", s: "ACTIVE", detail: "Constant 13.5°C node log storage prevents early decay/microbial growth." },
                    { rule: "Heavy Metal Residue Audit", s: "AUDITED", detail: "Ensures soil was free from cadmium or industrial elements." },
                    { rule: "WTO Quarantine Period Pass", s: "PASSED", detail: "Customs declaration quarantine cleared within 16 hours of port entry." }
                  ].map((chk, i) => (
                    <div key={i} className="p-3 bg-surface-container/50 rounded-xl border border-outline-variant/10 text-xs text-on-surface">
                      <div className="flex justify-between items-center font-semibold mb-1">
                        <span className="text-white">{chk.rule}</span>
                        <span className="text-[10px] font-mono bg-primary/20 text-primary px-1.5 py-0.5 rounded leading-none">{chk.s}</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant/70 italic mt-1 leading-normal pl-2 border-l border-primary/20">
                        {chk.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* WTO Tariffs and HS Codes list */}
              <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-outline-variant/25 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2 mb-3">
                    <Scale className="w-4 h-4 text-primary" />
                    <span>HS Classification Code Tariff Reference</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                    Search WTO classification indices. All AgroTextile Global materials are pre-filed to ease custom clearance procedures.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-outline-variant/30 text-on-surface-variant/70 uppercase text-[10px] tracking-wider">
                          <th className="pb-2.5 font-bold">Good Class</th>
                          <th className="pb-2.5 font-bold">HS Code</th>
                          <th className="pb-2.5 font-bold">WTO Baseline Tariff</th>
                          <th className="pb-2.5 font-bold">Trade Rule Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/10">
                        {[
                          { g: "Raw Cotton (Egyptian Grade)", hs: "5201.00.10", tf: "1.2% - 2.0%", st: "FAST TRACK APPROVED" },
                          { g: "Organic Alphonso Mangoes", hs: "0804.50.20", tf: "4.5% or custom treaty", st: "PHYTOSANITARY CLEAR" },
                          { g: "Industrial Hemp Woven Fabric", hs: "5308.20.00", tf: "2.1%", st: "ZERO DUTY TREATED (EU)" },
                          { g: "Polymer LDPE Shrink Wrap", hs: "3920.10.12", tf: "6.5% standard", st: "REACH COMPLIANT ACCREDITED" },
                          { g: "Premium Whole Pomegranates", hs: "0810.90.10", tf: "3.8%", st: "FAST TRACK CERTIFIED" }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-surface-container/30 transition-colors">
                            <td className="py-3 text-white font-sans font-bold">{row.g}</td>
                            <td className="py-3 text-primary font-bold">{row.hs}</td>
                            <td className="py-3 text-on-surface-variant">{row.tf}</td>
                            <td className="py-3 text-[10px] text-emerald-400 font-bold tracking-wider">{row.st}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/15 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-primary shrink-0 animate-pulse" />
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Need custom tariff filings, import duty schedules, or certificates of origin for your local port? We assist you in filing complete, airtight customs paperwork dynamically.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleOpenQuoteForm(null)}
                    className="bg-primary hover:bg-primary-fixed-dim text-on-primary text-xs font-bold py-2.5 px-5 rounded-full transition-all shrink-0 cursor-pointer"
                  >
                    Speak with Customs Officer
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}


        {/* RENDER TAB 5: NETWORK */}
        {activeTab === "Network" && (
          <div className="flex flex-col gap-8">
            <div className="pb-6 border-b border-outline-variant/25">
              <span className="bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-0.5 text-xs font-mono tracking-widest uppercase">
                Active Transoceanic Shipping Channels
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
                Unified Shipping Ports Network
              </h1>
              <p className="text-on-surface-variant max-w-2xl text-sm mt-2">
                AgroTextile Global operates across major physical ports, logistics hubs, and processing factories. Examine our live node directories below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Directory Sidebar list of nodes */}
              <div className="lg:col-span-1 bg-surface-container-low border border-outline-variant/25 rounded-2xl p-5 flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                  Connected Port Nodes (5 Active)
                </h3>
                
                <div className="flex flex-col gap-2">
                  {[
                    { n: "Rotterdam Terminal (EU)", t: "Deepwater Container Port", s: "ONLINE / HIGH VOL" },
                    { n: "Ecuador Guayaquil (LA)", t: "Fresh Cargo Export Hub", s: "ONLINE / FLUID" },
                    { n: "Panama Transit Lock (LA)", t: "Continental Canal Canal", s: "ONLINE / MODERATE" },
                    { n: "Singapore Changi Hub (APAC)", t: "Priority Air/Sea Freight Node", s: "ONLINE / HIGH VOL" },
                    { n: "Wisconsin Fabric Factory (USA)", t: "Industrial Spinning Plant", s: "ONLINE / OPTIMAL" }
                  ].map((node, i) => (
                    <div key={i} className="p-3 bg-surface-container rounded-xl border border-outline-variant/15 hover:border-primary/30 transition-all text-xs cursor-pointer group">
                      <span className="font-bold text-white group-hover:text-primary transition-colors block">
                        {node.n}
                      </span>
                      <span className="text-[10px] text-on-surface-variant block mt-1">
                        {node.t}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 uppercase mt-2 block">
                        ● {node.s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connected map mock area */}
              <div className="lg:col-span-3 glass-card rounded-2xl p-6 border border-outline-variant/25 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                      <Network className="w-4 h-4 text-primary" />
                      <span>Transnational Logistics Routing Network Mapping</span>
                    </h3>
                    <span className="text-xs text-on-surface-variant font-mono">MAP LEVEL v8</span>
                  </div>

                  <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                    Connecting cotton growers, textile factories, and agricultural produce exporters with premium wholesalers globally. Powered by airtight customs filings.
                  </p>

                  {/* High Fidelity Node Map Drawing */}
                  <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/20 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
                    
                    {/* Live network particles simulated lines */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20%" y1="30%" x2="50%" y2="60%" stroke="#abf2cb" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="50%" y1="60%" x2="80%" y2="40%" stroke="#abf2cb" strokeWidth="2" />
                        <line x1="80%" y1="40%" x2="85%" y2="80%" stroke="#abf2cb" strokeWidth="1" strokeDasharray="3,3" />
                        <line x1="20%" y1="30%" x2="80%" y2="40%" stroke="#abf2cb" strokeWidth="1" />
                        <circle cx="20%" cy="30%" r="4" fill="#abf2cb animate-pulse" />
                        <circle cx="50%" cy="60%" r="4" fill="#abf2cb" />
                        <circle cx="80%" cy="40%" r="4" fill="#abf2cb" />
                        <circle cx="85%" cy="80%" r="4" fill="#abf2cb animate-pulse" />
                      </svg>
                    </div>

                    <div className="flex justify-between items-start z-10">
                      <div className="p-3 bg-surface-container rounded-lg border border-outline-variant/25 max-w-[200px]">
                        <span className="text-[10px] font-mono text-primary block">NORTH AMERICA NODE</span>
                        <p className="text-[11px] font-bold text-white mt-1">Wisconsin & Delta Region</p>
                        <span className="text-[9px] text-on-surface-variant block mt-0.5">Primary organic cotton cotton picker nodes.</span>
                      </div>

                      <div className="p-3 bg-surface-container rounded-lg border border-outline-variant/25 max-w-[200px] text-right">
                        <span className="text-[10px] font-mono text-primary block">EUROPEAN HUB</span>
                        <p className="text-[11px] font-bold text-white mt-1">Rotterdam Terminal</p>
                        <span className="text-[9px] text-on-surface-variant block mt-0.5">Transit lock with deepwater cargo clearance.</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end z-10 pt-16">
                      <div className="p-3 bg-surface-container rounded-lg border border-outline-variant/25 max-w-[200px]">
                        <span className="text-[10px] font-mono text-primary block">LATIN AMERICA NODE</span>
                        <p className="text-[11px] font-bold text-white mt-1">Ecuador & Panama Canal</p>
                        <span className="text-[9px] text-on-surface-variant block mt-0.5">Vacuum packing banana storage logistics.</span>
                      </div>

                      <div className="p-3 bg-surface-container rounded-lg border border-outline-variant/25 max-w-[200px] text-right">
                        <span className="text-[10px] font-mono text-primary block">ASIA-PACIFIC TRANSIT</span>
                        <p className="text-[11px] font-bold text-white mt-1">Singapore Hub Node</p>
                        <span className="text-[9px] text-on-surface-variant block mt-0.5">Air freight premium priority produce links.</span>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-primary-container/5 p-4 rounded-xl border border-primary/20 gap-4">
                  <span className="text-xs text-on-surface-variant leading-relaxed">
                    Our interconnected routing systems allow you to combine raw cargo bulk sourcing (e.g. cotton fibers in bulk containers) with custom industrial packaging directly on route.
                  </span>
                  <button 
                    onClick={() => handleOpenQuoteForm(null)}
                    className="bg-primary hover:bg-primary-container text-on-primary font-bold text-xs py-2 px-5 rounded-full transition-all shrink-0 cursor-pointer"
                  >
                    Inquire Transcontinental Package
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER - STYLED SO VERY DETAILED AND CORPORATE */}
      <footer className="w-full pt-16 pb-8 bg-surface-container-lowest border-t border-outline-variant/20 mt-16 text-xs text-on-surface-variant">
        <div className="max-w-7xl mx-auto px-4 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2" id="footer-logo">
              <Factory className="w-6 h-6 text-primary" />
              <span className="font-title-md text-xl font-extrabold text-white tracking-tight">
                AgroTextile <span className="text-primary font-bold text-base font-mono">GLOBAL</span>
              </span>
            </div>
            <p className="text-on-surface-variant/80 text-sm leading-relaxed max-w-sm">
              Empowering global transoceanic trade with high-precision textile technology, certified sustainable raw cotton export pipelines, and weatherproof container wraps.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-mono text-[11px] uppercase tracking-widest">
              Industrial Solutions
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <button 
                  onClick={() => { setActiveTab("Sourcing"); setSelectedCategory("All Products"); }}
                  className="text-on-surface-variant hover:text-primary transition-colors text-left"
                >
                  Global Sourcing Hub
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("Compliance")}
                  className="text-on-surface-variant hover:text-primary transition-colors text-left"
                >
                  Trade & Customs Rules
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("Logistics")}
                  className="text-on-surface-variant hover:text-primary transition-colors text-left"
                >
                  Intermodal Logs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab("Sourcing"); handleLoadMoreProducts(); }}
                  className="text-on-surface-variant hover:text-primary transition-colors text-left"
                >
                  Technical Specification Sheets
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-mono text-[11px] uppercase tracking-widest">
              Resources
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <button 
                  onClick={() => setActiveTab("Sustainability")}
                  className="text-on-surface-variant hover:text-primary transition-colors text-left font-mono text-[11px]"
                >
                  Biodegradation trace reports
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("Sustainability")}
                  className="text-on-surface-variant hover:text-primary transition-colors text-left"
                >
                  Certified Organic GOTS Guidelines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setShareToast(true)}
                  className="text-on-surface-variant hover:text-primary transition-colors text-left"
                >
                  Terminal API Documentation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setShareToast(true)}
                  className="text-on-surface-variant hover:text-primary transition-colors text-left"
                >
                  Privacy Policy & Customs Disclosures
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-mono text-[11px] uppercase tracking-widest">
              Contact Connectivity
            </h4>
            <div className="flex flex-col gap-2.5 text-on-surface-variant/80">
              <p className="font-mono">Industrial Zone 4, Terminal West</p>
              <p className="font-bold text-white">hq@agrotextile-global.com</p>
              
              <div className="flex gap-3 mt-3">
                <button 
                  onClick={() => setShareToast(true)}
                  className="p-2 bg-surface-container hover:bg-primary hover:text-on-primary rounded-xl transition-all border border-outline-variant/15 text-primary"
                  title="Share platform"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab("Logistics")}
                  className="p-2 bg-surface-container hover:bg-primary hover:text-on-primary rounded-xl transition-all border border-outline-variant/15 text-primary"
                  title="Monitoring feeds"
                >
                  <Activity className="w-4 h-4 animate-pulse" />
                </button>
                <button 
                  onClick={() => setActiveTab("Sustainability")}
                  className="p-2 bg-surface-container hover:bg-primary hover:text-on-primary rounded-xl transition-all border border-outline-variant/15 text-primary"
                  title="Sustainability trace carbon points"
                >
                  <Leaf className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-16 mt-12 pt-8 border-t border-outline-variant/10 text-center text-on-surface-variant/60 font-mono text-[10px] flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© 2026 AgroTextile Global Industrial Connectivity. All rights reserved.</span>
          <span className="text-primary font-bold">SECURED TERMINAL LINKED // HIGH STRETCH SEAMLESS</span>
        </div>
      </footer>


      {/* MODAL 1: VIEW DETAILED TECHNICAL SPECIFICATIONS */}
      <AnimatePresence>
        {viewingSpecProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-dim/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container border border-outline-variant/35 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setViewingSpecProduct(null)}
                className="absolute top-4 right-4 p-2 bg-surface-container-high hover:bg-surface-container-highest rounded-full text-on-surface-variant hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Category Banner */}
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/10 text-primary border border-primary/20 rounded px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest font-extrabold">
                  {viewingSpecProduct.category}
                </span>
                <span className="text-xs text-on-surface-variant font-mono">
                  {viewingSpecProduct.tag}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {viewingSpecProduct.name}
              </h2>

              <p className="text-sm text-on-surface-variant/90 leading-relaxed mt-4">
                {viewingSpecProduct.details.technicalDescription}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">
                    Geographical Origin Region
                  </span>
                  <span className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-primary shrink-0" />
                    {viewingSpecProduct.details.origin}
                  </span>
                </div>

                <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">
                    Durability Index & Grade
                  </span>
                  <span className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-primary shrink-0" />
                    {viewingSpecProduct.details.durability}
                  </span>
                </div>

                <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">
                    Crop / Material Variety
                  </span>
                  <span className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-primary shrink-0" />
                    {viewingSpecProduct.details.variety}
                  </span>
                </div>

                <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">
                    Minimum Export Order (MOQ)
                  </span>
                  <span className="text-sm font-bold text-primary mt-1 flex items-center gap-1.5 font-mono">
                    <Package className="w-4 h-4 text-primary shrink-0" />
                    {viewingSpecProduct.details.minOrderQuantity}
                  </span>
                </div>
              </div>

              {/* List of Verified Trade Certifications */}
              <div className="mt-6 pt-5 border-t border-outline-variant/15">
                <span className="text-[10px] font-mono text-on-surface-variant/80 uppercase tracking-widest font-bold">
                  Verified Border & Quality Accreditation Certificates
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {viewingSpecProduct.details.certifications.map((cert) => (
                    <span 
                      key={cert} 
                      className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-md text-xs font-semibold flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Delivery specifications */}
              <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-surface-container-lowest/70 rounded-xl border border-outline-variant/20">
                <div className="flex gap-2.5 items-start">
                  <Clock className="w-4 h-4 text-primary shrink-0 stroke-[2.5]" />
                  <div>
                    <span className="text-[10.5px] font-mono text-on-surface-variant block uppercase leading-none mb-1">
                      ESTIMATED LEAD TIME
                    </span>
                    <span className="text-xs text-white font-bold block">{viewingSpecProduct.details.leadTime}</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <Package className="w-4 h-4 text-primary shrink-0 stroke-[2.5]" />
                  <div>
                    <span className="text-[10.5px] font-mono text-on-surface-variant block uppercase leading-none mb-1">
                      EXPORT PACKAGING STYLE
                    </span>
                    <span className="text-xs text-white font-bold block">{viewingSpecProduct.details.packaging}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Action triggers */}
              <div className="mt-8 flex gap-3 h-12">
                <button
                  onClick={() => {
                    const prod = viewingSpecProduct;
                    setViewingSpecProduct(null);
                    handleOpenQuoteForm(prod);
                  }}
                  className="flex-grow bg-primary hover:bg-primary-container text-on-primary font-bold text-sm px-6 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Configure Commercial Quote</span>
                </button>
                <button
                  onClick={() => {
                    setViewingSpecProduct(null);
                    setShareToast(true);
                  }}
                  className="px-4 border border-outline-variant/35 rounded-xl text-on-surface-variant hover:text-white hover:border-primary transition-all flex items-center justify-center cursor-pointer"
                  title="Share technical specification sheet link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* MODAL 2: INTERACTIVE CORPORATE QUOTE INQUIRY (REPLACES STATIC FORM) */}
      <AnimatePresence>
        {quoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-dim/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container border border-outline-variant/35 rounded-2xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => { setQuoteModalOpen(false); setQuoteFinished(null); }}
                className="absolute top-4 right-4 p-2 bg-surface-container-high hover:bg-surface-container-highest rounded-full text-on-surface-variant hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-primary/10 text-primary border border-primary/20 rounded px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest font-extrabold">
                  SECURE TRADE API GATEWAY
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  ● ENCRYPTION STABLE
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-1">
                Configure Commercial Quote
              </h2>
              <p className="text-xs text-on-surface-variant/80 mb-6">
                Receive an instantaneous, highly specialized commercial quote audit incorporating intermodal ocean shipment fees, quarantine clearances, and compliance certifications.
              </p>

              {!quoteFinished ? (
                <form onSubmit={handleCalculateQuote} className="space-y-4">
                  
                  {/* Select product dropdown matches */}
                  <div>
                    <label className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider block mb-1.5 font-bold">
                      Target Cargo Item
                    </label>
                    <select
                      className="w-full bg-surface-container-low text-white border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      value={quoteProduct?.id || ""}
                      onChange={(e) => {
                        const matched = availableProductsList.find(p => p.id === e.target.value);
                        if (matched) setQuoteProduct(matched);
                      }}
                    >
                      {availableProductsList.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity & Destination Hub flex */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider block mb-1.5 font-bold justify-between flex">
                        <span>Quantity Required</span>
                        <span className="text-primary font-bold">
                          {quoteQuantity.toLocaleString()} {quoteProduct?.category === "Fresh Produce" ? "Trawlers/Bags" : "SQM/Bales"}
                        </span>
                      </label>
                      <input
                        type="number"
                        min="100"
                        max="50000"
                        className="w-full bg-surface-container-low text-white border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={quoteQuantity}
                        onChange={(e) => setQuoteQuantity(Math.max(100, Number(e.target.value)))}
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider block mb-1.5 font-bold">
                        Destination Transit Terminal
                      </label>
                      <select
                        className="w-full bg-surface-container-low text-white border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={quoteDestination}
                        onChange={(e) => setQuoteDestination(e.target.value)}
                      >
                        <option value="Rotterdam Hub (NL)">Rotterdam Hub (Europe Ground Direct)</option>
                        <option value="Singapore Port (APAC)">Singapore Port Terminal (Asia Pacific)</option>
                        <option value="Seattle West Port (USA)">Seattle Harbor (North America Direct)</option>
                        <option value="Panama Lock Channel (LA)">Panama Lock Transit Terminal</option>
                      </select>
                    </div>
                  </div>

                  {/* Fast priority shipping checkout flag */}
                  <div className="bg-surface-container-lowest/60 p-4 rounded-xl border border-outline-variant/20 flex items-center justify-between">
                    <div className="flex gap-2.5 items-start">
                      <Flame className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
                      <div>
                        <span className="text-xs font-bold text-white block leading-tight">
                          Fast-Track Priority Customs Clearance
                        </span>
                        <p className="text-[11px] text-on-surface-variant mt-0.5 leading-normal">
                          Fast-tracks border quarantines, prioritizing immediate air/express sea-freight booking. Adds 15% priority cargo premium.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setQuoteUrgent(!quoteUrgent)}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors relative cursor-pointer ${quoteUrgent ? "bg-primary" : "bg-outline-variant"}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-surface-dim transition-transform duration-200 ${quoteUrgent ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>

                  {/* Custom Requests field */}
                  <div>
                    <label className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider block mb-1.5 font-bold">
                      Specialized Cargo Specifications / Requirements
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Requires GOTS carbon transaction code filed, custom 3-ply carton markings, pesticide-free residue batch audit, custom bale width 180cm..."
                      className="w-full bg-surface-container-low text-white border border-outline-variant/30 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none placeholder-on-surface-variant/40"
                      value={quoteCustomNotes}
                      onChange={(e) => setQuoteCustomNotes(e.target.value)}
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-4 flex gap-3">
                    <button
                      type="submit"
                      className="flex-grow bg-primary text-on-primary font-bold text-sm h-12 rounded-xl hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                    >
                      <Calculator className="w-4 h-4 stroke-[2.5]" />
                      <span>Compute Instant Quotation Sheet</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setQuoteModalOpen(false); setQuoteFinished(null); }}
                      className="px-5 border border-outline-variant/30 text-on-surface-variant rounded-xl hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>

                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="p-5 bg-emerald-950/20 border-2 border-primary/20 rounded-2xl flex items-start gap-3.5">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-white leading-tight">
                        Commercial Quotation Sheet Generated Successfully!
                      </h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                        Our centralized intermodal trade server has generated a binding price rating matching transoceanic logistics coefficients.
                      </p>
                    </div>
                  </div>

                  {/* Dynamic invoice card sheet printable style */}
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/25 font-mono text-xs text-white space-y-4 shadow-inner relative overflow-hidden">
                    
                    <div className="absolute top-2 right-2 opacity-5 pointer-events-none">
                      <Factory className="w-32 h-32 text-primary" />
                    </div>

                    <div className="flex justify-between items-start border-b border-outline-variant/20 pb-4">
                      <div>
                        <span className="text-[10px] text-primary tracking-widest font-bold block uppercase">
                          AGROTEXTILE GLOBAL TRADERS
                        </span>
                        <span className="text-[9px] text-on-surface-variant/70 mt-1 block">
                          GEN_CODE: US-WTO-S42
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-on-surface-variant/70 uppercase font-bold block">
                          QUOTE SHEET NUMBER
                        </span>
                        <span className="text-xs text-primary font-bold tracking-wide mt-1 block">
                          {quoteFinished.invoiceNumber}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Selected Goods:</span>
                        <span className="text-white font-bold">{quoteFinished.productName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Class Category:</span>
                        <span className="text-secondary">{quoteFinished.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Shipment Cargo Origin:</span>
                        <span className="text-on-surface-variant">{quoteFinished.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Contract Total Quantity:</span>
                        <span className="text-white font-bold">{quoteFinished.quantity.toLocaleString()} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">FOB Base Price per Unit:</span>
                        <span className="text-white">${quoteFinished.unitPrice} USD</span>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-outline-variant/25 pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">FOB Goods Subtotal:</span>
                        <span className="text-white">${quoteFinished.itemSubtotal} USD</span>
                      </div>
                      {Number(quoteFinished.urgencyPremium) > 0 && (
                        <div className="flex justify-between text-amber-300">
                          <span>Urgency Fast-Track Clearance (15%):</span>
                          <span>+${quoteFinished.urgencyPremium} USD</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Intermodal Ocean Freight:</span>
                        <span className="text-white">+${quoteFinished.freightCost} USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Quarantine & Compliance Fee:</span>
                        <span className="text-white">+${quoteFinished.complianceSurcharge} USD</span>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-4 flex justify-between items-center bg-surface-container-lowest/40 -mx-6 -mb-6 px-6 py-4 rounded-b-2xl">
                      <span className="text-xs font-sans font-bold text-white uppercase">
                        CONTRACTUAL GRAND TOTAL (FOB + CIF)
                      </span>
                      <span className="text-lg text-primary font-bold tracking-wide font-mono">
                        ${quoteFinished.grandTotal} USD
                      </span>
                    </div>

                  </div>

                  {/* Delivery ETA indicator block */}
                  <div className="bg-surface-container-lowest/80 p-4 rounded-xl border border-outline-variant/15 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Dispatched Transit Port:</span>
                      <span className="text-white font-bold">{quoteFinished.shippingTerminal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Calculated Cargo ETA:</span>
                      <span className="text-primary font-bold">{quoteFinished.estimatedDeliveryDays}</span>
                    </div>
                    {quoteCustomNotes && (
                      <div className="pt-2 border-t border-outline-variant/10 text-on-surface-variant/80 italic">
                        <span className="font-bold text-[10px] uppercase text-white font-mono block not-italic">Custom Instructions Registered:</span>
                        &ldquo;{quoteCustomNotes}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Final Action checkout / link indicators */}
                  <div className="pt-4 flex gap-3 h-12">
                    <button
                      onClick={() => {
                        setQuoteFinished(null);
                        setQuoteModalOpen(false);
                        setShareToast(true);
                      }}
                      className="flex-grow bg-primary text-on-primary font-bold text-sm rounded-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/25"
                    >
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Lock Contract & Dispatch Document</span>
                    </button>
                    <button
                      onClick={() => setQuoteFinished(null)}
                      className="px-5 border border-outline-variant/35 text-on-surface-variant hover:text-white rounded-xl transition-colors"
                    >
                      Edit Order
                    </button>
                  </div>

                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
