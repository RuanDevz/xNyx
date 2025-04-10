import React from 'react';
import { Search, LayoutGrid, Calendar, SortDesc, X } from 'lucide-react';
import { FilterProps } from './types';
import { MONTHS } from './constants';

export const Filters: React.FC<FilterProps> = ({
    searchName,
    setSearchName,
    selectedCategory,
    setSelectedCategory,
    selectedMonth,
    setSelectedMonth,
    sortOption,
    setSortOption,
    categories,
    showFilters,
    setShowFilters,
    theme,
}) => {
    return (
        <aside className={`
            md:w-72 p-6
            md:sticky md:top-0 md:h-screen
            fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out
            ${showFilters ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
            ${theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border-r
        `}>
            <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Filters</h2>
                <button
                    onClick={() => setShowFilters(false)}
                    className={`md:hidden ${
                        theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search content..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                            theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                        } border`}
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h3 className={`flex items-center gap-2 text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>
                    <LayoutGrid className="w-4 h-4" />
                    Categories
                </h3>
                <div className="space-y-2">
                    <button
                        onClick={() => setSelectedCategory("")}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200
                            ${selectedCategory === ""
                                ? theme === 'dark'
                                    ? "bg-emerald-900/50 text-emerald-300"
                                    : "bg-emerald-100 text-emerald-700"
                                : theme === 'dark'
                                    ? "text-gray-300 hover:bg-gray-700"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        All Categories
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200
                                ${selectedCategory === category.id
                                    ? theme === 'dark'
                                        ? "bg-emerald-900/50 text-emerald-300"
                                        : "bg-emerald-100 text-emerald-700"
                                    : theme === 'dark'
                                        ? "text-gray-300 hover:bg-gray-700"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Months */}
            <div className="mb-6">
                <h3 className={`flex items-center gap-2 text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>
                    <Calendar className="w-4 h-4" />
                    Month
                </h3>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-200 text-gray-900'
                    } border`}
                >
                    {MONTHS.map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sort Options */}
            <div>
                <h3 className={`flex items-center gap-2 text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}>
                    <SortDesc className="w-4 h-4" />
                    Sort By
                </h3>
                <div className="space-y-2">
                    {["mostRecent", "mostViewed", "alphabetical"].map((option) => (
                        <button
                            key={option}
                            onClick={() => setSortOption(option)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200
                                ${sortOption === option
                                    ? theme === 'dark'
                                        ? "bg-emerald-900/50 text-emerald-300"
                                        : "bg-emerald-100 text-emerald-700"
                                    : theme === 'dark'
                                        ? "text-gray-300 hover:bg-gray-700"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {option === "mostRecent" ? "Most Recent" :
                             option === "mostViewed" ? "Most Viewed" :
                             "Alphabetical"}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};