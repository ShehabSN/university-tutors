import * as React from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Auth";
import StudentDashboard from "./student/StudentDashboard";
import TutorDashboard from "./tutor/TutorDashboard";

export default function Dashboard({ page }) {
  const { userType } = React.useContext(AuthContext);
  return (
    <>
      <Helmet>
        <title>{page}</title>
      </Helmet>
      {userType.current === "student" ? (
        <StudentDashboard page={page} />
      ) : (
        <TutorDashboard page={page} />
      )}
    </>
  );
}
