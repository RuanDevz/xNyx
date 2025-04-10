import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  fullScreen?: boolean;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  fullScreen = false,
  text = 'Loading...'
}) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 bg-emerald-900/80 backdrop-blur-sm flex items-center justify-center z-50" 
    : "flex flex-col items-center justify-center p-8";

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="relative w-32 h-32">
          <div
            className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-emerald-400 border-b-emerald-400 animate-spin"
            style={{ animationDuration: '3s' }}
          ></div>
    
          <div
            className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-emerald-400 animate-spin"
            style={{ animationDuration: '2s', animationDirection: 'reverse' }}
          ></div>
        </div>
    
        <div
          className="absolute inset-0 bg-gradient-to-tr from-emerald-400/10 via-transparent to-emerald-400/5 animate-pulse rounded-full blur-sm"
        ></div>
      </div>
    </div>
  );
};

export default Loading;