import React, { useState } from "react";
import AddLiquidity from "../components/AddLiquidity";
import RemoveLiquidity from "../components/RemoveLiquidity";
import Background from "../components/Background";
import LiquidityHeader from "../components/LiquidityHeader"

export default function LiquidityPanel() {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <>
       <LiquidityHeader />
      

    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#200052] text-white px-4 py-20 relative overflow-hidden">
     
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl p-6">
         
      <h1 className="text-4xl sm:text-5xl text-center font-extrabold mb-8 bg-gradient-to-r from-[#836EF9] to-[#4FACFE] text-transparent bg-clip-text">
            Liquidity 
          </h1>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("add")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                activeTab === "add" ? "bg-gradient-to-r from-[#836EF9] to-[#4FACFE] text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              Add Liquidity
            </button>
            <button
              onClick={() => setActiveTab("remove")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                activeTab === "remove" ? "bg-gradient-to-r from-[#836EF9] to-[#4FACFE] text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              Remove Liquidity
            </button>
          </div>
        </div>

        <div>
          {activeTab === "add" ? <AddLiquidity /> : <RemoveLiquidity />}
        </div>
      </div>
    </section>
    
     </>
  );
 
}
