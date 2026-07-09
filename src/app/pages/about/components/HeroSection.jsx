'use client';

import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
import Globe from '@/components/ui/Globe';

export default function HeroSection() {
  const { formatMessage } = useIntl();

  // Arcs draw the connecting lines between markers on the globe. Origins are
  // spread across different points on the sphere (not all from India) so the
  // lines fan out across top/bottom/sides instead of bunching into one dense
  // cluster. Swap coordinates/labels for your real trade routes whenever you
  // have them.
  const arcs = [
    { id: 'india-uae', from: [20.5937, 78.9629], to: [23.4241, 53.8478], label: 'UAE' },
    { id: 'uk-usa', from: [55.3781, -3.436], to: [37.0902, -95.7129], label: 'USA' },
    { id: 'germany-india', from: [51.1657, 10.4515], to: [20.5937, 78.9629], label: 'Germany' },
    { id: 'singapore-australia', from: [1.3521, 103.8198], to: [-25.2744, 133.7751], label: 'Australia' },
    { id: 'brazil-india', from: [-14.235, -51.9253], to: [20.5937, 78.9629], label: 'Brazil' },
    { id: 'japan-india', from: [36.2048, 138.2529], to: [20.5937, 78.9629], label: 'Japan' },
    { id: 'southafrica-uae', from: [-30.5595, 22.9375], to: [23.4241, 53.8478], label: 'South Africa' },
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{ background: 'var(--color-background)' }}
    >
      {/* Globe sits directly on the section's own background color, so
          there's no seam where the hero meets the next section. The globe
          spins/drags on its own already — no extra zoom motion needed here,
          that was a leftover from when this slot held a static photo. */}
      <div className="absolute inset-0 w-full h-full translate-y-2 sm:translate-y-4 md:translate-y-8">
        {/* No baseColor/markerColor passed here on purpose: Globe now
            auto-detects the site's light/dark theme and picks the
            matching sphere + marker colors from variables.scss. */}
        <Globe className="w-full h-full" arcs={arcs} />
      </div>

      {/* Scrim only in dark mode, behind the headline. In light mode the
          sphere is already white with a dark-text headline on top, so a
          black-based radial gradient has nothing to blend into — it just
          shows up as a grey patch. */}
      <div
        className="absolute inset-0 hidden dark:block pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0) 75%)',
        }}
      ></div>
      <motion.div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
          opacity: 0.08,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      ></motion.div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 pointer-events-none">
        <motion.div
          className="flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 translate-y-8 sm:translate-y-12 md:translate-y-16 pointer-events-none"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6 pointer-events-auto">
            <span
              className="inline-block type-badge px-4 py-2 rounded-full border"
              style={{
                borderColor: 'var(--color-outline-variant)',
                color: 'var(--color-on-surface)',
              }}
            >
              {formatMessage({ id: 'app.pages.about.hero.eyebrow' })}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="mb-4 sm:mb-6 md:mb-8 max-w-4xl type-display text-text-primary uppercase"
          >
            {formatMessage({ id: 'app.pages.about.hero.title' })}
            <br />
            <motion.span
              style={{ color: 'var(--color-primary)' }}
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {formatMessage({ id: 'app.pages.about.hero.title_highlight' })}
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mb-8 sm:mb-12 md:mb-16 max-w-2xl text-text-primary type-body-lg">
            {formatMessage({ id: 'app.pages.about.hero.description' })}
          </motion.p>

          {/* Scroll Indicator */}
          {/* <motion.a
            href="#timeline"
            variants={itemVariants}
            className="flex flex-col items-center gap-2 cursor-pointer group pointer-events-auto"
            whileHover={{ y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:stroke-[3px] transition-all"
              style={{ color: 'var(--color-primary)' }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </motion.svg>
            <span
              className="type-label group-hover:scale-105 transition-transform"
              style={{ color: 'var(--color-primary)' }}
            >
              {formatMessage({ id: 'app.pages.about.hero.scroll_indicator' })}
            </span>
          </motion.a> */}
        </motion.div>
      </div>
    </section>
  );
}