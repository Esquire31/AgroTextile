import React from 'react';

export default function Features() {
  const features = [
    {
      title: 'Global Network',
      description: 'Access to premium suppliers worldwide',
      icon: '🌍',
    },
    {
      title: 'Quality Assured',
      description: 'Rigorous testing and quality control',
      icon: '✓',
    },
    {
      title: 'Sustainable',
      description: 'Eco-friendly and ethical sourcing',
      icon: '♻️',
    },
    {
      title: '24/7 Support',
      description: 'Dedicated customer support team',
      icon: '📞',
    },
  ];

  return (
    <section className="py-15">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-3">Why Choose Agritex?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-10">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
