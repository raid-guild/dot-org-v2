import { gql } from "@apollo/client";

export const PORTFOLIO_INSERT_MUTATION = gql`
  mutation PortfolioInsertMutation(
    $portfolio: portfolios_insert_input!
  ) {
    insert_portfolios_one(object: $portfolio) {
      id
    }
  }
`;
