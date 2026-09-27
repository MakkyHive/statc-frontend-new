import React, { useState } from "react";

const TokenSelectorModal = ({ tokens, onSelect, onClose }) => {
  const [search, setSearch] = useState("");

  const filtered = tokens.filter((token) =>
    token.symbol.toLowerCase().includes(search.toLowerCase()) ||
    token.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1a2f] w-full max-w-md rounded-2xl p-6 border border-white/10 shadow-xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white/70 hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold text-white mb-4">Select a Token</h2>

        <input
          type="text"
          placeholder="Search token"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-[#2b2b44] border border-white/10 text-white placeholder:text-white/40 focus:outline-none"
        />

        <div className="max-h-80 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {filtered.map((token) => (
            <button
              key={token.address}
              onClick={() => {
                onSelect(token);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-left"
            >
              <img
                src={token.logo || "/default-token.png"}
                alt={token.symbol}
                className="w-6 h-6 rounded-full object-contain"
              />
              <div className="text-white text-left">
                <div className="text-sm font-medium leading-tight">{token.symbol}</div>
                <div className="text-xs text-white/60 leading-none">{token.name}</div>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <p className="text-white/50 text-sm text-center py-4">No tokens found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenSelectorModal;
