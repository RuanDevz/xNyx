import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "../components/Plans/PlanCard";
import Loading from "../components/Loading/Loading";
import { motion } from "framer-motion";
import { Crown, Sparkles, Shield, Zap, Users, Globe } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Plans: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVip, setIsVip] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const email = localStorage.getItem("email");
  const { theme } = useTheme();

  useEffect(() => {
    const checkAuthAndVipStatus = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const authResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (authResponse.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("Token");
          setIsAuthenticated(false);
        }

        const vipResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/is-vip/${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await vipResponse.json();
        setIsVip(data.isVip);
      } catch (error) {
        console.error("Error checking authentication or VIP status:", error);
        localStorage.removeItem("Token");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndVipStatus();
  }, [token, email]);

 const handleAccessClick = async (planType: "monthly" | "annual"): Promise<void> => {
  const email = localStorage.getItem("email");

  if (!token || !email) {
    navigate("/login");
    return;
  }

  localStorage.setItem("selectedPlan", planType);

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ planType, email }),
    });

    const data = await response.json();

    if (response.ok && data.url) {
      window.location.href = data.url; // redireciona para o checkout do Stripe
    } else {
      console.error("Erro ao redirecionar:", data.message || "Erro desconhecido");
    }
  } catch (error) {
    console.error("Erro ao iniciar o pagamento:", error);
  }
};
  const handleRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const planType = urlParams.get("planType");
    const isCanceled = window.location.pathname.includes("/cancel");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-vip-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            planType,
            isVip: !isCanceled,
          }),
        }
      );

      if (!response.ok) throw new Error("Error updating VIP status");

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFreeContentClick = (): Promise<void> => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/");
    }
    return Promise.resolve();
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -left-48 -top-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] -right-48 -bottom-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className={`text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r 
            ${theme === 'dark' ? 'from-purple-400 via-pink-500 to-red-500' : 'from-purple-600 via-pink-600 to-red-600'}`}>
            Unlock Premium Features
          </h1>
          <p className={`text-xl mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Choose the perfect plan to enhance your experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { icon: Zap, text: "Lightning Fast Access" },
              { icon: Users, text: "Premium Community" },
              { icon: Globe, text: "Worldwide Content" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center justify-center gap-3 p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
                } backdrop-blur-lg border ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <item.icon className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`} />
                <span className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PlanCard
              title="FREE ACCESS"
              price="$0.00"
              description="Start your journey"
              features={[
                "Basic content access",
                "Community forum access",
                "Standard support",
                "Ad-supported experience",
                "Limited features",
                "Public chat access",
                "Basic analytics",
                "Standard updates"
              ]}
              buttonText="Get Started"
              onButtonClick={handleFreeContentClick}
              isPopular={false}
              theme={theme}
              type="free"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:transform md:-translate-y-4"
          >
            <PlanCard
              title="PREMIUM MONTHLY"
              price="$10.00"
              description="Most flexible option"
              features={[
                "Full content",
                "Priority support 24/7",
                "Early access to content",
                "Exclusive webinars",
                "Premium features",
                "Access to Discord Premium announcements",
                "Access to Telegram Premium announcements",
                "Content recommendations"
              ]}
              buttonText="Get Premium"
              onButtonClick={() => handleAccessClick("monthly")}
              isPopular={true}
              theme={theme}
              type="premium"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PlanCard
              title="ANNUAL VIP"
              price="$60.00"
              description="Best value - Save 50%"
              features={[
                "All Premium features",
                "Ad-free experience",
                "Exclusive events",
                "Premium features",
                "Access to Discord Premium announcements",
                "Access to Telegram Premium announcements",
                "Content recommendations",
                "Early access to content"
              ]}
              buttonText="Go Annual"
              onButtonClick={() => handleAccessClick("annual")}
              isPopular={false}
              theme={theme}
              type="vip"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Plans;