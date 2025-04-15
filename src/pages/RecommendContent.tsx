import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, AlertCircle, FileText, MessageSquare, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const RecommendContent: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const token = localStorage.getItem("Token");
  const email = localStorage.getItem("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/recommendations`,
        {
          title,
          description,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setTitle("");
      setDescription("");
      
      window.location.reload();  
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      setMessage("There was an error submitting your recommendation.");
    } finally {
      setIsSubmitting(false);
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
      <div className="relative z-10 w-full max-w-2xl p-8">
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
              Recommend Content
            </span>
          </motion.div>
        </div>

        {/* Form Container */}
        <div className={`${
          isDark 
            ? 'bg-gray-800/50 border-gray-700/30' 
            : 'bg-white/80 border-gray-200'
        } backdrop-blur-xl border rounded-3xl p-8 shadow-xl`}>
          
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{message}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Title
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`block w-full pl-10 pr-4 py-3 rounded-xl ${
                    isDark 
                      ? 'bg-gray-700/50 text-gray-100 placeholder-gray-400' 
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                  } border-emerald-500/20 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all`}
                  placeholder="Enter the content title"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-emerald-400" />
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className={`block w-full pl-10 pr-4 py-3 rounded-xl ${
                    isDark 
                      ? 'bg-gray-700/50 text-gray-100 placeholder-gray-400' 
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                  } border-emerald-500/20 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all`}
                  placeholder="Enter a brief description of the content"
                ></textarea>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-medium hover:from-emerald-400 hover:to-teal-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 mr-2"
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Recommendation
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecommendContent;