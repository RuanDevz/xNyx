import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Sparkles, Menu, MessageCircle, Send } from 'lucide-react';
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={`sticky top-0 z-50 shadow-lg border-b ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800 text-white' 
        : 'bg-white border-gray-100 text-gray-900'
    }`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <Link to="/" className="group flex items-center">
          <Flame className={`w-8 h-8 ${
            theme === 'dark'
              ? 'text-emerald-400 group-hover:text-emerald-300'
              : 'text-emerald-500 group-hover:text-emerald-600'
          } transition-all duration-300 transform group-hover:scale-110`} />
          <div className={`ml-2 text-xl md:text-2xl font-black bg-gradient-to-r ${
            theme === 'dark'
              ? 'from-emerald-400 via-emerald-300 to-emerald-400'
              : 'from-emerald-500 via-emerald-400 to-emerald-500'
          } bg-clip-text text-transparent transition duration-300`}>
            XNYXLEAKS
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Main Navigation Links */}
          <nav className="flex items-center space-x-6">
            <a
              href="https://t.me/+u0Qu9SkPd8EyMzcx"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium transition-colors ${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Telegram
            </a>
            <a
              href="https://discord.gg/SAPZmTTeuN"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium transition-colors ${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Discord
            </a>
            <Link
              to="/plans"
              className={`text-sm font-medium transition-colors ${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Plans
            </Link>
          </nav>

          {/* Auth and Theme */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              to="/login"
              className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`text-sm font-medium px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              } transition-all duration-300`}
            >
              Register
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className={`focus:outline-none ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        } overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {/* Social Links - Mobile */}
          <div className="flex justify-center space-x-4">
            <a
              href="https://discord.gg/SAPZmTTeuN"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all duration-300 flex-1"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Discord</span>
            </a>
            <a
              href="https://t.me/+u0Qu9SkPd8EyMzcx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#229ED9] text-white hover:bg-[#1E8BC3] transition-all duration-300 flex-1"
            >
              <Send className="w-5 h-5" />
              <span className="font-medium">Telegram</span>
            </a>
          </div>

          <div className="flex items-center justify-center space-x-3 py-2">
            <Sparkles className={`w-4 h-4 ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'
            }`} />
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Join VIP for exclusive content
            </span>
          </div>

          <Link
            to="/login"
            className={`block py-2 text-center ${
              theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            } transition-colors`}
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`block py-2 text-center ${
              theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            } transition-colors mb-2`}
            onClick={toggleMenu}
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;