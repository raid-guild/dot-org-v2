import { Contract, utils } from 'ethers';
import { Signer } from 'wagmi';

export const balanceOf = async (signer: Signer, token: string, address: string) => {
  const abi = new utils.Interface(['function balanceOf(address account) view returns(uint256)']);
  const contract = new Contract(token, abi, signer);
  return contract.balanceOf(address);
};

export const payWithRaidToken = async (address: string, signer: Signer, recipient: string, amount: string) => {
  const abi = new utils.Interface([
    'function transfer(address recipient, uint256 amount) public virtual override returns (bool)',
  ]);
  const contract = new Contract(address, abi, signer);
  return contract.transfer(recipient, amount);
};