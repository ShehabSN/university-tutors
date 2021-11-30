import { gql } from "@apollo/client";

export const GET_USER_TYPE = gql`
  query GetUserType($user_id: String!) {
    user_by_pk(user_id: $user_id) {
      tutor {
        tutor_id
      }
      student {
        student_id
      }
    }
  }
`;
