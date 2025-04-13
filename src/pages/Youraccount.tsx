import React, { useEffect, useState } from "react";
import {
  User,
  Crown,
  Star,

  XCircle,
  Shield,
  Clock,
  CreditCard,
  Gift,
  Settings,
  Bell,
  Mail,
  MessageCircle,
  Send,
  Download,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface Userdatatypes {
  id: number;
  name: string;
  email: string;
  isVip: boolean;
  isAdmin: boolean;
  isDisabled: boolean;
  vipExpirationDate: string;
  stripeSubscriptionId: string | null;
  favorites: any[];
  recentlyViewed: any[];
  transactions: any[];
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
}

function Youraccount() {
  const [userData, setUserData] = useState<Userdatatypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSubscriptionInfo, setShowSubscriptionInfo] = useState(false);

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("Token");

      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://x-nyx-backend.vercel.app/auth/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const calculateDaysLeft = (expirationDate: string): number => {
    const currentDate = new Date();
    const expDate = new Date(expirationDate);
    const timeDiff = expDate.getTime() - currentDate.getTime();
    return Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 0);
  };

  const darkClasses = {
    bg: "bg-gray-800 text-gray-200",
    bgSecondary: "bg-gray-700 rounded-2xl shadow-lg border border-gray-700/50",
    text: "text-gray-200",
    textSecondary: "text-gray-400",
    border: "border-gray-700/50",
    iconBg: "bg-gray-700",
    iconText: "text-emerald-400",
    buttonHover: "hover:bg-gray-700",
    vipBg: "bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl",
    vipBenefitBg: "bg-gray-800/80 rounded-lg",
    modalBg: "bg-gray-700 rounded-2xl",
    modalButtonPrimary: "bg-emerald-700 text-white hover:bg-emerald-600",
    modalButtonSecondary: "bg-gray-600 text-gray-200 hover:bg-gray-500",
    errorBg: "bg-red-800 p-8 rounded-lg shadow-lg",
    errorText: "text-red-400",
    loadingBg: "bg-gray-800",
    loadingSpinnerBorder: "border-emerald-400 border-t-transparent",
    recentActivityBg: "bg-gray-700 rounded-xl border border-gray-700/50",
    recentActivityItemBg: "bg-gray-800 rounded-lg",
    infoBg: "bg-gray-700/50",
    infoText: "text-emerald-400",
    contactBg: "bg-gray-800/80",
  };

  const lightClasses = {
    bg: "bg-gradient-to-b from-green-50 to-white",
    bgSecondary: "bg-white rounded-2xl shadow-lg p-8 border border-green-100",
    text: "text-gray-800",
    textSecondary: "text-gray-500",
    border: "border-green-100",
    iconBg: "bg-green-100",
    iconText: "text-green-600",
    buttonHover: "hover:bg-green-50",
    vipBg: "bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl",
    vipBenefitBg: "bg-white/80 rounded-lg",
    modalBg: "bg-white rounded-2xl",
    modalButtonPrimary: "bg-red-100 text-red-600 hover:bg-red-200",
    modalButtonSecondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    errorBg: "bg-white p-8 rounded-lg shadow-lg",
    errorText: "text-red-500",
    loadingBg: "bg-gradient-to-b from-green-50 to-white",
    loadingSpinnerBorder: "border-green-500 border-t-transparent",
    recentActivityBg: "mt-8 bg-white rounded-xl border border-green-100 p-6",
    recentActivityItemBg: "p-4 bg-green-50 rounded-lg",
    infoBg: "bg-emerald-50",
    infoText: "text-emerald-600",
    contactBg: "bg-white/90",
  };

  const classes = isDarkMode ? darkClasses : lightClasses;

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${classes.loadingBg}`}>
        <div
          className={`animate-spin rounded-full h-12 w-12 border-4 ${classes.loadingSpinnerBorder}`}
        ></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${classes.bg}`}>
        <div className={`${classes.errorBg}`}>
          <p className={`${classes.errorText}`}>
            Error: {error || "No user data available"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${classes.bg}`}>
      <div className="max-w-7xl mx-auto p-8">
        {/* Subscription Info Banner */}
        {userData.isVip && (
          <div className={`${classes.infoBg} p-4 rounded-xl mb-8 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className={`w-5 h-5 ${classes.infoText}`} />
                <p className={`${classes.text} font-medium`}>
                  To cancel your recurring subscription, please email us at{" "}
                  <a
                    href="mailto:contact@xnyxleaks.com"
                    className={`${classes.infoText} hover:underline`}
                  >
                    contact@xnyxleaks.com
                  </a>
                </p>
              </div>
              <button
                onClick={() => setShowSubscriptionInfo(!showSubscriptionInfo)}
                className={`${classes.buttonHover} p-2 rounded-lg transition-colors`}
              >
              </button>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className={`${classes.bgSecondary} p-8 mb-8 ${classes.border}`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`${classes.iconBg} p-3 rounded-full`}>
                <User className={`w-8 h-8 ${classes.iconText}`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${classes.text}`}>
                  {userData.name}
                </h1>
                <p className={`${classes.textSecondary}`}>{userData.email}</p>
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`${classes.iconBg} rounded-xl p-6 ${classes.border}`}>
              <div className="flex items-center gap-3 mb-3">
                <Clock className={`w-5 h-5 ${classes.iconText}`} />
                <h3 className={`font-semibold ${classes.textSecondary}`}>
                  Member Since
                </h3>
              </div>
              <p className={`text-2xl font-bold ${classes.text}`}>
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className={`${classes.iconBg} rounded-xl p-6 ${classes.border}`}>
              <div className="flex items-center gap-3 mb-3">
                <Shield className={`w-5 h-5 ${classes.iconText}`} />
                <h3 className={`font-semibold ${classes.textSecondary}`}>
                  Account Status
                </h3>
              </div>
              <p className={`text-2xl font-bold ${classes.text}`}>
                {userData.isVip ? "VIP Member" : "Free Member"}
                {userData.isAdmin && " (Admin)"}
              </p>
            </div>
            <div className={`${classes.iconBg} rounded-xl p-6 ${classes.border}`}>
              <div className="flex items-center gap-3 mb-3">
                <CreditCard className={`w-5 h-5 ${classes.iconText}`} />
                <h3 className={`font-semibold ${classes.textSecondary}`}>
                  VIP Status
                </h3>
              </div>
              <p className={`text-2xl font-bold ${classes.text}`}>
                {calculateDaysLeft(userData.vipExpirationDate)} days left
              </p>
            </div>
          </div>

          {/* VIP Benefits */}
          {userData.isVip && (
            <div className={`${classes.vipBg} p-6 mb-8`}>
              <div className="flex items-center gap-3 mb-6">
                <Crown className={`w-6 h-6 ${classes.iconText}`} />
                <h2 className={`text-xl font-bold ${classes.text}`}>
                  Your Premium Benefits
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`${classes.vipBenefitBg} p-4 flex items-center gap-3`}>
                  <Star className={`w-5 h-5 ${classes.iconText}`} />
                  <span className={`${classes.text}`}>Premium Content</span>
                </div>
                <div className={`${classes.vipBenefitBg} p-4 flex items-center gap-3`}>
                  <Gift className={`w-5 h-5 ${classes.iconText}`} />
                  <span className={`${classes.text}`}>Ad-free Experience</span>
                </div>
                <div className={`${classes.vipBenefitBg} p-4 flex items-center gap-3`}>
                  <Download className={`w-5 h-5 ${classes.iconText}`} />
                  <span className={`${classes.text}`}>Download Access</span>
                </div>
                <div className={`${classes.vipBenefitBg} p-4 flex items-center gap-3`}>
                  <MessageCircle className={`w-5 h-5 ${classes.iconText}`} />
                  <span className={`${classes.text}`}>Priority Support</span>
                </div>
              </div>
            </div>
          )}

          {/* Contact Support */}
          <div className={`${classes.contactBg} p-6 rounded-xl mb-8 border ${classes.border}`}>
            <div className="flex items-center gap-3 mb-4">
              <Send className={`w-6 h-6 ${classes.iconText}`} />
              <h2 className={`text-xl font-bold ${classes.text}`}>
                Need Help?
              </h2>
            </div>
            <p className={`${classes.textSecondary} mb-4`}>
              Our support team is here to help you with any questions or concerns.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://discord.gg/your-invite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Join Discord</span>
              </a>
              <a
                href="https://t.me/your-channel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#229ED9] text-white hover:bg-[#1E8BC3] transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                <span>Telegram Support</span>
              </a>
              <a
                href="mailto:contact@xnyxleaks.com"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                } transition-all duration-300`}
              >
                <Mail className={`w-5 h-5 ${classes.iconText}`} />
                <span className={classes.text}>Email Support</span>
              </a>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`${classes.recentActivityBg}`}>
            <div className="flex items-center gap-3 mb-6">
              <Clock className={`w-6 h-6 ${classes.iconText}`} />
              <h2 className={`text-xl font-bold ${classes.text}`}>
                Recent Activity
              </h2>
            </div>
            <div className="grid gap-4">
              {userData.recentlyViewed.length > 0 ? (
                userData.recentlyViewed.map((item, index) => (
                  <div key={index} className={`${classes.recentActivityItemBg} p-4`}>
                    <p className={`font-medium ${classes.text}`}>
                      {item.title}
                    </p>
                    <p className={`text-sm ${classes.textSecondary}`}>
                      Viewed on {new Date(item.viewedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className={`${classes.iconBg} text-center py-8 rounded-lg`}>
                  <Clock className={`w-12 h-12 ${classes.iconText} mx-auto mb-3`} />
                  <p className={`${classes.textSecondary}`}>No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={`${classes.modalBg} p-8 max-w-md w-full`}>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h2 className={`text-2xl font-bold text-center mb-4 ${classes.text}`}>
              Cancel Subscription
            </h2>
            <p className={`text-center mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              To cancel your VIP subscription, please email us at{" "}
              <a
                href="mailto:contact@xnyxleaks.com"
                className="text-emerald-500 hover:underline"
              >
                contact@xnyxleaks.com
              </a>
              . Our team will process your cancellation within 24 hours.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowCancelModal(false)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${classes.modalButtonSecondary}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Youraccount;