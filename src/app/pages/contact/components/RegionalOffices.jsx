'use client';

import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';

export default function RegionalOffices() {
  const { formatMessage } = useIntl();
  const office = {
    title: formatMessage({ id: 'app.pages.contact.offices.hq.title' }),
    badge: formatMessage({ id: 'app.pages.contact.offices.hq.badge' }),
    description: formatMessage({ id: 'app.pages.contact.offices.hq.description' }),
    details: [
      { type: 'location', value: formatMessage({ id: 'app.pages.contact.offices.hq.detail.location' }) },
      { type: 'phone', value: formatMessage({ id: 'app.pages.contact.offices.hq.detail.phone' }) },
      { type: 'email', value: formatMessage({ id: 'app.pages.contact.offices.hq.detail.email' }) },
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
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">{formatMessage({ id: 'app.pages.contact.offices.title' })}</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">{formatMessage({ id: 'app.pages.contact.offices.subtitle' })}</p>
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
              title={formatMessage({ id: 'app.pages.contact.offices.hq.map_title' })}
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
                const DetailIcon = detail.type === 'location' ? MapPin : detail.type === 'email' ? Mail : Phone;
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