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

export type TextOperationType = 'trim' | 'shorten' | 'minify' | 'compress' | 'json-to-toon';

export interface TextOperation {
  type: TextOperationType;
  params?: Record<string, any>;
}

export type TextPreset = 'chill' | 'medium' | 'aggressive' | 'podcast';

export interface ProcessTextInput {
  text: string;
  operations?: TextOperation[];
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
    operations: string[];
  };
}

export const processText = async (payload: ProcessTextInput): Promise<ProcessTextResponse> => {
  return clientApi.post('text', { json: payload }).json();
};

export type TimeRange = '7d' | '30d' | '90d' | '1y';

export interface UsageAnalytics {
  stats: {
    totalRequests: number;
    tokensSaved: number;
    tokensUsed: number;
  };
  chart: {
    date: string;
    requests: number;
  }[];
  breakdown: {
    type: string;
    count: number;
    percentage: number;
  }[];
  recent: {
    id: string;
    type: string;
    status: string;
    size: string;
    latency: string;
    timestamp: string;
  }[];
}

export const getUsageAnalytics = async (range: string = '30d'): Promise<{ data: UsageAnalytics }> => {
  return clientApi.get(`usage/analytics?range=${range}`).json();
};