import gql from 'fake-tag';

import { CLIENT } from './client';

const acceptedBidsQuery = gql`
  query GetBids($details: String!) {
    bids(where: { details: $details, status: "accepted" }) {
      amount
      status
      details
      createdAt
      acceptTxHash
    }
  }
`;

const queuedBidsQuery = gql`
  query GetBids($details: String!) {
    bids(where: { details: $details }) {
      amount
      status
    }
  }
`;

export const getAcceptedBids = async (details) => {
  const { data, error } = await CLIENT.query(acceptedBidsQuery, {
    details
  }).toPromise();
  if (!data) {
    if (error) {
      console.log(error);
    }
    return null;
  }

  return data.bids;
};

export const getQueuedBids = async (details) => {
  const { data, error } = await CLIENT.query(queuedBidsQuery, {
    details
  }).toPromise();
  if (!data) {
    if (error) {
      console.log(error);
    }
    return null;
  }

  return data.bids;
};
