import ky, { HTTPError } from 'ky';

// Basic API client (no auth)
export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 3000, 
  throwHttpErrors: true,
});

// Authenticated API client
export const clientApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  credentials: 'include', 
  throwHttpErrors: true,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Content-Type', 'application/json');
      }
    ],
  }
});

