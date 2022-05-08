import { Contract, utils } from 'ethers';
import { DAO_ADDRESS } from '../config';
import { message_to_sign_join } from './constants';

export const getENSFromAddress = async (ethersProvider, address) => {
  const ens = await ethersProvider.lookupAddress(address);
  return ens || 'Not Found';
};

export const getSignature = async (ethersProvider) => {
  const signer = ethersProvider.getSigner();
  const signature = await signer.signMessage(message_to_sign_join);
  return signature;
};

export const balanceOf = async (ethersProvider, token, address) => {
  const abi = new utils.Interface([
    'function balanceOf(address account) view returns(uint256)'
  ]);
  const contract = new Contract(token, abi, ethersProvider);
  return contract.balanceOf(address);
};

export const payWithRaidToken = async (
  address,
  ethersProvider,
  recipient,
  amount
) => {
  const abi = new utils.Interface([
    'function transfer(address recipient, uint256 amount) public virtual override returns (bool)'
  ]);
  const contract = new Contract(address, abi, ethersProvider.getSigner());
  return contract.transfer(recipient, amount);
};

export const getMemberShares = async (signerAddress, ethersProvider) => {
  const abi = new utils.Interface([
    'function members(address account) view returns (address, uint256, uint256, bool, uint256, uint256)'
  ]);
  const contract = new Contract(DAO_ADDRESS[100], abi, ethersProvider);
  const member = await contract.members(signerAddress);
  return member;
};
