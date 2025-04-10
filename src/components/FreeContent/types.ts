import { ReactNode } from 'react';

export type LinkItem = {
    id: number;
    name: string;
    link: string;
    category: string;
    createdAt: string;
    description?: string;
    views: number;
    slug: string;
    isVip?: boolean
};

export type Category = {
    id: string;
    name: string;
    category: string;
};

export type Month = {
    value: string;
    label: string;
};

export type FilterProps = {
    searchName: string;
    setSearchName: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    selectedMonth: string;
    setSelectedMonth: (value: string) => void;
    sortOption: string;
    setSortOption: (value: string) => void;
    categories: Category[];
    showFilters: boolean;
    setShowFilters: (value: boolean) => void;
    theme: string;
};

export type ContentCardProps = {
    link: LinkItem;
    theme: string;
    onCardClick: (slug: string) => void;
    onViewClick: (id: number) => void;
};

export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    theme: string;
};

export type SidebarWrapperProps = {
    children: ReactNode;
    title?: string;
    icon?: ReactNode;
    theme: string;
    className?: string;
};