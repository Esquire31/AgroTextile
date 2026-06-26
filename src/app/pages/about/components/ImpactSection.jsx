'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Sprout } from 'lucide-react';

// Animated count-up for the stat numbers — a small, premium touch
// (Stripe/Linear-style) that makes the section feel alive rather
// than static text. Parses the numeric portion out of strings like
// "85%" or "12k+" so the data shape doesn't need to change. Driven
// by requestAnimationFrame directly rather than relying on a
// possibly-version-specific imperative `animate()` import.
function AnimatedStat({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState('0');

  const match = value.match(/^([\d.]+)(.*)$/);
  const numericPart = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const isDecimal = numericPart % 1 !== 0;

  useEffect(() => {
    if (!isInView) return;

    const duration = 1400;
    const start = performance.now();
    let frameId;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericPart * eased;
      setDisplay(isDecimal ? current.toFixed(1) : String(Math.round(current)));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, numericPart, isDecimal]);

  return (
    <span ref={ref} className="tabular-nums text-display-lg text-on-secondary font-bold">
      {display}
      {suffix}
    </span>
  );
}

export default function ImpactSection() {
  const impactCards = [
    {
      title: 'Gujarat Textile Initiative',
      description: 'Empowering over 15,000 cotton farmers through regenerative agriculture and zero-waste processing facilities in Ahmedabad.',
    },
    {
      title: 'Maharashtra Cold-Chain ESG',
      description: 'Reducing post-harvest losses by 40% using solar-powered storage solutions for pomegranate growers across the Sahyadri belt.',
    },
    {
      title: 'Carbon Neutral Logistics',
      description: 'Targeting net-zero emissions by 2030 through fleet electrification and sustainable packaging innovations.',
    },
  ];

  const stats = [
    { value: '85%', label: 'Water Reused', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA00BChpLYgUkZIcBvS_gQJOOiJSvHiio_NYBfemP2sI4XJSHFJBZOxkTUIRN8TMIzHYRLlO-H2-4I7PeMCp_eYcrFoDu0R7hJ40wOMq1vpGGD9fTltv_s1UArbadFHufQ4-JJyqArXrdslc4dSdr2xJ_-AaxqnzTsx_MgWGVX17C2EPy8u8pvecEvSUSS2XQKJ7VQmrF92RhiPry9gUG03l-edpynkKk20PJDeNV79RP-uQ6DQF5cI8ZFQSzMh4aEXxcRGgd694vk' },
    { value: '12k+', label: 'Jobs Created', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlhsmXTLLP_dnumgNM4ivQHFFX6UGa-qveTIlwQl1Y9w-z0ATTFjYCQB48nych5g4jlOMLlb9HN8JE71JR4-Ey0-eZDXFDckmaMzCRy2EDIHObU312D-bswX2KJet5hvS6zXhMFXesbtDwT6qVReAWx01bWj_GjL9V4s5PClycWOGwz2DKRH0E-ZCDG0pVV8h67LyKcyzM454XVVnfu5pJ-tnIt4HBIIFZctX2TShJbkBeCrDz2HgXQ4Y-TI14KBG6Qg3dNDwueWw' },
  ];

  return (
    <section className="py-section-gap relative overflow-hidden bg-secondary-container">
      {/* Quiet ambient glow — same brand-tinted depth treatment used
          elsewhere on the site, so this section no longer reads as
          a flat plain block dropped between richer sections. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 85% 15%, color-mix(in srgb, var(--color-primary) 10%, transparent), transparent 55%)',
        }}
      ></div>

      <div className="px-margin-mobile sm:px-margin-desktop w-full max-w-container-max mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-section-gap items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm mb-6 uppercase tracking-widest">
              <Sprout size={14} />
              ESG Commitment
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-secondary mb-8">
              Our Impact: Sowing the Seeds of Tomorrow
            </h2>
            <div className="space-y-5">
              {impactCards.map((card, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-7 rounded-2xl hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                >
                  <h4 className="font-title-md text-title-md text-on-secondary mb-2">{card.title}</h4>
                  <p className="text-secondary-fixed leading-relaxed">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Left column */}
            <div className="space-y-4 pt-12">
              <motion.div
                className="h-64 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  className="w-full h-full object-cover"
                  alt="Sustainable agriculture"
                  src={stats[0].image}
                />
              </motion.div>
              <motion.div
                className="h-48 glass-card flex flex-col items-center justify-center p-6 text-center rounded-2xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <AnimatedStat value={stats[0].value} />
                <span className="font-label-sm text-secondary-fixed uppercase mt-2">{stats[0].label}</span>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <motion.div
                className="h-48 glass-card flex flex-col items-center justify-center p-6 text-center rounded-2xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <AnimatedStat value={stats[1].value} />
                <span className="font-label-sm text-secondary-fixed uppercase mt-2">{stats[1].label}</span>
              </motion.div>
              <motion.div
                className="h-64 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  className="w-full h-full object-cover"
                  alt="Hemp fields"
                  src={stats[1].image}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}