export type TokenScope = "local" | "session";

export function readTokenScope(): {
  accessToken: string | null;
  refreshToken: string | null;
  scope: TokenScope | null;
} {
  const aLocal = localStorage.getItem("accessToken");
  const rLocal = localStorage.getItem("refreshToken");
  if (aLocal || rLocal) {
    return {
      accessToken: aLocal,
      refreshToken: rLocal,
      scope: "local",
    };
  }
  const aSession = sessionStorage.getItem("accessToken");
  const rSession = sessionStorage.getItem("refreshToken");
  if (aSession || rSession) {
    return {
      accessToken: aSession,
      refreshToken: rSession,
      scope: "session",
    };
  }
  return { accessToken: null, refreshToken: null, scope: null };
}

export function persistTokens(
  accessToken: string,
  refreshToken: string,
  remember: boolean,
) {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("accessToken", accessToken);
  storage.setItem("refreshToken", refreshToken);
}

export function updateTokensInPlace(
  accessToken: string,
  refreshToken: string,
  scope: TokenScope,
) {
  const storage = scope === "local" ? localStorage : sessionStorage;
  storage.setItem("accessToken", accessToken);
  storage.setItem("refreshToken", refreshToken);
}

export function clearStoredTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
}
