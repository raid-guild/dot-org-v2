export const formatJoinUsData = (state, type) => {
  if (type === 'airtable') {
    const data = {
      Name: state.j_name,
      Email: state.j_email, //email_address
      Bio: state.j_bio, //introduction
      Goals: state.j_goals, //learning_goals
      Discord: state.j_discordHandle, //discord_handle
      Telegram: state.j_telegramHandle, //telegram_handle
      Twitter: state.j_twitterHandle, //twitter_handle
      Github: state.j_githubHandle, //github_handle
      'ETH Address': state.signerAddress, //eth_address
      'ENS Address': state.signerEns, //ens_name
      'Primary Skills': state.j_primarySkills, //primary_skills
      'Secondary Skills': state.j_secondarySkills, //secondary_skills
      Class: state.j_classType, //skill_type
      Passion: state.j_passion,
      'Favourite Media': state.j_favoriteMedia, //favourite_media
      Thrills: state.j_thrills, //crypto_thrills
      Interests: state.j_interest, //why_raidguild
      'DAO Familiarity': state.j_daoFamiliarity, //dao_familiarity
      'Crypto Experience': state.j_cryptoExp, //crypto_exp
      Availability: state.j_availability,
      Comments: state.j_comments,
      'Handbook Read': state.j_handbookRead, //handbook_read
      'Pledge Readiness': state.j_pledgeReadiness //pledge_readiness
    };

    return data;
  }

  if (type === 'mongo') {
    const data = {
      name: state.j_name,
      email_address: state.j_email,
      introduction: state.j_bio,
      learning_goals: state.j_goals,
      discord_handle: state.j_discordHandle,
      telegram_handle: state.j_telegramHandle,
      twitter_handle: state.j_twitterHandle,
      github_handle: state.j_githubHandle,
      eth_address: state.signerAddress,
      ens_name: state.signerEns,
      primary_skills: state.j_primarySkills,
      secondary_skills: state.j_secondarySkills,
      skill_type: state.j_classType,
      passion: state.j_passion,
      favourite_media: state.j_favoriteMedia,
      crypto_thrills: state.j_thrills,
      why_raidguild: state.j_interest,
      dao_familiarity: state.j_daoFamiliarity,
      crypto_exp: state.j_cryptoExp,
      availability: state.j_availability,
      comments: state.j_comments,
      handbook_read: state.j_handbookRead,
      pledge_readiness: state.j_pledgeReadiness
    };

    return data;
  }

  if (type === 'discord') {
    const data = {
      key: process.env.NEXT_PUBLIC_ACCESS_KEY,
      name: state.j_name,
      bio: state.j_bio,
      goals: state.j_goals,
      discord: state.j_discordHandle,
      twitter: state.j_twitterHandle,
      primary_skills: state.j_primarySkills.toString(),
      class_type: state.j_classType,
      passion: state.j_passion,
      crypto_exp: state.j_cryptoExp,
      availability: state.j_availability,
      eth_address: state.signerAddress
    };

    return data;
  }
};

export const formatHireUsData = (state, type) => {
  if (type === 'airtable') {
    const data = {
      Name: state.h_name,
      Address: state.signerAddress,
      Email: state.h_email,
      Bio: state.h_bio,
      Discord: state.h_discordHandle,
      Telegram: state.h_telegramHandle,
      Twitter: state.h_twitterHandle,
      Github: state.h_githubHandle,
      'Project Name': state.h_projectName,
      'Project Type': state.h_projectType,
      'Specs Availability': state.h_specsType,
      'Project Link': state.h_projectLink,
      'Project Description': state.h_projectDesc,
      'Services Needed': state.h_servicesNeeded,
      'Budget Range': state.h_budgetRange,
      'Expected Deadline': state.h_expectedDeadline,
      'Specific Needs': state.h_specificNeed,
      Priorities: state.h_priorities,
      'Submission Hash': state.h_submissionHash
    };

    return data;
  }

  if (type === 'mongo') {
    const data = {
      contact_name: state.h_name,
      contact_email: state.h_email,
      contact_bio: state.h_bio,
      contact_discord: state.h_discordHandle,
      contact_telegram: state.h_telegramHandle,
      contact_twitter: state.h_twitterHandle,
      contact_github: state.h_githubHandle,
      project_name: state.h_projectName,
      project_type: state.h_projectType,
      project_specs: state.h_specsType,
      specs_link: state.h_projectLink,
      project_desc: state.h_projectDesc,
      services_req: state.h_servicesNeeded,
      budget: state.h_budgetRange,
      desired_delivery: state.h_expectedDeadline,
      additional_info: state.h_specificNeed,
      delivery_priorities: state.h_priorities,
      submission_hash: state.h_submissionHash,
      submission_type: 'Paid'
    };

    return data;
  }

  if (type === 'discord') {
    const data = {
      key: process.env.NEXT_PUBLIC_ACCESS_KEY,
      name: state.h_name,
      bio: state.h_bio,
      discord: state.h_discordHandle,
      project_name: state.h_projectName,
      project_type: state.h_projectType,
      project_link: state.h_projectLink,
      project_description: state.h_projectDesc,
      services_needed: state.h_servicesNeeded,
      budget_range: state.h_budgetRange
    };

    return data;
  }
};
