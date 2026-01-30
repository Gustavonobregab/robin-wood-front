import { clientApi } from './api';
import type { UpdateProfileInput, UserResponse } from '@/types';

// ==========================================
// 👤 PROFILE MODULE
// ==========================================

export const updateProfile = async (data: UpdateProfileInput): Promise<UserResponse> => {
  return clientApi.patch('users/me', { json: data }).json();
};
