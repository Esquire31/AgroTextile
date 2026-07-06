import React from 'react';
import InteractiveWorldMapSection from './components/InteractiveWorldMapSection';
import StatsSection from './components/StatsSection';
import PanelsSection from './components/PanelsSection';
import TimelineSection from './components/TimelineSection';
import MarqueeSection from './components/MarqueeSection';
import CalculatorSection from './components/CalculatorSection';
import ParallaxSection from './components/ParallaxSection';

export default function Home() {
  return (
    <main className="pt-20">
      <InteractiveWorldMapSection />
      <StatsSection />
      <PanelsSection />
      <TimelineSection />
      <MarqueeSection />
      {/* <CommandCenterSection /> */}
      <CalculatorSection />
      <ParallaxSection />
    </main>
  );
}
