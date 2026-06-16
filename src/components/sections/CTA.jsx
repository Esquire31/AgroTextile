import React from 'react';
import Button from '@/components/ui/Button';

export default function CTA() {
  return (
    <section className="bg-linear-to-r from-indigo-600 to-purple-700 text-white py-15 text-center">
      <div className="container max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready to Transform Your Supply Chain?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join hundreds of businesses that trust Agritex for their textile sourcing.
        </p>
        <Button variant="primary">Get Started Today</Button>
      </div>
    </section>
  );
}
