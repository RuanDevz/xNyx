import React from 'react';
import { Sparkles, Crown } from 'lucide-react';

interface VIPBannerProps {
    theme: string;
    onUpgradeClick: () => void;
}

export const VIPBanner: React.FC<VIPBannerProps> = ({ theme, onUpgradeClick }) => {
    return (
        <div className={`mt-16 text-center py-12 rounded-xl border ${
            theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-emerald-50 border-emerald-100'
        }`}>
            <Sparkles className="w-10 h-10 text-emerald-400 mx-auto mb-4 animate-pulse-slow" />
            <h3 className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-emerald-800'
            }`}>Unlock VIP Content</h3>
            <p className={`text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-emerald-700'
            }`}>
                Upgrade to VIP to access exclusive resources and premium features.
            </p>
            <button
                onClick={onUpgradeClick}
                className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
                Become a VIP <Crown className="w-4 h-4 ml-2 inline-block" />
            </button>
        </div>
    );
};