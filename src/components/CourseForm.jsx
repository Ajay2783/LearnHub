import { useState, useEffect } from "react";
import "./CourseForm.css";

export default function CourseForm({ onSubmit, initial, onCancel }) {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");

  // Populate fields when editing
  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setInstructor(initial.instructor || "");
      setDuration(initial.duration || "");
    } else {
      setTitle(""); setInstructor(""); setDuration("");
    }
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, instructor, duration });
    if (!initial) { setTitle(""); setInstructor(""); setDuration(""); }
  };

  return (
    <form className="course-form" onSubmit={handleSubmit}>
      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="cf-title">Course Title *</label>
          <input
            id="cf-title"
            placeholder="e.g. Introduction to React"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-instructor">Instructor</label>
          <input
            id="cf-instructor"
            placeholder="e.g. Jane Doe"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          />
        </div>
        <div className="cf-field cf-field--sm">
          <label htmlFor="cf-duration">Duration (hrs)</label>
          <input
            id="cf-duration"
            type="number"
            min="0"
            placeholder="e.g. 10"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <div className="cf-actions">
        <button id="btn-course-submit" type="submit" className="cf-btn cf-btn--primary">
          {initial ? "💾 Save Changes" : "➕ Add Course"}
        </button>
        {onCancel && (
          <button type="button" className="cf-btn cf-btn--cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}