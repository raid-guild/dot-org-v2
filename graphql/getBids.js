import gql from 'fake-tag';

import { CLIENT } from './client';

const bidsQuery = gql`
  query GetBids($details: String!) {
    bids(where: { details: $details, status: "accepted" }) {
      amount
      status
      details
      createdAt
    }
  }
`;

export const getBids = async (details) => {
  const { data, error } = await CLIENT.query(bidsQuery, {
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
