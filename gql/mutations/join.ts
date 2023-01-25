/* eslint-disable import/prefer-default-export */
import { gql } from 'graphql-request';

export const APPLICATION_CREATE_MUTATION = gql`
  mutation ApplicationInsertMutation($application: applications_insert_input!) {
    insert_applications_one(object: $application) {
      id
    }
  }
`;
