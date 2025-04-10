import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Sparkles, Menu, MessageCircle, Send, X, Star, Gift, Shield, Users } from 'lucide-react';
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
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
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu - Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="h-full overflow-y-auto">
          {/* Menu Header */}
          <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Menu
            </div>
          </div>

          {/* Menu Content */}
          <div className="p-6 space-y-6">
            {/* Featured Section */}
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex items-center space-x-2 mb-3">
                <Star className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`} />
                <span className="font-semibold">Featured</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Get exclusive access to premium content and special offers!
              </p>
            </div>

            {/* Social Links */}



            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`} />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Premium Protection</span>
              </div>
              <div className="flex items-center space-x-3">
                <Gift className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`} />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Exclusive Rewards</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`} />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Community Access</span>
              </div>
            </div>

              <Link
                to="/login"
                onClick={toggleMenu}
                className={`block w-full text-center py-3 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-white hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } transition-colors`}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className={`block w-full text-center py-3 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                } transition-colors`}
              >
                Register
              </Link>

<div className="space-y-3">
              <a
                href="https://discord.gg/SAPZmTTeuN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Join our Discord</span>
              </a>
              <a
                href="https://t.me/+u0Qu9SkPd8EyMzcx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg bg-[#229ED9] text-white hover:bg-[#1E8BC3] transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                <span className="font-medium">Join Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;