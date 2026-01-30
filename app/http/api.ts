import ky from 'ky';

// ==========================================
// ⚙️ HTTP CLIENT CONFIGURATION
// ==========================================

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  timeout: 2147483646, // Timeout longo para processamentos pesados no servidor
  throwHttpErrors: true,
});

export const clientApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  timeout: 30000, // 30s timeout padrão para o cliente
  credentials: 'include', // Essencial para passar o cookie de sessão (Better Auth)
});

// ==========================================
// 📝 TEXT MODULE
// ==========================================

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

// ==========================================
// 🎵 AUDIO MODULE
// ==========================================

export type AudioPreset = 'chill' | 'medium' | 'aggressive' | 'podcast' | 'lecture';

export interface AudioOperation {
  type: 'trim-silence' | 'normalize' | 'compress' | 'speedup';
  params?: Record<string, any>;
}

export interface ProcessAudioResponse {
  data: {
    file: { type: 'Buffer'; data: number[] }; // Representação do Buffer serializado
    filename: string;
    metrics: {
      savedBytes: number;
      compressionRatio: string;
    };
    details: {
      duration: number;
      originalDuration: number;
    };
  };
}

export const processAudio = async (
  file: File, 
  preset?: AudioPreset, 
  operations?: AudioOperation[]
): Promise<ProcessAudioResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  // Se o preset não for 'custom' (que é uma flag de UI), envia o preset
  if (preset && preset !== 'custom' as any) {
    formData.append('preset', preset);
  }

  // Se tiver operações customizadas, envia como string JSON para o backend parsear
  if (operations && operations.length > 0) {
    formData.append('operations', JSON.stringify(operations));
  }

  return clientApi.post('audio', { 
    body: formData,
    timeout: 60000 // 1 minuto para upload de áudio
  }).json();
};

// ==========================================
// 📊 USAGE & ANALYTICS MODULE
// ==========================================

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