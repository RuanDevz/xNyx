import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Lock, Mail, Loader2, AlertCircle, User, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`https://x-nyx-backend.vercel.app/auth/register`, {
        name,
        email,
        password,
        vip: false,
      });
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", email);

      const loginResponse = await axios.post(
        `https://x-nyx-backend.vercel.app/auth/login`,
        {
          email,
          password,
        }
      );

      const token = loginResponse.data.token;
      localStorage.setItem("Token", token);
      console.log("Logged in successfully with token:", token);

      window.location.href = "/";
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("There was an error registering. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative ${isDark ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'} flex items-center justify-center transition-colors duration-200`}>
     

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute w-[500px] h-[500px] ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-500/5'} rounded-full blur-[120px] -top-48 -right-24 animate-pulse`} />
        <div className={`absolute w-[400px] h-[400px] ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-500/5'} rounded-full blur-[100px] -bottom-32 -left-24 animate-pulse delay-300`} />
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
              isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-500/5 border-emerald-500/10'
            } rounded-2xl backdrop-blur-sm border mb-6`}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              xNyxLeaks
            </span>
          </motion.div>
        </div>

        {/* Register Form */}
        <div className={`${
          isDark 
            ? 'bg-gray-800/50 border-gray-700/30' 
            : 'bg-white/80 border-gray-200'
        } backdrop-blur-xl border rounded-3xl p-8 shadow-xl`}>
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Create Account
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

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`block w-full pl-10 pr-4 py-3 rounded-xl ${
                    isDark 
                      ? 'bg-gray-700/50 text-gray-100 placeholder-gray-400' 
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                  } border-emerald-500/20 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all`}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
                    isDark 
                      ? 'bg-gray-700/50 text-gray-100 placeholder-gray-400' 
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                  } border-emerald-500/20 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all`}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
                    isDark 
                      ? 'bg-gray-700/50 text-gray-100 placeholder-gray-400' 
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                  } border-emerald-500/20 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all`}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`block w-full pl-10 pr-4 py-3 rounded-xl ${
                    isDark 
                      ? 'bg-gray-700/50 text-gray-100 placeholder-gray-400' 
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                  } border-emerald-500/20 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all`}
                  placeholder="Confirm your password"
                  required
                />
              </div>
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
                  Creating account...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Create Account
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;