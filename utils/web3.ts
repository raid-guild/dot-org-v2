import { parseAbi } from 'viem';
import { gnosisPublicClient, gnosisWalletClient } from './gnosisClients';

export const balanceOf = async (signer: any, token: string, address: string) => {
  const abi = parseAbi(['function balanceOf(address account) view returns(uint256)']);
  return gnosisPublicClient.readContract({
    address: token as `0x${string}`,
    abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  });
};

export const payWithRaidToken = async (address: string, signer: any, recipient: string, amount: string) => {
  const abi = ['function transfer(address recipient, uint256 amount) public virtual override returns (bool)'];
  const { request } = await gnosisPublicClient.simulateContract({
    address: address as `0x${string}`,
    abi: parseAbi(abi),
    functionName: 'transfer',
    args: [amount],
    account: recipient as `0x${string}`,
  });
  return gnosisWalletClient.writeContract(request);
};
