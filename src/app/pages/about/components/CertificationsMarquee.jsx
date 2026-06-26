'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Leaf, ShieldCheck, Factory, Award } from 'lucide-react';

const certifications = [
  { Icon: BadgeCheck, name: 'ISO 9001:2015' },
  { Icon: Leaf, name: 'GlobalGAP' },
  { Icon: ShieldCheck, name: 'HACCP Certified' },
  { Icon: Factory, name: 'SA8000' },
  { Icon: Award, name: 'Organic Cotton Std' },
];

export default function CertificationsMarquee() {
  return (
    <section
      className="py-24 border-y overflow-hidden bg-surface-container-low relative"
      style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 10%, transparent)' }}
    >
      {/* Quiet brand glow to tie into the glass aesthetic used
          elsewhere on the site, rather than a flat plain band. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 15% 50%, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent 60%)',
        }}
      ></div>

      <motion.div
        className="px-margin-mobile sm:px-margin-desktop mb-12 flex justify-between items-end relative z-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div>
          <h3 className="font-label-sm text-primary uppercase tracking-widest mb-2">Industrial Trust</h3>
          <h2 className="font-title-md text-title-md text-on-surface">Globally Certified Standards</h2>
        </div>
      </motion.div>

      <div className="marquee relative z-10">
        <motion.div
          className="marquee-content"
          animate={{ x: [0, -100] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {[...certifications, ...certifications].map((cert, index) => {
            const Icon = cert.Icon;
            return (
              <motion.div
                key={index}
                className="glass-card flex flex-col items-center justify-center gap-3 px-10 py-8 rounded-2xl flex-shrink-0 opacity-60 hover:opacity-100 transition-all cursor-default"
                whileHover={{ scale: 1.04, y: -4 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <span className="font-title-md text-sm font-bold text-on-surface text-center whitespace-nowrap">
                  {cert.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}