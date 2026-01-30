'use client';

import Script from 'next/script';
import { useState } from 'react';
import useSWR from 'swr'; // Instale: bun add swr
import { getUsageAnalytics } from '../../../http/api';
import { toast } from 'sonner';

const timeRanges = [
  { id: '7d', name: 'Last 7 days' },
  { id: '30d', name: 'Last 30 days' },
  { id: '90d', name: 'Last 90 days' },
  { id: '1y', name: 'Last year' },
];

export default function UsagePage() {
  const [selectedRange, setSelectedRange] = useState(timeRanges[1]);

  // Fetch automático com SWR quando o range muda
  const { data: apiResponse, isLoading } = useSWR(
    `/usage/analytics?range=${selectedRange.id}`,
    () => getUsageAnalytics(selectedRange.id)
  );

  const analytics = apiResponse?.data;

  // Helpers para cor do badge
  const getBadgeColor = (type: string) => {
    const map: any = { Text: 'bg-green-500', Audio: 'bg-red-500', Image: 'bg-amber-500', Batch: 'bg-blue-500' };
    return map[type] || 'bg-slate-500';
  };

  return (
    <>
      <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" strategy="afterInteractive" />

      <div className="max-w-6xl space-y-6 animate-fade">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-manrope text-sm text-slate-500 mb-1">Analytics</p>
            <h1 className="font-jakarta font-semibold text-4xl tracking-tight text-slate-900">Usage</h1>
          </div>
          <div className="flex items-center gap-0 rounded-full border border-neutral-200 bg-white p-1">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setSelectedRange(range)}
                className={`px-4 py-1.5 rounded-full font-manrope text-sm font-medium transition-colors ${
                  selectedRange.id === range.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {range.name}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center text-slate-400">Loading analytics...</div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">Total Requests</h3>
                <div className="font-jakarta font-bold text-2xl text-slate-900">
                  {analytics?.stats.totalRequests.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">Tokens Saved</h3>
                <div className="font-jakarta font-bold text-2xl text-emerald-600">
                  {analytics?.stats.tokensSaved.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">Tokens Used (Total)</h3>
                <div className="font-jakarta font-bold text-2xl text-slate-900">
                  {analytics?.stats.tokensUsed.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Usage Chart */}
            <div>
              <h2 className="font-jakarta font-semibold text-xl text-slate-900 mb-3">Request Volume</h2>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 overflow-hidden">
                <div className="h-64 relative flex items-end justify-between gap-1">
                    {analytics?.chart.length === 0 && <p className="absolute inset-0 m-auto w-fit h-fit text-slate-400">No data for this period</p>}
                    
                    {/* Barras simples CSS para o gráfico (mais robusto que SVG manual sem lib) */}
                    {analytics?.chart.map((point, i) => {
                        const max = Math.max(...analytics.chart.map(c => c.requests), 1);
                        const height = (point.requests / max) * 100;
                        return (
                            <div key={i} className="flex-1 flex flex-col justify-end items-center group h-full">
                                <div 
                                    className="w-full max-w-[20px] bg-emerald-100 group-hover:bg-emerald-500 transition-all rounded-t-sm relative" 
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                        {point.requests} reqs
                                    </div>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-2 -rotate-45 origin-left truncate w-full text-center">{point.date}</span>
                            </div>
                        )
                    })}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Compression Breakdown */}
                <div className="lg:col-span-1">
                    <h2 className="font-jakarta font-semibold text-xl text-slate-900 mb-3">Breakdown</h2>
                    <div className="bg-white rounded-2xl border border-neutral-200 p-6 h-fit">
                        {analytics?.breakdown.length === 0 ? (
                            <p className="text-sm text-slate-500">No usage data available.</p>
                        ) : (
                            <div className="space-y-4">
                            {analytics?.breakdown.map((item) => (
                                <div key={item.type}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${getBadgeColor(item.type)}`}></div>
                                    <span className="font-manrope text-sm font-medium text-slate-900">{item.type}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                    <span className="font-manrope text-sm text-slate-500">{item.count}</span>
                                    <span className="font-manrope text-sm font-semibold text-slate-900">{item.percentage}%</span>
                                    </div>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                    className={`h-full ${getBadgeColor(item.type)} rounded-full transition-all`}
                                    style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Requests */}
                <div className="lg:col-span-2">
                    <h2 className="font-jakarta font-semibold text-xl text-slate-900 mb-3">Recent Activity</h2>
                    <div className="bg-white rounded-2xl border border-neutral-200 p-2 h-fit">
                        <div className="space-y-1">
                            {analytics?.recent.length === 0 ? (
                                <div className="p-8 text-center text-slate-500 text-sm">No recent requests found.</div>
                            ) : analytics?.recent.map((request) => (
                            <div key={request.id} className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-manrope text-sm font-bold text-slate-900">{request.type}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide font-manrope ${
                                        request.status === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {request.status}
                                    </span>
                                </div>
                                <p className="font-manrope text-xs text-slate-500 truncate">{request.size} • {request.latency}</p>
                                </div>
                                <span className="font-manrope text-xs text-slate-400 whitespace-nowrap">{request.timestamp}</span>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}