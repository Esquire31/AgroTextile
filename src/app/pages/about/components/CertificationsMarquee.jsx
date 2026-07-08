'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Leaf, ShieldCheck, Factory, Award, Globe2, ArrowRight } from 'lucide-react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export default function CertificationsMarquee() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const certifications = [
    { Icon: BadgeCheck, name: formatMessage({ id: 'app.pages.about.certifications.cert.iso' }) },
    { Icon: Leaf, name: formatMessage({ id: 'app.pages.about.certifications.cert.globalgap' }) },
    { Icon: ShieldCheck, name: formatMessage({ id: 'app.pages.about.certifications.cert.haccp' }) },
    { Icon: Factory, name: formatMessage({ id: 'app.pages.about.certifications.cert.sa8000' }) },
    { Icon: Award, name: formatMessage({ id: 'app.pages.about.certifications.cert.organic_cotton' }) },
    { Icon: Globe2, name: formatMessage({ id: 'app.pages.about.certifications.cert.fair_trade' }) },
  ];

  return (
    // <section
    //   className="py-16 sm:py-24 border-y overflow-hidden bg-surface-container-low relative"
    //   style={{ borderColor: 'radial-gradient(circle at 85% 15%, color-mix(in srgb, var(--color-primary) 10%, transparent), transparent 55%)' }}
    // >
      <div className="px-margin-mobile sm:px-margin-desktop max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Certifications: static grid, no marquee */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-label-sm text-primary uppercase tracking-widest mb-2">
            {formatMessage({ id: 'app.pages.about.certifications.eyebrow' })}
          </h3>
          <h2 className="font-title-md text-title-md text-on-surface mb-8">
            {formatMessage({ id: 'app.pages.about.certifications.title' })}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
            {certifications.map(({ Icon, name }, index) => (
              <div
                key={index}
                className="glass-card flex flex-col items-center justify-center gap-2.5 rounded-2xl p-5 text-center"
              >
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <span 
                  className="font-title-md text-[11px] sm:text-xs font-bold text-on-surface leading-tight"
                  dangerouslySetInnerHTML={{ __html: name }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 text-center lg:text-left mt-22"
        >
          <h2 className="font-title-md text-title-md text-on-surface mb-3">
            {formatMessage({ id: 'app.pages.about.cta.title' })}
          </h2>
          <p className="text-on-surface-variant font-body-md mb-8 max-w-md mx-auto lg:mx-0">
            {formatMessage({ id: 'app.pages.about.cta.subtitle' })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate('/products')}
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
            >
              {formatMessage({ id: 'app.pages.about.cta.btn_start_sourcing' })}
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border border-outline bg-card-bg text-on-surface px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-on-primary transition-colors"
            >
              {formatMessage({ id: 'app.pages.about.cta.btn_contact_us' })}
            </button>
          </div>
        </motion.div>
      </div>
    // </section>
  );
}