import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <div
        className="w-14 h-7 sm:w-12 sm:h-6 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400
                   peer-checked:from-blue-500 peer-checked:to-indigo-600 transition-all duration-300
                   after:content-['☀️'] after:absolute after:top-[2px] after:left-[2px] 
                   after:bg-white after:rounded-full after:h-6 after:w-6 sm:after:h-5 sm:after:w-5
                   after:flex after:items-center after:justify-center 
                   after:transition-all after:duration-300 peer-checked:after:translate-x-7 sm:peer-checked:after:translate-x-6
                   peer-checked:after:content-['🌙'] after:shadow-md after:text-base sm:after:text-sm"
      ></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100 hidden sm:inline"></span>
    </label>
  );
};

export default ThemeToggle;
