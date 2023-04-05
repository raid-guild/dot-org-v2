import { gql } from 'graphql-request';

export const BLOG_DETAIL_FRAGMENT = gql`
  fragment BlogDetailFragment on blogs {
    id
    title
    slug
    description
    content
    image
    created_at
  }
`;

export const BLOG_LIST_QUERY = gql`
  query BlogList {
    blogs(order_by: { created_at: desc }) {
      title
      author
      slug
      description
      image
      created_at
    }
  }
`;

export const BLOG_DETAIL_QUERY = gql`
  query BlogDetail($slug: String!) {
    blogs(where: { slug: { _eq: $slug } }) {
      title
      author
      slug
      description
      content
      image
      created_at
    }
  }
`;
