import React from "react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* World Map Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
    src="/World map dots animation.svg"
    alt="Global Export Network"
    className="
      w-[140%]
      sm:w-[120%]
      md:w-full
      lg:w-[90%]
      max-w-[1800px]
      h-auto
      object-contain
      opacity-15
      -translate-y-12
    "
  />

      </div>
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-8 overflow-hidden">
        
        {/* <span className="text-primary font-label-sm uppercase tracking-widest mb-6 inline-block bg-primary/10 px-4 py-2 rounded-full border border-primary/20 text-sm">
          India To The World
        </span> */}

        <h1 className="text-4xl text-text-primary sm:text-6xl lg:text-[88px] leading-[1.05] font-bold font-display-lg tracking-[-0.03em] mb-8">
          Connecting Indian
          <br />
          Excellence To Global
          <br />
          Markets
        </h1>

        <p className="max-w-3xl mx-auto text-on-surface-variant text-lg md:text-xl leading-relaxed mb-10">
          Trusted sourcing partner for premium textiles and fresh produce,
          delivering quality products from India to international markets
          across Europe, North America, the Middle East and Asia-Pacific.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold spring-hover spring-active flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            Start Sourcing
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </button>

          <button className="border border-outline bg-background/40 backdrop-blur-sm text-on-surface px-8 py-4 rounded-full font-bold hover:bg-surface-variant transition-colors spring-active">
            View Catalogue
          </button>
        </div>
      </div>
    </section>
  );
}