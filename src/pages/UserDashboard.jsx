import { useEffect, useState } from "react";
import { getCourses } from "../services/courseService";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import "./Dashboard.css";

export default function UserDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadCourses(); }, []);

  const loadCourses = async () => {
    setLoading(true);
    const { data } = await getCourses();
    setCourses(data ?? []);
    setLoading(false);
  };

  return (
    <div className="dashboard-bg">
      <Navbar role="user" />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Available Courses</h1>
          <p className="dashboard-sub">Browse and explore our course catalogue</p>
        </div>

        {/* Role badge */}
        <div className="role-badge role-badge--user">👤 Student Access</div>

        {loading ? (
          <div className="dashboard-loading">
            <span className="spinner" />
            <p>Loading courses…</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="dashboard-empty">
            <div className="empty-icon">📚</div>
            <h3>No courses yet</h3>
            <p>Check back soon — new content is on its way!</p>
          </div>
        ) : (
          <div className="course-grid">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                isAdmin={false}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}