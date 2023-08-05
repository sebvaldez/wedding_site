import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return children;
  } else {
    // Redirect to the main page or login page
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
