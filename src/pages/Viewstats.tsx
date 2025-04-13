import React, { useEffect, useState } from 'react';
import { Users, Crown, Calendar, Percent, Activity } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Stats {
  totalUsers: number;
  totalVIPs: number;
  totalContentRecommendations: number;
  usersLastMonth: number;
  vipPercentage: number;
}

const ViewStats: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalVIPs: 0,
    totalContentRecommendations: 0,
    usersLastMonth: 0,
    vipPercentage: 0,
  });
  
  const [loading, setLoading] = useState<boolean>(true);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      try {
        const response = await fetch(`https://x-nyx-backend.vercel.app/api/stats`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const classes = {
    container: isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-b from-green-50 to-white',
    card: isDarkMode ? 'bg-gray-700' : 'bg-white',
    title: isDarkMode ? 'text-gray-100' : 'text-gray-800',
    subtitle: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-600' : 'border-emerald-100',
    iconWrapper: isDarkMode ? 'bg-gray-600 text-emerald-400' : 'bg-emerald-100 text-emerald-600',
    value: isDarkMode ? 'text-gray-100' : 'text-gray-900',
    loadingBg: isDarkMode ? 'bg-gray-700' : 'bg-white',
    loadingText: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    loadingSpinner: isDarkMode ? 'border-emerald-400' : 'border-emerald-600',
  };

  const stats_data = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
    },
    {
      title: 'VIP Users',
      value: stats.totalVIPs,
      icon: Crown,
      color: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
    },
    {
      title: 'Users Last Month',
      value: stats.usersLastMonth,
      icon: Calendar,
      color: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
    },
    {
      title: 'VIP Percentage',
      value: `${stats.vipPercentage}%`,
      icon: Percent,
      color: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
    },
  ];

  if (loading) {
    return (
      <div className={`min-h-screen ${classes.container} flex items-center justify-center p-4`}>
        <div className={`${classes.loadingBg} p-8 rounded-2xl shadow-xl flex flex-col items-center`}>
          <div className={`animate-spin rounded-full h-12 w-12 border-4 border-t-transparent ${classes.loadingSpinner}`}></div>
          <p className={`mt-4 ${classes.loadingText} font-medium`}>Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${classes.container} p-4 md:p-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Activity className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} size={28} />
          <h1 className={`text-3xl font-bold ${classes.title}`}>Website Statistics</h1>
        </div>

        <div className={`${classes.card} rounded-2xl shadow-xl border ${classes.border} p-6 md:p-8`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats_data.map((item, index) => (
              <div
                key={index}
                className={`${classes.card} rounded-xl border ${classes.border} p-6 transition-transform duration-300 hover:scale-105`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${classes.iconWrapper} p-3 rounded-lg`}>
                    <item.icon size={24} />
                  </div>
                </div>
                <div>
                  <h2 className={`${classes.subtitle} text-lg font-medium mb-2`}>{item.title}</h2>
                  <p className={`${classes.value} text-3xl font-bold`}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStats;