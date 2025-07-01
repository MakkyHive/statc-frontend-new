import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePrivy, useLogin, useLogout } from "@privy-io/react-auth";
import { FaBell, FaGlobe, FaBars, FaTimes } from "react-icons/fa";

const LiquidityHeader = () => {
  const { ready, authenticated } = usePrivy();
  const login = useLogin();
  const logout = useLogout();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full sticky px-6 py-5 bg-[#10002B] text-white shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LEFT: Logo + Nav */}
        <div className="flex items-center gap-10">
          <Link to="/" className="text-xl font-bold tracking-wide">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#836EF9] to-[#4FACFE] flex items-center justify-center font-extrabold text-white text-xl shadow-md">
              M
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10 text-base font-semibold">
            <Link to="/" className="hover:text-[#836EF9] transition">Home</Link>
            <Link to="/swap" className="text-[#836EF9] border-b-2 border-[#836EF9] pb-1">Trade</Link>
            <Link to="/pools" className="hover:text-[#836EF9] transition">Pools</Link>
            <Link to="/portfolio" className="hover:text-[#836EF9] transition">Portfolio</Link>
          </nav>
        </div>

        {/* RIGHT: Icons + Connect */}
        <div className="flex items-center gap-4">
          <FaBell className="text-white/80 text-lg cursor-pointer hover:text-[#4FACFE]" />

          <button className="rounded-full w-9 h-9 bg-gradient-to-tr from-[#836EF9] to-[#4FACFE] flex items-center justify-center shadow">
            <img src="/token-icon.svg" alt="wallet" className="w-4 h-4" />
          </button>

          <button
            onClick={authenticated ? logout : login}
            className="hidden md:block bg-gradient-to-r from-[#4FACFE] to-[#836EF9] px-5 py-2 rounded-lg text-sm font-bold shadow hover:opacity-90"
          >
            {authenticated ? "Logout" : "Connect"}
          </button>

          <FaGlobe className="text-white/70 text-sm ml-2 hover:text-[#836EF9] hidden md:block" />

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white text-2xl" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden mt-4 px-2 space-y-3 text-sm font-semibold">
          <Link to="/" className="block hover:text-[#836EF9]" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/swap" className="block text-[#836EF9]" onClick={() => setMobileOpen(false)}>Trade</Link>
          <Link to="/pools" className="block hover:text-[#836EF9]" onClick={() => setMobileOpen(false)}>Pools</Link>
          <Link to="/portfolio" className="block hover:text-[#836EF9]" onClick={() => setMobileOpen(false)}>Portfolio</Link>
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => {
                setMobileOpen(false);
                authenticated ? logout() : login();
              }}
              className="flex-1 bg-gradient-to-r from-[#4FACFE] to-[#836EF9] py-2 rounded-lg text-sm font-bold"
            >
              {authenticated ? "Logout" : "Connect Wallet"}
            </button>
            <FaGlobe className="text-white/60 text-base" />
          </div>
        </nav>
      )}
    </header>
  );
};

export default LiquidityHeader;
