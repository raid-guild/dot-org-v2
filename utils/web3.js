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
