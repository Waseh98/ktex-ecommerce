import React from 'react';

const TopUtilityBar = () => {
  return (
    <div className="bg-charcoal text-white h-9 flex items-center justify-center text-[10px] tracking-widest font-medium uppercase overflow-hidden">
      <div className="flex items-center space-x-4 md:space-x-8 px-4">
        <a href="#" className="hover:opacity-70 transition-opacity whitespace-nowrap">Order Tracking</a>
        <span className="opacity-30">|</span>
        <a href="#" className="hover:opacity-70 transition-opacity whitespace-nowrap">Store Locations</a>
        <span className="opacity-30">|</span>
        <a href="#" className="hover:opacity-70 transition-opacity whitespace-nowrap hidden sm:inline">Instagram</a>
        <span className="opacity-30 hidden sm:inline">|</span>
        <a href="#" className="hover:opacity-70 transition-opacity whitespace-nowrap hidden sm:inline">Facebook</a>
      </div>
    </div>
  );
};

export default TopUtilityBar;
