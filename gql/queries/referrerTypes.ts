import { gql } from 'graphql-request';

export const REFERRER_TYPES_QUERY = gql`
  query Referrer_types {
    referrer_types {
      referrer_type
    }
  }
`;
