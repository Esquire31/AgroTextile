import React from 'react';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="bg-linear-to-r from-indigo-600 to-purple-700 text-white px-5 py-25 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-5">
          Precision Sourcing for Sustainable Scale
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Leading textile solutions with global reach and local expertise
        </p>
        <div className="flex gap-5 justify-center flex-wrap">
          <Button variant="primary">Explore Products</Button>
          <Button variant="secondary">Learn More</Button>
        </div>
      </div>
    </section>
  );
}
