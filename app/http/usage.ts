import { clientApi } from './api';
import type { UsageAnalyticsResponse } from '@/types';

// ==========================================
// 📊 USAGE & ANALYTICS MODULE
// ==========================================

export const getUsageAnalytics = async (range: string = '30d'): Promise<UsageAnalyticsResponse> => {
  return clientApi.get(`usage/analytics?range=${range}`).json();
};
