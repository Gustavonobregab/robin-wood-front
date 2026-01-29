import useSWR from 'swr';
import { authClient } from '../http/auth-client';

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to fetch data');
  }
  return res.json();
};

export function useProfile() {
  const { data: session } = authClient.useSession();
  
  const { data: apiData, error, mutate, isLoading } = useSWR(
    session?.user ? 'http://localhost:3000/users/me' : null,
    fetcher
  );

  return {
    user: apiData?.data,
    isLoading,
    isError: error,
    mutate,
  };
}