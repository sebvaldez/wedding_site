import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const Admin = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [loginWithRedirect, isAuthenticated, isLoading]);

  if (isAuthenticated) {
    // Redirect to the dashboard if the user is authenticated
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      {/* Conditional rendering based on isLoading */}
      {isLoading ? 'Loading authentication state...' : 'Redirecting to login...'}
    </div>
  );
};

export default Admin;
