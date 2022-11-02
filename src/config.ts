import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";

import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";

export const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK || WalletAdapterNetwork.Mainnet) as WalletAdapterNetwork;
// const network = WalletAdapterNetwork.Devnet;
export const rpcHost = process.env.NEXT_PUBLIC_RPC_HOST || clusterApiUrl(network);

export const candyMachineId = new PublicKey(
  process.env.NEXT_PUBLIC_CANDY_MACHINE_ID || "DAA8yRLu7acVs3kxaTyCjoEjNWGinLaCKVhDY29ASNua"
);
