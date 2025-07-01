import React, { useState } from "react";
import SwapHeader from "../components/SwapHeader";
import PoolModal from "../components/PoolModal";

const mockPools = [
  {
    name: "ETH / USDC",
    tvl: "$1.2M",
    apy: "12.5%",
    userStake: "$4,320",
  },
  {
    name: "DAI / MON",
    tvl: "$540K",
    apy: "9.2%",
    userStake: "$2,190",
  },
  {
    name: "USDT / MON",
    tvl: "$760K",
    apy: "10.3%",
    userStake: "$3,805",
  },
];

const Pools = () => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState(null);
  const [modalMode, setModalMode] = useState("add");

  const filteredPools = mockPools.filter((pool) =>
    pool.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (pool, mode) => {
    setSelectedPool(pool);
    setModalMode(mode);
    setModalOpen(true);
  };

  return (
    <>
      <SwapHeader />
      <section className=" section-spacing pt-[90px] min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#200052] text-white px-4 relative">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#836EF9] to-[#4FACFE] text-transparent bg-clip-text">
            Liquidity Pools
          </h1>
          <p className="text-white/70 text-lg">
            Browse live MonBridge pools. Add or remove liquidity easily.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search pool..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/40 border border-white/10 focus:outline-none"
          />
        </div>

        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-5 text-white/70 font-medium border-b border-white/10 pb-2 text-sm">
            <div>Pool</div>
            <div className="text-center">TVL</div>
            <div className="text-center">APY</div>
            <div className="text-right">Your Stake</div>
            <div className="text-right">Actions</div>
          </div>

          {filteredPools.map((pool, idx) => (
            <div
              key={idx}
              className="grid grid-cols-5 items-center py-4 border-b border-white/5 last:border-none text-sm hover:bg-white/10 rounded-lg transition"
            >
              <div>{pool.name}</div>
              <div className="text-center">{pool.tvl}</div>
              <div className="text-center">{pool.apy}</div>
              <div className="text-right">{pool.userStake}</div>
              <div className="text-right flex justify-end gap-2">
                <button
                  onClick={() => handleOpenModal(pool, "add")}
                  className="px-3 py-1 text-xs bg-[#4FACFE] hover:bg-[#3da5f3] text-white rounded-md"
                >
                  Add
                </button>
                <button
                  onClick={() => handleOpenModal(pool, "remove")}
                  className="px-3 py-1 text-xs bg-[#836EF9] hover:bg-[#7154f5] text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {filteredPools.length === 0 && (
            <p className="text-center text-white/50 text-sm py-6">No pools match your search.</p>
          )}
        </div>

        <PoolModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          pool={selectedPool}
          mode={modalMode}
        />
      </section>
    </>
  );
};

export default Pools;
