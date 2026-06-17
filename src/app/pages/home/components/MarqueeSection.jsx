import React from 'react';

export default function MarqueeSection() {
  const icons = ['verified', 'public', 'workspace_premium', 'safety_check', 'local_shipping', 'eco'];

  return (
    <section className="py-8 md:py-16 bg-surface-container-lowest overflow-hidden">
      <div className="marquee">
        {[1, 2].map((m) => (
          <div key={m} className="marquee-content grayscale opacity-50">
            {icons.map((icon) => (
              <span
                key={icon}
                className="material-symbols-outlined text-4xl sm:text-5xl md:text-6xl px-4 sm:px-8 md:px-12 hover:grayscale-0 hover:opacity-100 hover:text-[#006241] transition-all cursor-pointer"
              >
                {icon}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
