import axios from 'axios';
import jwt from 'jsonwebtoken';

import { formatJoinUsData } from './helpers';

export const submitApplicationToMongo = async (state, signature) => {
  const formattedData = formatJoinUsData(state, 'mongo');
  const signedToken = jwt.sign(signature, process.env.NEXT_PUBLIC_JWT_SECRET);

  await axios.post('/api/join/primary', formattedData, {
    headers: {
      Authorization: 'Bearer ' + signedToken
    }
  });
};

export const submitApplicationToAirtable = async (state, signature) => {
  const formattedData = formatJoinUsData(state, 'airtable');
  const signedToken = jwt.sign(signature, process.env.NEXT_PUBLIC_JWT_SECRET);

  await axios.post('/api/join/secondary', formattedData, {
    headers: {
      Authorization: 'Bearer ' + signedToken
    }
  });
};
