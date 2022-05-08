import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    // UX state
    stage: 1,
    faqModalStatus: false,
    showAlertModal: false,
    faqType: '',
    //web3 state
    ethersProvider: null,
    web3: null,
    signerAddress: null,
    isMember: false,
    signerEns: null,
    chainId: null,
    //join state
    j_name: '',
    j_email: '',
    j_bio: '',
    j_goals: '',
    j_discordHandle: '',
    j_telegramHandle: '',
    j_twitterHandle: '',
    j_githubHandle: '',
    j_primarySkills: [],
    j_secondarySkills: [],
    j_classType: '',
    j_passion: '',
    j_favoriteMedia: '',
    j_thrills: '',
    j_interest: '',
    j_cryptoExp: '',
    j_daoFamiliarity: '',
    j_availability: '',
    j_comments: '',
    j_handbookRead: false,
    j_pledgeReadiness: false,
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
    h_priorities: '',
    h_submissionHash: '',
    h_consultationHash: ''
  };

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateFaqModalStatus = (status, faqType) => {
    this.setState({ faqModalStatus: status, faqType });
  };

  updateAlertModalStatus = () => {
    this.setState((prevState) => {
      return { showAlertModal: !prevState.showAlertModal };
    });
  };

  updateStage = (type) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState((prevState) => {
      return {
        stage: type === 'previous' ? prevState.stage - 1 : prevState.stage + 1
      };
    });
  };

  setJoinStepThreeData = (j_primarySkills, j_secondarySkills, j_classType) => {
    this.setState({
      j_primarySkills,
      j_secondarySkills,
      j_classType
    });
  };

  setJoinStepFiveData = (j_daoFamiliarity, j_availability) => {
    this.setState({
      j_daoFamiliarity,
      j_availability
    });
  };

  setJoinStepSixData = (j_handbookRead, j_pledgeReadiness) => {
    this.setState({ j_handbookRead, j_pledgeReadiness });
  };

  setHireStepTwoData = (h_projectType, h_specsType) => {
    this.setState({
      h_projectType,
      h_specsType
    });
  };

  setHireStepThreeData = (
    h_servicesNeeded,
    h_budgetRange,
    h_expectedDeadline
  ) => {
    this.setState({
      h_servicesNeeded,
      h_budgetRange,
      h_expectedDeadline
    });
  };

  setHireStepFourData = (h_priorities) => {
    this.setState({
      h_priorities
    });
  };

  setWeb3Data = (data) => {
    this.setState({
      ...data
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          updateStage: this.updateStage,
          inputChangeHandler: this.inputChangeHandler,
          updateFaqModalStatus: this.updateFaqModalStatus,
          updateAlertModalStatus: this.updateAlertModalStatus,
          setJoinStepThreeData: this.setJoinStepThreeData,
          setJoinStepFiveData: this.setJoinStepFiveData,
          setJoinStepSixData: this.setJoinStepSixData,
          setHireStepTwoData: this.setHireStepTwoData,
          setHireStepThreeData: this.setHireStepThreeData,
          setHireStepFourData: this.setHireStepFourData,
          setWeb3Data: this.setWeb3Data
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
