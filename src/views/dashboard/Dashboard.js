import * as React from "react";
import StudentDashboard from "./student/StudentDashboard";
import TutorDashboard from "./tutor/TutorDashboard";
import { AuthContext } from "../../Auth";

export default function Dashboard({ page }) {
  const { userType } = React.useContext(AuthContext);
  return userType.current === "student" ? (
    <StudentDashboard page={page} />
  ) : (
    <TutorDashboard page={page} />
  );
}
