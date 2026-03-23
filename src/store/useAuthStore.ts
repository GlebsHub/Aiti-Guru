import { create } from "zustand";

import type { SessionQueryData } from "../api/auth/session";
import { clearStoredTokens, persistTokens } from "../api/auth/tokenStorage";

type OkSession = Extract<SessionQueryData, { status: "ok" }>;

interface AuthState {
  user: unknown | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (
    accessToken: string,
    refreshToken: string,
    userData: unknown,
    remember: boolean,
  ) => void;
  hydrateSession: (session: OkSession) => void;
  clearSession: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  hydrateSession: (session) =>
    set({
      user: session.user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    }),

  clearSession: () => {
    clearStoredTokens();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  },

  login: (accessToken, refreshToken, userData, remember) => {
    persistTokens(accessToken, refreshToken, remember);

    set({
      user: userData,
      accessToken,
      refreshToken,
    });
  },
}));

export default useAuthStore;
