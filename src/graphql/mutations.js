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
    $id: String!
    $name: String!
    $university_id: Int
    $major: String
    $year: Int
  ) {
    update_student_by_pk(
      pk_columns: { student_id: $id }
      _set: { major: $major, year: $year }
    ) {
      student_id
      major
      year
    }
    update_user_by_pk(
      pk_columns: { user_id: $id }
      _set: { name: $name, university_id: $university_id }
    ) {
      user_id
      name
      university_id
      university {
        university_id
        name
      }
    }
  }
`;

export const UPDATE_TUTOR = gql`
  mutation UpdateTutor(
    $id: String!
    $name: String!
    $university_id: Int!
    $hourly_rate: numeric
    $bio: String
  ) {
    update_tutor_by_pk(
      pk_columns: { tutor_id: $id }
      _set: { hourly_rate: $hourly_rate, bio: $bio }
    ) {
      tutor_id
      hourly_rate
      bio
    }
    update_user_by_pk(
      pk_columns: { user_id: $id }
      _set: { name: $name, university_id: $university_id }
    ) {
      user_id
      name
      university_id
      university {
        university_id
        name
      }
    }
  }
`;

export const CREATE_OFFERING = gql`
  mutation CreateOffering(
    $tutor_id: String!
    $course_id: String!
    $grade_received: String
    $professor_name: String
    $year_taken: String
  ) {
    insert_offering_one(
      object: {
        tutor_id: $tutor_id
        course_id: $course_id
        grade_received: $grade_received
        professor_name: $professor_name
        year_taken: $year_taken
      }
    ) {
      offering_id
    }
  }
`;

export const UPDATE_OFFERING = gql`
  mutation UpdateOffering(
    $offering_id: Int!
    $course_id: String!
    $grade_received: String
    $professor_name: String
    $year_taken: String
  ) {
    update_offering_by_pk(
      pk_columns: { offering_id: $offering_id }
      _set: {
        course_id: $course_id
        grade_received: $grade_received
        professor_name: $professor_name
        year_taken: $year_taken
      }
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
    $course_id: String!
    $name: String!
    $department: String!
    $university_id: Int!
  ) {
    insert_course_one(
      object: {
        course_id: $course_id
        name: $name
        department: $department
        university_id: $university_id
      }
    ) {
      course_id
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $stars: numeric!
    $comment: String!
    $student_id: String!
    $tutor_id: String!
  ) {
    insert_review_one(
      object: {
        comment: $comment
        stars: $stars
        student_id: $student_id
        tutor_id: $tutor_id
      }
    ) {
      stars
      review_id
      created_at
      comment
      student_id
      tutor_id
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($review_id: Int!, $comment: String!, $stars: numeric!) {
    update_review_by_pk(
      pk_columns: { review_id: $review_id }
      _set: { comment: $comment, stars: $stars }
    ) {
      review_id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($review_id: Int!) {
    delete_review_by_pk(review_id: $review_id) {
      review_id
    }
  }
`;

export const CREATE_REQUEST = gql`
  mutation GetOfferings(
    $student_id: String!
    $course_id: String!
    $professor_name: String
    $comment: String
  ) {
    insert_request_one(
      object: {
        student_id: $student_id
        course_id: $course_id
        professor_name: $professor_name
        comment: $comment
      }
    ) {
      request_id
      student_id
      course_id
      professor_name
      comment
      created_at
    }
  }
`;

export const UPDATE_REQUEST = gql`
  mutation UpdateRequest(
    $request_id: Int!
    $professor_name: String!
    $comment: String
  ) {
    update_request_by_pk(
      pk_columns: { request_id: $request_id }
      _set: { professor_name: $professor_name, comment: $comment }
    ) {
      request_id
      professor_name
      comment
    }
  }
`;

export const DELETE_REQUEST = gql`
  mutation DeleteRequest($request_id: Int!) {
    delete_request_by_pk(request_id: $request_id) {
      request_id
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $location: String!
    $offering_id: Int!
    $student_id: String!
    $student_comment: String
  ) {
    insert_appointment_one(
      object: {
        location: $location
        offering_id: $offering_id
        student_id: $student_id
        student_comment: $student_comment
      }
    ) {
      appointment_id
    }
  }
`;

export const UPDATE_HOURS = gql`
  mutation UpdateHours($where: hours_bool_exp!, $appointment_id: Int!) {
    update_hours(where: $where, _set: { appointment_id: $appointment_id }) {
      returning {
        hours_id
      }
    }
  }
`;

export const UPDATE_APPOINTMENT = gql`
  mutation MyMutation(
    $location: String!
    $student_comment: String
    $appointment_id: Int!
  ) {
    update_appointment_by_pk(
      pk_columns: { appointment_id: $appointment_id }
      _set: { location: $location, student_comment: $student_comment }
    ) {
      appointment_id
      student_comment
      location
    }
  }
`;
