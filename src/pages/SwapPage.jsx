import React from "react";
import SwapBox from "../components/SwapBox";
import SwapHeader from "../components/SwapHeader";
import Footer from "../components/Footer";

const Swap = () => {
  return (
    <>
      <SwapHeader />

      <section className="pt-[80px] relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#200052] text-white px-4 py-20 overflow-hidden">
        {/* Decorative Orbs */}
        <div className="absolute top-[-120px] left-[10%] w-[300px] h-[300px] bg-purple-500 opacity-20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[15%] w-[200px] h-[200px] bg-blue-400 opacity-10 rounded-full blur-[80px] pointer-events-none" />

        <SwapBox />
      </section>
      <Footer/>
    </>
  );
};

export default Swap;