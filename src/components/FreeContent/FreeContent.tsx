import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Filter, TrendingUp, Sparkles } from 'lucide-react';
import Masonry from 'react-masonry-css';
import { useTheme } from '../../contexts/ThemeContext';
import Loading from '../Loading/Loading';

import { Filters } from './Filters';
import { ContentCard } from './ContentCard';
import { Pagination } from './Pagination';
import { SidebarWrapper } from './SidebarWrapper';
import { TrendingCard } from './TrendingCard';
import { VIPBanner } from './VIPBanner';
import { ITEMS_PER_PAGE, BREAKPOINTS } from './constants';
import type { LinkItem, Category } from './types';
import { linkvertise } from '../../utils/linkvertise';

const FreeContent = () => {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchName, setSearchName] = useState<string>("");
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("mostRecent");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();
    const { theme } = useTheme();

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                setLoading(true);
                const response = await axios.get<LinkItem[]>(
                    `${import.meta.env.VITE_BACKEND_URL}/freecontent`
                );
                setLinks(response.data);
                setFilteredLinks(response.data);

                const extractedCategories = Array.from(
                    new Set(response.data.map((item) => item.category))
                ).map((category) => ({
                    id: category,
                    name: category,
                    category: category,
                }));
                setCategories(extractedCategories);
            } catch (error) {
                console.error("Error fetching free content:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, []);

    useEffect(() =>{
            linkvertise("1329936", {  whitelist: ["mega.nz"] });
    },[])

    const popularLinks = useMemo(() => {
        return [...links]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 5);
    }, [links]);

    const handleViewClick = async (linkId: number) => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/freecontent/${linkId}/views`);
            setLinks(prevLinks =>
                prevLinks.map(link =>
                    link.id === linkId ? { ...link, views: (link.views || 0) + 1 } : link
                )
            );
            setFilteredLinks(prevFilteredLinks =>
                prevFilteredLinks.map(link =>
                    link.id === linkId ? { ...link, views: (link.views || 0) + 1 } : link
                )
            );
        } catch (error) {
            console.error("Error counting view:", error);
        }
    };

    useEffect(() => {
        let result = [...links];

        if (searchName) {
            result = result.filter(link =>
                link.name.toLowerCase().includes(searchName.toLowerCase()) ||
                (link.description?.toLowerCase().includes(searchName.toLowerCase()))
            );
        }

        if (selectedCategory) {
            result = result.filter(link => link.category === selectedCategory);
        }

        if (selectedMonth) {
            result = result.filter(link => {
                const linkMonth = new Date(link.createdAt).getMonth() + 1;
                return linkMonth.toString().padStart(2, '0') === selectedMonth;
            });
        }

        switch (sortOption) {
            case "mostRecent":
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case "mostViewed":
                result.sort((a, b) => (b.views || 0) - (a.views || 0));
                break;
            case "alphabetical":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        setFilteredLinks(result);
        setCurrentPage(1);
    }, [links, searchName, selectedCategory, selectedMonth, sortOption]);

    const paginatedLinks = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredLinks.slice(startIndex, endIndex);
    }, [currentPage, filteredLinks]);

    const totalPages = Math.ceil(filteredLinks.length / ITEMS_PER_PAGE);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        scrollToTop();
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        scrollToTop();
    };

    const handleCardClick = (slug: string) => {
        navigate(`/content/free/${slug}`);
    };

    return (
        <div className={`min-h-screen grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-8 px-4 sm:px-6 lg:px-8 ${
            theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
        }`}>
            {/* Mobile Filter Toggle */}
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden fixed bottom-4 right-4 z-50 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 animate-bounce-slow"
                style={{ gridColumn: '1 / -1' }}
            >
                <Filter className="w-6 h-6" />
            </button>

            {/* Left Sidebar (Filters) */}
            <div className={`md:col-span-1 lg:col-span-1 xl:col-span-1 ${showFilters ? 'block fixed top-0 left-0 w-full h-full bg-gray-800/75 z-40 overflow-y-auto p-4' : 'hidden md:block'} order-1`}>
                <Filters
                    searchName={searchName}
                    setSearchName={setSearchName}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    categories={categories}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    theme={theme}
                />
            </div>

            {/* Main Content Area */}
            <main className={`md:col-span-3 lg:col-span-3 xl:col-span-4 order-2 ${
                theme === 'dark'
                    ? 'bg-gradient-to-b from-gray-800 to-gray-800'
                    : 'bg-gradient-to-b from-emerald-50/50 to-white'
            }`}>
                <div className="max-w-7xl mx-auto mb-8">
                    <div className="text-center mb-6">
                        <div className={`inline-flex items-center justify-center p-3 rounded-full mb-3 ${
                            theme === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-100'
                        }`}>
                            <h1 className={`text-2xl md:text-3xl font-bold ${
                                theme === 'dark' ? 'text-white' : 'text-emerald-800'
                            }`}>Free Content</h1>
                        </div>
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-emerald-700'}>
                            New updated content
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loading />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {paginatedLinks.map((link) => (
                                    <ContentCard
                                        key={link.id}
                                        link={link}
                                        theme={theme}
                                        onCardClick={handleCardClick}
                                        onViewClick={handleViewClick}
                                    />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPrevPage={handlePrevPage}
                                onNextPage={handleNextPage}
                                theme={theme}
                            />

                            <VIPBanner
                                theme={theme}
                                onUpgradeClick={() => navigate('/pricing')}
                            />
                        </>
                    )}
                </div>
            </main>

            {/* Right Sidebar (Trending Now) */}
            <div className={`md:col-span-1 lg:col-span-1 xl:col-span-1 order-3`}>
                <SidebarWrapper
                    title="Trending Now"
                    icon={<TrendingUp className="w-6 h-6" />}
                    theme={theme}
                >
                    {popularLinks.length > 0 ? (
                        <div className="space-y-4">
                            {popularLinks.map((link) => (
                                <TrendingCard
                                    key={link.id}
                                    link={link}
                                    theme={theme}
                                    onCardClick={handleCardClick}
                                    onViewClick={handleViewClick}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={`text-center py-8 rounded-xl border ${
                            theme === 'dark'
                                ? 'bg-gray-700 border-gray-600'
                                : 'bg-white border-emerald-100'
                        }`}>
                            <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                            <p className={theme === 'dark' ? 'text-gray-300' : 'text-emerald-600'}>
                                No trending content yet
                            </p>
                        </div>
                    )}
                </SidebarWrapper>
            </div>
        </div>
    );
};

export default FreeContent;