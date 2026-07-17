'use client';

import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
import Globe from '@/components/ui/Globe';

export default function HeroSection() {
  const { formatMessage } = useIntl();

  const handleDiscoverStoryClick = (event) => {
    event.preventDefault();
    const timelineSection = document.getElementById('timeline');
    if (!timelineSection) {
      return;
    }

    timelineSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: 'var(--color-background)' }}
    >
      {/* Globe sits directly on the section's own background color, so
          there's no seam where the hero meets the next section. The globe
          spins/drags on its own already — no extra zoom motion needed here,
          that was a leftover from when this slot held a static photo. */}
      <div className="absolute inset-0 w-full h-full -translate-y-2 sm:translate-y-4 md:translate-y-8">
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

      {/* Content container spacing mirrors the home hero text overlay. */}
      <div className="relative z-10 h-full flex items-center justify-center pt-8 sm:pt-16 pointer-events-none text-center px-2 sm:px-8">
        <motion.div
          className="z-10 max-w-5xl flex flex-col items-center justify-center pointer-events-none"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading — same mb spacing pattern as homepage's h1 */}
          <motion.h1
            variants={itemVariants}
            className="mb-8 type-display text-text-primary"
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
            className="mb-10 max-w-3xl mx-auto text-text-primary type-body-lg">
            {formatMessage({ id: 'app.pages.about.hero.description' })}
          </motion.p>

          <motion.a
            href="#timeline"
            onClick={handleDiscoverStoryClick}
            variants={itemVariants}
            className="group mt-6 sm:mt-8 inline-flex flex-col items-center gap-2 px-6 py-4 rounded-full bg-surface-container/40 cursor-pointer pointer-events-auto transition-colors hover:bg-surface-container/70"
            whileHover={{ y: 4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            aria-label={formatMessage({ id: 'app.pages.about.hero.scroll_indicator' })}
          >
            <motion.span className="type-body text-text-primary font-semibold tracking-wide hover:text-primary transition-colors">
              {formatMessage({ id: 'app.pages.about.hero.scroll_indicator' })}
            </motion.span>
            <motion.svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              className="text-text-primary transition-transform duration-200 group-hover:translate-y-1 group-hover:scale-125 hover:text-primary transition-colors"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}