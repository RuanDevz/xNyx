import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Crown, 
  MessageCircle, 
  Send, 
  Sparkles, 
  Rocket,
  Gift,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function Success() {
  const email = localStorage.getItem("email");
  const planType = localStorage.getItem("selectedPlan");
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const updateVipStatus = async () => {
      if (!email || !planType) {
        console.error("Missing email or planType");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/update-vip-status`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, planType }), 
        });

        if (!response.ok) {
          throw new Error("Failed to update VIP status");
        }

        console.log("VIP status updated successfully");
      } catch (error) {
        console.error("Error updating VIP status:", error);
        alert("There was an error updating your VIP status. Please contact support.");
        navigate("/");
      }
    };

    if (email && planType) {
      updateVipStatus();
    } else {
      console.error("Email or planType not found in localStorage");
    }
  }, [email, planType, navigate]);

  const nextSteps = [
    {
      icon: MessageCircle,
      title: "Join Discord",
      description: "Connect with our community and request VIP role",
      link: "https://discord.gg/SAPZmTTeuN",
      buttonText: "Open Discord",
      color: "bg-[#5865F2]"
    },
    {
      icon: Send,
      title: "Join Telegram",
      description: "Get instant access to exclusive updates",
      link: "https://t.me/+u0Qu9SkPd8EyMzcx",
      buttonText: "Open Telegram",
      color: "bg-[#229ED9]"
    }
  ];

  const benefits = [
    {
      icon: Crown,
      title: "Premium Access",
      description: "Unlock all exclusive content"
    },
    {
      icon: Gift,
      title: "Special Perks",
      description: "Enjoy member-only benefits"
    },
    {
      icon: Rocket,
      title: "Priority Features",
      description: "First access to new releases"
    }
  ];

  return (
    <div className={`min-h-screen ${
      theme === "dark" ? "bg-gray-900" : "bg-gray-50"
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Success Message */}
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
                ? "bg-emerald-500/10 border-emerald-500/20"
                : "bg-emerald-100 border-emerald-200"
            } border-2 flex items-center justify-center relative overflow-hidden`}
          >
            <CheckCircle className={`w-12 h-12 ${
              theme === "dark" ? "text-emerald-400" : "text-emerald-600"
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
            Payment Successful!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-xl max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Thank you for joining our VIP community! To complete your access setup, please follow the steps below.
          </motion.p>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {nextSteps.map((step, index) => (
            <motion.div
              key={step.title}
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
                <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mb-4`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>{step.title}</h3>
                <p className={`mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>{step.description}</p>
                <a
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${step.color} text-white hover:opacity-90`}
                >
                  {step.buttonText}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-20" />
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`rounded-3xl overflow-hidden ${
            theme === "dark"
              ? "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/20"
              : "bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100"
          } p-8 md:p-12`}
        >
          <div className="relative z-10">
            <div className="text-center mb-10">
              <Sparkles className={`w-8 h-8 mx-auto mb-4 ${
                theme === "dark" ? "text-emerald-400" : "text-emerald-600"
              }`} />
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Your VIP Benefits</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + (index * 0.1) }}
                  className="text-center"
                >
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl ${
                    theme === "dark"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-emerald-100 text-emerald-600"
                  } flex items-center justify-center`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>{benefit.title}</h3>
                  <p className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }>{benefit.description}</p>
                </motion.div>
              ))}
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
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-full blur-3xl"
          />
        </motion.div>

        {/* Return Home Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <Link
            to="/"
            className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200"
            }`}
          >
            Return to Homepage
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}