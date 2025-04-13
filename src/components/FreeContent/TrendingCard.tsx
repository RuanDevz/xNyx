import React, { useEffect } from 'react';
import { Eye, Zap } from 'lucide-react';
import { LinkItem } from './types';
import { linkvertise } from '../../utils/linkvertise';

interface TrendingCardProps {
    link: LinkItem;
    theme: string;
    onCardClick: (slug: string) => void;
    onViewClick: (id: number) => void;
}


export const TrendingCard: React.FC<TrendingCardProps> = ({
    link,
    theme,
    onCardClick,
    onViewClick,
}) => {

    useEffect(() => {
          linkvertise("1329936", {
            blacklist: ["discord.gg", "discord.com", "t.me", "telegram.me", "telegram.dog"]
          });
      }, []);
    return (
        <div
            onClick={() => onCardClick(link.slug)}
            className={`rounded-xl p-4 transition-all duration-300
                transform hover:-translate-y-1 hover:shadow-md group cursor-pointer
                border ${
                    theme === 'dark'
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-emerald-100'
                }`}
        >
            <div className="flex items-start gap-3">
                <div className={`rounded-lg p-2 transition-colors duration-300 ${
                    theme === 'dark'
                        ? 'bg-gray-600 group-hover:bg-gray-500'
                        : 'bg-emerald-100 group-hover:bg-emerald-200'
                }`}>
                    <Eye className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium line-clamp-1 transition-colors duration-300 ${
                        theme === 'dark'
                            ? 'text-gray-200 group-hover:text-emerald-400'
                            : 'text-emerald-900 group-hover:text-emerald-700'
                    }`}>
                        {link.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs ${
                            theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                        }`}>{link.category}</span>
                        <span className={`inline-flex items-center text-xs font-medium ${
                            theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
                        }`}>
                            {link.views || 0} views
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};