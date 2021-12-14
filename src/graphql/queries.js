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

export const GET_OFFERINGS = gql`
  query GetOfferings(
    $course_exp: course_bool_exp!,
    $tutor_exp: tutor_bool_exp!,
  ) {
    offering(
      where: {
        course: $course_exp,
        tutor: $tutor_exp
      },
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
          user_id
          name
        }
      }
    }
  }
`;

export const GET_STUDENT_PROFILE = gql`
  query GetStudentProfile($id: String!) {
    student_by_pk(student_id: $id) {
      student_id
      major
      year
      user {
        user_id
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
      tutor_id
      bio
      hourly_rate
      user {
        user_id
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
    university(order_by: {name: asc}) {
      university_id
      name
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

export const READ_REVEIWS = gql`
  query ReadReview($id: String!) {
    tutor_by_pk(tutor_id: $id) {
      tutor_id
      reviews(order_by: {created_at: desc}) {
        review_id
        created_at
        stars
        comment
        student {
          user {
            user_id 
            name
          }
          student_id
        }
        student_id
      }
    }
  }
`;

// export const READ_REQUEST = gql`
// query MyQuery($request_id: Int = 1) {
//   request_by_pk(request_id: $request_id) {
//     comment
//     course_id
//     created_at
//     professor_name
//     request_id
//     student_id
//     student {
//       user {
//         name
//       }
//       student_id
//     }
//   }
// }
// `;

export const READ_REQUEST = gql`
query ReadRequest{
  request(order_by: {created_at: desc}) {
    request_id
    course_id
    comment
    professor_name
    created_at
    student {
      user {
        name
        user_id
      }
      student_id
    }
    student_id
  }
}
`;
