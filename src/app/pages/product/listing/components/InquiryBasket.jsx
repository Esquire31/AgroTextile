import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { X, Trash2, Send, Briefcase, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function InquiryBasket({
  isOpen,
  onClose,
  basket,
  onUpdateQuantity,
  onUpdateNotes,
  onRemoveItem,
  onClearBasket,
}) {
  const { formatMessage } = useIntl();
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [targetLeadTime, setTargetLeadTime] = useState('Standard');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryCode, setInquiryCode] = useState('');

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    if (basket.length === 0) return;

    const randomInqCode = 'INQ-' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(100 + Math.random() * 900);
    setInquiryCode(randomInqCode);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setCompanyName('');
      setTargetLeadTime('Standard');
      onClearBasket();
      onClose();
    }, 4500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[100] cursor-pointer"
          />

          {/* Basket Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-surface-container-high border-l border-outline-variant/30 z-[101] overflow-y-auto shadow-2xl p-6 flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                      {formatMessage({ id: 'app.products.inquiry.basket.title' })}
                    </span>
                    <h2 className="text-lg font-bold text-on-surface">
                      {formatMessage({ id: 'app.products.inquiry.basket.subtitle' })}
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

              {/* Inquiry Items Grid */}
              {isSubmitted ? (
                /* Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center border border-secondary/30 mx-auto">
                    <FileSpreadsheet className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-on-surface font-sans">
                      {formatMessage({ id: 'app.products.inquiry.basket.success' })}
                    </h3>
                    <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
                      {formatMessage({ id: 'app.products.inquiry.basket.success_subtext' })}
                    </p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant/10 rounded-lg p-3 max-w-[240px] mx-auto">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase block">RFQ REFERENCE:</span>
                    <span className="font-mono text-sm font-bold text-primary">{inquiryCode}</span>
                  </div>
                </motion.div>
              ) : basket.length === 0 ? (
                /* Empty Basket View */
                <div className="text-center py-20 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mx-auto text-on-surface-variant">
                    <Briefcase className="w-6 h-6 opacity-40" />
                  </div>
                  <p className="text-sm text-on-surface-variant">{formatMessage({ id: 'app.products.inquiry.basket.empty' })}</p>
                  <button
                    onClick={onClose}
                    className="text-xs text-primary font-bold hover:underline cursor-pointer"
                  >
                    {formatMessage({ id: 'app.products.inquiry.basket.empty_subtext' })}
                  </button>
                </div>
              ) : (
                /* Active Basket Items */
                <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-1">
                  {basket.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-surface-container-low border border-outline-variant/10 p-3.5 rounded-xl space-y-3"
                    >
                      <div className="flex gap-3 justify-between items-start">
                        {/* Thumbnail & Title */}
                        <div className="flex gap-2.5">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-10 h-10 object-cover rounded bg-surface-container"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-on-surface font-sans max-w-[180px] truncate">
                              {item.product.title}
                            </h4>
                            <span className="text-[10px] font-mono text-on-surface-variant uppercase">
                              {item.product.specs.label1}: {item.product.specs.value1}
                            </span>
                          </div>
                        </div>

                        {/* Remove item */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1"
                          title="Remove from inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Increments */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-on-surface-variant uppercase">
                          {formatMessage({ id: 'app.products.inquiry.basket.quantity' })}:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 rounded bg-surface-container-highest flex items-center justify-center font-bold text-xs text-on-surface cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs font-bold text-primary w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-surface-container-highest flex items-center justify-center font-bold text-xs text-on-surface cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Custom specification comments */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-on-surface-variant uppercase block">
                          Technical Customization / Notes:
                        </label>
                        <input
                          type="text"
                          placeholder={formatMessage({ id: 'app.products.inquiry.basket.notes_placeholder' })}
                          value={item.notes}
                          onChange={(e) => onUpdateNotes(item.product.id, e.target.value)}
                          className="w-full bg-surface-container/60 border border-outline-variant/10 px-2 py-1.5 rounded text-[10px] text-on-surface focus:outline-none focus:border-primary/50"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sourcing Submission Form */}
            {!isSubmitted && basket.length > 0 && (
              <form onSubmit={handleSubmitInquiry} className="mt-8 pt-6 border-t border-outline-variant/20 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Business Email
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="procurement@corp.com"
                      className="w-full bg-surface-container/30 border border-outline-variant/20 px-3 py-2.5 rounded-lg text-xs focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Target Lead Time
                    </label>
                    <select
                      value={targetLeadTime}
                      onChange={(e) => setTargetLeadTime(e.target.value)}
                      className="w-full bg-surface-container/30 border border-outline-variant/20 px-3 py-2.5 rounded-lg text-xs focus:outline-none focus:border-primary transition-all cursor-pointer"
                    >
                      <option value="Standard">Standard</option>
                      <option value="Urgent">Urgent (Express)</option>
                      <option value="LongTerm">Annual Contract</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 pb-2">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Institutional Entity
                  </label>
                  <input
                    required
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company Name LLC"
                    className="w-full bg-surface-container/30 border border-outline-variant/20 px-3 py-2.5 rounded-lg text-xs focus:outline-none focus:border-primary transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={onClearBasket}
                    className="py-3 px-4 rounded-full border border-outline-variant/20 text-xs font-bold text-on-surface-variant hover:bg-surface-container-highest transition-all cursor-pointer"
                  >
                    {formatMessage({ id: 'app.products.inquiry.basket.clear' })}
                  </button>
                  <button
                    type="submit"
                    className="py-3 px-4 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-dark transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {formatMessage({ id: 'app.products.inquiry.basket.submit' })}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
