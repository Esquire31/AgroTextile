import React, { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="relative flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-16 z-10 py-12 md:py-0">
        <span className="text-primary font-label-sm uppercase tracking-widest mb-4 sm:mb-6 inline-block bg-primary/10 px-3 sm:px-4 py-1 rounded-full w-fit text-xs sm:text-sm">
          India to the World
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-[72px] leading-tight md:leading-20 font-bold font-display-lg max-w-xl mb-6 md:mb-8 tracking-[-0.02em]">
          Connecting Indian Excellence to Global Markets
        </h1>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
          <button className="bg-primary text-on-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold spring-hover spring-active flex items-center justify-center sm:justify-start gap-2 shadow-lg shadow-primary/20 font-label-sm text-sm sm:text-base w-full sm:w-auto">
            Start Sourcing <span className="material-symbols-outlined text-lg sm:text-xl">arrow_forward</span>
          </button>
          <button className="border border-outline bg-background/40 backdrop-blur-sm text-on-surface px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-surface-variant transition-colors spring-active font-label-sm text-sm sm:text-base w-full sm:w-auto">
            View Catalogue
          </button>
        </div>
      </div>
      <div className="flex-1 relative z-10 flex items-center justify-center p-4 sm:p-6 md:p-8 md:flex">
        <div className="w-full max-w-lg aspect-square glass-card rounded-full flex items-center justify-center relative overflow-hidden shadow-lg p-4">
          <div className="carousel-container absolute inset-0 w-full h-full">
            <div className={`carousel-slide ${currentSlide === 0 ? 'active' : ''}`}>
              <img
                alt="High-end textile spools"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7FjD_z12BHMRK4d4pcj4kCrYn9b8zEmbzXaYxxaWEmi1OaKuI3dMENa5CmbHbHEf09PKkp1J0v-XFg8d-EkdDzdMDT56KWjQgfJTCwSdvdCQam3FcdaqZUGIkkIraXApc0OyY48HScqwd-KmQHv-FPeUbQIBgPbEkA6D_CmtmqjVuLin80L4Xp8lV48iOhpXwohTg_ZNAgnq1knTOeppTC9sYi7z2x0xPdzBQybEe4YDbuh2lPWIAr0Qk7kxt_KaCmQ1ksfI1gic"
              />
            </div>
            <div className={`carousel-slide ${currentSlide === 1 ? 'active' : ''}`}>
              <img
                alt="Vibrant Alphonso mangoes"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGZWM5fcoGegl1XBtAhkbF_rUGQq6Fh-mayActjhZljG1BnUd7SmNPQQo_BcwiD4NFA2Q2FNO-LmXujzecqKq98cmvV-obcvI-rNlN1F0DLxzZ3eQw3rWBp86vbgnBypz_kXEAN8kTfgq1fO70dRekZi5sPbll-W8vVbo4vwNyTp0stJj9NhZpmd5VBcFQhUenKP_CUWccHG7BV6DwheJP2zP6ZpfUvuLKvuh80A_ewaGNB3aevbgsH-A4emz-Ic6N9BJYl9KilvY"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/10 to-transparent mix-blend-overlay"></div>
          <div className="z-20 flex flex-col items-center">
            <div className="w-4 h-4 bg-primary rounded-full pulse-ring mb-4"></div>
            <span className="font-label-sm tracking-widest text-primary uppercase bg-background/80 px-6 py-2 backdrop-blur-md rounded-full border border-primary/30">
              Quality Assured
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
