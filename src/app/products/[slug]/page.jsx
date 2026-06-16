import React from 'react';
import ProductDetails from '@/components/products/ProductDetails';

export default function ProductPage({ params }) {
  const { slug } = params;

  return (
    <div className="container section">
      <ProductDetails slug={slug} />
    </div>
  );
}
