import React from "react";
import { usePrivy, useLogin, useLogout } from "@privy-io/react-auth";

export default function WalletConnect({ className = "" }) {
  const { ready, authenticated, user } = usePrivy();
 const { login } = useLogin();
const { logout } = useLogout();


  if (!ready) return null;

  return authenticated ? (
    <button
      onClick={logout}
      className={`px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm ${className}`}
    >
      {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}
    </button>
  ) : (
    <button
      onClick={login}
      className={`px-4 py-2 bg-gradient-to-r from-[#836EF9] to-[#4FACFE] text-white rounded-lg text-sm ${className}`}
    >
      Connect Wallet
    </button>
  );
}
