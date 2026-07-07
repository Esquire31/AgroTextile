import React from 'react';
import Card from '@/components/ui/Card';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Sourcing & Procurement',
      description: 'Expert sourcing of premium textile materials from trusted suppliers worldwide.',
      icon: '🌍',
    },
    {
      id: 2,
      title: 'Quality Control',
      description: 'Rigorous testing and quality assurance for all products before delivery.',
      icon: '✓',
    },
    {
      id: 3,
      title: 'Supply Chain Management',
      description: 'Efficient logistics and supply chain solutions for timely delivery.',
      icon: '📦',
    },
    {
      id: 4,
      title: 'Customization',
      description: 'Tailored solutions for bulk orders with custom specifications.',
      icon: '⚙️',
    },
    {
      id: 5,
      title: 'Consulting',
      description: 'Expert advice on textile sourcing and industry trends.',
      icon: '💼',
    },
    {
      id: 6,
      title: 'Support',
      description: '24/7 customer support to ensure smooth operations.',
      icon: '📞',
    },
  ];

  return (
    <div className="container py-15">
      <div className="text-center mb-10">
        <h1 className="type-headline text-text-primary mb-4">Our Services</h1>
        <p className="type-body-lg text-text-secondary">
          Comprehensive textile sourcing and supply chain solutions
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {services.map((service) => (
          <Card key={service.id}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">{service.icon}</div>
              <h3 className="type-title text-text-primary mb-2">{service.title}</h3>
              <p className="type-body text-text-secondary leading-relaxed">{service.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
