import { useState, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)

  const containerData = [
    { label: '20ft Standard', payload: '28,200 KG', capacity: '33.2 CBM', scaleX: 1, scaleY: 1 },
    { label: '40ft Standard', payload: '26,700 KG', capacity: '67.7 CBM', scaleX: 1.6, scaleY: 1 },
    { label: '40ft High Cube', payload: '26,500 KG', capacity: '76.3 CBM', scaleX: 1.6, scaleY: 1.2 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="pt-20">
      {/* Hero Section */}
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

      {/* Scale Stats Bar */}
      <section className="bg-[#006241] text-on-primary py-8 md:py-16 relative z-10 mx-2 sm:mx-4 rounded-full my-6 md:my-12 shadow-lg">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
          {[
            { val: '40+', label: 'Countries Served' },
            { val: '500+', label: 'Enterprise Clients' },
            { val: '1k+', label: 'TEU Monthly' },
            { val: '15+', label: 'Years Excellence' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-4xl md:text-[72px] leading-tight md:leading-20 font-bold tabular-nums">{stat.val}</div>
              <div className="font-label-sm uppercase opacity-90 tracking-widest text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Industrial Panels */}
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

      {/* Regional Hubs Map */}
      <section className="py-12 md:py-24 bg-surface-container-low overflow-hidden relative rounded-xl mx-2 sm:mx-4 shadow-inner">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 grid md:grid-cols-2 items-center gap-6 md:gap-12">
          <div className="z-10">
            <h2 className="text-2xl sm:text-3xl md:text-[48px] leading-tight md:leading-14 font-headline-lg mb-4 md:mb-8 font-bold">
              Direct From the <span className="text-primary italic">Source</span>
            </h2>
            <p className="text-sm sm:text-base md:text-[18px] leading-relaxed md:leading-7 font-body-lg text-on-surface-variant max-w-lg mb-6 md:mb-12">
              We operate regional hubs across India&apos;s primary production zones to ensure quality at every stage of the
              lifecycle.
            </p>
            <div className="space-y-4 md:space-y-6">
              <div className="glass-card p-4 md:p-8 spring-hover cursor-pointer border-l-4 md:border-l-8 border-l-[#006241] shadow-xl">
                <h4 className="text-lg md:text-[24px] leading-tight md:leading-8 font-title-md text-[#006241] mb-1 md:mb-2 font-bold">
                  Maharashtra Hub
                </h4>
                <p className="text-on-surface-variant font-body-md text-sm md:text-base">
                  Specializing in Pomegranates, Grapes, and Cotton Spinning.
                </p>
              </div>
              <div className="p-4 md:p-8 rounded-xl hover:bg-surface-variant transition-colors cursor-pointer border-l-4 md:border-l-8 border-l-transparent">
                <h4 className="text-lg md:text-[24px] leading-tight md:leading-8 font-title-md text-on-surface mb-1 md:mb-2 font-bold">
                  Gujarat Logistics
                </h4>
                <p className="text-on-surface-variant font-body-md text-sm md:text-base">
                  Global gateway for textile machinery and ceramic logistics.
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-64 md:h-125 flex items-center justify-center md:flex">
            <div className="w-full aspect-square bg-[#006241]/5 rounded-full flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-[300px] text-[#006241]/10 opacity-30 select-none">
                explore
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 overflow-x-auto hide-scrollbar whitespace-nowrap bg-background">
        <div className="px-4 sm:px-8 md:px-16 inline-flex gap-4 md:gap-6 min-w-full pb-8">
          {['Inquiry', 'Sourcing', 'QC Control', 'Packaging', 'Freight'].map((step, idx) => (
            <div key={step} className="w-64 sm:w-72 md:w-80 shrink-0 group p-6 md:p-8 rounded-xl hover:bg-surface-container transition-all">
              <div className="text-5xl md:text-[72px] leading-tight md:leading-20 text-surface-container-highest mb-3 md:mb-4 group-hover:text-[#006241] transition-colors tabular-nums font-bold">
                0{idx + 1}
              </div>
              <h4 className="text-lg md:text-[24px] leading-tight md:leading-8 font-title-md mb-2 font-bold">{step}</h4>
              <p className="whitespace-normal text-xs md:text-base text-on-surface-variant font-body-md">
                Optimized supply chain workflow for maximum delivery efficiency.
              </p>
              <div className="h-1.5 md:h-2 bg-surface-container-highest mt-6 md:mt-8 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-[#006241] w-0 group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee Icons */}
      <section className="py-8 md:py-16 bg-surface-container-lowest overflow-hidden">
        <div className="marquee">
          {[1, 2].map((m) => (
            <div key={m} className="marquee-content grayscale opacity-50">
              {['verified', 'public', 'workspace_premium', 'safety_check', 'local_shipping', 'eco'].map((icon) => (
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

      {/* Command Center */}
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

      {/* B2B Calculator */}
      <section className="py-12 md:py-24 px-4 sm:px-8 md:px-16 max-w-[1280px] mx-auto">
        <div className="bg-surface-container-high rounded-xl p-6 md:p-12 lg:p-20 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center shadow-lg border border-outline-variant/20">
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
                  className="w-full h-3 bg-surface-variant rounded-full appearance-none cursor-pointer accent-[#006241]"
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
                <div className="bg-surface-container p-4 md:p-6 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
                  <div className="text-xs opacity-50 uppercase font-label-sm tracking-widest">Payload (Max)</div>
                  <div className="text-lg md:text-2xl font-bold tabular-nums">{containerData[sliderValue].payload}</div>
                </div>
                <div className="bg-surface-container p-4 md:p-6 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
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

      {/* Parallax Action Gateway */}
      <section className="relative h-96 sm:h-125 md:h-175 flex items-center justify-center overflow-hidden mx-2 sm:mx-4 rounded-xl my-12 md:my-24 shadow-lg">
        <div className="absolute inset-0 z-0">
          <img
            alt="Indian seaport"
            className="w-full h-full object-cover scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9FYzuTI4U3A0KOEzQNFMqmkK8HGMDN2ZfNmuER2IMai7l75jo6KBTSeoTlWbYrQRlPPcRfaK9n-VfCc7c2dgfKdXSOQGC5vEYBEyf4x6vXCNbo27GWpK4LZKJuOLTy4qjGw6CqswrBhbhPIwlEVeF_AMYyWVFDowezxvG7WVO4hzumh0nxH5nX9PUMNrP_Fws78mtJ6pGYEMH7WN0UX9FHjrCo3pX6GxHmkf4GU2Q4aF5O0FbAYEQQaqalURJ5i_Fj5TKM2oOAqQ"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#006241]/60 via-background/60 to-background/40"></div>
        </div>
        <div className="relative z-10 text-center px-4 sm:px-8 md:px-16">
          <h2 className="text-3xl sm:text-5xl md:text-[72px] leading-tight md:leading-20 font-display-lg mb-4 md:mb-8 tracking-tight uppercase font-bold">
            DELIVERING SCALE
          </h2>
          <p className="text-sm sm:text-base md:text-[18px] leading-relaxed md:leading-7 font-body-lg max-w-2xl mx-auto mb-6 md:mb-12 text-on-surface opacity-90">
            Ready to expand your sourcing capabilities with India&apos;s most trusted export partner?
          </p>
          <button className="px-6 sm:px-12 py-3 md:py-6 bg-[#006241] text-on-primary rounded-full font-bold text-sm sm:text-base md:text-xl spring-hover spring-active shadow-lg shadow-[#006241]/40 font-label-sm uppercase">
            GET YOUR CUSTOM QUOTE
          </button>
        </div>
      </section>
    </main>
  )
}

