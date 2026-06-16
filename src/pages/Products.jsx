import React from 'react';
import ProductGrid from '@/components/sections/ProductGrid';

export default function Products() {
  return (
    <div className="container py-15">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">Our Products</h1>
        <p className="text-xl text-gray-600">
          Explore our comprehensive range of premium textile products
        </p>
      </div>
      <ProductGrid />
    </div>
  );
}
