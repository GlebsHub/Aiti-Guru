import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { loginRequest } from "../api/auth/login";
import { readTokenScope } from "../api/auth/tokenStorage";
import { queryKeys } from "../queryKeys";
import useAuthStore from "../store/useAuthStore";

export function useLoginMutation() {
  const loginAuth = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data, variables) => {
      const { accessToken, refreshToken, ...user } = data;
      loginAuth(accessToken, refreshToken, user, variables.remember);

      const { scope } = readTokenScope();
      if (scope) {
        queryClient.setQueryData(queryKeys.auth.session, {
          status: "ok",
          user,
          accessToken,
          refreshToken,
          scope,
        });
      }

      navigate("/");
    },
  });
}
