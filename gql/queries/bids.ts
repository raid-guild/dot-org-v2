import { gql } from 'graphql-request';

export const BIDS_ACCEPTED_QUERY = gql`
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

export const BIDS_QUEUED_QUERY = gql`
  query GetBids($details: String!) {
    bids(where: { details: $details }) {
      amount
      status
    }
  }
`;
