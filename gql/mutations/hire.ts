import { gql } from "@apollo/client";

export const CONSULTATION_INSERT_MUTATION = gql`
  mutation ConsultationInsertMutation(
    $consultation: consultations_insert_input!
  ) {
    insert_consultations_one(object: $consultation) {
      id
    }
  }
`;
