import { type ReactNode } from "react";
import { Navigate } from "react-router";

import { CircularProgress } from "@mui/material";

import { useSessionQuery } from "../../hooks/useSessionQuery";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isPending, data } = useSessionQuery();

  if (isPending) {
    return <CircularProgress />;
  }

  if (data?.status !== "ok") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
