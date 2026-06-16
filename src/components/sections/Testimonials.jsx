import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: 'Agritex has transformed our sourcing process. Highly recommended!',
      author: 'John Smith',
      company: 'Fashion Inc',
    },
    {
      quote: 'Best textile supplier we have ever worked with.',
      author: 'Sarah Johnson',
      company: 'Design Co',
    },
    {
      quote: 'Outstanding service and premium quality products.',
      author: 'Mike Chen',
      company: 'Textile Group',
    },
  ];

  return (
    <section className="py-15 bg-gray-50">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-3">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-10">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-7 rounded-lg border-l-4 border-indigo-600 shadow-md">
              <p className="italic mb-4 text-gray-700 leading-relaxed">"{testimonial.quote}"</p>
              <p className="font-bold text-gray-800">{testimonial.author}</p>
              <p className="text-indigo-600 text-sm">{testimonial.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
