import React from 'react';
import { SidebarWrapperProps } from './types';

export const SidebarWrapper: React.FC<SidebarWrapperProps> = ({
    children,
    title,
    icon,
    theme,
    className = '',
}) => {
    return (
        <aside className={`p-6 w-full md:w-72 ${className} ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-emerald-50'
        }`}>
            <div className="sticky top-0 pt-4">
                {title && (
                    <h2 className={`text-xl font-bold mb-6 flex items-center ${
                        theme === 'dark' ? 'text-white' : 'text-emerald-800'
                    }`}>
                        {icon && <span className="mr-2 text-emerald-600">{icon}</span>}
                        {title}
                    </h2>
                )}
                {children}
            </div>
        </aside>
    );
};