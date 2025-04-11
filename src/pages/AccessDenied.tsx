import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShieldOff,
  Crown,
  Lock,
  ArrowRight,
  AlertTriangle,
  Sparkles,
  ArrowLeftCircle
} from "lucide-react";

interface AccessDeniedProps {
  message: string;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ message }) => {
  const premiumFeatures = [
    {
      icon: Crown,
      title: "Exclusive Content",
      description: "Access premium-only features and content"
    },
    {
      icon: Lock,
      title: "Full Access",
      description: "Unlock all platform features instantly"
    },
    {
      icon: Sparkles,
      title: "Premium Support",
      description: "Get priority assistance when needed"
    }
  ];

  const theme = "dark";

  return (
    <div className={`min-h-screen ${
      theme === "dark" ? "bg-gray-900" : "bg-gray-50"
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`w-24 h-24 mx-auto mb-8 rounded-3xl ${
              theme === "dark"
                ? "bg-indigo-500/10 border-indigo-500/20"
                : "bg-indigo-100 border-indigo-200"
            } border-2 flex items-center justify-center relative overflow-hidden`}
          >
            <ShieldOff className={`w-12 h-12 ${
              theme === "dark" ? "text-indigo-400" : "text-indigo-600"
            }`} />
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Access Denied
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-xl max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {message || "This content is exclusively available to premium members. Upgrade your account to access all features."}
          </motion.p>
        </motion.div>

        {/* Premium Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (index * 0.1) }}
              className={`relative overflow-hidden rounded-2xl ${
                theme === "dark"
                  ? "bg-gray-800/50 border border-gray-700"
                  : "bg-white border border-gray-200"
              } p-6`}
            >
              <div className="relative z-10">
                <div className={`w-12 h-12 ${
                  theme === "dark"
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-100 text-indigo-600"
                } rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>{feature.title}</h3>
                <p className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>{feature.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-20" />
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`rounded-3xl overflow-hidden ${
            theme === "dark"
              ? "bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/20"
              : "bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100"
          } p-8 md:p-12 relative`}
        >
          <div className="relative z-10">
            <div className="text-center mb-10">
              <Crown className={`w-12 h-12 mx-auto mb-4 ${
                theme === "dark" ? "text-indigo-400" : "text-indigo-600"
              }`} />
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Unlock Premium Features</h2>
              <p className={`text-lg max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                Join our premium membership to unlock exclusive content and enjoy an enhanced experience
                with access to all premium features.
              </p>
            </div>
          </div>

          {/* Background Animation */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-full blur-3xl"
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Link
            to="/pricing"
            className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              theme === "dark"
                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Upgrade to Premium
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Link
            to="/"
            className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200"
            }`}
          >
            Return to Homepage
            <ArrowLeftCircle className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AccessDenied;