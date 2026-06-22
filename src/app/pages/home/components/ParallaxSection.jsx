import React from 'react';

export default function ParallaxSection() {
  return (
    <section className="relative h-96 sm:h-125 md:h-175 flex items-center justify-center overflow-hidden mx-2 sm:mx-4 rounded-xl my-12 md:my-24 -mb-16 shadow-lg">
      <div className="absolute inset-0 z-0">
        <img
          
          className="w-full h-full object-cover scale-110"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9FYzuTI4U3A0KOEzQNFMqmkK8HGMDN2ZfNmuER2IMai7l75jo6KBTSeoTlWbYrQRlPPcRfaK9n-VfCc7c2dgfKdXSOQGC5vEYBEyf4x6vXCNbo27GWpK4LZKJuOLTy4qjGw6CqswrBhbhPIwlEVeF_AMYyWVFDowezxvG7WVO4hzumh0nxH5nX9PUMNrP_Fws78mtJ6pGYEMH7WN0UX9FHjrCo3pX6GxHmkf4GU2Q4aF5O0FbAYEQQaqalURJ5i_Fj5TKM2oOAqQ"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#006241]/60 via-background/60 to-background/40"></div>
      </div>
      <div className="relative z-10 text-center px-4 sm:px-8 md:px-16">
        <h2 className="text-3xl sm:text-5xl md:text-[72px] leading-tight md:leading-20 font-display-lg mb-4 md:mb-8 text-text-on-primary tracking-tight uppercase font-bold">
          DELIVERING SCALE
        </h2>
        <p className="text-sm sm:text-base md:text-[18px] leading-relaxed md:leading-7 font-body-lg max-w-2xl mx-auto mb-6 md:mb-12 text-text-on-primary opacity-90">
          Ready to expand your sourcing capabilities with India's most trusted export partner?
        </p>
        <button className="px-6 sm:px-12 py-3 md:py-6 bg-[#006241] text-text-on-primary rounded-full font-bold text-sm sm:text-base md:text-xl spring-hover spring-active shadow-lg shadow-[#006241]/40 font-label-sm uppercase">
          GET YOUR CUSTOM QUOTE
        </button>
      </div>
    </section>
  );
}
