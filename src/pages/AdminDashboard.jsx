import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CourseForm from "../components/CourseForm";
import CourseCard from "../components/CourseCard";
import { getCourses, addCourse, deleteCourse, updateCourse } from "../services/courseService";
import "./Dashboard.css";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => { loadCourses(); }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadCourses = async () => {
    setLoading(true);
    const { data, error } = await getCourses();
    if (error) showToast(error.message, "error");
    setCourses(data ?? []);
    setLoading(false);
  };

  const handleAdd = async (course) => {
    const { error } = await addCourse(course);
    if (error) { showToast(error.message, "error"); return; }
    showToast("Course added!");
    loadCourses();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    const { error } = await deleteCourse(id);
    if (error) { showToast(error.message, "error"); return; }
    showToast("Course deleted.");
    loadCourses();
  };

  const handleEdit = (course) => setEditingCourse(course);

  const handleUpdate = async (updated) => {
    const { error } = await updateCourse(editingCourse.id, updated);
    if (error) { showToast(error.message, "error"); return; }
    showToast("Course updated!");
    setEditingCourse(null);
    loadCourses();
  };

  return (
    <div className="dashboard-bg">
      <Navbar role="admin" />

      {/* Toast */}
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.type === "success" ? "✓" : "!"} {toast.msg}
        </div>
      )}

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-sub">Full CRUD control over the course catalogue</p>
        </div>

        {/* Role badge */}
        <div className="role-badge role-badge--admin">🔑 Admin Access</div>

        {/* Add / Edit form */}
        <section className="admin-form-section">
          <h2 className="section-title">
            {editingCourse ? "✏️ Edit Course" : "➕ Add New Course"}
          </h2>
          <CourseForm
            onSubmit={editingCourse ? handleUpdate : handleAdd}
            initial={editingCourse}
            onCancel={editingCourse ? () => setEditingCourse(null) : null}
          />
        </section>

        {/* Course list */}
        <section>
          <h2 className="section-title">All Courses ({courses.length})</h2>
          {loading ? (
            <div className="dashboard-loading">
              <span className="spinner" />
              <p>Loading…</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="dashboard-empty">
              <div className="empty-icon">📋</div>
              <h3>No courses yet</h3>
              <p>Use the form above to add your first course.</p>
            </div>
          ) : (
            <div className="course-grid">
              {courses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isAdmin={true}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}