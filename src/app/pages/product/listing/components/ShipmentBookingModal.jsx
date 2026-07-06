import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { X, ChevronRight, ChevronLeft, Anchor, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PORTS = [
  { code: 'RTM', name: 'Port of Rotterdam', country: 'Netherlands', costFactor: 1.0, transitDaysAgro: 14, transitDaysTextile: 18 },
  { code: 'SIN', name: 'Port of Singapore', country: 'Singapore', costFactor: 1.15, transitDaysAgro: 10, transitDaysTextile: 12 },
  { code: 'LGB', name: 'Port of Long Beach', country: 'USA', costFactor: 1.45, transitDaysAgro: 22, transitDaysTextile: 28 },
  { code: 'DXB', name: 'Jebel Ali Port', country: 'UAE', costFactor: 0.9, transitDaysAgro: 6, transitDaysTextile: 8 },
  { code: 'SHA', name: 'Port of Shanghai', country: 'China', costFactor: 1.1, transitDaysAgro: 12, transitDaysTextile: 15 },
  { code: 'MUM', name: 'Nhava Sheva Port', country: 'India', costFactor: 0.85, transitDaysAgro: 4, transitDaysTextile: 6 },
];

export default function ShipmentBookingModal({
  product,
  isOpen,
  onClose,
}) {
  const { formatMessage } = useIntl();
  const [step, setStep] = useState(1);
  const [volume, setVolume] = useState(24); // in metric tons
  const [containerType, setContainerType] = useState('Standard');
  const [selectedPortCode, setSelectedPortCode] = useState('RTM');
  const [targetTemp, setTargetTemp] = useState(12); // degrees celsius
  
  // Contact details
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  
  // Confirmation state
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Set default container types based on category
  useEffect(() => {
    if (product) {
      if (product.category === 'Agro') {
        setContainerType('Reefer');
        if (product.id === 'prod-2') setTargetTemp(12); // Mangoes
        if (product.id === 'prod-4') setTargetTemp(6);  // Pomegranates
      } else {
        setContainerType('Standard');
      }
      setConfirmed(false);
      setStep(1);
    }
  }, [product, isOpen]);

  if (!product) return null;

  const currentPort = PORTS.find(p => p.code === selectedPortCode) || PORTS[0];

  // Calculate pricing & logistics metrics
  const minRequiredMts = parseFloat(product.details.minOrderQuantity);
  const actualVolume = Math.max(volume, isNaN(minRequiredMts) ? 1 : minRequiredMts);
  const containersCount = Math.ceil(actualVolume / 20); // 20 MT per container max

  const ratePerContainer = containerType === 'Reefer' ? 5800 : 3800;
  const estimatedFreight = containersCount * ratePerContainer * currentPort.costFactor;
  const transitDays = product.category === 'Agro' ? currentPort.transitDaysAgro : currentPort.transitDaysTextile;
  const carbonOffset = actualVolume * 15; // $15 per ton
  const totalInvoice = estimatedFreight + carbonOffset;

  const handleNextStep = () => {
    if (step < 3) setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const randomRef = 'BK-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setConfirmed(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[100] cursor-pointer"
          />

          {/* Dialog Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] bg-surface-container border border-outline-variant/30 rounded-2xl z-[101] overflow-y-auto p-6 md:p-8 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <Anchor className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                    {formatMessage({ id: 'app.products.booking.title' })}
                  </span>
                  <h2 className="text-lg md:text-xl font-bold text-on-surface">
                    Seasonal Booking: <span className="font-serif italic font-medium">{product.title}</span>
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Status Indicators */}
            {!confirmed && (
              <div className="flex items-center justify-between mb-8 px-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full font-bold ${step >= 1 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>1</span>
                  <span className={step >= 1 ? 'text-on-surface font-semibold' : 'text-on-surface-variant'}>Cargo</span>
                </div>
                <div className="w-12 h-px bg-outline-variant/30 flex-1 mx-3" />
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full font-bold ${step >= 2 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>2</span>
                  <span className={step >= 2 ? 'text-on-surface font-semibold' : 'text-on-surface-variant'}>Route</span>
                </div>
                <div className="w-12 h-px bg-outline-variant/30 flex-1 mx-3" />
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full font-bold ${step >= 3 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>3</span>
                  <span className={step >= 3 ? 'text-on-surface font-semibold' : 'text-on-surface-variant'}>Confirm</span>
                </div>
              </div>
            )}

            {/* Main Interactive Container */}
            <div className="flex-1 min-h-[250px] mb-6">
              {confirmed ? (
                /* Confirmation Receipt View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-6"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center border border-secondary/30">
                    <CheckCircle className="w-10 h-10 text-secondary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-on-surface font-sans">
                      {formatMessage({ id: 'app.products.booking.success' })}
                    </h3>
                    <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                      {formatMessage({ id: 'app.products.booking.success_subtext' })}
                    </p>
                  </div>

                  {/* Summary Invoice Box */}
                  <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-6 text-left max-w-md mx-auto space-y-3 font-mono text-xs">
                    <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                      <span className="text-on-surface-variant uppercase">Booking Ref:</span>
                      <span className="text-primary font-bold">{bookingRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Product:</span>
                      <span className="text-on-surface truncate max-w-[200px]">{product.title}</span>
                    </div>
                    <div className="flex justify-between border-t border-outline-variant/10 pt-2 text-sm">
                      <span className="text-on-surface uppercase font-bold">Estimated Invoice:</span>
                      <span className="text-primary font-bold">${totalInvoice.toLocaleString()} USD</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={onClose}
                      className="py-3 px-8 rounded-full bg-on-surface text-surface-container-high font-bold hover:bg-on-surface-variant transition-colors cursor-pointer text-xs"
                    >
                      {formatMessage({ id: 'app.products.booking.close' })}
                    </button>
                  </div>
                </motion.div>
              ) : step === 1 ? (
                /* Step 1: Cargo Configuration */
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                        Target Shipment Mass (Metric Tons)
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min={minRequiredMts}
                          max="200"
                          step="1"
                          value={volume}
                          onChange={(e) => setVolume(parseInt(e.target.value))}
                          className="flex-1 accent-primary h-1.5 bg-outline-variant/20 rounded-lg cursor-pointer"
                        />
                        <span className="font-mono text-lg font-bold text-primary w-16 text-right">{volume}t</span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant">
                        MOQ for this item: {product.details.minOrderQuantity}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                        Container Optimization
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setContainerType('Standard')}
                          className={`flex-1 py-2.5 rounded-lg border text-xs font-bold transition-all ${containerType === 'Standard' ? 'bg-primary/10 border-primary text-primary' : 'border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-highest'}`}
                        >
                          Dry Standard
                        </button>
                        <button
                          onClick={() => setContainerType('Reefer')}
                          className={`flex-1 py-2.5 rounded-lg border text-xs font-bold transition-all ${containerType === 'Reefer' ? 'bg-secondary/10 border-secondary text-secondary' : 'border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-highest'}`}
                        >
                          Climate-Control
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : step === 2 ? (
                /* Step 2: Logistics Route selection */
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-3">
                    Select Destination Port
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-2">
                    {PORTS.map(port => (
                      <button
                        key={port.code}
                        onClick={() => setSelectedPortCode(port.code)}
                        className={`text-left p-3.5 rounded-xl border transition-all ${selectedPortCode === port.code ? 'bg-primary/10 border-primary shadow-sm' : 'border-outline-variant/10 hover:border-outline-variant/30 text-on-surface-variant'}`}
                      >
                        <div className="flex justify-between items-start">
                          <span className={`text-xs font-bold ${selectedPortCode === port.code ? 'text-primary' : 'text-on-surface'}`}>{port.name}</span>
                          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-surface-container-highest uppercase">{port.code}</span>
                        </div>
                        <p className="text-[10px] opacity-70 mt-0.5">{port.country}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Step 3: Confirmation */
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase">Institution</label>
                        <input
                          required
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline-variant/20 px-3 py-2.5 rounded-lg text-xs"
                          placeholder="Global Trade LLC"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase">Contact Name</label>
                        <input
                          required
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline-variant/20 px-3 py-2.5 rounded-lg text-xs"
                          placeholder="Jane Smith"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Work Email</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/20 px-3 py-2.5 rounded-lg text-xs"
                        placeholder="jsmith@globaltrade.com"
                      />
                    </div>
                  </form>
                </motion.div>
              )}
            </div>

            {/* Modal Controls */}
            {!confirmed && (
              <div className="pt-6 border-t border-outline-variant/20 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-on-surface-variant uppercase font-mono">Running Est.</span>
                  <span className="text-xl font-bold text-primary">${totalInvoice.toLocaleString()} <span className="text-[10px] font-medium text-on-surface-variant">USD</span></span>
                </div>
                <div className="flex gap-3">
                  {step > 1 && (
                    <button
                      onClick={handlePrevStep}
                      className="p-3 rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      onClick={handleNextStep}
                      className="py-3 px-8 rounded-full bg-primary text-on-primary font-bold flex items-center gap-2 hover:bg-primary-dark transition-all cursor-pointer shadow-lg shadow-primary/20 text-sm"
                    >
                      {formatMessage({ id: 'app.products.booking.next' })} <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleConfirm}
                      className="py-3 px-8 rounded-full bg-on-surface text-surface-container-high font-bold flex items-center gap-2 hover:bg-on-surface-variant transition-all cursor-pointer shadow-lg text-sm"
                    >
                      {formatMessage({ id: 'app.products.booking.confirm' })}
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
