'use client';

import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';

export default function HeroSection() {
  const { formatMessage } = useIntl();
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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background with cinematic image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 20, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      >
        <img
          className="w-full h-full object-cover"
          src="/about-hero-bg.svg"
          alt={formatMessage({ id: 'app.pages.about.hero.bg_alt' })}
        />
      </motion.div>

      {/* Dark overlay with subtle green radial glow */}
      <div className="absolute inset-0 bg-black/55"></div>
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
      <div className="relative z-10 h-full flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <motion.div
          className="flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 translate-y-8 sm:translate-y-12 md:translate-y-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
            <span
              className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full border"
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
            className="mb-4 sm:mb-6 md:mb-8 max-w-4xl leading-tight tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              color: 'var(--color-on-surface)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
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
            className="mb-8 sm:mb-12 md:mb-16 max-w-2xl leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--color-on-surface-variant)',
              lineHeight: 1.7,
            }}
          >
            {formatMessage({ id: 'app.pages.about.hero.description' })}
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-2"
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: 'var(--color-primary)' }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </motion.svg>
            <span
              className="text-xs font-medium tracking-wide uppercase"
              style={{ color: 'var(--color-primary)' }}
            >
              {formatMessage({ id: 'app.pages.about.hero.scroll_indicator' })}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}