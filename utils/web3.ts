import { Contract, utils } from 'ethers';

export const balanceOf = async (signer: any, token: string, address: string) => {
  const abi = new utils.Interface(['function balanceOf(address account) view returns(uint256)']);
  const contract = new Contract(token, abi, signer);
  return contract.balanceOf(address);
};

export const payWithRaidToken = async (address: string, signer: any, recipient: string, amount: string) => {
  const abi = new utils.Interface([
    'function transfer(address recipient, uint256 amount) public virtual override returns (bool)',
  ]);
  const contract = new Contract(address, abi, signer);
  return contract.transfer(recipient, amount);
};
