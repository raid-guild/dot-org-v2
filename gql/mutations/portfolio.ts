/* eslint-disable import/prefer-default-export */
import { gql } from 'graphql-request';

export const PORTFOLIO_INSERT_MUTATION = gql`
  mutation PortfolioInsertMutation($portfolio: portfolios_insert_input!) {
    insert_portfolios_one(object: $portfolio) {
      id
    }
  }
`;
