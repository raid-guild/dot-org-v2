import { useState, useContext } from 'react';
import useApplicationCreate from './useApplicationCreate';

export const mapDAOFamiliarity = (val: string): string => {
  const map: any = {
    Expert: 'EXPERT',
    Familiar: 'FAMILIAR',
    'A Little': 'AWARE',
    None: 'NONE',
    'Not Applicable': 'NOT_APPLICABLE',
  };
  return val in map ? map[val] : 'NOT_APPLICABLE';
};

export const mapSkillType = (val: string) => {
  const map: any = {
    Technical: 'TECHNICAL',
    'Non - Technical': 'NON_TECHNICAL',
    'Not Applicable': 'NOT_APPLICABLE',
    Other: 'OTHER',
  };
  return val ? map[val] : 'NOT_APPLICABLE';
};

export const mapAvailability = (val: string) => {
  const map: any = {
    '0-5 hours': 'LESS_THAN_FIVE_HOURS',
    '6-12 hours': 'SIX_TO_TWELVE_HOURS',
    '13-35 hours': 'THIRTEEN_TO_THIRTY_FIVE_HOURS',
    '36+ hours': 'MORE_THAN_THIRTY_SIX_HOURS',
    'Not Applicable': 'NOT_APPLICABLE',
  };
  return val ? map[val] : 'NOT_APPLICABLE';
};

export const mapSkill = (val: string) => {
  const map: any = {
    'Frontend Dev': 'FRONTEND',
    'Backend Dev': 'BACKEND',
    Solidity: 'SOLIDITY',
    BizDev: 'BIZ_DEV',
    Community: 'COMMUNITY',
    'Project Management': 'PROJECT_MANAGEMENT',
    Finance: 'FINANCE',
    'Product Design': 'PRODUCT_DESIGN',
    'UX Research': 'UX_RESEARCH',
    'Game Theory': 'GAME_THEORY',
    DevOps: 'DEVOPS',
    Tokenomics: 'TOKENOMICS',
    Content: 'CONTENT',
    Memes: 'MEMES',
    'Visual Design': 'VISUAL_DESIGN',
    'UI Design': 'UI_DESIGN',
    Illustration: 'ILLUSTRATION',
    Legal: 'LEGAL',
    Accounting: 'ACCOUNTING',
  };
  return val ? map[val] : null;
};

const useSubmit = (token: string) => {
  const { mutateAsync, isLoading, isError, isSuccess } = useApplicationCreate(token);

  const submitJoinForm = async (data: any) => {
    const applicationSkills = [
      ...data.join3.primarySkills.map((s: string) => ({ skill_key: mapSkill(s), skill_type_key: 'PRIMARY' })),
      ...data.join3.secondarySkills.map((s: string) => ({ skill_key: mapSkill(s), skill_type_key: 'SECONDARY' })),
    ];
    const submitData = {
      name: data.join1.name,
      eth_address: data.join6.ethAddress,
      introduction: data.join1.introduction,
      learning_goals: data.join1.learningGoals,
      technical_skill_type_key: mapSkillType(data.join3.technicalSkillType),
      passion: data.join4.passion,
      favorite_media: data.join4.favoriteMedia,
      crypto_thrills: data.join4.cryptoThrills,
      why_raidguild: data.join4.whyRaidguild,
      dao_familiarity_key: mapDAOFamiliarity(data.join5.daoFamiliarity),
      availability_key: mapAvailability(data.join5.cohortAvailability),
      applications_skills: {
        data: [...applicationSkills],
      },
      crypto_experience: data.join5.cryptoExperience,
      comments: data.join5.comments,
      handbook_read: data.join6.handbookRead,
      pledge_readiness: data.join6.pledgeReadiness,
    };
    console.log('submitJoinForm 88', JSON.stringify(submitData));
    const res = await mutateAsync({ ...submitData });
    console.log('res: ', res);
  };
  return {
    submitJoinForm,
  };
};

export default useSubmit;
