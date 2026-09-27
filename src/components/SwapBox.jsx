
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ethers } from "ethers";
import { usePrivy } from "@privy-io/react-auth";
import { routerAbi } from "../lib/abis/routerAbi";
import { erc20Abi } from "../lib/abis/erc20Abi";

const ROUTER_ADDRESS = "0x44c2B7C8422416b232d2Dfd1997CeBfD93013378";
const TOKENS_URL = "/tokens.json";

const SwapBox = () => {
  const { user } = usePrivy();
  const wallet = user?.wallet;
  const address = wallet?.address;

  const [tokens, setTokens] = useState([]);
  const [tokenIn, setTokenIn] = useState(null);
  const [tokenOut, setTokenOut] = useState(null);
  const [amountIn, setAmountIn] = useState("");
  const [estimatedOut, setEstimatedOut] = useState("");
  const [balances, setBalances] = useState({});
  const [slippage, setSlippage] = useState(1.0);
  const [simulate, setSimulate] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState(false);
  const [priceImpact, setPriceImpact] = useState(0);
  const [confirmationInput, setConfirmationInput] = useState("");

  /*
   * useMemo keeps the provider reference stable.
   * Without this, a new Web3Provider could be created on every render,
   * causing effects that depend on provider to run unnecessarily.
   */
  const provider = useMemo(() => {
    if (!wallet?.ethereum) {
      return null;
    }

    return new ethers.providers.Web3Provider(wallet.ethereum);
  }, [wallet?.ethereum]);

  const signer = useMemo(() => {
    if (!provider) {
      return null;
    }

    return provider.getSigner();
  }, [provider]);

  // Load tokens list
  useEffect(() => {
    const loadTokens = async () => {
      try {
        const res = await fetch(TOKENS_URL);
        const data = await res.json();
        setTokens(data);
      } catch (err) {
        console.error("Error loading token list:", err);
      }
    };

    loadTokens();
  }, []);

  // Fetch balance for one token
  const fetchBalance = useCallback(
    async (token) => {
      if (!provider || !address || !token) {
        return "0.00";
      }

      try {
        if (token.symbol === "ETH") {
          const bal = await provider.getBalance(address);
          return ethers.utils.formatEther(bal);
        }

        const contract = new ethers.Contract(
          token.address,
          erc20Abi,
          provider
        );

        const balance = await contract.balanceOf(address);

        return ethers.utils.formatUnits(
          balance,
          token.decimals
        );
      } catch (error) {
        console.error(
          `Error fetching ${token.symbol} balance:`,
          error
        );

        return "0.00";
      }
    },
    [provider, address]
  );

  // Fetch balances for all tokens
  useEffect(() => {
    if (!address || tokens.length === 0) {
      return;
    }

    const loadBalances = async () => {
      const result = {};

      for (const token of tokens) {
        result[token.symbol] = await fetchBalance(token);
      }

      setBalances(result);
    };

    loadBalances();
  }, [address, tokens, fetchBalance]);

  // Estimate output and price impact
  useEffect(() => {
    const estimate = async () => {
      if (
        !provider ||
        !tokenIn ||
        !tokenOut ||
        !amountIn
      ) {
        setEstimatedOut("");
        setPriceImpact(0);
        return;
      }

      try {
        const router = new ethers.Contract(
          ROUTER_ADDRESS,
          routerAbi,
          provider
        );

        const amountInWei = ethers.utils.parseUnits(
          amountIn,
          tokenIn.decimals
        );

        const path = [
          tokenIn.address,
          tokenOut.address,
        ];

        const amounts = await router.getAmountsOut(
          amountInWei,
          path
        );

        const out = ethers.utils.formatUnits(
          amounts[1],
          tokenOut.decimals
        );

        setEstimatedOut(
          parseFloat(out).toFixed(6)
        );

        // Simplified price impact example
        setPriceImpact(5);
      } catch (err) {
        console.error(
          "getAmountsOut failed:",
          err
        );

        setEstimatedOut("0.00");
        setPriceImpact(0);
      }
    };

    estimate();
  }, [
    tokenIn,
    tokenOut,
    amountIn,
    provider,
  ]);

  // Handle max button click
  const handleMax = () => {
    if (!tokenIn) {
      return;
    }

    const bal = balances[tokenIn.symbol];

    if (bal) {
      setAmountIn(bal);
    }
  };

  // Switch from and to tokens
  const switchTokens = () => {
    const tempToken = tokenIn;

    setTokenIn(tokenOut);
    setTokenOut(tempToken);

    setAmountIn("");
    setEstimatedOut("");
  };

  // Connect wallet handler
  const connectWallet = () => {
    alert("Please connect your wallet first!");
  };

  // Handle swap button click
  const handleSwap = async () => {
    if (
      !provider ||
      !signer ||
      !tokenIn ||
      !tokenOut ||
      !amountIn
    ) {
      return;
    }

    if (
      priceImpact > 15 &&
      !confirmationModalOpen
    ) {
      setConfirmationModalOpen(true);
      return;
    }

    if (
      confirmationModalOpen &&
      confirmationInput.toLowerCase() !== "confirm"
    ) {
      alert(
        "Please type 'confirm' to proceed due to high price impact."
      );

      return;
    }

    setLoading(true);

    try {
      const router = new ethers.Contract(
        ROUTER_ADDRESS,
        routerAbi,
        signer
      );

      const amountInWei =
        ethers.utils.parseUnits(
          amountIn,
          tokenIn.decimals
        );

      const amountOutMin = ethers.utils
        .parseUnits(
          estimatedOut || "0",
          tokenOut.decimals
        )
        .mul(100 - slippage)
        .div(100);

      const path = [
        tokenIn.address,
        tokenOut.address,
      ];

      const deadline =
        Math.floor(Date.now() / 1000) + 60 * 10;

      if (tokenIn.symbol !== "ETH") {
        const tokenContract =
          new ethers.Contract(
            tokenIn.address,
            erc20Abi,
            signer
          );

        const allowance =
          await tokenContract.allowance(
            address,
            ROUTER_ADDRESS
          );

        if (allowance.lt(amountInWei)) {
          const tx =
            await tokenContract.approve(
              ROUTER_ADDRESS,
              amountInWei
            );

          await tx.wait();
        }
      }

      let tx;

      if (tokenIn.symbol === "ETH") {
        tx = await router.swapExactETHForTokens(
          amountOutMin,
          path,
          address,
          deadline,
          {
            value: amountInWei,
          }
        );
      } else if (tokenOut.symbol === "ETH") {
        tx = await router.swapExactTokensForETH(
          amountInWei,
          amountOutMin,
          path,
          address,
          deadline
        );
      } else {
        tx =
          await router.swapExactTokensForTokens(
            amountInWei,
            amountOutMin,
            path,
            address,
            deadline
          );
      }

      if (simulate) {
        console.log(
          "Simulating transaction:",
          tx.hash
        );

        await tx.wait();
      }

      alert("✅ Swap successful!");

      setAmountIn("");
      setEstimatedOut("");
      setConfirmationInput("");
      setConfirmationModalOpen(false);
    } catch (err) {
      console.error("❌ Swap failed:", err);
      alert("❌ Swap failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-[rgba(20,20,40,0.6)] backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[0_0_30px_rgba(131,110,249,0.2)] relative">
      {/* Settings button */}
      <div className="absolute right-6 top-6">
        <button
          onClick={() => setShowSettings(true)}
          className="text-white/60 hover:text-white"
          aria-label="Open Settings"
          title="Settings"
        >
          ⚙️
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-[#836EF9] to-[#4FACFE] text-transparent bg-clip-text mb-6">
        Swap Tokens
      </h2>

      {/* From input */}
      <div className="bg-[#1c1c3b] p-4 rounded-xl mb-4 border border-white/10">
        <label className="block text-xs text-white/70 mb-1">
          You Pay
        </label>

        <div className="text-right mb-2">
          <input
            type="number"
            value={amountIn}
            onChange={(e) =>
              setAmountIn(e.target.value)
            }
            placeholder="0.00"
            className="inline-block text-2xl bg-transparent text-white placeholder-white/40 outline-none text-right"
            min="0"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowModal("from")}
            className="px-4 py-2 text-sm rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 flex items-center"
          >
            {tokenIn ? (
              <>
                <img
                  src={
                    tokenIn.logo ||
                    "https://monbridgedex.xyz/pngtree-orange-round-faq-icon-for-help-and-questions-vector-png-image_48543232-removebg-preview.png"
                  }
                  alt={tokenIn.symbol}
                  className="inline w-5 h-5 mr-1 align-middle rounded-full"
                />

                {tokenIn.symbol} ▾
              </>
            ) : (
              "Select ▾"
            )}
          </button>

          {tokenIn && (
            <>
              <p className="text-xs text-white/50">
                Balance:{" "}
                {balances[tokenIn.symbol] ||
                  "0.00"}{" "}
                {tokenIn.symbol}
              </p>

              <button
                type="button"
                onClick={handleMax}
                className="ml-auto px-2 py-1 text-xs border border-white/30 rounded hover:bg-white/20"
              >
                MAX
              </button>
            </>
          )}
        </div>
      </div>

      {/* Switch tokens */}
      <div className="text-center mb-4">
        <button
          type="button"
          onClick={switchTokens}
          className="inline-block bg-[#372c72] p-2 rounded-full hover:bg-[#4e3ca7]"
          aria-label="Switch tokens"
        >
          ⇅
        </button>
      </div>

      {/* To input */}
      <div className="bg-[#1c1c3b] p-4 rounded-xl mb-6 border border-white/10">
        <label className="block text-xs text-white/70 mb-1">
          You Receive
        </label>

        <div className="text-right mb-2">
          <input
            type="text"
            value={estimatedOut}
            disabled
            placeholder="0.00"
            className="inline-block text-2xl bg-transparent text-white placeholder-white/40 outline-none text-right"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowModal("to")}
            className="px-4 py-2 text-sm rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 flex items-center"
          >
            {tokenOut ? (
              <>
                <img
                  src={
                    tokenOut.logo ||
                    "https://monbridgedex.xyz/pngtree-orange-round-faq-icon-for-help-and-questions-vector-png-image_48543232-removebg-preview.png"
                  }
                  alt={tokenOut.symbol}
                  className="inline w-5 h-5 mr-1 align-middle rounded-full"
                />

                {tokenOut.symbol} ▾
              </>
            ) : (
              "Select ▾"
            )}
          </button>

          {tokenOut && (
            <p className="text-xs text-white/50">
              Balance:{" "}
              {balances[tokenOut.symbol] ||
                "0.00"}{" "}
              {tokenOut.symbol}
            </p>
          )}
        </div>
      </div>

      {/* Swap details */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() =>
            setShowDetails(!showDetails)
          }
          className="flex justify-between w-full px-4 py-2 text-white bg-[#372c72] rounded cursor-pointer"
        >
          <span>Swap Details</span>
          <span>
            {showDetails ? "▲" : "▼"}
          </span>
        </button>

        {showDetails && (
          <div className="bg-[#1c1c3b] p-4 rounded-b-xl border border-t-0 border-white/10">
            <div className="flex justify-between mb-1">
              <span>
                Estimated Output in USD:
              </span>
              <span>-</span>
            </div>

            <div className="flex justify-between mb-1">
              <span>Input Value in USD:</span>
              <span>-</span>
            </div>

            <div className="flex justify-between mb-1">
              <span>Best Router:</span>
              <span>-</span>
            </div>

            <div className="flex justify-between mb-1">
              <span>Price Impact:</span>
              <span>
                {priceImpact}%
              </span>
            </div>

            <div className="flex justify-between mb-1">
              <span>
                Aggregator Fee (0.1%):
              </span>

              <span>
                {amountIn
                  ? (
                      parseFloat(amountIn) *
                      0.001
                    ).toFixed(6)
                  : "-"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Swap button */}
      <button
        type="button"
        onClick={
          address
            ? handleSwap
            : connectWallet
        }
        disabled={
          loading ||
          !address ||
          !tokenIn ||
          !tokenOut ||
          !amountIn ||
          (confirmationModalOpen &&
            confirmationInput.toLowerCase() !==
              "confirm")
        }
        className={`w-full py-3 rounded-full bg-gradient-to-r from-[#836EF9] to-[#4FACFE] font-semibold text-lg shadow-lg ${
          loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:opacity-90"
        } transition`}
      >
        {loading
          ? "Swapping..."
          : address
          ? "Swap"
          : "Connect Wallet"}
      </button>

      {/* Token selector modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setShowModal(null)}
        >
          <div
            className="bg-[#222244] rounded-lg p-6 max-w-md w-full overflow-auto max-h-[80vh]"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <h3 className="text-white text-xl mb-4">
              Select a token
            </h3>

            <ul className="overflow-auto max-h-[60vh]">
              {tokens.map((token) => (
                <li
                  key={token.address}
                  className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-[#444488]"
                  onClick={() => {
                    if (showModal === "from") {
                      setTokenIn(token);
                    } else {
                      setTokenOut(token);
                    }

                    setShowModal(null);
                    setAmountIn("");
                    setEstimatedOut("");
                  }}
                >
                  <img
                    src={
                      token.logo ||
                      "https://monbridgedex.xyz/pngtree-orange-round-faq-icon-for-help-and-questions-vector-png-image_48543232-removebg-preview.png"
                    }
                    alt={token.symbol}
                    className="w-6 h-6 rounded-full"
                  />

                  <span className="text-white">
                    {token.symbol}
                  </span>

                  <span className="ml-auto text-xs text-white/50">
                    {token.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Settings modal */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() =>
            setShowSettings(false)
          }
        >
          <div
            className="bg-[#222244] rounded-lg p-6 max-w-sm w-full"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <h3 className="text-white text-xl mb-4">
              Settings
            </h3>

            <div className="mb-4">
              <label className="text-white block mb-1">
                Slippage Tolerance (%)
              </label>

              <input
                type="number"
                step="0.1"
                min="0"
                max="50"
                value={slippage}
                onChange={(e) =>
                  setSlippage(
                    parseFloat(
                      e.target.value
                    ) || 1
                  )
                }
                className="w-full p-2 rounded bg-[#1c1c3b] text-white"
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="simulateToggle"
                checked={simulate}
                onChange={() =>
                  setSimulate(!simulate)
                }
                className="mr-2"
              />

              <label
                htmlFor="simulateToggle"
                className="text-white cursor-pointer"
              >
                Enable simulation before swap
              </label>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowSettings(false)
              }
              className="w-full py-2 bg-gradient-to-r from-[#836EF9] to-[#4FACFE] rounded text-white font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation modal */}
      {confirmationModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => {
            setConfirmationModalOpen(false);
            setConfirmationInput("");
          }}
        >
          <div
            className="bg-[#222244] rounded-lg p-6 max-w-sm w-full"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <p className="text-white mb-4">
              Warning: The price impact is over 15%.
              Type 'confirm' to proceed with the swap.
            </p>

            <input
              type="text"
              value={confirmationInput}
              onChange={(e) =>
                setConfirmationInput(
                  e.target.value
                )
              }
              className="w-full p-2 rounded bg-[#1c1c3b] text-white mb-4"
            />

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setConfirmationModalOpen(false);
                  setConfirmationInput("");
                }}
                className="px-4 py-2 bg-red-600 rounded text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSwap}
                disabled={
                  confirmationInput.toLowerCase() !==
                  "confirm"
                }
                className="px-4 py-2 bg-green-600 rounded text-white disabled:opacity-50"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapBox;
