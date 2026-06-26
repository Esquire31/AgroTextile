'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const faqs = [
    {
      id: 0,
      q: 'What is the minimum order quantity for international textile exports?',
      a: 'Our standard MOQ starts at 500 meters for technical fabrics and 2,000 units for finished industrial products. Custom ESG-compliant sourcing may have different requirements based on the raw material availability.',
    },
    {
      id: 1,
      q: 'How do you manage cold-chain logistics for fruit procurement?',
      a: 'We utilize IoT-enabled reefer containers that provide real-time temperature and humidity tracking. Our logistics hub in Mumbai acts as the primary consolidation point for rapid air and sea dispatch.',
    },
    {
      id: 2,
      q: 'Do you provide ESG and sustainability certification reports?',
      a: 'Yes, all our textile products come with detailed ESG compliance reports, including carbon footprint analysis and ethical labor audits conducted by third-party global agencies.',
    },
  ];

  return (
    <section className="py-section-gap">
      <div className="max-w-3xl mx-auto px-margin-mobile sm:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest block mb-4">Buyer Resources</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">International Buyer FAQ</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: faq.id * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full p-4 sm:p-6 text-left flex justify-between items-center gap-4 hover:bg-surface-container transition-colors"
              >
                <span className="font-title-md text-body-lg font-bold text-on-surface">{faq.q}</span>
                <motion.div
                  className="shrink-0"
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-primary" size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 sm:p-6 pt-0 text-on-surface-variant border-t"
                    style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 10%, transparent)' }}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}