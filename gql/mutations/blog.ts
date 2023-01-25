/* eslint-disable import/prefer-default-export */
import { gql } from 'graphql-request';

export const BLOG_CREATE_MUTATION = gql`
  mutation BlogInsertMutation($consultation: consultations_insert_input!) {
    insert_blogs_one(object: $blog) {
      id
    }
  }
`;
