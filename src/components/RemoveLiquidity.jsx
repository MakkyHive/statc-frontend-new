
import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { usePrivy } from "@privy-io/react-auth";
import TokenSelector from "./TokenSelector";
import { allTokens } from "@/lib/constants";

const RemoveLiquidity = () => {
  const { user } = usePrivy();
  const embeddedWallet = user?.wallet;

  const [tokenA, setTokenA] = useState(null);
  const [tokenB, setTokenB] = useState(null);
  const [balanceA, setBalanceA] = useState(null);
  const [balanceB, setBalanceB] = useState(null);
  const [lpAmount, setLpAmount] = useState("");
  const [status, setStatus] = useState("");
  const [showTokenModal, setShowTokenModal] = useState(null);

  const fetchBalance = useCallback(
    async (token, setter) => {
      if (!embeddedWallet || !token) return;

      const provider = new ethers.providers.Web3Provider(
        embeddedWallet.ethereum
      );

      const userAddress = user?.wallet?.address;

      try {
        let balance;

        if (token.symbol === "MON") {
          balance = await provider.getBalance(userAddress);
          balance = ethers.utils.formatEther(balance);
        } else {
          const tokenContract = new ethers.Contract(
            token.address,
            ["function balanceOf(address) view returns (uint)"],
            provider
          );

          balance = await tokenContract.balanceOf(userAddress);
          balance = ethers.utils.formatUnits(
            balance,
            token.decimals
          );
        }

        setter(parseFloat(balance).toFixed(6));
      } catch (error) {
        console.error("Error fetching balance:", error);
        setter("0.000000");
      }
    },
    [embeddedWallet, user]
  );

  useEffect(() => {
    fetchBalance(tokenA, setBalanceA);
    fetchBalance(tokenB, setBalanceB);
  }, [tokenA, tokenB, fetchBalance]);

  const handleRemoveLiquidity = async (e) => {
    e.preventDefault();
    setStatus("Processing...");

    try {
      if (!embeddedWallet) {
        return setStatus("No wallet found.");
      }

      // Replace with your contract logic
      setTimeout(() => {
        setStatus("✅ Liquidity removed successfully!");
      }, 1000);
    } catch (error) {
      console.error(error);
      setStatus("❌ Error removing liquidity.");
    }
  };

  return (
    <form onSubmit={handleRemoveLiquidity} className="space-y-6">
      {/* Token A */}
      <div>
        <button
          type="button"
          onClick={() => setShowTokenModal("A")}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#1c1c3b] rounded-lg border border-white/10 text-white hover:bg-white/10"
        >
          {tokenA ? (
            <div className="flex items-center gap-2">
              <img
                src={tokenA.logo || "/default-token.png"}
                className="w-5 h-5 rounded-full"
                alt={tokenA.symbol}
              />
              <span>{tokenA.symbol}</span>
            </div>
          ) : (
            <span>Select Token A</span>
          )}
        </button>

        {balanceA && (
          <p className="text-xs text-white/50 mt-1">
            Balance: {balanceA}
          </p>
        )}
      </div>

      {/* Token B */}
      <div>
        <button
          type="button"
          onClick={() => setShowTokenModal("B")}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#1c1c3b] rounded-lg border border-white/10 text-white hover:bg-white/10"
        >
          {tokenB ? (
            <div className="flex items-center gap-2">
              <img
                src={tokenB.logo || "/default-token.png"}
                className="w-5 h-5 rounded-full"
                alt={tokenB.symbol}
              />
              <span>{tokenB.symbol}</span>
            </div>
          ) : (
            <span>Select Token B</span>
          )}
        </button>

        {balanceB && (
          <p className="text-xs text-white/50 mt-1">
            Balance: {balanceB}
          </p>
        )}
      </div>

      {/* Direction indicator */}
      <div className="flex justify-center text-white/40 text-xl">
        ⇅
      </div>

      {/* LP Token Amount */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm">
          LP Token Amount
        </label>

        <input
          type="number"
          value={lpAmount}
          onChange={(e) => setLpAmount(e.target.value)}
          placeholder="Amount"
          required
          className="w-full bg-[#1c1c3b] text-white px-4 py-2 rounded-lg border border-white/10 placeholder-white/40"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full font-semibold text-white hover:opacity-90 transition"
      >
        Remove Liquidity
      </button>

      {status && (
        <p className="text-sm text-white/70 text-center mt-2">
          {status}
        </p>
      )}

      {/* Token Selector */}
      {showTokenModal && (
        <TokenSelector
          tokens={allTokens}
          onSelect={(token) => {
            if (showTokenModal === "A") {
              setTokenA(token);
            } else {
              setTokenB(token);
            }

            setShowTokenModal(null);
          }}
          close={() => setShowTokenModal(null)}
        />
      )}
    </form>
  );
};

export default RemoveLiquidity;
