import HeroSection from '../about/components/HeroSection';
import TimelineSection from '../about/components/TimelineSection';
import ImpactSection from '../about/components/ImpactSection';
import CertificationsMarquee from '../about/components/CertificationsMarquee';
import Designtestimonial from '@/components/ui/design-testimonial';

export default function AboutPage() {
  return (
    <main className="pt-20">
      <HeroSection />
      <TimelineSection />
      <ImpactSection />
      <Designtestimonial />
      <CertificationsMarquee />
    </main>
  );
}
