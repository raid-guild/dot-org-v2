import axios from 'axios';
import jwt from 'jsonwebtoken';

import { formatJoinUsData, formatHireUsData } from './helpers';

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

export const notifyApplicationSubmission = async (state, signature) => {
  const formattedData = formatJoinUsData(state, 'discord');
  const signedToken = jwt.sign(signature, process.env.NEXT_PUBLIC_JWT_SECRET);

  await axios.post('/api/join/notify', formattedData, {
    headers: {
      Authorization: 'Bearer ' + signedToken
    }
  });
};

export const submitConsultationToMongo = async (state) => {
  const formattedData = formatHireUsData(state, 'mongo');
  const { data } = await axios.post('/api/hire/primary', formattedData);
  return data;
};

export const submitConsultationToAirtable = async (state) => {
  const formattedData = formatHireUsData(state, 'airtable');
  await axios.post('/api/hire/secondary', formattedData);
};

export const updateConsultationToMongo = async (
  submissionHash,
  consultationHash
) => {
  const formattedData = {
    submission_hash: submissionHash,
    consultation_hash: consultationHash
  };
  await axios.post('/api/consult/primary', formattedData);
};

export const updateConsultationToAirtable = async (
  airtableRecordId,
  consultationHash
) => {
  const formattedData = {
    id: airtableRecordId,
    consultation_hash: consultationHash
  };
  await axios.post('/api/consult/secondary', formattedData);
};

export const updateBidToAirtable = async (
  airtableRecordId,
  bidHash,
  bidAmount
) => {
  const formattedData = {
    id: airtableRecordId,
    bid_hash: bidHash,
    bid_amount: bidAmount
  };
  await axios.post('/api/consult/bid', formattedData);
};

export const notifyConsultationRequest = async (state) => {
  const formattedData = formatHireUsData(state, 'discord');
  await axios.post('/api/hire/notify', formattedData);
};

export const fetchClientInfoFromAirtable = async (signerAddress) => {
  const signedToken = jwt.sign(
    signerAddress,
    process.env.NEXT_PUBLIC_JWT_SECRET
  );

  const result = await axios.post(
    '/api/fetch/client',
    {},
    {
      headers: {
        Authorization: 'Bearer ' + signedToken
      }
    }
  );
  return result;
};
