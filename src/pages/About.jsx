import React from 'react';

export default function About() {
  return (
    <div className="container py-15">
      <h1 className="text-5xl font-bold mb-6">About Agritex Global</h1>
      <div className="max-w-3xl">
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At Agritex Global, we are committed to providing precision sourcing solutions
            for sustainable scale in the textile industry. Our mission is to connect
            businesses with high-quality textile suppliers while maintaining ethical
            and sustainable practices.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Values</h2>
          <ul className="space-y-3">
            <li className="pb-3 border-b border-gray-200">
              <span className="font-bold text-indigo-600">Quality:</span> We guarantee the highest standards
            </li>
            <li className="pb-3 border-b border-gray-200">
              <span className="font-bold text-indigo-600">Sustainability:</span> Eco-friendly practices throughout
            </li>
            <li className="pb-3 border-b border-gray-200">
              <span className="font-bold text-indigo-600">Transparency:</span> Clear communication with all partners
            </li>
            <li className="pb-3 border-b border-gray-200">
              <span className="font-bold text-indigo-600">Innovation:</span> Continuous improvement and innovation
            </li>
            <li className="pb-3">
              <span className="font-bold text-indigo-600">Integrity:</span> Ethical business practices always
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Team</h2>
          <p className="text-gray-700 leading-relaxed">
            With over 20 years of experience in the textile industry, our team of
            experts brings unparalleled knowledge and dedication to every project.
          </p>
        </section>
      </div>
    </div>
  );
}
