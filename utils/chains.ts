import { configureChains } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism, goerli, sepolia, gnosis } from 'wagmi/chains';
// import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { alchemyProvider } from 'wagmi/providers/alchemy';

export const { chains, provider } = configureChains(
  [gnosis, mainnet, polygon, arbitrum, optimism, goerli, sepolia],
  [
    // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_RPC_KEY || "" }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || '' }),
    jsonRpcProvider({
      rpc: (localChain: any) => ({
        http: localChain.rpcUrls.default,
      }),
    }),
  ],
);
