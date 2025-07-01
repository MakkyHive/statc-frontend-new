import React, { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { ethers } from "ethers";
import TokenSelector from "./TokenSelector";
import { allTokens } from "@/lib/constants";

const AddLiquidity = () => {
  const { user } = usePrivy();
  const embeddedWallet = user?.wallet;
  const [tokenA, setTokenA] = useState(null);
  const [tokenB, setTokenB] = useState(null);
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [balanceA, setBalanceA] = useState(null);
  const [balanceB, setBalanceB] = useState(null);
  const [status, setStatus] = useState("");
  const [showTokenModal, setShowTokenModal] = useState(null);

  const fetchBalance = async (token, setter) => {
    if (!embeddedWallet || !token) return;
    const provider = new ethers.providers.Web3Provider(embeddedWallet.ethereum);
    const userAddress = user?.wallet?.address;
    try {
      let balance;
      if (token.symbol === "MON") {
        balance = await provider.getBalance(userAddress);
        balance = ethers.utils.formatEther(balance);
      } else {
        const tokenContract = new ethers.Contract(token.address, ["function balanceOf(address) view returns (uint)"], provider);
        balance = await tokenContract.balanceOf(userAddress);
        balance = ethers.utils.formatUnits(balance, token.decimals);
      }
      setter(parseFloat(balance).toFixed(6));
    } catch (err) {
      setter("0.000000");
    }
  };

  useEffect(() => {
    fetchBalance(tokenA, setBalanceA);
    fetchBalance(tokenB, setBalanceB);
  }, [tokenA, tokenB]);

  const handleAddLiquidity = async (e) => {
    e.preventDefault();
    setStatus("Processing...");
    try {
      if (!embeddedWallet) return setStatus("No wallet found.");
      const provider = new ethers.providers.Web3Provider(embeddedWallet.ethereum);
      const signer = provider.getSigner();
      const parsedAmountA = ethers.utils.parseEther(amountA);
      const parsedAmountB = ethers.utils.parseEther(amountB);

      const tokenAContract = new ethers.Contract(tokenA.address, ["function approve(address,uint256) public returns (bool)"], signer);
      await (await tokenAContract.approve("0xYourContractAddressHere", parsedAmountA)).wait();

      const tokenBContract = new ethers.Contract(tokenB.address, ["function approve(address,uint256) public returns (bool)"], signer);
      await (await tokenBContract.approve("0xYourContractAddressHere", parsedAmountB)).wait();

      const contract = new ethers.Contract("0xYourContractAddressHere", [
        {
          inputs: [
            { internalType: "address", name: "tokenA", type: "address" },
            { internalType: "address", name: "tokenB", type: "address" },
            { internalType: "uint256", name: "amountA", type: "uint256" },
            { internalType: "uint256", name: "amountB", type: "uint256" }
          ],
          name: "addLiquidity",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        }
      ], signer);

      await (await contract.addLiquidity(tokenA.address, tokenB.address, parsedAmountA, parsedAmountB)).wait();
      setStatus("✅ Liquidity added successfully!");
    } catch (error) {
      console.error(error);
      setStatus("❌ Error adding liquidity.");
    }
  };

  return (
    <form onSubmit={handleAddLiquidity} className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => setShowTokenModal("A")}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#1c1c3b] rounded-lg border border-white/10 text-white hover:bg-white/10"
        >
          {tokenA ? (
            <div className="flex items-center gap-2">
              <img src={tokenA.logo || "/default-token.png"} className="w-5 h-5 rounded-full" />
              <span>{tokenA.symbol}</span>
            </div>
          ) : (
            <span>Select Token A</span>
          )}
        </button>
        {balanceA && <p className="text-xs text-white/50 mt-1">Balance: {balanceA}</p>}

        <input
          type="number"
          value={amountA}
          onChange={(e) => setAmountA(e.target.value)}
          placeholder="Amount A"
          className="w-full mt-2 px-4 py-2 rounded-lg bg-[#1c1c3b] border border-white/10 placeholder:text-white/40 text-white"
          required
        />
      </div>

      <div className="flex justify-center text-white/40 text-xl">+</div>

      <div>
        <button
          type="button"
          onClick={() => setShowTokenModal("B")}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#1c1c3b] rounded-lg border border-white/10 text-white hover:bg-white/10"
        >
          {tokenB ? (
            <div className="flex items-center gap-2">
              <img src={tokenB.logo || "/default-token.png"} className="w-5 h-5 rounded-full" />
              <span>{tokenB.symbol}</span>
            </div>
          ) : (
            <span>Select Token B</span>
          )}
        </button>
        {balanceB && <p className="text-xs text-white/50 mt-1">Balance: {balanceB}</p>}

        <input
          type="number"
          value={amountB}
          onChange={(e) => setAmountB(e.target.value)}
          placeholder="Amount B"
          className="w-full mt-2 px-4 py-2 rounded-lg bg-[#1c1c3b] border border-white/10 placeholder:text-white/40 text-white"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-[#836EF9] to-[#4FACFE] rounded-full font-semibold text-white hover:opacity-90 transition"
      >
        Add Liquidity
      </button>

      {status && <p className="text-sm text-white/70 text-center mt-2">{status}</p>}

      {showTokenModal && (
        <TokenSelector
          tokens={allTokens}
          onSelect={(token) => {
            showTokenModal === "A" ? setTokenA(token) : setTokenB(token);
            setShowTokenModal(null);
          }}
          close={() => setShowTokenModal(null)}
        />
      )}
    </form>
  );
};

export default AddLiquidity;
