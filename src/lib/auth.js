import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";


const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("sportsnest");

const authBaseURL = process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
const authTrustedOrigins = [
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  process.env.PUBLIC_BETTER_AUTH_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
].filter(Boolean);

const normalizeOrigin = (url) => {
  try {
    return new URL(url).origin;
  } catch {
    return undefined;
  }
};

const trustedOriginValues = authTrustedOrigins
  .map(normalizeOrigin)
  .filter(Boolean);

export const auth = betterAuth({
  baseURL: authBaseURL,
  trustedOrigins: async (request) => {
    const origins = new Set(trustedOriginValues);
    if (request?.url) {
      try {
        origins.add(new URL(request.url).origin);
      } catch {}
    }
    return Array.from(origins);
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: {
   enabled: true,
  },
  session: {
    cookieCache:{
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 15, // 15 days
    }
  },
  plugins: [
    jwt()
  ]
});