import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@/components/ui/Card';

export default function ProductCard({ product }) {
  return (
    <Card>
      <div className="flex flex-col h-full">
        <div className="w-full h-48 bg-gray-100 rounded-md mb-4 overflow-hidden">
          <img 
            src={product.image || '/images/placeholder.jpg'} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col grow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-2 grow">{product.description}</p>
          <p className="text-xl font-bold text-indigo-600 mb-4">${product.price}</p>
          <Link 
            to={`/products/${product.slug}`} 
            className="inline-block px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md transition-colors hover:bg-indigo-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </Card>
  );
}
