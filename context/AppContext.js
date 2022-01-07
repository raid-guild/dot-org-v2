import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    // UX state
    stage: 1,
    faqModalStatus: false,
    faqType: '',
    //web3 state
    ethersProvider: null,
    web3: null,
    signerAddress: null,
    signerEns: null,
    chainId: null,
    //join state
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
    pledgeReadiness: false,
    // hire state
    h_name: '',
    h_email: '',
    h_bio: '',
    h_discordHandle: '',
    h_telegramHandle: '',
    h_twitterHandle: '',
    h_githubHandle: '',
    h_projectType: '',
    h_specsType: '',
    h_projectName: '',
    h_projectLink: '',
    h_projectDesc: '',
    h_servicesNeeded: [],
    h_budgetRange: '',
    h_expectedDeadline: '',
    h_specificNeed: '',
    h_priorities: ''
  };

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateFaqModalStatus = (status, faqType) => {
    this.setState({ faqModalStatus: status, faqType });
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

  setProjectData = (h_projectType, h_specsType) => {
    this.setState({
      h_projectType,
      h_specsType
    });
  };

  setServicesData = (h_servicesNeeded, h_budgetRange, h_expectedDeadline) => {
    this.setState({
      h_servicesNeeded,
      h_budgetRange,
      h_expectedDeadline
    });
  };

  setWeb3Data = (data) => {
    this.setState({
      ...data
    });
  };

  setJoinStepSixData = (handbookRead, pledgeReadiness) => {
    this.setState({ handbookRead, pledgeReadiness });
  };

  setHireStepFourData = (h_priorities) => {
    this.setState({
      h_priorities
    });
  };

  // submitData = async (handbookRead, pledgeReadiness) => {
  //   this.setState(
  //     { handbookRead, pledgeReadiness, submitting: !this.state.submitting },
  //     async () => {
  //       try {
  //         this.setState({ submitLoadingText: 'Awaiting signature..' });
  //         const signature = await getSignature(this.state.ethersProvider);
  //         if (signature) {
  //           this.setState({ submitLoadingText: 'Verifying..' });
  //           await submitApplicationToAirtable(this.state, signature);
  //           this.setState({ submitLoadingText: 'Sending..' });
  //           await submitApplicationToMongo(this.state, signature);
  //           this.setState({ submitLoadingText: 'Notifying..' });
  //           await notifyApplicationSubmission(this.state, signature);
  //         }

  //         this.setState({ submitting: !this.state.submitting });
  //         this.updateStage('next');
  //       } catch (err) {
  //         this.setState({ submitting: !this.state.submitting });
  //       }
  //     }
  //   );
  // };

  // submitConsultation = async (h_priorities) => {
  //   try {
  //     this.setState({
  //       h_priorities,
  //       submitting: !this.state.submitting,
  //       submitLoadingText: 'Awaiting connection..'
  //     });
  //     this.setState({ submitting: !this.state.submitting });
  //     this.updateStage('next');
  //   } catch (err) {
  //     console.log(err);
  //     this.setState({ submitting: !this.state.submitting });
  //   }
  // };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          updateStage: this.updateStage,
          setSkillSets: this.setSkillSets,
          setCryptoData: this.setCryptoData,
          setProjectData: this.setProjectData,
          setServicesData: this.setServicesData,
          setWeb3Data: this.setWeb3Data,
          setJoinStepSixData: this.setJoinStepSixData,
          setHireStepFourData: this.setHireStepFourData,
          inputChangeHandler: this.inputChangeHandler,
          updateFaqModalStatus: this.updateFaqModalStatus
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
