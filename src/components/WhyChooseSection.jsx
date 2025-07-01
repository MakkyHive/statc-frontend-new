import React from 'react';

const WhyChoose = () => (
  <section className="section-spacing py-24 px-4 max-w-3xl mx-auto text-center bg-[rgba(32,0,82,0.2)] rounded-2xl backdrop-blur-md border border-white/10 shadow-xl mt-16">
    <div className="relative">
      <div className="absolute inset-0 -m-20 bg-[radial-gradient(circle_at_center,rgba(131,110,249,0.1),transparent_70%)] z-[-1]" />
      <h3 className="text-4xl font-bold text-white mb-6 relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-gradient-to-r after:from-[#836EF9] after:to-[#4FACFE] after:mx-auto after:mt-4">
        Why Choose Mon Bridge Dex?
      </h3>
      <p className="text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow">
        Mon Bridge Dex compares multiple DEX routers to deliver the best swap output for your trades on Monad Testnet.
        Our advanced algorithms ensure you always get the most favorable rates across the entire ecosystem.
      </p>
    </div>
  </section>
);

export default WhyChoose;
