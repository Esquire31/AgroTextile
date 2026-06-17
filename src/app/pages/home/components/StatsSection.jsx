import React from 'react';

export default function StatsSection() {
  const stats = [
    { val: '40+', label: 'Countries Served' },
    { val: '500+', label: 'Enterprise Clients' },
    { val: '1k+', label: 'TEU Monthly' },
    { val: '15+', label: 'Years Excellence' },
  ];

  return (
    <section className="bg-[#006241] text-on-primary py-8 md:py-16 relative z-10 mx-2 sm:mx-4 rounded-full my-6 md:my-12 shadow-lg">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl sm:text-4xl md:text-[72px] leading-tight md:leading-20 font-bold tabular-nums">{stat.val}</div>
            <div className="font-label-sm uppercase opacity-90 tracking-widest text-xs sm:text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
