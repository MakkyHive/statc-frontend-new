import React, { useEffect, useState } from "react";
import SwapHeader from "../components/SwapHeader";
import { usePrivy } from "@privy-io/react-auth";
import { ethers } from "ethers";

const dummyTokens = [
  { symbol: "ETH", name: "Ethereum", address: "", decimals: 18, logo: "/eth.png" },
  { symbol: "USDC", name: "USD Coin", address: "0xUsdcAddress", decimals: 6, logo: "/usdc.png" },
  { symbol: "DAI", name: "Dai", address: "0xDaiAddress", decimals: 18, logo: "/dai.png" },
];

const Portfolio = () => {
  const { ready, user } = usePrivy();
  const wallet = ready ? user?.wallet : null;

  const [tokenData, setTokenData] = useState([]);
  const [activeTab, setActiveTab] = useState("assets");

  const fetchBalances = async () => {
    if (!wallet?.address) return;

    try {
      const provider = new ethers.providers.Web3Provider(wallet.ethereum);
      const signer = provider.getSigner();

      const updated = await Promise.all(
        dummyTokens.map(async (token) => {
          let balance = "0";
          if (token.symbol === "ETH") {
            balance = await provider.getBalance(wallet.address);
          } else {
            const erc20 = new ethers.Contract(token.address, ["function balanceOf(address) view returns (uint256)"], signer);
            balance = await erc20.balanceOf(wallet.address);
          }
          return {
            ...token,
            balance: parseFloat(ethers.utils.formatUnits(balance, token.decimals)),
            price: token.symbol === "ETH" ? 3120 : 1,
          };
        })
      );

      setTokenData(updated);
    } catch (error) {
      console.error("Failed to fetch balances:", error);
    }
  };

  useEffect(() => {
    if (ready && wallet?.address) {
      fetchBalances();
    }
  }, [ready, wallet?.address]);

  const totalValue = tokenData.reduce(
    (acc, token) => acc + token.balance * token.price,
    0
  );

  return (
    <>
      <SwapHeader />

      <section className="section-spacing pt-[90px] min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#200052] px-4 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Your Portfolio</h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 backdrop-blur-md shadow-md">
            <p className="text-white/70 text-sm mb-1">Total Portfolio Value</p>
            <h3 className="text-3xl font-semibold text-[#4FACFE]">
              ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </h3>
          </div>

          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setActiveTab("assets")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                activeTab === "assets"
                  ? "bg-gradient-to-r from-[#4FACFE] to-[#836EF9]"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Assets
            </button>
            <button
              onClick={() => setActiveTab("positions")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                activeTab === "positions"
                  ? "bg-gradient-to-r from-[#4FACFE] to-[#836EF9]"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Positions
            </button>
          </div>

          {activeTab === "assets" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md shadow-md">
              <div className="grid grid-cols-4 text-sm font-semibold text-white/70 border-b border-white/10 pb-2 mb-3">
                <div>Asset</div>
                <div>Balance</div>
                <div>Price</div>
                <div>Value</div>
              </div>
              {tokenData.map((token) => (
                <div
                  key={token.symbol}
                  className="grid grid-cols-4 items-center py-3 border-b border-white/5 last:border-none hover:bg-white/5 rounded-lg px-2"
                >
                  <div className="flex items-center gap-3">
                    <img src={token.logo} alt={token.symbol} className="w-6 h-6 rounded-full" />
                    <span className="font-medium">{token.symbol}</span>
                  </div>
                  <div>{token.balance.toFixed(4)}</div>
                  <div>${token.price.toFixed(2)}</div>
                  <div>
                    ${(token.balance * token.price).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "positions" && (
            <div className="text-white/60 text-sm bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md shadow">
              <p>LP or vesting allocations will be displayed here.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Portfolio;
