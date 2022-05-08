import { useContext } from 'react';
import { providers } from 'ethers';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { AppContext } from '../context/AppContext';

import { theme } from '../themes/theme';

import { INFURA_ID } from '../config';
import { getMemberShares } from '../utils/web3';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID
    }
  }
};

const useWallet = (requireEns) => {
  const context = useContext(AppContext);

  const fetchEns = async (chainId, ethersProvider, address) => {
    if (chainId !== 1) return null;
    const ens = await ethersProvider.lookupAddress(address);
    return ens;
  };

  const validateMembership = async (signerAddress, ethersProvider) => {
    try {
      let memberInfo = await getMemberShares(signerAddress, ethersProvider);
      context.setWeb3Data({ isMember: memberInfo[3] });
    } catch (err) {
      console.log(err);
    }
  };

  const setWeb3Provider = async (modalProvider) => {
    const ethersProvider = new providers.Web3Provider(modalProvider);
    const web3 = new Web3(modalProvider);
    const signerAddress = await ethersProvider.getSigner().getAddress();
    const chainId = Number(modalProvider.chainId);

    if (requireEns) {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }]
        });
      } catch (err) {
        console.log(err);
      }
    }

    const signerEns =
      (await fetchEns(chainId, ethersProvider, signerAddress)) || 'Not Found';

    if (chainId === 100) validateMembership(signerAddress, ethersProvider);

    context.setWeb3Data({
      ethersProvider,
      web3,
      signerAddress,
      signerEns,
      chainId
    });
  };

  let web3Modal;

  const connectWallet = async () => {
    try {
      web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions,
        theme: {
          background: theme.colors.blackLight,
          main: theme.colors.red,
          secondary: theme.colors.white,
          hover: theme.colors.black
        }
      });

      web3Modal.clearCachedProvider();
      const modalProvider = await web3Modal.connect();

      await setWeb3Provider(modalProvider);

      modalProvider.on('accountsChanged', async () => {
        const ethersProvider = new providers.Web3Provider(modalProvider);
        const signerAddress = await ethersProvider.getSigner().getAddress();
        const signerEns =
          (await fetchEns(
            Number(modalProvider.chainId),
            ethersProvider,
            signerAddress
          )) || 'Not Found';

        if (Number(modalProvider.chainId) === 100)
          validateMembership(signerAddress, ethersProvider);

        context.setWeb3Data({ ethersProvider, signerAddress, signerEns });
      });

      modalProvider.on('chainChanged', async (_chainId) => {
        const chainId = Number(_chainId);
        const ethersProvider = new providers.Web3Provider(modalProvider);
        const signerAddress = await ethersProvider.getSigner().getAddress();

        if (chainId === 100) validateMembership(signerAddress, ethersProvider);

        context.setWeb3Data({ chainId, ethersProvider, signerAddress });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const disconnect = async () => {
    web3Modal.clearCachedProvider();
  };

  return { connectWallet, disconnect };
};

export default useWallet;
