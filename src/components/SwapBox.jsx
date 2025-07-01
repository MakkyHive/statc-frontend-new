import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import TokenSelectorModal from './TokenSelectorModal';

// Dummy token list (replace with actual list or dynamic fetch)
const tokens = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: ethers.constants.AddressZero,
    logo: '/eth.png',
    decimals: 18,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    logo: '/usdc.png',
    decimals: 6,
  },
];

const SwapBox = () => {
  const { user } = usePrivy();
  const wallet = user?.wallet;

  const [tokenIn, setTokenIn] = useState(null);
  const [tokenOut, setTokenOut] = useState(null);
  const [amountIn, setAmountIn] = useState('');
  const [estimatedOut, setEstimatedOut] = useState('');
  const [balances, setBalances] = useState({});
  const [showModal, setShowModal] = useState(null);

  const provider = wallet?.ethereum
    ? new ethers.providers.Web3Provider(wallet.ethereum)
    : null;

  // Fetch token balance
  const fetchBalance = async (token) => {
    if (!wallet?.address || !provider) return '0.00';

    try {
      if (token.symbol === 'ETH') {
        const balance = await provider.getBalance(wallet.address);
        return ethers.utils.formatEther(balance);
      } else {
        const erc20 = new ethers.Contract(
          token.address,
          ['function balanceOf(address) view returns (uint256)'],
          provider
        );
        const raw = await erc20.balanceOf(wallet.address);
        return ethers.utils.formatUnits(raw, token.decimals);
      }
    } catch (err) {
      console.error(`Failed to fetch balance for ${token.symbol}`, err);
      return '0.00';
    }
  };

  useEffect(() => {
    const getBalances = async () => {
      const updated = {};
      for (let token of tokens) {
        updated[token.symbol] = await fetchBalance(token);
      }
      setBalances(updated);
    };

    if (wallet?.address) getBalances();
  }, [wallet?.address]);

  // Placeholder for estimating swap
  useEffect(() => {
    if (tokenIn && tokenOut && amountIn) {
      // Replace with actual router quote logic
      setEstimatedOut((parseFloat(amountIn) * 0.98).toFixed(4)); // mock 2% fee
    } else {
      setEstimatedOut('');
    }
  }, [amountIn, tokenIn, tokenOut]);

  return (
    <div className="w-full max-w-xl bg-[rgba(20,20,40,0.6)] backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[0_0_30px_rgba(131,110,249,0.2)]">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-[#836EF9] to-[#4FACFE] text-transparent bg-clip-text mb-6">
        Swap Tokens
      </h2>

      {/* Token In */}
      <div className="bg-[#1c1c3b] p-4 rounded-xl mb-6 border border-white/10">
        <label className="block text-xs text-white/70 mb-1">From</label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
            placeholder="0.00"
            className="flex-1 text-2xl bg-transparent text-white placeholder-white/40 outline-none"
          />
          <button
            onClick={() => setShowModal('from')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition"
          >
            {tokenIn ? (
              <>
                <img src={tokenIn.logo} alt={tokenIn.symbol} className="w-5 h-5" />
                {tokenIn.symbol}
              </>
            ) : (
              'Select'
            )}
            <i className="fas fa-chevron-down text-xs" />
          </button>
        </div>
        {tokenIn && (
          <p className="text-xs text-right text-white/50 mt-1">
            Balance: {balances[tokenIn.symbol] || '0.00'} {tokenIn.symbol}
          </p>
        )}
      </div>

      {/* Token Out */}
      <div className="bg-[#1c1c3b] p-4 rounded-xl mb-6 border border-white/10">
        <label className="block text-xs text-white/70 mb-1">To</label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            disabled
            value={estimatedOut}
            placeholder="0.00"
            className="flex-1 text-2xl bg-transparent text-white placeholder-white/40 outline-none"
          />
          <button
            onClick={() => setShowModal('to')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition"
          >
            {tokenOut ? (
              <>
                <img src={tokenOut.logo} alt={tokenOut.symbol} className="w-5 h-5" />
                {tokenOut.symbol}
              </>
            ) : (
              'Select'
            )}
            <i className="fas fa-chevron-down text-xs" />
          </button>
        </div>
        {tokenOut && (
          <p className="text-xs text-right text-white/50 mt-1">
            Balance: {balances[tokenOut.symbol] || '0.00'} {tokenOut.symbol}
          </p>
        )}
      </div>

      {/* Swap button */}
      <button
        className="w-full py-3 rounded-full bg-gradient-to-r from-[#836EF9] to-[#4FACFE] font-semibold text-lg shadow-lg hover:opacity-90 transition"
        onClick={() => console.log('Swap logic coming soon')}
        disabled={!tokenIn || !tokenOut || !amountIn}
      >
        Swap
      </button>

      {/* Token modal */}
      {showModal && (
        <TokenSelectorModal
          tokens={tokens}
          onSelect={(token) => {
            if (showModal === 'from') setTokenIn(token);
            else setTokenOut(token);
          }}
          onClose={() => setShowModal(null)}
        />
      )}
    </div>
  );
};

export default SwapBox;
