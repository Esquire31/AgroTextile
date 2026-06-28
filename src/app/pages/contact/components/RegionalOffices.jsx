'use client';

import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegionalOffices() {
  const office = {
    title: 'Surat Headquarters',
    badge: 'Global HQ',
    description:
      'Our flagship operations center for textile manufacturing, agro-export coordination, and industrial trade policy — managing sourcing, logistics, and compliance across all regional hubs from a single strategic base in Gujarat.',
    details: [
      { label: 'Location', value: 'Ring Road, Surat, Gujarat, India', useIcon: true },
      { label: 'Phone', value: '+91 (261) 400-GLOBAL', useIcon: false },
      { label: 'Email', value: 'global.trade@agrotextile.com', useIcon: false },
    ],
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-section-gap bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-margin-mobile sm:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Regional Strategic Hubs</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">Connecting local industrial excellence to the global trade map.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="group glass-panel rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 grid md:grid-cols-2"
        >
          {/* Map side — occupies the space the other two cards used to fill */}
          <div className="relative h-64 md:h-auto min-h-80 overflow-hidden">
            <iframe
              title="Surat Headquarters Location"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Surat,Gujarat,India&z=12&output=embed"
            ></iframe>
            <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-bold pointer-events-none">
              {office.badge}
            </div>
          </div>

          {/* Details side */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <h3 className="font-title-md text-title-md text-on-surface mb-2">{office.title}</h3>
            <p className="text-on-surface-variant text-body-md mb-6">{office.description}</p>
            <div className="space-y-3 font-body-md">
              {office.details.map((detail, didx) => {
                const DetailIcon = detail.useIcon ? MapPin : detail.label === 'Email' ? Mail : Phone;
                return (
                  <div key={didx} className="flex items-center gap-3">
                    <DetailIcon className="text-primary text-lg w-5 h-5 shrink-0" />
                    <span className="text-on-surface">{detail.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}