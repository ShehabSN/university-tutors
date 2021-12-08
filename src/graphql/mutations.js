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
      major
      year
    }
    update_user_by_pk(
      pk_columns: {user_id: $id},
      _set: {name: $name, university_id: $university_id}
    ) {
      user_id
      name
    }
  }
`;

export const UPDATE_TUTOR = gql`
  mutation UpdateTutor(
    $id: String!, $name: String!, $hourly_rate: numeric, $bio: String
  ) {
    update_tutor_by_pk(
      pk_columns: {tutor_id: $id},
      _set: {hourly_rate: $hourly_rate, bio: $bio}
    ) {
      tutor_id
      hourly_rate
      bio
    }
    update_user_by_pk(
      pk_columns: {user_id: $id},
      _set: {name: $name}
    ) {
      user_id
      name
    }
  }
`;

export const CREATE_OFFERING = gql`
  mutation CreateOffering(
    $tutor_id: String!, $course_id: String!, $grade_received: String, $professor_name: String, $year_taken: String
  ) {
    insert_offering_one(object: {
      tutor_id: $tutor_id, course_id: $course_id, grade_received: $grade_received, professor_name: $professor_name, year_taken: $year_taken
    }) {
      offering_id
    }
  }
`;

export const UPDATE_OFFERING = gql`
  mutation UpdateOffering(
    $offering_id: Int!, $course_id: String!, $grade_received: String, $professor_name: String, $year_taken: String
  ) {
    update_offering_by_pk(
      pk_columns: {offering_id: $offering_id},
      _set: {course_id: $course_id, grade_received: $grade_received, professor_name: $professor_name, year_taken: $year_taken}
    ) {
      offering_id
      grade_received
      professor_name
      year_taken
    }
  }
`;

export const DELETE_OFFERING = gql`
  mutation DeleteOffering($offering_id: Int!) {
    delete_offering_by_pk(offering_id: $offering_id) {
      offering_id
    }
  }
`;

export const CREATE_COURSE = gql`
  mutation CreateCourse(
    $course_id: String!, $name: String!, $department: String!, $university_id: Int!
  ) {
    insert_course_one(object: {
      course_id: $course_id, name: $name, department: $department, university_id: $university_id
    }) {
      course_id
    }
  }
`;