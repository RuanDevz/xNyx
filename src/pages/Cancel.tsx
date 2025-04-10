import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  XCircle,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  MessageCircle,
  ShieldAlert,
  HelpCircle,
  ArrowLeftCircle
} from "lucide-react";

export default function Cancel() {
  const troubleshootingSteps = [
    {
      icon: RefreshCw,
      title: "Try Again",
      description: "You can attempt the payment process again"
    },
    {
      icon: ShieldAlert,
      title: "Check Details",
      description: "Verify your payment information is correct"
    },
    {
      icon: HelpCircle,
      title: "Get Support",
      description: "Our team is here to assist you"
    }
  ];

  const theme = "dark"; // You can make this dynamic with your theme context

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
                ? "bg-red-500/10 border-red-500/20"
                : "bg-red-100 border-red-200"
            } border-2 flex items-center justify-center relative overflow-hidden`}
          >
            <XCircle className={`w-12 h-12 ${
              theme === "dark" ? "text-red-400" : "text-red-600"
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
            Payment Unsuccessful
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-xl max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Don't worry! Your payment wasn't processed and no charges were made. Here are some steps you can take:
          </motion.p>
        </motion.div>

        {/* Troubleshooting Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {troubleshootingSteps.map((step, index) => (
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
                <div className={`w-12 h-12 ${
                  theme === "dark"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-red-100 text-red-600"
                } rounded-xl flex items-center justify-center mb-4`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>{step.title}</h3>
                <p className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>{step.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-20" />
            </motion.div>
          ))}
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`rounded-3xl overflow-hidden ${
            theme === "dark"
              ? "bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/20"
              : "bg-gradient-to-r from-red-50 to-orange-50 border border-red-100"
          } p-8 md:p-12 relative`}
        >
          <div className="relative z-10">
            <div className="text-center mb-10">
              <AlertTriangle className={`w-8 h-8 mx-auto mb-4 ${
                theme === "dark" ? "text-red-400" : "text-red-600"
              }`} />
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Need Assistance?</h2>
              <p className={`text-lg max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                Our support team is ready to help you resolve any payment issues you might be experiencing.
                Don't hesitate to reach out if you need help.
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
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-red-500/10 to-transparent rounded-full blur-3xl"
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
            className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              theme === "dark"
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            Try Payment Again
            <RefreshCw className="w-5 h-5 ml-2" />
          </Link>
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