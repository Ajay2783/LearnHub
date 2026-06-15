import "./CourseCard.css";

const COLORS = ["#6c47ff","#00c2ff","#ff6b9d","#ffa726","#26c6da"];
const getColor = (id) => COLORS[(id || 0) % COLORS.length];

export default function CourseCard({ course, isAdmin, onDelete, onEdit }) {
  const accent = getColor(course.id);

  return (
    <div className="course-card">
      <div className="course-card-accent" style={{ background: accent }} />
      <div className="course-card-body">
        <h3 className="course-card-title">{course.title}</h3>
        <div className="course-card-meta">
          <span className="course-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            {course.instructor || "Unknown"}
          </span>
          <span className="course-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {course.duration ? `${course.duration} hrs` : "—"}
          </span>
        </div>

        {isAdmin && (
          <div className="course-card-actions">
            <button
              className="card-btn card-btn--edit"
              onClick={() => onEdit(course)}
            >
              ✏️ Edit
            </button>
            <button
              className="card-btn card-btn--delete"
              onClick={() => onDelete(course.id)}
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}