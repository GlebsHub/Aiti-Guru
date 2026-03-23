import { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchRestoredSession } from "../api/auth/session";
import { queryKeys } from "../queryKeys";
import useAuthStore from "../store/useAuthStore";

export function useSessionQuery() {
  const hydrateSession = useAuthStore((s) => s.hydrateSession);
  const clearSession = useAuthStore((s) => s.clearSession);

  const query = useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: fetchRestoredSession,
    staleTime: Infinity,
    retry: false,
  });

  useLayoutEffect(() => {
    if (!query.isSuccess || !query.data) return;
    const d = query.data;
    if (d.status === "ok") {
      hydrateSession(d);
    } else {
      clearSession();
    }
  }, [query.isSuccess, query.data, hydrateSession, clearSession]);

  return query;
}
