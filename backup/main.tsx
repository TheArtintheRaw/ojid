import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  SolongWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {ThemeProvider, createTheme} from "@material-ui/core";

import Home from "../src/Home";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";
import {useMemo} from "react";

const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK || WalletAdapterNetwork.Mainnet) as WalletAdapterNetwork;
// const network = WalletAdapterNetwork.Devnet;
const rpcHost = process.env.NEXT_PUBLIC_RPC_HOST || clusterApiUrl(network);

const theme = createTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: "flex-start",
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: "12px 16px",
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
});

const candyMachineId = new PublicKey(
  process.env.NEXT_PUBLIC_CANDY_MACHINE_ID || "GAho4XsMa92pqsxxioxdq4rjxorxPf7TVceEX91A6VEy"
);

const Main = ({}) => {
  // Custom RPC endpoint.
  const endpoint = useMemo(() => rpcHost, []);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new LedgerWalletAdapter(),
      new PhantomWalletAdapter(),
      new SafePalWalletAdapter(),
      new SlopeWalletAdapter({network}),
      new SolflareWalletAdapter({network}),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
      new SolongWalletAdapter(),
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider
          wallets={wallets}
          autoConnect={true}
        >
          <WalletModalProvider>
            <Home candyMachineId={candyMachineId} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default Main;
