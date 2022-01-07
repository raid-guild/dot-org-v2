import { useState, useContext } from 'react';
import { providers } from 'ethers';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { AppContext } from '../context/AppContext';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID
    }
  }
};

const useWallet = (requireEns) => {
  const context = useContext(AppContext);
  const [connectionInfo, setConnectionInfo] = useState({
    ethersProvider: context.ethersProvider,
    web3: context.web3,
    chainId: context.chainId,
    signerAddress: context.signerAddress,
    signerEns: context.signerEns
  });

  const fetchEns = async (chainId, ethersProvider, address) => {
    if (chainId !== 1) return null;
    const ens = await ethersProvider.lookupAddress(address);
    return ens;
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

    const signerEns = await fetchEns(chainId, ethersProvider, signerAddress);

    setConnectionInfo({
      ...connectionInfo,
      ethersProvider,
      web3,
      signerAddress,
      signerEns,
      chainId
    });

    context.setWeb3Data({
      ethersProvider,
      web3,
      signerAddress,
      signerEns,
      chainId
    });
  };

  const connectWallet = async () => {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: false,
      providerOptions
    });

    const modalProvider = await web3Modal.connect();

    await setWeb3Provider(modalProvider);

    modalProvider.on('accountsChanged', async () => {
      const ethersProvider = new providers.Web3Provider(modalProvider);
      const signerAddress = await ethersProvider.getSigner().getAddress();
      const signerEns = await fetchEns(
        Number(modalProvider.chainId),
        ethersProvider,
        signerAddress
      );

      setConnectionInfo({
        ...connectionInfo,
        ethersProvider,
        signerAddress,
        signerEns
      });

      context.setWeb3Data({ ethersProvider, signerAddress, signerEns });
    });

    modalProvider.on('chainChanged', () => {
      const chainId = Number(modalProvider.chainId);
      setConnectionInfo({ ...connectionInfo, chainId });
      context.setWeb3Data({ chainId });
    });
  };

  return { connectionInfo, connectWallet };
};

export default useWallet;
