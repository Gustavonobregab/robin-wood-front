import { clientApi } from './api';
import type { ProcessTextInput, ProcessTextResponse } from '@/types';

export const processText = async (payload: ProcessTextInput): Promise<ProcessTextResponse> => {
  return clientApi.post('text', { json: payload }).json();
};
