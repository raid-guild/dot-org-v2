export const mapDAOFamiliarity = (val: string): string => {
  const map: { [key: string]: string } = {
    Expert: 'EXPERT',
    Familiar: 'FAMILIAR',
    'A Little': 'AWARE',
    None: 'NONE',
    'Not Applicable': 'NOT_APPLICABLE',
  };
  return val in map ? map[val] : 'NOT_APPLICABLE';
};

export const mapSkillType = (val: string) => {
  const map: { [key: string]: string } = {
    Technical: 'TECHNICAL',
    'Non - Technical': 'NON_TECHNICAL',
    'Not Applicable': 'NOT_APPLICABLE',
    Other: 'OTHER',
  };
  return val ? map[val] : 'NOT_APPLICABLE';
};

export const mapAvailability = (val: string) => {
  const map: { [key: string]: string } = {
    '0-5 hours': 'LESS_THAN_FIVE_HOURS',
    '6-12 hours': 'SIX_TO_TWELVE_HOURS',
    '13-35 hours': 'THIRTEEN_TO_THIRTY_FIVE_HOURS',
    '36+ hours': 'MORE_THAN_THIRTY_SIX_HOURS',
    'Not Applicable': 'NOT_APPLICABLE',
  };
  return val ? map[val] : 'NOT_APPLICABLE';
};

export const mapSkill = (val: string) => {
  const map: { [key: string]: string } = {
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

export const mapConsultationService = (val: string): string => {
  const map: { [key: string]: string } = {
    'DAO (Design, Deployment)': 'DAO',
    'Development (Frontend, Backend)': 'DEVELOPMENT',
    'Marketing (Social Media, Copywriting, Memes/GIFs)': 'MARKETING',
    'Motion Design (Video, Explainers, Sticker Packs)': 'MOTION_DESIGN',
    'NFTs (Contracts, Art, Tokenomics)': 'NFTS',
    'Smart Contracts (Solidity, Audits)': 'SMART_CONTRACTS',
    'Strategy (Product, Launch Planning, Agile)': 'STRATEGY',
    'Tokenomics (Incentives, Distribution, Rewards)': 'TOKENOMICS',
    'UX (Research, Testing, User Stories)': 'UX',
    'UI (Interface Design, Interaction Design)': 'UI',
    'Visual Design (Branding, Illustration, Graphics)': 'VISUAL_DESIGN',
    'Help me figure out what I need': 'HELP_ME',
  };

  return map[val];
};

export const mapProjectType = (val: string) => {
  const map: { [key: string]: string } = {
    New: 'NEW',
    Existing: 'EXISTING',
  };
  return map[val];
};

export const mapAvailableProjectSpec = (val: string) => {
  const map: { [key: string]: string } = {
    Yes: 'YES',
    Partial: 'PARTIAL',
    None: 'NONE',
  };
  return map[val];
};

export const mapBudgetOptions = (val: string) => {
  const map: { [key: string]: string } = {
    '< $5k': 'LESS_THAN_FIVE_THOUSAND',
    '$5k - $20k': 'FIVE_TO_TWENTY_THOUSAND',
    '$20k - $50k': 'TWENTY_TO_FIFTY_THOUSAND',
    '$50k +': 'MORE_THAN_FIFTY_THOUSAND',
    'Not Sure': 'NOT_SURE',
  };
  return map[val];
};

export const mapDeliveryPriorities = (val: string) => {
  const map: { [key: string]: string } = {
    'Fast & Polished': 'FAST_AND_POLISHED',
    'Fast & Inexpensive': 'FAST_AND_INEXPENSIVE',
    'Polished & Inexpensive': 'POLISHED_AND_INEXPENSIVE',
  };
  return map[val];
};
