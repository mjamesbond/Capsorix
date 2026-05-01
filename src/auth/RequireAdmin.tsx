import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import SubpageSkeleton from "@/components/nexora/SubpageSkeleton";

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <SubpageSkeleton />;
  if (!user) {
    // Pass the intended destination so Auth can bounce back after login.
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }
  if (!isAdmin) {
    // Authenticated but not authorized — keep them out of /admin entirely.
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default RequireAdmin;
