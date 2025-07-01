import React from 'react';

const Tools = () => (
  <section className="section-spacing py-24 px-4 max-w-6xl mx-auto text-center" id="tools">
    <h3 className="text-4xl font-bold text-white mb-12 relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-gradient-to-r after:from-[#836EF9] after:to-[#4FACFE] after:mx-auto after:mt-4">
      Tools
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
      <a
        href="https://vest.monbridgedex.xyz/"
        className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl p-6 transition-all shadow-lg hover:scale-105 hover:border-[#836EF9] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(131,110,249,0.1),transparent)] opacity-0 hover:opacity-100 transition-opacity duration-300" />
        <img
          src="mbd101010-2_1.png"
          alt="Mon Vest"
          className="max-w-[100px] rounded-lg mb-4 object-contain"
        />
        <span className="font-semibold text-lg text-gray-100">Mon Vest</span>
      </a>
    </div>
  </section>
);

export default Tools;
