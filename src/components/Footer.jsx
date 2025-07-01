import React from 'react';

const Footer = () => (
  <footer className="text-center py-12 border-t border-white/10 mt-24 bg-[rgba(10,10,10,0.8)] relative">
    <p className="text-gray-400 text-base mb-4">
      © {new Date().getFullYear()} Mon Bridge Dex. All rights reserved.
    </p>
    <div className="flex justify-center gap-4 mt-4">
      <a
        href="https://x.com/MONBRIDGEDEX"
        aria-label="Twitter"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-gray-200 text-lg hover:bg-gradient-to-r hover:from-[#836EF9] hover:to-[#4FACFE] hover:text-white transition-all"
      >
        <i className="fab fa-twitter" />
      </a>
      <a
        href="#"
        aria-label="Telegram"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-gray-200 text-lg hover:bg-gradient-to-r hover:from-[#836EF9] hover:to-[#4FACFE] hover:text-white transition-all"
      >
        <i className="fab fa-telegram-plane" />
      </a>
      <a
        href="#"
        aria-label="Discord"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-gray-200 text-lg hover:bg-gradient-to-r hover:from-[#836EF9] hover:to-[#4FACFE] hover:text-white transition-all"
      >
        <i className="fab fa-discord" />
      </a>
    </div>
  </footer>
);

export default Footer;
