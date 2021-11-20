import axios from 'axios';

import { initAirtableClient } from '../config';

export const submitApplicationToAirtable = async (state) => {
  const submissions_table = initAirtableClient();
  const data = {
    Name: state.name,
    Email: state.email, //email_address
    Bio: state.bio, //introduction
    Goals: state.goals, //learning_goals
    Discord: state.discordHandle, //discord_handle
    Telegram: state.telegramHandle, //telegram_handle
    Twitter: state.twitterHandle, //twitter_handle
    Github: state.githubHandle, //github_handle
    'ETH Address': state.ethereumAddress, //eth_address
    'ENS Address': state.ensAddress, //ens_name
    'Primary Skills': state.primarySkills, //primary_skills
    'Secondary Skills': state.secondarySkills, //secondary_skills
    Class: state.classType, //skill_type
    Passion: state.passion,
    'Favourite Media': state.favoriteMedia, //favourite_media
    Thrills: state.thrills, //crypto_thrills
    Interests: state.interest, //why_raidguild
    'DAO Familiarity': state.daoFamiliarity, //dao_familiarity
    'Crypto Experience': state.cryptoExp, //crypto_exp
    Availability: state.availability,
    Comments: state.comments,
    'Handbook Read': state.handbookRead, //handbook_read
    'Pledge Readiness': state.pledgeReadiness //pledge_readiness
  };

  try {
    await submissions_table.create(data);
  } catch (err) {
    console.error(err);
  }
};

export const submitApplicationToMongo = async (state) => {
  const data = {
    name: state.name,
    email_address: state.email,
    introduction: state.bio,
    learning_goals: state.goals,
    discord_handle: state.discordHandle,
    telegram_handle: state.telegramHandle,
    twitter_handle: state.twitterHandle,
    github_handle: state.githubHandle,
    eth_address: state.ethereumAddress,
    ens_name: state.ensAddress,
    primary_skills: state.primarySkills,
    secondary_skills: state.secondarySkills,
    skill_type: state.classType,
    passion: state.passion,
    favourite_media: state.favoriteMedia,
    crypto_thrills: state.thrills,
    why_raidguild: state.interest,
    dao_familiarity: state.daoFamiliarity,
    crypto_exp: state.cryptoExp,
    availability: state.availability,
    comments: state.comments,
    handbook_read: state.handbookRead,
    pledge_readiness: state.pledgeReadiness
  };

  try {
    await axios.post(process.env.NEXT_PUBLIC_DM_ENDPOINT, data);
  } catch (err) {
    console.error(err);
  }
};
