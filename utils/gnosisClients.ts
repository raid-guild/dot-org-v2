import { createPublicClient, createWalletClient, http } from 'viem';
import { gnosis } from 'wagmi/chains';

export const gnosisPublicClient = createPublicClient({
  chain: gnosis,
  transport: http(),
});

export const gnosisWalletClient = createWalletClient({
  chain: gnosis,
  transport: http(),
});
