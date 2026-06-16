import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ContactForm from '@/components/sections/ContactForm';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container py-15">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Get in touch with our team. We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
          {submitted && (
            <div className="mb-6 p-3 bg-green-100 text-green-800 rounded border border-green-300">
              ✓ Thank you! We'll get back to you soon.
            </div>
          )}
          <ContactForm />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-7">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Email</h3>
              <p>
                <a href="mailto:info@agritex.com" className="text-indigo-600 hover:underline">
                  info@agritex.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Phone</h3>
              <p>
                <a href="tel:+15551234567" className="text-indigo-600 hover:underline">
                  +1 (555) 123-4567
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Address</h3>
              <p className="text-gray-700">
                123 Textile Street<br />
                Fashion City, FC 12345
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Office Hours</h3>
              <p className="text-gray-700">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday & Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
