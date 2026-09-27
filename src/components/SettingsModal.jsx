import React from "react";

const SettingsModal = ({ slippage, onSlippageChange, simulation, onSimulationToggle, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1c1c3b] border border-white/10 p-6 rounded-2xl w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white/70 hover:text-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold text-white mb-4">Swap Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Slippage Tolerance (%)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={slippage}
              onChange={(e) => onSlippageChange(parseFloat(e.target.value))}
              className="w-full px-3 py-2 rounded-md bg-[#2c2c4f] text-white border border-white/20 outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-white/70">Transaction Simulation</label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={simulation}
                onChange={(e) => onSimulationToggle(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-500 transition-all relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-full transition-transform"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
