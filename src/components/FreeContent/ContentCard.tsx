import React, { useEffect } from 'react';
import { format, isToday } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Star, Eye, Zap } from 'lucide-react';
import { ContentCardProps } from './types';
import { linkvertise } from '../../utils/linkvertise';

export const ContentCard: React.FC<ContentCardProps> = ({
    link,
    theme,
    onCardClick,
    onViewClick,
}) => {
    useEffect(() => {
        // Only apply linkvertise if it's not a VIP link
        if (!link.isVip) {
            linkvertise("1329936", { whitelist: [] });
        }
    }, [link.isVip]);

    const handleViewClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
        onViewClick(link.id);
    };

    return (
        <div
            onClick={() => onCardClick(link.slug)}
            className={`rounded-lg transition-all duration-200
                hover:shadow-md group cursor-pointer border p-4 mb-4 ${
                    theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                        : 'bg-white border-gray-100 hover:border-emerald-100'
                }`}
        >
            <div className="flex items-start gap-3">
                <div className={`rounded-md p-1.5 transition-colors duration-200 ${
                    theme === 'dark'
                        ? 'bg-gray-700 group-hover:bg-gray-600'
                        : 'bg-emerald-100 group-hover:bg-emerald-200'
                }`}>
                    <Star className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-base font-medium line-clamp-2 ${
                            theme === 'dark'
                                ? 'text-gray-200 group-hover:text-emerald-400'
                                : 'text-gray-800 group-hover:text-emerald-700'
                        }`}>
                            {link.name}
                        </h4>
                        {isToday(new Date(link.createdAt)) && (
                            <span className="bg-emerald-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                New
                            </span>
                        )}
                    </div>

                    {link.description && (
                        <p className={`text-sm line-clamp-2 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            {link.description}
                        </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                            <span className={`text-xs px-2 py-0.5 rounded-md ${
                                theme === 'dark'
                                    ? 'bg-gray-700 text-emerald-400'
                                    : 'bg-emerald-50 text-emerald-700'
                            }`}>
                                {link.category}
                            </span>
                            <span className={`text-xs flex items-center ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                                <Eye className="w-3 h-3 mr-0.5" />
                                {link.views || 0}
                            </span>
                        </div>
                        
                        <span className={`text-xs ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                            {format(new Date(link.createdAt), 'MMMM d, yyyy', { locale: enUS })}
                        </span>
                    </div>

                    <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleViewClick}
                        className="mt-2 inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-1.5 px-3 rounded-md
                            transition-all duration-200 w-full text-center"
                    >
                        View
                        <Zap className="ml-1.5 w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
        </div>
    );
};