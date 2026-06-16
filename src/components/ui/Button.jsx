import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  type = 'button',
  onClick,
  disabled = false 
}) {
  const baseClass = 'px-6 py-3 rounded-md font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  }[variant] || 'btn-primary';

  return (
    <button 
      className={`${baseClass} ${variantClass}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
