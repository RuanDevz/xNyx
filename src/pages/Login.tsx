import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Lock, Mail, Loader2, AlertCircle, Shield, Zap, CheckCircle, Sun, Moon } from "lucide-react";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("Token", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", email);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure Access",
      description: "Enterprise-grade security protocols"
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Fast Performance",
      description: "Lightning-fast response times"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Reliable Service",
      description: "99.9% uptime guarantee"
    }
  ];

  return (
    <div className={`min-h-screen relative ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'} flex items-center justify-center transition-colors duration-300`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-full ${
          theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-900 shadow-md'
        } hover:scale-110 transition-all duration-300`}
      >
      </button>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute w-[500px] h-[500px] ${theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-500/5'} rounded-full blur-[120px] -top-48 -right-24 animate-pulse`} />
        <div className={`absolute w-[400px] h-[400px] ${theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-500/5'} rounded-full blur-[100px] -bottom-32 -left-24 animate-pulse delay-300`} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`inline-flex items-center justify-center p-4 ${
              theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white shadow-lg'
            } rounded-2xl backdrop-blur-sm border mb-6`}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              xNyxLeaks
            </span>
          </motion.div>
        </div>

        <div className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700/30' 
            : 'bg-white/80 backdrop-blur-xl shadow-xl'
        } border rounded-3xl p-8`}>
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Login
          </h2>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{errorMessage}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-4 py-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 text-gray-100 placeholder-gray-400'
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                  } border-emerald-500/20 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all`}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-4 py-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 text-gray-100 placeholder-gray-400'
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                  } border-emerald-500/20 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all`}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className={`rounded border border-emerald-500/20 ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                  } text-emerald-500 focus:ring-2 focus:ring-emerald-500/20`}
                />
                <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
                onClick={() => window.location.href = '#/forgot-password'}
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-medium hover:from-emerald-400 hover:to-teal-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign in
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Don't have an account?{" "}
              <button
                onClick={() => window.location.href = '/register'}
                className="font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;