import React from 'react';
import useTheme from '@/util/hooks/useTheme'; // adjust path if needed

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-surface-variant transition"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}