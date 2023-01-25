/* eslint-disable import/prefer-default-export */
import { gql } from 'graphql-request';

export const CONSULTATION_CREATE_MUTATION = gql`
  mutation ConsultationInsertMutation($consultation: consultations_insert_input!) {
    insert_consultations_one(object: $consultation) {
      id
    }
  }
`;

export const CONSULTATIONS_CREATE_MUTATION = gql`
  mutation ConsultationsInsertMutation($consultations: consultations_insert_input!) {
    insert_consultations(objects: [$consultations]) {
      affected_rows
    }
  }
`;
