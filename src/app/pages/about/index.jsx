import HeroSection from '../about/components/HeroSection';
import TimelineSection from '../about/components/TimelineSection';
import ImpactSection from '../about/components/ImpactSection';
import LeadershipSection from '../about/components/LeadershipSection';
import CertificationsMarquee from '../about/components/CertificationsMarquee';

export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <TimelineSection />
      <ImpactSection />
      <LeadershipSection />
      <CertificationsMarquee />
    </main>
  );
}
