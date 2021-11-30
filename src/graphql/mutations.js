import { gql } from "@apollo/client";

export const INSERT_TUTOR = gql`
  mutation InsertTutor($tutor_id: String!) {
    insert_tutor_one(object: { tutor_id: $tutor_id }) {
      tutor_id
    }
  }
`;

export const INSERT_STUDENT = gql`
  mutation InsertStudent($student_id: String!) {
    insert_student_one(object: { student_id: $student_id }) {
      student_id
    }
  }
`;
