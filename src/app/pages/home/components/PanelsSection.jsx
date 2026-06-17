import React from 'react';

export default function PanelsSection() {
  return (
    <section className="py-12 md:py-24 px-4 sm:px-8 md:px-16 max-w-[1280px] mx-auto">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 h-auto md:h-175">
        <div className="group relative flex-2 bg-surface-container rounded-xl overflow-hidden transition-all duration-700 hover:flex-3 cursor-pointer shadow-xl h-60 md:h-auto">
          <img
            alt="Factory loom"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7FjD_z12BHMRK4d4pcj4kCrYn9b8zEmbzXaYxxaWEmi1OaKuI3dMENa5CmbHbHEf09PKkp1J0v-XFg8d-EkdDzdMDT56KWjQgfJTCwSdvdCQam3FcdaqZUGIkkIraXApc0OyY48HScqwd-KmQHv-FPeUbQIBgPbEkA6D_CmtmqjVuLin80L4Xp8lV48iOhpXwohTg_ZNAgnq1knTOeppTC9sYi7z2x0xPdzBQybEe4YDbuh2lPWIAr0Qk7kxt_KaCmQ1ksfI1gic"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-[#006241]/80 transition-colors duration-500 flex flex-col justify-end p-6 md:p-12">
            <h3 className="text-2xl sm:text-3xl md:text-[48px] leading-tight md:leading-14 font-headline-lg text-white mb-2 md:mb-4 font-bold">
              Textile & Apparel
            </h3>
            <p className="text-white/80 max-w-md mb-8 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-body-md">
              From high-tensile technical yarns to premium organic cotton, we source the foundation of global fashion.
            </p>
            <ul className="text-white flex gap-4 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 font-label-sm">
              <li className="bg-white/20 px-4 py-1 rounded-full backdrop-blur-md uppercase">Raw Fiber</li>
              <li className="bg-white/20 px-4 py-1 rounded-full backdrop-blur-md uppercase">Technical Yarn</li>
            </ul>
          </div>
        </div>
        <div className="group relative flex-1 bg-surface-container rounded-xl overflow-hidden transition-all duration-700 hover:flex-3 cursor-pointer shadow-xl">
          <img
            alt="Pomegranates"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdF_kYNA4muKjff2K1wMLWFCLYRmFqV4vPLHc7nY3ZzrlsalVUSCbWIBLfX_qkLG5u7wpO1RYT7QQUZDUHWWqxH-wKUvqu9DD1FgSiRp9vtI51ro95OtXkz27U6WOovxvDt471sR_S24ZR7PLpnIK8xHuM4zTyAm8kTQ8RTP5fweDFe82LtL5rUY85J3NA7b8YbarzQn92DR6Do4s7tQ5jDRmkdz_zcUDhtr5LKiPosO5J0zqAEmPomk-Q5lacxl78vmmWgoXJgZs"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-[#006241]/80 transition-colors duration-500 flex flex-col justify-end p-12">
            <h3 className="text-[48px] leading-14 font-headline-lg text-white mb-4 font-bold">
              Agro Commodities
            </h3>
            <p className="text-white/80 max-w-md mb-8 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-body-md">
              Sourcing the finest Indian produce, spices, and grains with end-to-end cold chain integrity.
            </p>
            <ul className="text-white flex gap-4 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 font-label-sm">
              <li className="bg-white/20 px-4 py-1 rounded-full backdrop-blur-md uppercase">Fresh Fruit</li>
              <li className="bg-white/20 px-4 py-1 rounded-full backdrop-blur-md uppercase">Spices</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
