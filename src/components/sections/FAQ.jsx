import React, { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      question: 'What products do you offer?',
      answer: 'We offer a wide range of textile products including cotton, silk, and synthetic materials.',
    },
    {
      question: 'How do I place an order?',
      answer: 'You can place orders through our website or contact our sales team directly.',
    },
    {
      question: 'What is your minimum order quantity?',
      answer: 'Minimum order quantities vary by product. Please contact us for specific details.',
    },
    {
      question: 'Do you offer customization?',
      answer: 'Yes, we offer customization options for bulk orders.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-15">
      <div className="container">
        <h2 className="type-headline text-text-primary text-center mb-3">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto mt-10">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border border-border rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 bg-surface-container-low text-left font-semibold flex justify-between items-center hover:bg-surface-container-high transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="type-body font-semibold">{faq.question}</span>
                <span className="type-title">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-background text-text-secondary leading-relaxed">
                  <p className="type-body">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
