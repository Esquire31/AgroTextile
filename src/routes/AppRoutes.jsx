import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from '@/app/pages/home';
import About from '@/app/pages/about';
import ProductListing from '@/app/pages/product/listing';
import ProductDetails from '@/app/pages/product/overview';
import Contact from '@/app/pages/contact';
import ErrorPage from '@/app/pages/Error/ErrorPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/products/:slug" element={<ProductDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<ErrorPage code={404} />} />
    </Routes>
  );
}