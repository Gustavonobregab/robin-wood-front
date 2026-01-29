import ky from 'ky';

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  timeout: 2147483646,
  throwHttpErrors: true,
});

export const clientApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  timeout: 30000,
  credentials: 'include',
});

// --- TYPE DEFINITIONS ---
export type TextPreset = 'chill' | 'medium' | 'aggressive' | 'podcast';

export interface ProcessTextInput {
  text: string;
  preset?: TextPreset;
}

export interface ProcessTextResponse {
  data: {
    data: string;
    metrics: {
      compressionRatio: string;
      savedChars: number;
    };
    details: {
      charCount: number;
      originalCharCount: number;
    };
  };
}

export const compressText = async (payload: ProcessTextInput): Promise<ProcessTextResponse> => {
  return clientApi.post('text', { json: payload }).json();
};