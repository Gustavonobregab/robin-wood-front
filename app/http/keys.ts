import { clientApi } from './api';
import type { 
  ApiKey, 
  CreateKeyInput, 
  KeysListResponse, 
  KeyResponse, 
  CreateKeyResponse 
} from '@/types';


export const getApiKeys = async (): Promise<KeysListResponse> => {
  return clientApi.get('keys').json();
};


export const createApiKey = async (data: CreateKeyInput): Promise<CreateKeyResponse> => {
  const response = await clientApi.post('keys', { json: data }).json();
  console.log(response);
  return response as CreateKeyResponse;
};


export const getApiKeyById = async (id: string): Promise<KeyResponse> => {
  return clientApi.get(`keys/${id}`).json();
};


export const deleteApiKey = async (id: string): Promise<void> => {
  await clientApi.delete(`keys/${id}`).json();
};
