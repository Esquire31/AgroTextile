import React from 'react';

export default function Input({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange,
  placeholder,
  required = false 
}) {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <input
        id={name}
        className="input-field"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
