import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePrivy, useLogin, useLogout } from "@privy-io/react-auth";
import { motion, AnimatePresence } from "framer-motion";
import logoIcon from "../assets/logo.png"; // replace with your actual path

const Header = () => {
  const { ready, authenticated } = usePrivy();
  const {login }= useLogin();
  const {logout} = useLogout();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Swap", to: "/swap" },
    { name: "Liquidity", to: "/liquidity" },
    { name: "Portfolio", to: "/portfolio" },
    { name: "Pools", to: "/pools" },
  ];

  return (
    <>
      <header className="fixed w-full z-50 top-0 left-0 bg-[#0B0B1F] border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center from-[#4FACFE] to-[#836EF9] gap-2 text-white font-bold text-xl tracking-wide">
            <img src={logoIcon} alt="logo" className="w-8 h-8" />
           <span className="bg-gradient-to-r from-[#836EF9] to-[#4FACFE] bg-clip-text text-transparent">
  MON BRIDGE DEX
</span>

          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="/docs" className="text-white/70 hover:text-white text-sm transition">Docs</a>
            <button className="flex items-center gap-1 text-white/70 hover:text-white text-sm transition">
              <i className="fas fa-globe" /> EN
            </button>

            {ready && (
              <button
                onClick={authenticated ? logout : login}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#4FACFE] to-[#836EF9] text-sm font-semibold text-white shadow hover:opacity-90 transition"
              >
                {authenticated ? "Disconnect" : "Connect Wallet"}
              </button>
            )}
          </div>

          <div
            className="md:hidden flex flex-col space-y-1 cursor-pointer"
            onClick={() => setIsMobileOpen(true)}
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#0A0A1F]/95 backdrop-blur-md text-white flex flex-col justify-between px-6 py-8"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-5 right-6 text-white text-3xl"
              aria-label="Close Menu"
            >
              &times;
            </button>

            <div className="flex flex-col items-center space-y-6 mt-20 text-lg font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsMobileOpen(false)}
                  className="hover:text-[#4FACFE] transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="space-y-4 text-center mt-12">
              <div className="flex justify-center gap-6 text-sm text-white/70">
                <a href="/docs" className="hover:text-white">Docs</a>
                <button className="flex items-center gap-1 hover:text-white">
                  <i className="fas fa-globe" /> EN
                </button>
              </div>

              {ready && (
                <button
                  onClick={authenticated ? logout : login}
                  className="w-full max-w-xs mx-auto py-3 rounded-xl bg-gradient-to-r from-[#4FACFE] to-[#836EF9] text-white font-semibold text-base shadow hover:opacity-90 transition"
                >
                  {authenticated ? "Disconnect Wallet" : "Connect Wallet"}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
