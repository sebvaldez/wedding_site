import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    // Optionally, return a loading spinner or message
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return children;
  } else {
    // Redirect to the main page or login page
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
