/**
 * Node modules
 */
import { Navigate, Outlet } from "react-router-dom";

/**
 * Hooks
 */
import { useAuth } from "@/hooks/useAuth";

/**
 * Pages
 */
import LoadingPage from "@/pages/LoadingPage";

const AuthRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage />
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoute;
