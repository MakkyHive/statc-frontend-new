import React, { useState } from 'react';

const TokenSelectorModal = ({ tokens = [], onSelect, onClose }) => {
  const [search, setSearch] = useState('');

  const filtered = tokens.filter(token =>
    token.symbol.toLowerCase().includes(search.toLowerCase()) ||
    token.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-[rgba(28,28,48,0.95)] border border-white/10 rounded-2xl shadow-xl p-6 relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-white/60 hover:text-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Select a token</h2>

        <input
          type="text"
          placeholder="Search name or symbol"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-[#2c2c44] border border-white/10 text-white placeholder-white/40 focus:outline-none"
        />

        <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1">
          {filtered.length > 0 ? (
            filtered.map((token) => (
              <button
                key={token.address}
                onClick={() => {
                  onSelect(token);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition text-left"
              >
                <img
                  src={token.logo || '/default-token.png'}
                  alt={token.symbol}
                  className="w-6 h-6 rounded-full"
                />
                <div>
                  <div className="text-sm font-medium">{token.symbol}</div>
                  <div className="text-xs text-white/60">{token.name}</div>
                </div>
              </button>
            ))
          ) : (
            <p className="text-white/50 text-center text-sm py-6">No tokens found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenSelectorModal;
