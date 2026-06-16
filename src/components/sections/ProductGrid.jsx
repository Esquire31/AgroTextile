import React from 'react';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/products';

export default function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
