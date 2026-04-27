"use client";

import React, { useState, useEffect } from 'react';

const TopUtilityBar = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 3 days from now for demonstration
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="text-white h-11 flex items-center justify-center overflow-hidden border-b border-white/10 shadow-lg"
      style={{ backgroundColor: '#050505' }}
    >
      <div className="flex items-center justify-between w-full max-w-7xl px-6">
        {/* Left Side: Offer Info */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 bg-secondary rounded-full animate-ping opacity-75" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">
            Limited Time Offer
          </span>
        </div>
        
        {/* Center: Timer */}
        <div className="flex items-center bg-white/5 px-6 py-1.5 rounded-full border border-white/5 space-x-6">
          <TimeUnit value={timeLeft.days} label="Days" />
          <Separator />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <Separator />
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <Separator />
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>

        {/* Right Side: Code */}
        <div className="hidden lg:flex items-center space-x-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            Use Code:
          </span>
          <div className="bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-md">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary">
              KTEX25
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Separator = () => (
  <span className="text-white/20 font-light text-base mt-[-2px]">:</span>
);

const TimeUnit = ({ value, label }: { value: number, label: string }) => (
  <div className="flex items-center space-x-2">
    <span className="text-sm font-bold tabular-nums text-white tracking-tight">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-[9px] uppercase tracking-widest text-white/50 font-semibold">
      {label}
    </span>
  </div>
);

export default TopUtilityBar;
