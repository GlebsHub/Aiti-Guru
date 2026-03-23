const AUTH_LOGIN = "https://dummyjson.com/auth/login";

export type LoginCredentials = {
  username: string;
  password: string;
  remember: boolean;
};

export type LoginSuccessPayload = {
  accessToken: string;
  refreshToken: string;
  [key: string]: unknown;
};

export class LoginFailedError extends Error {
  readonly name = "LoginFailedError";
  readonly apiBody: unknown;
  readonly credentials: LoginCredentials;

  constructor(apiBody: unknown, credentials: LoginCredentials) {
    const msg =
      typeof apiBody === "object" &&
      apiBody !== null &&
      "message" in apiBody &&
      typeof (apiBody as { message: unknown }).message === "string"
        ? (apiBody as { message: string }).message
        : "Ошибка авторизации";
    super(msg);
    this.apiBody = apiBody;
    this.credentials = credentials;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  getFieldErrors(): Partial<Record<"login" | "password", string>> {
    const apiBody = this.apiBody as { message?: string };
    const message = apiBody.message || "Ошибка авторизации";
    const lowerMsg = message.toLowerCase();
    const { username: login, password } = this.credentials;

    if (lowerMsg.includes("password")) {
      return { password: "Неверный пароль" };
    }
    if (lowerMsg.includes("username") || lowerMsg.includes("login")) {
      return { login: "Неверный логин" };
    }
    if (login === "emilys" && password !== "emilyspass") {
      return { password: "Неверный пароль" };
    }
    return {
      login: "Неверный логин",
      password: "Неверный пароль",
    };
  }
}

export async function loginRequest(
  credentials: LoginCredentials,
): Promise<LoginSuccessPayload> {
  const response = await fetch(AUTH_LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 30,
    }),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new LoginFailedError(resData, credentials);
  }

  return resData as LoginSuccessPayload;
}
