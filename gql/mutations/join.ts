/* eslint-disable import/prefer-default-export */
import { gql } from 'graphql-request';

// @Dev: do not use 'insert_applications_one'
// this query is not callable for non RaidGuild member/cohort wallets.
// Hasura doesn't let you use insert_models_one unless the role (user) has
// permissions to select ids at least.
// We'll want to use insert_models in any case like this.

export const APPLICATION_CREATE_MUTATION = gql`
  mutation ApplicationInsertMutation($application: applications_insert_input!) {
    insert_applications(objects: [$application]) {
      affected_rows
    }
  }
`;
