import { gql } from 'graphql-request';

export const PORTFOLIO_DETAIL_FRAGMENT = gql`
  fragment PortfolioDetailFragment on portfolios {
    id
    name
    slug
    description
    case_study
    approach
    challenge
    result
    repo_link
    result_link
    image_url
  }
`;

export const PORTFOLIO_LIST_QUERY = gql`
  query PortfolioList {
    portfolios(where: { deleted: { _eq: false } }) {
      ...PortfolioDetailFragment
    }
  }
  ${PORTFOLIO_DETAIL_FRAGMENT}
`;

export const PORTFOLIO_DETAIL_QUERY = gql`
  query PortfolioDetail($slug: String!) {
    portfolios(where: { slug: { _eq: $slug } }) {
      ...PortfolioDetailFragment
    }
  }
  ${PORTFOLIO_DETAIL_FRAGMENT}
`;
