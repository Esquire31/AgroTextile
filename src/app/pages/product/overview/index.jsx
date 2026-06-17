import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '@/data/products';
import Button from '@/components/ui/Button';

export default function ProductOverview() {
	const { slug } = useParams();
	const product = products.find((p) => p.slug === slug);

	if (!product) {
		return (
			<div className="container py-15 text-center">
				<h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
				<p className="text-gray-600">The product you're looking for doesn't exist.</p>
			</div>
		);
	}

	return (
		<div className="container py-15">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<div className="w-full h-96 md:h-full bg-gray-100 rounded-lg overflow-hidden">
					<img 
						src={product.image || '/images/placeholder.jpg'} 
						alt={product.name}
						className="w-full h-full object-cover"
					/>
				</div>
				<div>
					<h1 className="text-5xl font-bold mb-4">{product.name}</h1>
					<p className="text-4xl font-bold text-indigo-600 mb-6">${product.price}</p>
					<p className="text-lg text-gray-700 leading-relaxed mb-8">{product.description}</p>
          
					<div className="mb-8">
						<h3 className="text-2xl font-bold mb-4">Specifications</h3>
						<ul className="space-y-2">
							{product.specs?.map((spec, index) => (
								<li key={index} className="py-2 pb-2 border-b border-gray-200 text-gray-700">
									<span className="text-indigo-600 font-bold mr-2">✓</span>
									{spec}
								</li>
							))}
						</ul>
					</div>
          
					<Button variant="primary">Add to Cart</Button>
				</div>
			</div>
		</div>
	);
}
