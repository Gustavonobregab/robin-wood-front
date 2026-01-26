'use client';

import { clientApi } from './api';
import { createAuthClient } from 'better-auth/client';


const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

export async function loginWithGoogle(appSlug: string) {
    return await authClient.signIn.social({
      provider: 'google',
      requestSignUp: true,
    })
  }