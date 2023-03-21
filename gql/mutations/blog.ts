/* eslint-disable import/prefer-default-export */
import { gql } from 'graphql-request';

export const BLOG_CREATE_MUTATION = gql`
  mutation BlogInsertMutation($consultation: consultations_insert_input!) {
    insert_blogs_one(object: $blog) {
      id
    }
  }
`;

export const BLOG_UPDATE_MUTATION = gql`
  mutation updatePortfolios($where: blogs_bool_exp!, $blog: blogs_set_input!) {
    update_blogs(where: $where, _set: $blog) {
      returning {
        author
        content
        created_at
        description
        id
        image
        slug
        title
        tags
        updated_at
      }
    }
  }
`;
