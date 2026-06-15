import { supabase } from "../config/supabase";

// ── READ (all authenticated users) ──────────────────────────
export const getCourses = async () => {
  return await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });
};

// ── WRITE (admin only — also enforced by Supabase RLS) ──────
export const addCourse = async (course) => {
  return await supabase
    .from("courses")
    .insert([course])
    .select()
    .single();
};

export const updateCourse = async (id, course) => {
  return await supabase
    .from("courses")
    .update(course)
    .eq("id", id)
    .select()
    .single();
};

export const deleteCourse = async (id) => {
  return await supabase
    .from("courses")
    .delete()
    .eq("id", id);
};