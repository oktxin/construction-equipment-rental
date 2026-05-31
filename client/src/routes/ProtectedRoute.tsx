import { Navigate, Outlet, useLocation } from "react-router-dom";

import { selectAuth, selectIsAuthenticated } from "../features/auth/authSlice";
import { useAppSelector } from "../shared/hooks/redux";
import { LoadingSkeleton } from "../shared/ui";

export function ProtectedRoute() {
  const auth = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!auth.isInitialized || auth.isLoading) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <LoadingSkeleton lines={5} className="min-h-[320px]" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
