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

export const GET_UNIVERSITIES = gql`
  query GetUniversities {
    university(order_by: {name: asc}) {
      university_id
      name
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    course(distinct_on: department, order_by: {department: asc}) {
      department
    }
  }
`;

export const GET_OFFERINGS = gql`
  query GetOfferings($department: String!) {
    offering(
      where: {course: {department: {_ilike: $department}}},
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

export const GET_TUTOR_PROFILE = gql`
  query GetTutorProfile($id: String!) {
    tutor_by_pk(tutor_id: $id) {
      bio
      hourly_rate
      user {
        name
        university {
          university_id
          name
        }
      }
      offerings(order_by: {course_id: asc}) {
        offering_id
        grade_received
        professor_name
        year_taken
        course {
          course_id
          name
          department
        }
      }
    }
  }
`;

export const GET_COURSES = gql`
  query GetCourses {
    course(order_by: {course_id: asc}) {
      course_id
      name
      department
    }
  }
`;
