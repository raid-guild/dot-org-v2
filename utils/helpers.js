export const formatJoinUsData = (state, type) => {
  if (type === 'airtable') {
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

    return data;
  }

  if (type === 'mongo') {
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

    return data;
  }

  if (type === 'discord') {
    const data = {
      key: process.env.NEXT_PUBLIC_ACCESS_KEY,
      name: state.name,
      bio: state.bio,
      goals: state.goals,
      discord: state.discordHandle,
      twitter: state.twitterHandle,
      primary_skills: state.primarySkills.toString(),
      class_type: state.classType,
      passion: state.passion,
      crypto_exp: state.cryptoExp,
      availability: state.availability,
      eth_address: state.ethereumAddress
    };

    return data;
  }
};
