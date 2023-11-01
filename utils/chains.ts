import { configureChains } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism, goerli, sepolia, gnosis } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { INFURA_ID, ALCHEMY_KEY } from './config';

export const { chains, provider } = configureChains(
  [gnosis, mainnet, polygon, arbitrum, optimism, goerli, sepolia],
  [
    infuraProvider({ apiKey: INFURA_ID || '' }),
    alchemyProvider({ apiKey: ALCHEMY_KEY || '' }),
    jsonRpcProvider({
      rpc: (localChain: any) => ({
        http: localChain.rpcUrls.default,
      }),
    }),
  ],
);
