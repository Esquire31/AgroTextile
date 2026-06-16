import React, { useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'light' : 'dark'
    );
  };

  return (
    <button 
      onClick={toggleTheme}
      className="bg-none border-2 border-gray-800 px-3 py-2 rounded-full cursor-pointer text-base transition-transform hover:scale-110"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
