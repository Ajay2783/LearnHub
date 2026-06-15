import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  role,
  userRole
}) {

  if (role !== userRole)
    return <Navigate to="/" />;

  return children;
}