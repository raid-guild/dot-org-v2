import { gql } from 'graphql-request';

export const PORTFOLIO_DETAIL_FRAGMENT = gql`
  fragment PortfolioDetailFragment on portfolios {
    id
    name
    slug
    description
    case_study
    repo_link
    result_link
  }
`;

export const PORTFOLIO_LIST_QUERY = gql`
  query PortfolioList {
    portfolios {
      ...PortfolioDetailFragment
    }
  }
  ${PORTFOLIO_DETAIL_FRAGMENT}
`;

export const PORTFOLIO_DETAIL_QUERY = gql`
  query PortfolioDetail($slug: String!) {
    portfolios(where: { slug: { _eq: $slug } }) {
      id
      name
      description
      approach
      challenge
      result
      case_study
      repo_link
      result_link
    }
  }
`;
