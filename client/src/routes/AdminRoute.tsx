import { Navigate, Outlet, useLocation } from "react-router-dom";

import { selectAuth, selectIsAdmin } from "../features/auth/authSlice";
import { useAppSelector } from "../shared/hooks/redux";
import { LoadingSkeleton } from "../shared/ui";

export function AdminRoute() {
  const auth = useAppSelector(selectAuth);
  const isAdmin = useAppSelector(selectIsAdmin);
  const location = useLocation();

  if (!auth.isInitialized || auth.isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <LoadingSkeleton tone="admin" lines={6} className="min-h-[320px]" />
      </div>
    );
  }

  if (!auth.token || !auth.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
