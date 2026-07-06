import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { X, Download, Send, Check, FileText, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TechSheetDrawer({
  product,
  isOpen,
  onClose,
  onAddToBasket,
}) {
  const { formatMessage } = useIntl();
  const [downloading, setDownloading] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  
  // Customization Options
  const [includeCert, setIncludeCert] = useState(true);
  const [includeLabNotes, setIncludeLabNotes] = useState(true);
  const [includeFreightEstimates, setIncludeFreightEstimates] = useState(false);

  if (!product) return null;

  const handleDownload = () => {
    setDownloading(true);
    setDownloadCompleted(false);
    setTimeout(() => {
      setDownloading(false);
      setDownloadCompleted(true);
    }, 1800);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!email) return;
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setEmail('');
    }, 4000);
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

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:max-w-2xl bg-surface-container-high border-l border-outline-variant/30 z-[101] overflow-y-auto shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10 border border-primary/20">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                      {formatMessage({ id: 'app.products.techsheet.title' })}
                    </span>
                    <h2 className="text-xl font-bold text-on-surface font-sans">
                      {product.title}
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

              {/* Lab Specification Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-primary mb-3">
                    {formatMessage({ id: 'app.products.techsheet.lab_analysis' })}
                  </h3>
                  <div className="bg-surface-container-low border border-outline-variant/10 p-4 rounded-lg font-mono text-xs text-on-surface-variant leading-relaxed">
                    <div className="text-primary font-semibold mb-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block"></span>
                      SYSTEM VERIFICATION REPORT
                    </div>
                    {product.details.laboratoryReport}
                  </div>
                </div>

                {/* Technical Specifications Matrix */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-primary mb-3">
                    {formatMessage({ id: 'app.products.techsheet.matrix' })}
                  </h3>
                  <div className="grid grid-cols-2 gap-px bg-outline-variant/20 rounded-lg overflow-hidden border border-outline-variant/20 font-sans text-sm">
                    <div className="bg-surface-container-lowest p-3 font-semibold text-on-surface-variant">Country of Origin</div>
                    <div className="bg-surface-container-lowest p-3 text-on-surface">{product.details.origin}</div>
                    
                    <div className="bg-surface-container-low p-3 font-semibold text-on-surface-variant">Quality Grade</div>
                    <div className="bg-surface-container-low p-3 text-on-surface">{product.details.grade}</div>

                    {product.details.material && (
                      <>
                        <div className="bg-surface-container-lowest p-3 font-semibold text-on-surface-variant">Primary Material</div>
                        <div className="bg-surface-container-lowest p-3 text-on-surface">{product.details.material}</div>
                      </>
                    )}

                    {product.details.ripeness && (
                      <>
                        <div className="bg-surface-container-lowest p-3 font-semibold text-on-surface-variant">Optimal Ripeness</div>
                        <div className="bg-surface-container-lowest p-3 text-on-surface">{product.details.ripeness}</div>
                      </>
                    )}

                    <div className="bg-surface-container-low p-3 font-semibold text-on-surface-variant">Minimum Order Qty</div>
                    <div className="bg-surface-container-low p-3 text-on-surface font-mono text-xs">{product.details.minOrderQuantity}</div>

                    <div className="bg-surface-container-lowest p-3 font-semibold text-on-surface-variant">Standard Lead Time</div>
                    <div className="bg-surface-container-lowest p-3 text-on-surface">{product.details.leadTime}</div>

                    <div className="bg-surface-container-low p-3 font-semibold text-on-surface-variant">Global HS Code</div>
                    <div className="bg-surface-container-low p-3 text-on-surface font-mono text-xs">{product.details.hsnCode}</div>
                  </div>
                </div>

                {/* Certifications & Compliances */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-primary mb-2.5">
                    Regulatory Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.details.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Options customizer */}
                <div className="border-t border-outline-variant/10 pt-4 mt-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-primary mb-3">
                    {formatMessage({ id: 'app.products.techsheet.customizer' })}
                  </h3>
                  <div className="space-y-2 text-sm font-sans">
                    <label className="flex items-center gap-3 text-on-surface-variant hover:text-on-surface cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includeCert}
                        onChange={(e) => setIncludeCert(e.target.checked)}
                        className="rounded border-outline-variant/30 text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container-lowest w-4 h-4"
                      />
                      Include original quality certificates (GOTS, BCI, GLOBAL G.A.P.)
                    </label>
                    <label className="flex items-center gap-3 text-on-surface-variant hover:text-on-surface cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includeLabNotes}
                        onChange={(e) => setIncludeLabNotes(e.target.checked)}
                        className="rounded border-outline-variant/30 text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container-lowest w-4 h-4"
                      />
                      Include complete chromatography and pesticide lab records
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="mt-8 pt-8 border-t border-outline-variant/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className={`w-full py-3 px-6 rounded-full font-bold flex items-center justify-center gap-2.5 transition-all text-xs border border-primary/20 hover:border-primary/50 text-primary cursor-pointer ${
                    downloading ? 'bg-primary/5 italic opacity-60' : 'bg-primary/10 hover:bg-primary/20'
                  }`}
                >
                  {downloading ? (
                    'GENERATING PDF...'
                  ) : downloadCompleted ? (
                    <>
                      <Check className="w-4 h-4" /> RE-DOWNLOAD
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> {formatMessage({ id: 'app.products.techsheet.download' })}
                    </>
                  )}
                </button>
                <p className="text-[10px] text-on-surface-variant text-center opacity-70">
                  {formatMessage({ id: 'app.products.techsheet.download_subtext' })}
                </p>
              </div>

              <div className="space-y-3">
                <form onSubmit={handleSendEmail} className="relative group">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={formatMessage({ id: 'app.products.techsheet.email_placeholder' })}
                    className="w-full bg-surface-container-low border border-outline-variant/20 px-4 py-3 rounded-full text-xs text-on-surface focus:outline-none focus:border-primary transition-all pr-12"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-dark transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                {emailSent && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-secondary font-bold text-center"
                  >
                    {formatMessage({ id: 'app.products.techsheet.email_success' })}
                  </motion.p>
                )}
              </div>

              <button
                onClick={() => {
                  onAddToBasket(product, 1);
                  onClose();
                }}
                className="sm:col-span-2 mt-2 w-full py-4 rounded-full bg-on-surface text-surface-container-high font-bold flex items-center justify-center gap-3 hover:bg-on-surface-variant transition-colors cursor-pointer text-sm shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                {formatMessage({ id: 'app.products.techsheet.add_to_basket' })}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
