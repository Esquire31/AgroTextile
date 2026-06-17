import React from 'react';

export default function CommandCenterSection() {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden bg-background">
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16">
        <div className="flex flex-col gap-6 md:gap-8 mb-8 md:mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-[48px] leading-tight md:leading-14 font-headline-lg mb-2 md:mb-4 font-bold">Global Command Center</h2>
            <p className="text-[#006241] font-bold font-label-sm uppercase tracking-widest text-xs sm:text-sm">
              Real-time supply chain transparency
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="text-label-sm uppercase opacity-50 mb-2 text-xs sm:text-sm">System Status</div>
            <div className="flex items-center gap-2 sm:gap-3 text-[#006241] font-bold font-label-sm bg-[#006241]/10 px-4 sm:px-6 py-2 rounded-full border border-[#006241]/20 text-xs sm:text-sm">
              <span className="w-2 h-2 bg-[#006241] rounded-full animate-pulse shrink-0"></span> SYSTEM OPERATIONAL
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden h-100 flex flex-col border border-outline-variant/30">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between bg-surface-container">
              <span className="font-bold font-label-sm">LIVE CARGO MANIFEST</span>
              <span className="text-xs opacity-50 font-label-sm">REFRESHED: JUST NOW</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 tabular-nums">
              <div className="flex justify-between items-center py-4 px-6 bg-surface-container-low rounded-xl border border-outline-variant/10">
                <div className="flex gap-4 items-center">
                  <span className="material-symbols-outlined text-[#006241] p-2 bg-[#006241]/10 rounded-full">
                    shop
                  </span>
                  <div>
                    <div className="font-bold font-body-md">ATX-9921-LON</div>
                    <div className="text-xs opacity-60 font-body-md">Textiles | Mumbai to London</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-body-md">In Transit</div>
                  <div className="text-[10px] uppercase text-[#006241] font-label-sm">ETA: 4 Days</div>
                </div>
              </div>
              <div className="flex justify-between items-center py-4 px-6 bg-surface-container-low rounded-xl border border-outline-variant/10">
                <div className="flex gap-4 items-center">
                  <span className="material-symbols-outlined text-secondary p-2 bg-secondary/10 rounded-full">
                    flight
                  </span>
                  <div>
                    <div className="font-bold font-body-md">ATX-1102-NYC</div>
                    <div className="text-xs opacity-60 font-body-md">Agro | Ahmedabad to New York</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-body-md">Customs Clearance</div>
                  <div className="text-[10px] uppercase text-on-secondary-container font-label-sm">Arrived</div>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-10 flex flex-col justify-center items-center text-center border border-outline-variant/30 shadow-lg">
            <div className="w-24 h-24 rounded-full bg-[#006241]/10 border-2 border-[#006241] flex items-center justify-center mb-8">
              <span
                className="material-symbols-outlined text-5xl text-[#006241]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                security
              </span>
            </div>
            <h4 className="text-[24px] leading-8 font-title-md mb-4 font-bold">Enterprise Access</h4>
            <p className="text-on-surface-variant text-sm mb-10 font-body-md leading-relaxed">
              Login to track shipments, download QC certificates, and manage orders.
            </p>
            <button className="w-full py-4 bg-[#006241] text-on-primary rounded-full font-bold spring-hover spring-active font-label-sm shadow-lg shadow-[#006241]/30">
              OPEN ERP DASHBOARD
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
