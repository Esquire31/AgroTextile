'use client';

import HeroSection from '../contact/components/HeroSection';
import LiveTradeDesk from '../contact/components/LiveTradeDesk';
import ProcurementForm from '../contact/components/ProcurementForm';
import RegionalOffices from '../contact/components/RegionalOffices';
import FAQSection from '../contact/components/FAQSection';

export default function ContactPage() {
  return (
    <main className="pt-0 overflow-x-hidden">
      <HeroSection />
      <LiveTradeDesk />
      <ProcurementForm />
      <RegionalOffices />
      <FAQSection />
    </main>
  );
}
