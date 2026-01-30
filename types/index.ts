
export interface ApiResponse<T> {
  data: T;
}

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

export interface ProcessTextData {
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
}

export type ProcessTextResponse = ApiResponse<ProcessTextData>;


export type AudioPreset = 'chill' | 'medium' | 'aggressive' | 'podcast' | 'lecture';

export interface AudioOperation {
  type: 'trim-silence' | 'normalize' | 'compress' | 'speedup';
  params?: Record<string, any>;
}

export interface ProcessAudioData {
  file: { type: 'Buffer'; data: number[] };
  filename: string;
  metrics: {
    savedBytes: number;
    compressionRatio: string;
  };
  details: {
    duration: number;
    originalDuration: number;
  };
}

export type ProcessAudioResponse = ApiResponse<ProcessAudioData>;

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

export type UsageAnalyticsResponse = ApiResponse<UsageAnalytics>;

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: string;
  stats?: {
    totalRequests: number;
    tokensUsed: number;
    tokensLimit: number;
  };
}

export interface UpdateProfileInput {
  name: string;
}

export type UserResponse = ApiResponse<User>;
