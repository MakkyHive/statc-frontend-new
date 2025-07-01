import React, { useState } from "react";

const PoolModal = ({ isOpen, onClose, pool, mode = "add" }) => {
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");

  if (!isOpen || !pool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a2f] w-full max-w-md rounded-2xl p-6 border border-white/10 shadow-xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-white/60 hover:text-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          {mode === "add" ? "Add Liquidity" : "Remove Liquidity"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Token A Amount</label>
            <input
              type="number"
              value={amountA}
              onChange={(e) => setAmountA(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Token B Amount</label>
            <input
              type="number"
              value={amountB}
              onChange={(e) => setAmountB(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
            />
          </div>

          <button
            className="w-full bg-gradient-to-r from-[#836EF9] to-[#4FACFE] py-2 rounded-lg font-semibold mt-4"
            onClick={() => {
              // Hook in smart contract logic here
              alert(`${mode === "add" ? "Adding" : "Removing"} liquidity...`);
              onClose();
            }}
          >
            {mode === "add" ? "Add Liquidity" : "Remove Liquidity"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoolModal;
