'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Sprout, Droplets, Users, TrendingUp } from 'lucide-react';
import { useIntl } from 'react-intl';

// Animated count-up for the stat numbers — a small, premium touch
// (Stripe/Linear-style) that makes the section feel alive rather
// than static text. Parses the numeric portion out of strings like
// "85%" or "12k+" so the data shape doesn't need to change. Driven
// by requestAnimationFrame directly rather than relying on a
// possibly-version-specific imperative `animate()` import.
function AnimatedStat({ value, size = 'text-display-lg' }) {
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
    <span ref={ref} className={`tabular-nums ${size} text-on-secondary font-bold leading-none`}>
      {display}
      {suffix}
    </span>
  );
}

export default function ImpactSection() {
  const { formatMessage } = useIntl();
  const impactCards = [
    {
      title: formatMessage({ id: 'app.pages.about.impact.card1.title' }),
      description: formatMessage({ id: 'app.pages.about.impact.card1.description' }),
    },
    {
      title: formatMessage({ id: 'app.pages.about.impact.card2.title' }),
      description: formatMessage({ id: 'app.pages.about.impact.card2.description' }),
    },
    {
      title: formatMessage({ id: 'app.pages.about.impact.card3.title' }),
      description: formatMessage({ id: 'app.pages.about.impact.card3.description' }),
    },
  ];

  // Three stats instead of two: better visual balance against the
  // three impact cards on the left, and each now carries a small
  // icon for context so the numbers read as labeled evidence rather
  // than floating digits.
  const stats = [
    { value: '85%', label: formatMessage({ id: 'app.pages.about.impact.stat.water_reused.label' }), alt: formatMessage({ id: 'app.pages.about.impact.stat.water_reused.alt' }), icon: Droplets, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA00BChpLYgUkZIcBvS_gQJOOiJSvHiio_NYBfemP2sI4XJSHFJBZOxkTUIRN8TMIzHYRLlO-H2-4I7PeMCp_eYcrFoDu0R7hJ40wOMq1vpGGD9fTltv_s1UArbadFHufQ4-JJyqArXrdslc4dSdr2xJ_-AaxqnzTsx_MgWGVX17C2EPy8u8pvecEvSUSS2XQKJ7VQmrF92RhiPry9gUG03l-edpynkKk20PJDeNV79RP-uQ6DQF5cI8ZFQSzMh4aEXxcRGgd694vk' },
    { value: '12k+', label: formatMessage({ id: 'app.pages.about.impact.stat.jobs_created.label' }), alt: formatMessage({ id: 'app.pages.about.impact.stat.jobs_created.alt' }), icon: Users, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlhsmXTLLP_dnumgNM4ivQHFFX6UGa-qveTIlwQl1Y9w-z0ATTFjYCQB48nych5g4jlOMLlb9HN8JE71JR4-Ey0-eZDXFDckmaMzCRy2EDIHObU312D-bswX2KJet5hvS6zXhMFXesbtDwT6qVReAWx01bWj_GjL9V4s5PClycWOGwz2DKRH0E-ZCDG0pVV8h67LyKcyzM454XVVnfu5pJ-tnIt4HBIIFZctX2TShJbkBeCrDz2HgXQ4Y-TI14KBG6Qg3dNDwueWw' },
  ];

  return (
    <section className="py-16 sm:py-section-gap relative overflow-hidden bg-secondary-container">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-section-gap items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm mb-6 uppercase tracking-widest">
              <Sprout size={14} />
              {formatMessage({ id: 'app.pages.about.impact.eyebrow' })}
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-secondary mb-8">
              {formatMessage({ id: 'app.pages.about.impact.title' })}
            </h2>
            <div className="space-y-4 sm:space-y-5">
              {impactCards.map((card, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 sm:p-7 rounded-2xl hover:border-primary/30 transition-colors"
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
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Two photo + stat pairs, stacked on mobile, side by
                side from sm up. Each stat now carries an icon and
                sits in its own clearly-bordered tile instead of a
                bare number, so it reads as evidence rather than
                decoration. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-4 sm:pt-12">
                <motion.div
                  className="h-56 sm:h-64 rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    className="w-full h-full object-cover"
                    alt={stats[0].alt}
                    src={stats[0].image}
                  />
                </motion.div>
                <motion.div
                  className="glass-card flex flex-col items-center justify-center p-6 sm:p-7 text-center rounded-2xl gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary mb-1">
                    <Droplets size={18} />
                  </div>
                  <AnimatedStat value={stats[0].value} />
                  <span className="font-label-sm text-secondary-fixed uppercase tracking-wide">{stats[0].label}</span>
                </motion.div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <motion.div
                  className="glass-card flex flex-col items-center justify-center p-6 sm:p-7 text-center rounded-2xl gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary mb-1">
                    <Users size={18} />
                  </div>
                  <AnimatedStat value={stats[1].value} />
                  <span className="font-label-sm text-secondary-fixed uppercase tracking-wide">{stats[1].label}</span>
                </motion.div>
                <motion.div
                  className="h-56 sm:h-64 rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    className="w-full h-full object-cover"
                    alt={stats[1].alt}
                    src={stats[1].image}
                  />
                </motion.div>
              </div>
            </div>

            {/* Third stat: a full-width "hero" callout below the
                photo grid, larger and more prominent than the other
                two, giving the section a clear focal point instead
                of three equally-weighted tiles competing for
                attention. */}
            <motion.div
              className="glass-card mt-4 p-6 sm:p-8 rounded-2xl flex items-center gap-5"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
                <TrendingUp size={24} />
              </div>
              <div>
                <span className="font-label-sm text-secondary-fixed uppercase tracking-wide block mb-1">
                  {formatMessage({ id: 'app.pages.about.impact.net_zero.label' })}
                </span>
                <span className="tabular-nums text-2xl sm:text-3xl text-on-secondary font-bold">2030</span>
                <span className="text-secondary-fixed ml-2 text-sm">{formatMessage({ id: 'app.pages.about.impact.net_zero.caption' })}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}