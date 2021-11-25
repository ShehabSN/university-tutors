import * as React from "react";
import StudentDashboard from "./student/StudentDashboard";
import TutorDashboard from "./tutor/TutorDashboard";

export default function Dashboard({ role, page }) {
  return role === "student" ? (
    <StudentDashboard page={page} />
  ) : (
    <TutorDashboard page={page} />
  );
}
