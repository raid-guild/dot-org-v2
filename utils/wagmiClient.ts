/* eslint-disable import/prefer-default-export */
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig } from 'wagmi';

import { chains, publicClient } from './chains';

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',

    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains, projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '', shimDisconnect: false }),
      walletConnectWallet({ chains, projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '' }),
      ledgerWallet({ chains, projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '' }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      rainbowWallet({ chains, projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '' }),
      coinbaseWallet({ chains, appName: 'Dungeon Master' }),
      argentWallet({ chains, projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '' }),
      braveWallet({ chains }),
    ],
  },
]);

export const wagmiClient = createConfig({
  publicClient,
  connectors,
  // turn off autoConnect in development
  autoConnect: true,
});
