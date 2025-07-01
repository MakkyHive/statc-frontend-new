// src/lib/constants.js

export const allTokens = [
  {
    symbol: "MON",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    logo: "/logos/mon.png"
  },
  {
    symbol: "DAI",
    address: "0xYourDAIAddress",
    decimals: 18,
    logo: "/logos/dai.png"
  },
  // Add more tokens as needed
];

export const defaultTokens = allTokens;

export const unknownLogo = "/logos/unknown.png"; // Fallback image path

export const CHAIN_EXPLORER = "https://etherscan.io"; // Or your chain explorer
