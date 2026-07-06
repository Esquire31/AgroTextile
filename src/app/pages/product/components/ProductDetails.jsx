import React from 'react';
import { products } from '@/data/products';
import './productdetails.css';

export default function ProductDetails({ slug }) {
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div className="container section">Product not found</div>;
  }

  return (
    <div className="product-details">
      <div className="product-details-image">
        <img src={product.image || '/images/placeholder.jpg'} alt={product.name} />
      </div>
      <div className="product-details-info">
        <h1>{product.name}</h1>
        <p className="product-details-price">${product.price}</p>
        <p className="product-details-description">{product.description}</p>
        <div className="product-details-specs">
          <h3>Specifications</h3>
          <ul>
            {product.specs?.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>
        <button className="product-add-btn">Add to Cart</button>
      </div>
    </div>
  );
}
