import { configureChains } from 'wagmi';
import { arbitrum, gnosis, goerli, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { INFURA_ID, ALCHEMY_KEY } from './config';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [gnosis, mainnet, polygon, arbitrum, optimism, goerli, sepolia],
  [infuraProvider({ apiKey: INFURA_ID || '' }), alchemyProvider({ apiKey: ALCHEMY_KEY || '' }), publicProvider()],
);
