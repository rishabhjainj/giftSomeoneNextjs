import { createAuthProvider } from "react-token-auth";

export const [useAuth, authFetch, login, logout] = createAuthProvider<{
  token: string;
}>({
  accessTokenKey: "token",
  onUpdateToken: (response) =>
    fetch("/login/", {
      method: "POST",
      body: response.token,
    }).then((r) => r.json()),
});
