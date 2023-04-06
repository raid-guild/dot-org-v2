/* eslint-disable import/prefer-default-export */
import { gql } from 'graphql-request';

export const PORTFOLIO_INSERT_MUTATION = gql`
  mutation PortfolioInsertMutation($portfolio: portfolios_insert_input!) {
    insert_portfolios_one(object: $portfolio) {
      id
      name
      slug
      repo_link
      result_link
      image_url
      description
      category
      approach
      challenge
      result
    }
  }
`;

export const PORTFOLIO_UPDATE_MUTATION = gql`
  mutation updatePortfolios($where: portfolios_bool_exp!, $portfolio: portfolios_set_input!) {
    update_portfolios(where: $where, _set: $portfolio) {
      returning {
        id
        name
        slug
        repo_link
        result_link
        image_url
        description
        category
        approach
        challenge
        result
      }
    }
  }
`;
