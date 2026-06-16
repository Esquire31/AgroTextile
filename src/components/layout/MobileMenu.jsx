import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu({ links }) {
  return (
    <div className="absolute top-17.5 right-0 bg-white w-full shadow-lg z-50 flex flex-col">
      {links.map((link) => (
        <Link 
          key={link.name} 
          to={link.href}
          className="px-5 py-4 text-gray-800 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
