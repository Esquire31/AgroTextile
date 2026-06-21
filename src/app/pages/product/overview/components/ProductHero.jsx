'use client';

import { Download, CheckCircle, Ship } from 'lucide-react';
import { useState } from 'react';

export default function ProductHero() {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAYFFpBtEIBpbXfWdC_PjmfxdJAkT9XhyS0sB3ZMdURTvwgUEBmlksKG-UfrQKr_fdZ9Z3WTvCZPdiluDGvg1b-M8h2rSxRXoNeF31P2JlXLdk17JiB7VDO0juqrKL5Amt7sfeyRkZX6hkBYGo2Wxtb4OX9m6BrmFpAL-jL1_HJRGPZdqMNW0UIsquoxhGOGJ5HgZpZWv5xUFNs4DFNLGPiXlIqM4JNlW8tdUgo_nwjUCGU7VRzN4loMEZfQRmelgDhNXioqglcBsY',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDSXeBi6HseigdkzzEWJKiBhOn01IEFciwDyKX7LTS9oHtG2oKSvATJJSn_uWrxSXgyBcqw3dkFA0xr_VwCu_7Br00GnSPQTVWjycAhDaMu-ifUcHzM1osT82_kSKGykvq1qtiV0FvEEkeWO4AhMZ1j75044pDMhjAYkS_YKTWF8NmVen4OFFdhytG5E_uRiImAgqeu5rgWr2x_hdgiNLZA1TPskLapU8usiSg7-PILbuKof7QTqFSSLcQNAId8HeaWnHNv9ixXh3U',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBpSbcdt7_Pa49Es-S0VANjzTGw3TO_OBMW1gOXybmIlK0DnqucyNoGSjLJHUC6cteIz3J9qGVwStLYvMtl0DssyEaOKYP0e2UhKXQGA2ERQbwUX7LMI1wU4P0_JxXnnn1oAcuRgwx0Us8f2xqsWDGkow24hToKRNpRHj_j6gy4-KdtlTUMcSK1xUcK2OQ3i-7HOhLSfJVxPar_Hko39rJWxcsby_lm0cDXBElYWuB2-0E7BRDE0kcItyBePYgtQi6_qlUFjWRDuhI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB6SeNgfRHqh5PlPHI7s58My1xOHO84Gb84JN8wvIK8wRVidQRcrqZVmVS_dHjHYgyhFDPiQ9soq1r0c-bmT1iejGr7rOFC_JQZlGN_DGd-Q8ajFzbH_fdsj85lZpyJynlk5jfiutvSmjT9bL3b2lopZCUwbUlaH7J6pA61ylWoDXOH31zT4nSgmcMzy-V6wnPkl42BLG96NslBLSsYVDi_BHkn0D_yW8JZV2XVFZ-_mmIBTbkY8J4wryw5aiYxJIJ275fhQn62aSw',
  ];

  return (
    <section className="py-2 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-15">
      {/* Left Column - Image Section */}
      <div className="flex flex-col gap-6">
        {/* Main Display Area */}
        <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden glass-card group">
          <img
            src={images[selectedImage]}
            alt="Premium long-staple Indian cotton"
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent"></div>

          {/* Verified Badge */}
          <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-surface-container/70 backdrop-blur-md p-3 rounded-xl border border-outline-variant/20">
            <div className="bg-primary/30 p-1.5 rounded-lg">
              <CheckCircle className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-xs text-on-surface-variant">Source Verified</p>
              <p className="text-sm font-bold text-on-surface">Maharashtra Region</p>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all spring-hover bg-surface-container-high ${
                selectedImage === idx
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-outline-variant/30 hover:border-primary'
              }`}
            >
              <img src={src} alt={`Cotton detail view ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Right Column - Product Info */}
      <div className="flex flex-col justify-between">
        {/* Title and Description */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-on-surface mb-4 leading-tight">
            Premium Long-Staple<br />
            <span className="text-primary">Indian Cotton</span>
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
            Our flagship textile export, sourced from the fertile black soil of the Deccan plateau. Engineered for high-speed spinning and superior tensile strength, ensuring unparalleled durability for luxury apparel manufacturing.
          </p>
        </div>

        {/* Procurement & Logistics Summary */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-background/40 rounded-xl">
              <p className="text-xs text-on-surface-variant font-bold mb-2 uppercase tracking-wide">Min. Order</p>
              <p className="text-4xl font-bold text-on-surface tabular-nums">50 MT</p>
            </div>
            <div className="p-4 bg-background/40 rounded-xl">
              <p className="text-xs text-on-surface-variant font-bold mb-2 uppercase tracking-wide">Lead Time</p>
              <p className="text-4xl font-bold text-on-surface tabular-nums">14-21 Days</p>
            </div>
            <div className="p-4 bg-background/40 rounded-xl col-span-2">
              <p className="text-xs text-on-surface-variant font-bold mb-3 uppercase tracking-wide">Primary Shipping Port</p>
              <div className="flex items-center gap-3">
                <Ship className="text-primary" size={24} />
                <span className="text-xl font-bold text-on-surface">Mundra / Nhava Sheva</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-primary text-on-primary font-bold py-4 rounded-full text-sm hover:bg-primary/90 transition-all spring-hover">
            Request Technical Quote
          </button>
          <button className="flex-1 border-2 border-primary text-primary font-bold py-4 rounded-full text-sm hover:bg-primary/10 transition-all spring-hover flex items-center justify-center gap-2">
            <Download size={20} />
            Spec Sheet (PDF)
          </button>
        </div>
      </div>
    </section>
  );
}