import { configureChains } from 'wagmi';
import { arbitrum, gnosis, goerli, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [gnosis, mainnet, polygon, arbitrum, optimism, goerli, sepolia],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID || '' }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || '' }),
    publicProvider(),
  ],
);
