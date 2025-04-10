import React from "react";
import { Crown, LogOut, User2Icon, Settings, HelpCircle, BadgePlus, UserSearch, Waypoints, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

interface UserMenuProps {
  name: string | null;
  isMenuOpen: boolean;
  handleMenuToggle: () => void;
  isVip: boolean;
  isAdmin: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({
  name,
  isMenuOpen,
  handleMenuToggle,
  isVip,
  isAdmin,
}) => {
  const Logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.href = '/';
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 }
  };

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <nav className="relative z-50">
      <div
        className={`flex items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl ${
          isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'
        } transition-all duration-200 group`}
        onClick={handleMenuToggle}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center transform group-hover:scale-105 transition-all duration-200">
            <User2Icon className="w-5 h-5 text-white" />
          </div>
          {isVip && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
              <Crown className="w-3 h-3 text-gray-900" />
            </div>
          )}
        </div>
        <p className={`font-medium ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'} transition-colors duration-200`}>{name}</p>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`absolute right-0 mt-4 w-72 ${isDark ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'} rounded-2xl shadow-2xl border backdrop-blur-sm overflow-hidden`}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className={`p-6 bg-gradient-to-br ${isDark ? 'from-gray-800 to-gray-900 border-b border-gray-700/50' : 'from-gray-100 to-gray-200 border-b border-gray-200/50'}`}>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <User2Icon className="w-7 h-7 text-white" />
                  </div>
                  {isVip && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                      <Crown className="w-3.5 h-3.5 text-gray-900" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-lg text-white mb-1">{name}</p>
                  <div className="flex items-center gap-2">
                    {isVip ? (
                      <span className={`px-2 py-1 rounded-md text-sm font-medium ${isDark ? 'bg-yellow-400/10 border border-yellow-400/20 text-yellow-400' : 'bg-yellow-400/20 border border-yellow-400/30 text-yellow-500'}`}>VIP</span>
                    ) : (
                      <span className={`px-2 py-1 rounded-md text-sm font-medium ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-300 text-gray-600'}`}>Regular</span>
                    )}
                    {isAdmin && (
                      <span className={`px-2 py-1 rounded-md text-sm font-medium ${isDark ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-red-500/20 border border-red-500/30 text-red-500'}`}>Admin</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2">
              <Link
                to="/account"
                className={`px-4 py-3 ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'} flex items-center gap-3 transition-all duration-200 group`}
              >
                <User2Icon className={`w-5 h-5 ${isDark ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-500 group-hover:text-blue-400'}`} />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>Your Account</span>
              </Link>

              {isVip && (
                <>
                  <Link
                    to="/recommend"
                    className={`px-4 py-3 ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'} flex items-center gap-3 transition-all duration-200 group`}
                  >
                    <BadgePlus className={`w-5 h-5 ${isDark ? 'text-yellow-400 group-hover:text-yellow-300' : 'text-yellow-500 group-hover:text-yellow-400'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>Recommend Content</span>
                  </Link>
                  <Link
                    to="/VIP"
                    className={`px-4 py-3 ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'} flex items-center gap-3 transition-all duration-200 group`}
                  >
                    <div className="relative">
                      <Crown className={`w-5 h-5 ${isDark ? 'text-yellow-400 group-hover:text-yellow-300' : 'text-yellow-500 group-hover:text-yellow-400'} group-hover:animate-pulse`} />
                      <div className="absolute inset-0 bg-yellow-400/20 blur-sm rounded-full group-hover:animate-pulse" />
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>VIP Area</span>
                  </Link>
                </>
              )}

              {isAdmin && (
                <>
                  <div className={`pt-4 pb-2 px-4 ${isDark ? 'border-t border-gray-700/50 mt-2' : 'border-t border-gray-200/50 mt-2'}`}>
                    <div className="flex items-center gap-2 text-xs font-medium text-red-400 uppercase tracking-wider">
                      <Shield className="w-4 h-4" />
                      Admin Controls
                    </div>
                  </div>
                  <Link
                    to="/admin/requests"
                    className={`px-4 py-3 ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'} flex items-center gap-3 transition-all duration-200 group`}
                  >
                    <UserSearch className={`w-5 h-5 ${isDark ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-500 group-hover:text-blue-400'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>View Requests</span>
                  </Link>
                  <Link
                    to="/admin/stats"
                    className={`px-4 py-3 ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'} flex items-center gap-3 transition-all duration-200 group`}
                  >
                    <Waypoints className={`w-5 h-5 ${isDark ? 'text-green-400 group-hover:text-green-300' : 'text-green-500 group-hover:text-green-400'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>View Stats</span>
                  </Link>
                  <Link
                    to="/admin/settings"
                    className={`px-4 py-3 ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'} flex items-center gap-3 transition-all duration-200 group`}
                  >
                    <Settings className={`w-5 h-5 ${isDark ? 'text-indigo-400 group-hover:text-indigo-300' : 'text-indigo-500 group-hover:text-indigo-400'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>Admin Settings</span>
                  </Link>
                </>
              )}

              <div className={`border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} mt-2`}>
                <Link
                  to="https://discord.com/invite/SAPZmTTeuN"
                  className={`px-4 py-3 ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'} flex items-center gap-3 transition-all duration-200 group`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HelpCircle className={`w-5 h-5 ${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-400'}`} />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>Support</span>
                </Link>

                <button
                  onClick={Logout}
                  className={`w-full px-4 py-3 ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'} flex items-center gap-3 transition-all duration-200 group`}
                >
                  <LogOut className={`w-5 h-5 ${isDark ? 'text-red-400 group-hover:text-red-300' : 'text-red-500 group-hover:text-red-400'}`} />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default UserMenu;