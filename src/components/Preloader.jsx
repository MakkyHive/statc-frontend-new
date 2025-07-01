import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#200052] text-white">
      {/* Orb Glow */}
      <div className="absolute w-[280px] h-[280px] bg-[#836EF9] opacity-20 blur-[120px] rounded-full top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Spinner with custom animation */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-gradient-to-r from-[#836EF9] to-[#4FACFE] animate-spin-smooth"></div>
        <div className="absolute inset-[6px] bg-black rounded-full"></div>
      </div>

      {/* Loading Text */}
      <p className="absolute bottom-12 text-sm text-white/50 tracking-widest animate-pulse-soft">
        Loading MonBridge DEX...
      </p>
    </div>
  );
};

export default Preloader;
