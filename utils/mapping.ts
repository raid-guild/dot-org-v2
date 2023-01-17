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