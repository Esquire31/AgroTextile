import React, { useState } from 'react';

export default function CalculatorSection() {
  const containerData = [
    { label: '20ft Standard', payload: '28,200 KG', capacity: '33.2 CBM', scaleX: 1, scaleY: 1 },
    { label: '40ft Standard', payload: '26,700 KG', capacity: '67.7 CBM', scaleX: 1.6, scaleY: 1 },
    { label: '40ft High Cube', payload: '26,500 KG', capacity: '76.3 CBM', scaleX: 1.6, scaleY: 1.2 },
  ];
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <section className="py-12 md:py-24 px-4 sm:px-8 md:px-16 max-w-[1280px] mx-auto">
      <div className="bg-card-header rounded-xl p-6 md:p-12 lg:p-20 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center shadow-lg border border-outline-variant/20">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-[48px] leading-tight md:leading-14 font-headline-lg mb-4 md:mb-8 font-bold">
            Estimate Your <span className="text-[#006241] italic">Scale</span>
          </h2>
          <p className="text-base sm:text-lg md:text-[18px] leading-relaxed md:leading-7 font-body-lg text-on-surface-variant mb-6 md:mb-12">
            Determine the best container configuration for your specific cargo type.
          </p>
          <div className="space-y-8 md:space-y-12">
            <div>
              <div className="flex justify-between mb-4 md:mb-6 flex-wrap gap-2">
                <span className="font-bold font-label-sm uppercase tracking-widest opacity-60 text-xs sm:text-sm">Container Size</span>
                <span className="text-[#006241] font-bold font-label-sm uppercase bg-[#006241]/10 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm">
                  {containerData[sliderValue].label}
                </span>
              </div>
              <input
                className="w-full h-3 bg-text-tertiary rounded-full appearance-none cursor-pointer accent-[#006241]"
                max="2"
                min="0"
                step="1"
                type="range"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
              />
              <div className="flex justify-between mt-3 md:mt-4 text-xs opacity-50 uppercase tracking-widest font-label-sm">
                <span>20ft</span>
                <span>40ft</span>
                <span>40ft HQ</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              <div className="bg-card-secondary p-4 md:p-6 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
                <div className="text-xs opacity-50 uppercase font-label-sm tracking-widest">Payload (Max)</div>
                <div className="text-lg md:text-2xl font-bold tabular-nums">{containerData[sliderValue].payload}</div>
              </div>
              <div className="bg-card-secondary p-4 md:p-6 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
                <div className="text-xs opacity-50 uppercase font-label-sm tracking-widest">Capacity</div>
                <div className="text-lg md:text-2xl font-bold tabular-nums">{containerData[sliderValue].capacity}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-64 md:h-auto">
          <div className="relative w-full aspect-square flex items-center justify-center" style={{ perspective: '1000px' }}>
            <div
              className="w-40 h-20 md:w-64 md:h-32 bg-[#006241]/20 border-2 md:border-4 border-[#006241] rounded-xl flex items-center justify-center transition-all duration-500 transform-gpu"
              style={{
                boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                transform: `scale(${containerData[sliderValue].scaleX}, ${containerData[sliderValue].scaleY})`,
              }}
            >
              <span className="material-symbols-outlined text-[#006241] text-3xl md:text-5xl opacity-50">inventory_2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
