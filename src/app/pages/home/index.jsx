import React from 'react';
import SplashCursor from '../../../components/ui/cursor/SplashCursor';
import FairyDustCursor from '../../../components/ui/cursor/FairyDust';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import PanelsSection from './components/PanelsSection';
import TimelineSection from './components/TimelineSection';
import MarqueeSection from './components/MarqueeSection';
import CommandCenterSection from './components/CommandCenterSection';
import CalculatorSection from './components/CalculatorSection';
import ParallaxSection from './components/ParallaxSection';

export default function Home() {
  return (
    <main className="pt-20">
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#006241"
      />
      <FairyDustCursor />
      <HeroSection />
      <StatsSection />
      <PanelsSection />
      <TimelineSection />
      <MarqueeSection />
      <CommandCenterSection />
      <CalculatorSection />
      <ParallaxSection />
    </main>
  );
}
