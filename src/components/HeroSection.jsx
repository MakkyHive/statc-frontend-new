import React from 'react';
import PlatformStats from './PlatFormStats';

const Hero = () => (
  <section
    id="hero"
    className="relative scroll-mt-[80px] mt-[64px] px-4 sm:px-6 md:px-8 py-24 md:py-32 text-center bg-[rgba(10,10,10,0.3)]"
  >
    {/* Decorative background glow */}
    <div className="absolute inset-0 -m-12 bg-[radial-gradient(circle_at_center,rgba(131,110,249,0.15),transparent_60%)] z-[-1]" />

    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-[1.2] mb-6 bg-gradient-to-r from-[#836EF9] to-[#4FACFE] bg-clip-text text-transparent drop-shadow-md">
      Mon Bridge Dex
    </h1>

    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 font-medium">
      Advanced DEX Aggregation for the Monad Ecosystem
    </p>

    <div className="flex flex-wrap justify-center gap-4 mb-12">
      <a
        href="/swap"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-base sm:text-lg bg-gradient-to-r from-[#836EF9] to-[#4FACFE] shadow-lg hover:-translate-y-1 transition-transform"
      >
        <i className="fas fa-exchange-alt" /> Start Trading
      </a>
      <a
        href="/docs"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-base sm:text-lg bg-gradient-to-r from-[#836EF9] to-[#4FACFE] shadow-lg hover:-translate-y-1 transition-transform"
      >
        <i className="fas fa-book" /> Docs
      </a>
    </div>

    
  </section>
);

export default Hero;
