const airtable = require('airtable');

const initAirtableClient = () => {
  airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.NEXT_PUBLIC_API_KEY
  });

  const base = airtable.base(process.env.NEXT_PUBLIC_JOINUS_BASE_ID);

  const submissions_table = base('Submissions');

  return submissions_table;
};

module.exports = { initAirtableClient };
