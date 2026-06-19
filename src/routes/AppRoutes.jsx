import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/app/pages/home';
import About from '@/app/pages/about';
import ProductListing from '@/app/pages/product/listing';
import ProductDetails from '@/app/pages/product/overview';
import Services from '@/app/pages/services';
import Contact from '@/app/pages/contact';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/products/:slug" element={<ProductDetails />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/" style={{ color: '#667eea', textDecoration: 'underline' }}>
        Go back to home
      </a>
    </div>
  );
}
