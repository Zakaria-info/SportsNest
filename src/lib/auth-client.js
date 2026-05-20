import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

// Use NEXT_PUBLIC_BETTER_AUTH_URL so the value is available client-side in Next.js
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
    plugins: [jwtClient()],
})

// Export helpers from the configured client
export const { signIn, signUp, useSession } = authClient