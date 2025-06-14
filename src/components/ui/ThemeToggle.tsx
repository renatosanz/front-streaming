import React, { useState, useEffect } from 'react';

interface ThemeToggleProps {
  className?: string;
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, onThemeChange }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
    if (onThemeChange) onThemeChange(theme);
  }, [theme, onThemeChange]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded-none shadow-md bg-[#53457f] text-[#f5f0e6] hover:bg-[#a3c6be] transition flex items-center justify-center ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
      // Moon icon for dark mode
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
        />
      </svg>
      ) : (
      // Sun icon for light mode
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth={2} />
        <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
