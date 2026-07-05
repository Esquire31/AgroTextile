import React from "react";
import { useIntl } from "react-intl";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="h-full w-full text-primary" viewBox="0 0 696 316" fill="none" aria-hidden="true">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, 0.6, 0.25],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 18 + ((path.id % 8) + 1),
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function BackgroundPaths() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}

export default function HeroSection() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden px-4 py-12 sm:px-8 sm:py-16">
      
      <BackgroundPaths />
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-2 sm:px-8 overflow-hidden">
        
        {/* <span className="text-primary font-label-sm uppercase tracking-widest mb-6 inline-block bg-primary/10 px-4 py-2 rounded-full border border-primary/20 text-sm">
          India To The World
        </span> */}

        <h1 className="text-4xl text-text-primary sm:text-6xl lg:text-[88px] leading-[1.05] font-bold font-display-lg tracking-[-0.03em] mb-8">
          <span dangerouslySetInnerHTML={{ __html: formatMessage({ id: 'app.pages.home.hero.title' }) }} />
        </h1>

        <p className="max-w-3xl mx-auto text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-10">
          {formatMessage({ id: 'app.pages.home.hero.subtitle' })}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <button 
            onClick={() => navigate('/products')}
            className="bg-primary text-text-on-primary px-8 py-4 rounded-full font-bold spring-hover spring-active flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            {formatMessage({ id: 'app.pages.home.hero.btn.start_sourcing' })}
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </button>

          <button 
            onClick={() => navigate('/products')}
            className="border border-outline bg-card-bg backdrop-blur-sm text-text-primary px-8 py-4 rounded-full font-bold hover:bg-primary transition-colors spring-active"
          >
            {formatMessage({ id: 'app.pages.home.hero.btn.view_catalogue' })}
          </button>
        </div>
      </div>
    </section>
  );
}