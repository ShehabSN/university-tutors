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

export const GET_OFFERINGS = gql`
  query GetOfferings($search_term: String!) {
    offering(
      where: {course_id: {_ilike: $search_term}},
      order_by: {course_id: asc},
    ) {
      offering_id
      grade_received
      professor_name
      year_taken
      course {
        course_id
        name
        department
      }
      tutor {
        tutor_id
        hourly_rate
        bio
        user {
          name
        }
      }
    }
  }
`;

export const GET_STUDENT_PROFILE = gql`
  query GetStudentProfile($id: String!) {
    student_by_pk(student_id: $id) {
      major
      year
      user {
        name
        university {
          university_id
          name
        }
      }
    }
    university(order_by: {name: asc}) {
      university_id
      name
    }
  }
`;
