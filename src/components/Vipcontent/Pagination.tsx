import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from './types';

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
    theme,
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 mt-8 pb-8">
            <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-md transition-all duration-200
                    ${currentPage === 1
                        ? theme === 'dark'
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : theme === 'dark'
                            ? 'bg-purple-900/50 text-purple-300 hover:bg-purple-800/50'
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
            >
                <ChevronLeft className="w-4 h-4" />
                Previous
            </button>
            <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-4 py-2 rounded-md transition-all duration-200
                    ${currentPage === totalPages
                        ? theme === 'dark'
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : theme === 'dark'
                            ? 'bg-purple-900/50 text-purple-300 hover:bg-purple-800/50'
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
            >
                Next
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};