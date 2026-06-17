import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';

export default function ProductListing() {
	return (
		<div className="container py-15">
			<div className="text-center mb-10">
				<h1 className="text-5xl font-bold mb-4">Products</h1>
				<p className="text-xl text-gray-600">Browse our catalogue of products.</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{products.map((product) => (
					<Link
						key={product.id}
						to={`/products/${product.slug}`}
						className="block p-4 border rounded-lg hover:shadow-lg transition"
					>
						<div className="w-full h-48 bg-gray-100 rounded overflow-hidden mb-4">
							<img src={product.image || '/images/placeholder.jpg'} alt={product.name} className="w-full h-full object-cover" />
						</div>
						<h3 className="text-xl font-semibold mb-2">{product.name}</h3>
						<p className="text-sm text-gray-600 mb-3">{product.description}</p>
						<div className="text-indigo-600 font-bold">View Details →</div>
					</Link>
				))}
			</div>
		</div>
	);
}
