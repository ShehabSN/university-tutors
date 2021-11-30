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

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $id: String!, $name: String!, $university_id: Int, $major: String, $year: Int
  ) {
    update_student_by_pk(
      pk_columns: {student_id: $id},
      _set: {major: $major, year: $year},
    ) {
      student_id
    }
    update_user_by_pk(
      pk_columns: {user_id: $id},
      _set: {name: $name, university_id: $university_id}
    ) {
      user_id
    }
  }
`;
