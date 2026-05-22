import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

// Use NEXT_PUBLIC_BETTER_AUTH_URL so the value is available client-side in Next.js
const baseURL = process.env.BETTER_AUTH_URL

export const authClient = createAuthClient({
    baseURL,
    plugins: [jwtClient()],
})

export const getAuthToken = async () => {
  const tokenResponse = await authClient.token();
  const tokenObject = tokenResponse?.data ?? tokenResponse;
  return tokenObject?.token ?? tokenObject;
};

// Export helpers from the configured client
export const { signIn, signUp, useSession } = authClient