import {
  createContext,
  useContext,
  useState
} from "react";

export const AuthContext =
  createContext();

export const useAuth = () =>
  useContext(AuthContext);