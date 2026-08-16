import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import LoadingState from "../common/LoadingState";

function PublicRoute({ children }) {
  const { isInitializing, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  if (isInitializing) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <LoadingState message="Loading..." size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
}

export default PublicRoute;
