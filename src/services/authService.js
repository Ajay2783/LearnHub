import { supabase } from "../config/supabase";

export const signup = async (email, password) => {
  return await supabase.auth.signUp({ email, password });
};

export const login = async (
  email,
  password
) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const logout = async () => {
  return await supabase.auth.signOut();
};

export const getSession = async () => {
  return await supabase.auth.getSession();
};