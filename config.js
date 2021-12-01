const airtable = require('airtable');

const initAirtableClient = () => {
  airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.API_KEY
  });

  const base = airtable.base(process.env.JOINUS_BASE_ID);

  const submissions_table = base('Submissions');

  return submissions_table;
};

module.exports = { initAirtableClient };
