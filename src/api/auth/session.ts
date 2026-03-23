import {
  clearStoredTokens,
  readTokenScope,
  updateTokensInPlace,
  type TokenScope,
} from "./tokenStorage";

const AUTH_ME = "https://dummyjson.com/auth/me";
const AUTH_REFRESH = "https://dummyjson.com/auth/refresh";

export type SessionQueryData =
  | {
      status: "ok";
      user: unknown;
      accessToken: string;
      refreshToken: string | null;
      scope: TokenScope;
    }
  | { status: "unauthenticated" };

async function fetchMe(accessToken: string) {
  return fetch(AUTH_ME, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

async function fetchRefresh(refreshToken: string) {
  return fetch(AUTH_REFRESH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
  });
}

/** Восстанавливает сессию по токенам в storage; без сетевых вызовов, если токенов нет. */
export async function fetchRestoredSession(): Promise<SessionQueryData> {
  let { accessToken, refreshToken, scope } = readTokenScope();

  const fail = (): SessionQueryData => {
    clearStoredTokens();
    return { status: "unauthenticated" };
  };

  const tryRefresh = async (): Promise<{
    accessToken: string;
    refreshToken: string;
  } | null> => {
    if (!refreshToken) return null;
    const res = await fetchRefresh(refreshToken);
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.accessToken || !data.refreshToken) return null;
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  };

  if (!accessToken && refreshToken && scope) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      accessToken = refreshed.accessToken;
      refreshToken = refreshed.refreshToken;
      updateTokensInPlace(accessToken, refreshToken, scope);
    }
  }

  if (!accessToken) {
    return fail();
  }

  let meRes = await fetchMe(accessToken);

  if (meRes.status === 401 && refreshToken && scope) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      accessToken = refreshed.accessToken;
      refreshToken = refreshed.refreshToken;
      updateTokensInPlace(accessToken, refreshToken, scope);
      meRes = await fetchMe(accessToken);
    }
  }

  if (!meRes.ok) {
    return fail();
  }

  const user = await meRes.json().catch(() => null);
  if (!user || typeof user !== "object" || (user as { message?: string }).message) {
    return fail();
  }

  if (!scope) {
    return fail();
  }

  return {
    status: "ok",
    user,
    accessToken,
    refreshToken,
    scope,
  };
}
