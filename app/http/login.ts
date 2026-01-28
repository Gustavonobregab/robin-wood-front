'use client';

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
});

export async function loginWithGoogle() {
  return await authClient.signIn.social({
    provider: 'google',
    callbackURL: "http://localhost:3333/dashboard" 
  });
}