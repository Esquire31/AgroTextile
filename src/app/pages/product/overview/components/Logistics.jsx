import React from 'react';

export default function Logistics() {
  return (
    <section className="py-10 mb-15">
      <div className="glass-card p-12 rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Export Infrastructure */}
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface mb-2">Export Infrastructure</h2>
            <p className="text-body-lg text-on-surface-variant mb-10">
              Integrated logistics solutions for the global textile and food industries.
            </p>

            {/* Infrastructure List */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
                <span className="text-body-lg text-on-surface">Cold Chain Integration</span>
                <span className="text-body-lg text-secondary font-mono">Available for Produce</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
                <span className="text-body-lg text-on-surface">Customs Clearance</span>
                <span className="text-body-lg text-secondary font-mono">Direct Port Liaison</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-body-lg text-on-surface">Insurance</span>
                <span className="text-body-lg text-secondary font-mono">Full Transit Coverage</span>
              </div>
            </div>
          </div>

          {/* Right Column - Current Status */}
          <div className="bg-background/60 p-8 rounded-xl border border-outline-variant/30">
            <h3 className="text-headline-lg font-bold text-primary mb-8">Current Logistics Status</h3>

            {/* Status Items */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                <p className="text-body-lg text-on-surface">Nhava Sheva Terminal: 100% Operational</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                <p className="text-body-lg text-on-surface">Mundra Hub: High Priority Loading</p>
              </div>

              <p className="text-body-md text-on-surface-variant mt-8">Live system update: 2 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}