import React from 'react';
import { Eye, Zap } from 'lucide-react';
import { TrendingCardProps } from './types';

export const TrendingCard: React.FC<TrendingCardProps> = ({
    link,
    theme,
    onCardClick,
    onViewClick,
}) => {
    return (
        <div
            onClick={() => onCardClick(link.slug)}
            className={`rounded-xl p-4 transition-all duration-300
                transform hover:-translate-y-1 hover:shadow-md group cursor-pointer
                border ${
                    theme === 'dark'
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-purple-100'
                }`}
        >
            <div className="flex items-start gap-3">
                <div className={`rounded-lg p-2 transition-colors duration-300 ${
                    theme === 'dark'
                        ? 'bg-gray-600 group-hover:bg-gray-500'
                        : 'bg-purple-100 group-hover:bg-purple-200'
                }`}>
                    <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium line-clamp-1 transition-colors duration-300 ${
                        theme === 'dark'
                            ? 'text-gray-200 group-hover:text-purple-400'
                            : 'text-purple-900 group-hover:text-purple-700'
                    }`}>
                        {link.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs ${
                            theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                        }`}>{link.category}</span>
                        <span className={`inline-flex items-center text-xs font-medium ${
                            theme === 'dark' ? 'text-purple-400' : 'text-purple-700'
                        }`}>
                            {link.views || 0} views
                        </span>
                    </div>
                    <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewClick(link.id);
                        }}
                        className="mt-2 inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium py-1 px-2 rounded-md
                            transition-all duration-200 w-full text-center"
                    >
                        View Resource
                        <Zap className="ml-1 w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>
    );
};