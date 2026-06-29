'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntl } from 'react-intl';

export default function FAQSection() {
  const { formatMessage } = useIntl();
  const [openId, setOpenId] = useState(null);

  const faqs = [
    {
      id: 0,
      q: formatMessage({ id: 'app.pages.contact.faq.q1.question' }),
      a: formatMessage({ id: 'app.pages.contact.faq.q1.answer' }),
    },
    {
      id: 1,
      q: formatMessage({ id: 'app.pages.contact.faq.q2.question' }),
      a: formatMessage({ id: 'app.pages.contact.faq.q2.answer' }),
    },
    {
      id: 2,
      q: formatMessage({ id: 'app.pages.contact.faq.q3.question' }),
      a: formatMessage({ id: 'app.pages.contact.faq.q3.answer' }),
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
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest block mb-4">{formatMessage({ id: 'app.pages.contact.faq.eyebrow' })}</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">{formatMessage({ id: 'app.pages.contact.faq.title' })}</h2>
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