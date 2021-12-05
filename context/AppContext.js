import React, { Component, createContext } from 'react';

import Web3 from 'web3';
import { ethers, utils } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import {
  submitApplicationToMongo,
  submitApplicationToAirtable,
  notifyApplicationSubmission
} from '../utils/requests';
import { getENSFromAddress, getSignature } from '../utils/web3';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    // UX state
    stage: 1,
    submitting: false,
    faqModalStatus: false,
    //web3 state
    ethersProvider: null,
    // Personal Info state
    name: '',
    email: '',
    bio: '',
    goals: '',
    discordHandle: '',
    telegramHandle: '',
    twitterHandle: '',
    githubHandle: '',
    ethereumAddress: '',
    ensAddress: 'Not Found',
    primarySkills: [],
    secondarySkills: [],
    classType: '',
    passion: '',
    favoriteMedia: '',
    thrills: '',
    interest: '',
    cryptoExp: '',
    daoFamiliarity: '',
    availability: '',
    comments: '',
    handbookRead: false,
    pledgeReadiness: false
  };

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateFaqModalStatus = (status) => {
    this.setState({ faqModalStatus: status });
  };

  updateStage = (type) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState((prevState) => {
      return {
        stage: type === 'previous' ? prevState.stage - 1 : prevState.stage + 1
      };
    });
  };

  setSkillSets = (primarySkills, secondarySkills, classType) => {
    this.setState({
      primarySkills,
      secondarySkills,
      classType
    });
  };

  setCryptoData = (daoFamiliarity, availability) => {
    this.setState({
      daoFamiliarity,
      availability
    });
  };

  submitData = async (handbookRead, pledgeReadiness) => {
    this.setState(
      { handbookRead, pledgeReadiness, submitting: !this.state.submitting },
      async () => {
        try {
          const signature = await getSignature(this.state.ethersProvider);
          if (signature) {
            await submitApplicationToAirtable(this.state, signature);
            await submitApplicationToMongo(this.state, signature);
            await notifyApplicationSubmission(this.state, signature);
          }

          this.setState({ submitting: !this.state.submitting });
          this.updateStage('next');
        } catch (err) {
          this.setState({ submitting: !this.state.submitting });
        }
      }
    );
  };

  connectAccount = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID
        }
      }
    };

    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: false,
      providerOptions
    });

    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    this.setState({ ethereumAddress: accounts[0] });

    let ethersProvider;
    const chainId = await web3.eth.net.getId();

    if (chainId === 1 || chainId === '0x1') {
      ethersProvider = new ethers.providers.Web3Provider(web3.currentProvider);
      const ens = await getENSFromAddress(ethersProvider, address);
      this.setState({ ensAddress: ens, ethersProvider });
    } else {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }]
        });

        const ethersProvider = new ethers.providers.Web3Provider(
          web3.currentProvider
        );
        const ens = await ethersProvider.lookupAddress(address);
        this.setState({ ethersProvider: ethersProvider, ensAddress: ens });
      } catch (err) {
        console.log(err);
      }
    }

    provider.on('accountsChanged', async (accounts) => {
      ethersProvider = new ethers.providers.Web3Provider(web3.currentProvider);
      const ens = await getENSFromAddress(ethersProvider, accounts[0]);
      this.setState({
        ethersProvider: ethersProvider,
        ethereumAddress: accounts[0],
        ensAddress: ens
      });
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          updateStage: this.updateStage,
          setSkillSets: this.setSkillSets,
          setCryptoData: this.setCryptoData,
          submitData: this.submitData,
          inputChangeHandler: this.inputChangeHandler,
          updateFaqModalStatus: this.updateFaqModalStatus,
          connectAccount: this.connectAccount
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
