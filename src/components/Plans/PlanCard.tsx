import React, { useState } from "react";
import { CheckCircle, Loader2, Crown, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";

interface PlanCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => Promise<void>;
  isPopular: boolean;
  theme: string;
  type: 'free' | 'premium' | 'vip';
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  description,
  features,
  buttonText,
  onButtonClick,
  isPopular,
  theme,
  type
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      await onButtonClick();
    } catch (error) {
      console.error("Error during button click:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeStyles = () => {
    const styles = {
      free: {
        gradient: theme === 'dark' 
          ? 'from-gray-800 to-gray-700'
          : 'from-gray-50 to-white',
        border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
        button: theme === 'dark'
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-gray-200 hover:bg-gray-300',
        icon: <Star className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
      },
      premium: {
        gradient: theme === 'dark'
          ? 'from-purple-900 to-purple-800'
          : 'from-purple-50 to-white',
        border: theme === 'dark' ? 'border-purple-700' : 'border-purple-200',
        button: theme === 'dark'
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
        icon: <Zap className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
      },
      vip: {
        gradient: theme === 'dark'
          ? 'from-blue-900 to-blue-800'
          : 'from-blue-50 to-white',
        border: theme === 'dark' ? 'border-blue-700' : 'border-blue-200',
        button: theme === 'dark'
          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
          : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
        icon: <Crown className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
      }
    };
    return styles[type];
  };

  const typeStyles = getTypeStyles();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative rounded-2xl overflow-hidden border ${typeStyles.border} 
        bg-gradient-to-b ${typeStyles.gradient} backdrop-blur-lg
        ${isPopular ? 'shadow-2xl' : 'shadow-xl'} transition-all duration-300`}
    >
      {isPopular && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
      )}

      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          {typeStyles.icon}
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{title}</h3>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{price}</span>
            {type !== 'free' && (
              <span className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>{type === 'vip' ? '/year' : '/month'}</span>
            )}
          </div>
          <p className={`mt-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>{description}</p>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>{feature}</span>
            </motion.li>
          ))}
        </ul>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleButtonClick}
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-xl font-semibold ${typeStyles.button} 
            ${theme === 'dark' ? 'text-white' : type === 'free' ? 'text-gray-700' : 'text-white'}
            transition-all duration-200 flex items-center justify-center gap-2`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            buttonText
          )}
        </motion.button>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: isHovered ? 0.1 : 0,
          }}
          className={`absolute inset-0 ${
            type === 'premium'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
              : type === 'vip'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
              : 'bg-gradient-to-r from-gray-500 to-gray-400'
          }`}
        />
      </div>
    </motion.div>
  );
};

export default PlanCard;