'use client';

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
});

export async function loginWithGoogle() {
  return await authClient.signIn.social({
    provider: 'google',
    callbackURL: `${process.env.NEXT_PUBLIC_CALLBACK_URL}/dashboard` 
  });
}