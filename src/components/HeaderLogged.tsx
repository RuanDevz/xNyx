import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Sparkles,
  Flame,
  MessageCircle,
  Send,
  Menu,
  X,
  Crown,
  User,
  BarChart2,
  BadgeHelp,
  Heart,
  Settings,
  LogOut,
  Shield,
  Gift,
  ChevronRight,
} from 'lucide-react';
import UserMenu from "./HeaderLogged/UserMenu";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const HeaderLogged: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const token = localStorage.getItem("Token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const { theme } = useTheme();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      if (token && email) {
        try {
          const vipResponse = await axios.get(
            `https://x-nyx-backend.vercel.app/auth/is-vip/${email}`
          );
          setIsVip(vipResponse.data.isVip);

          const adminResponse = await axios.get(
            `https://x-nyx-backend.vercel.app/auth/is-admin/${email}`
          );
          setIsAdmin(adminResponse.data.isAdmin);
        } catch (error) {
          console.error("Error checking user status:", error);
        }
      }
    };

    checkUserStatus();
  }, [token, email]);

  const mobileMenuItems = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Your Account", link: "/account" },
        { icon: BadgeHelp , label: "Support", link: "/support" },
      ]
    }
  ];

  // Only add Premium section if user is VIP
  if (isVip) {
    mobileMenuItems.push({
      title: "Premium",
      items: [
        { icon: Gift, label: "Recommend Content", link: "/recommend" },
      ]
    });
  }

  if (isAdmin) {
    mobileMenuItems.push({
      title: "Admin",
      items: [
        { icon: Shield, label: "Admin Panel", link: "/admin/settings" },
        { icon: Shield, label: "View Request", link: "/admin/requests" },
        { icon: Shield, label: "View Stats", link: "/admin/stats" },
      ]
    });
  }

  return (
    <header className={`sticky top-0 z-50 shadow-lg border-b ${
      theme === 'dark'
        ? 'bg-gray-900 border-emerald-800 text-white'
        : 'bg-white border-emerald-100 text-gray-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-3">
            <div className="relative">

              <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full animate-pulse" />
            </div>
            <div className="relative">
              <span className={`font-lilita text-2xl md:text-3xl font-black bg-gradient-to-r ${
                theme === 'dark'
                  ? 'from-emerald-400 via-emerald-300 to-emerald-400'
                  : 'from-emerald-500 via-emerald-400 to-emerald-500'
              } bg-clip-text text-transparent transition duration-300`}>
                XNYXLEAKS
              </span>
              {isVip && (
                <Crown className="absolute -top-4 -right-6 w-5 h-5 text-yellow-400 animate-bounce" />
              )}
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
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </a>
              <a
                href="https://discord.gg/SAPZmTTeuN"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discord</span>
              </a>
              {isVip ? (
                <Link
                  to={currentPath === "/" ? "/vip" : "/"}
                  className={`text-sm font-medium transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {currentPath === "/" ? "Premium Access" : "Free Content"}
                </Link>
              ) : (
                <Link
                  to="/pricing"
                  className={`text-sm font-medium transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Plans
                </Link>
              )}

              <ThemeToggle/>
            </nav>

            {/* User Menu */}
            <UserMenu
              name={name}
              isMenuOpen={isMenuOpen}
              handleMenuToggle={handleMenuToggle}
              isVip={isVip}
              isAdmin={isAdmin}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={handleMobileMenuToggle}
              className={`focus:outline-none transform transition-all duration-300 ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-emerald-400'
                  : 'text-gray-600 hover:text-emerald-500'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden py-6 space-y-6 overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800/95' : 'bg-white/95'
              }`}
            >
              {/* User Profile Section */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`px-4 py-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-emerald-100'
                  }`}>
                    <User className={`w-6 h-6 ${
                      theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{name}</h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>{email}</p>
                  </div>
                </div>
              </motion.div>

              {/* Menu Sections */}
              {mobileMenuItems.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className="px-4"
                >
                  <h3 className={`text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>{section.title}</h3>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.link}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                          theme === 'dark'
                            ? 'hover:bg-gray-700/50 text-gray-200'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        onClick={handleMobileMenuToggle}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Social Links */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="px-4 space-y-2"
              >
                <a
                  href="https://discord.com/invite/SAPZmTTeuN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-2 rounded-lg bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Join Discord</span>
                </a>
                <a
                  href="https://t.me/your-channel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-2 rounded-lg bg-[#229ED9] text-white hover:bg-[#1E8BC3] transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                  <span className="font-medium">Join Telegram</span>
                </a>
              </motion.div>

              {/* VIP/Premium Section */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="px-4"
              >
                {isVip ? (
                  <Link
                    to="/vip"
                    className={`relative group overflow-hidden px-4 py-3 rounded-lg font-bold w-full block text-center ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500'
                        : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600'
                    } text-white transition-all duration-300`}
                    onClick={handleMobileMenuToggle}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Access Premium Content</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
                  </Link>
                ) : (
                  <Link
                    to="/pricing"
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg w-full ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-emerald-500 text-white hover:bg-emerald-600'
                    } transition-all duration-300`}
                    onClick={handleMobileMenuToggle}
                  >
                    <Crown className="w-5 h-5" />
                    <span className="font-medium">Become Premium</span>
                  </Link>
                )}
              </motion.div>

              {/* Logout Button */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="px-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                    theme === 'dark'
                      ? 'hover:bg-red-500/10 text-red-400'
                      : 'hover:bg-red-50 text-red-600'
                  }`}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default HeaderLogged;