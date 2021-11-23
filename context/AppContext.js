import React, { Component, createContext } from 'react';
import {
  submitApplicationToAirtable
  // submitApplicationToMongo
} from '../utils/apis';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    // UX state
    stage: 1,
    submitting: false,
    faqModalStatus: false,
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
    ensAddress: '',
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
        await submitApplicationToAirtable(this.state);
        // await submitApplicationToMongo(this.state);
        this.setState({ submitting: !this.state.submitting });
        this.updateStage('next');
      }
    );
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
          updateFaqModalStatus: this.updateFaqModalStatus
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
