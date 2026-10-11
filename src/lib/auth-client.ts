import { createAuthClient } from "better-auth/react";

// no baseURL on purpose: it falls back to the current origin, so the same
// build works on localhost and on the deployed domain
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
