import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import LoadingState from "../common/LoadingState";

function ProtectedRoute({ allowedRoles = [], children }) {
  const { isInitializing, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );
  const location = useLocation();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <LoadingState message="Restoring session..." size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
