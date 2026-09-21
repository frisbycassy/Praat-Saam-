import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap any page that should only be visible once "logged in".
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/aanmeld" replace />;
  return children;
}

export default ProtectedRoute;
