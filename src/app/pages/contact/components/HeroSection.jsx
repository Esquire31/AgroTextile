'use client';

import { motion } from 'framer-motion';
import { Send, UserCheck, MessageSquareText } from 'lucide-react';
import { useIntl } from 'react-intl';

export default function HeroSection() {
  const { formatMessage } = useIntl();
  // The actual idea: instead of decorating the headline with fake
  // "live" stats (no backend exists) or repeating the email/phone
  // chips that already live further down the page, the hero shows
  // the one thing a first-time visitor to a B2B contact page
  // actually wants to know before they commit to filling out a
  // form: "what happens after I hit send?" It's rendered as a
  // shipping-route-style path, reusing the same visual language
  // (dotted route lines, waypoints) your site already uses for
  // actual cargo routes — just pointed at the inquiry process
  // instead. Nothing here claims to be live or real-time; it's an
  // honest, static description of process, animated to draw itself
  // in like a route being plotted.
  const steps = [
    {
      icon: Send,
      title: formatMessage({ id: 'app.pages.contact.hero.steps.reach_out.title' }),
      detail: formatMessage({ id: 'app.pages.contact.hero.steps.reach_out.detail' }),
    },
    {
      icon: UserCheck,
      title: formatMessage({ id: 'app.pages.contact.hero.steps.specialist.title' }),
      detail: formatMessage({ id: 'app.pages.contact.hero.steps.specialist.detail' }),
    },
    {
      icon: MessageSquareText,
      title: formatMessage({ id: 'app.pages.contact.hero.steps.respond.title' }),
      detail: formatMessage({ id: 'app.pages.contact.hero.steps.respond.detail' }),
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 sm:py-28 h-screen">
      {/* Ambient background motion — slow, quiet drifting shapes so
          the space around the headline doesn't feel empty. Kept
          well behind the content (z-0, soft opacity, blurred) so it
          adds atmosphere without competing with the route graphic.

          Each blob is a static positioning wrapper (top/left/right/
          bottom never touched by Framer Motion) containing an inner
          motion.div that owns nothing but the animated transform.
          Mixing static position props and animate={{ x, y }} on the
          SAME style object causes React's style diffing to fight
          Framer Motion's own writes on re-render — that was why the
          motion looked stuck/jittery. Splitting them fixes it. */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: 'absolute', top: '-10%', left: '8%', width: 420, height: 420 }}>
          <motion.div
            className="rounded-full w-full h-full"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, var(--color-primary) 16%, transparent), transparent 70%)',
              filter: 'blur(40px)',
            }}
            initial={{ x: 0, y: 0 }}
            animate={{ x: 50, y: 35 }}
            transition={{ duration: 11, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          ></motion.div>
        </div>

        <div style={{ position: 'absolute', top: '20%', right: '6%', width: 360, height: 360 }}>
          <motion.div
            className="rounded-full w-full h-full"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, var(--color-primary) 12%, transparent), transparent 70%)',
              filter: 'blur(40px)',
            }}
            initial={{ x: 0, y: 0 }}
            animate={{ x: -40, y: -30 }}
            transition={{ duration: 13, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1 }}
          ></motion.div>
        </div>

        <div style={{ position: 'absolute', bottom: '-15%', left: '38%', width: 480, height: 480 }}>
          <motion.div
            className="rounded-full w-full h-full"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, var(--color-primary) 9%, transparent), transparent 70%)',
              filter: 'blur(50px)',
            }}
            initial={{ x: 0, y: 0 }}
            animate={{ x: 35, y: -20 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.5 }}
          ></motion.div>
        </div>

        {/* Faint floating dots for a touch of texture without detail */}
        {[
          { top: '15%', left: '20%', size: 5, delay: 0 },
          { top: '65%', left: '12%', size: 4, delay: 1.2 },
          { top: '30%', left: '85%', size: 6, delay: 0.6 },
          { top: '75%', left: '90%', size: 4, delay: 1.8 },
          { top: '10%', left: '60%', size: 3, delay: 2.2 },
        ].map((dot, idx) => (
          <div
            key={idx}
            style={{ position: 'absolute', top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
            className="hidden sm:block"
          >
            <motion.span
              className="block w-full h-full rounded-full bg-primary/30"
              initial={{ y: 0, opacity: 0.3 }}
              animate={{ y: -16, opacity: 0.7 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror', delay: dot.delay, ease: 'easeInOut' }}
            ></motion.span>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile sm:px-margin-desktop">
        {/* Headline block — centered, unambiguous, dominant */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm mb-7 uppercase tracking-widest"
          >
            {formatMessage({ id: 'app.pages.contact.hero.badge' })}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display-lg text-on-surface mb-6 leading-[1.05] tracking-tight text-[3.25rem] sm:text-[4.5rem] lg:text-[5.5rem]"
          >
            {formatMessage({ id: 'app.pages.contact.hero.title' })}{' '}
            <span className="text-primary">{formatMessage({ id: 'app.pages.contact.hero.title_highlight' })}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body-lg text-body-lg text-on-surface-variant max-w-xl"
          >
            {formatMessage({ id: 'app.pages.contact.hero.subtitle' })}
          </motion.p>
        </div>

        {/* The route — three waypoints connected by a line that
            draws itself in, exactly like a shipping route being
            plotted. This is the distinctive idea: process-as-route,
            not data-as-decoration. */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line: vertical on mobile, horizontal on desktop */}
          <div className="absolute left-7 top-7 bottom-7 w-px sm:left-0 sm:right-0 sm:top-7 sm:bottom-auto sm:h-px sm:w-auto overflow-hidden">
            <motion.div
              initial={{ scaleY: 0, scaleX: 0 }}
              whileInView={{ scaleY: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0 origin-top sm:origin-left"
              style={{
                background:
                  'repeating-linear-gradient(to bottom, var(--color-primary) 0, var(--color-primary) 6px, transparent 6px, transparent 12px)',
              }}
            ></motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0 origin-left hidden sm:block"
              style={{
                background:
                  'repeating-linear-gradient(to right, var(--color-primary) 0, var(--color-primary) 6px, transparent 6px, transparent 12px)',
              }}
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.25 }}
                  className="flex sm:flex-col items-start sm:items-center gap-5 sm:gap-0 sm:text-center"
                >
                  {/* Waypoint marker */}
                  <div className="relative shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + idx * 0.25, type: 'spring', stiffness: 200 }}
                      className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg relative z-10"
                    >
                      <Icon size={22} />
                    </motion.div>
                    {/* Step number badge */}
                    <div
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-surface-container border flex items-center justify-center text-[10px] font-bold text-primary z-20"
                      style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 50%, transparent)' }}
                    >
                      {idx + 1}
                    </div>
                  </div>

                  <div className="sm:mt-5">
                    <h3 className="font-title-md text-title-md text-on-surface mb-1.5">{step.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed max-w-55 sm:mx-auto">
                      {step.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}