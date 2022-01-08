const airtable = require('airtable');

export const joinTable = async () => {
  airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.API_KEY
  });

  const base = airtable.base(process.env.JOINUS_BASE_ID);
  const submissions_table = base('Submissions');
  return submissions_table;
};

export const hireTable = async () => {
  airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.API_KEY
  });

  const base = airtable.base(process.env.JOINUS_BASE_ID);
  const hire_table = base('Hire');
  return hire_table;
};

export const NETWORK_CONFIG = {
  100: {
    PAYMENT_TOKEN: 'RAID',
    TOKEN_ADDRESS: '0x18e9262e68cc6c6004db93105cc7c001bb103e49'.toLowerCase()
  },
  4: {
    PAYMENT_TOKEN: 'TEST',
    TOKEN_ADDRESS: '0x982e00B16c313E979C0947b85230907Fce45d50e'.toLowerCase()
  }
};

export const CONSULTATION_REQUEST_FEE = 1;
export const RG_XDAI_DAO =
  '0xfe1084bc16427e5eb7f13fc19bcd4e641f7d571f'.toLowerCase();

export const explorerUrls = {
  1: 'https://etherscan.io',
  4: 'https://rinkeby.etherscan.io',
  42: 'https://kovan.etherscan.io',
  100: 'https://blockscout.com/poa/xdai'
};
