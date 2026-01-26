'use client';

import Script from 'next/script';
import { useState } from 'react';

const timeRanges = [
  { id: '7d', name: 'Last 7 days' },
  { id: '30d', name: 'Last 30 days' },
  { id: '90d', name: 'Last 90 days' },
  { id: '1y', name: 'Last year' },
];

const usageStats = {
  total: { value: '1,247,832', label: 'Total Requests', change: '+12.5%' },
  today: { value: '4,523', label: 'Today', change: '+8.2%' },
  thisMonth: { value: '89,456', label: 'This Month', change: '+15.3%' },
  avgLatency: { value: '42ms', label: 'Avg. Latency', change: '-5.1%' },
};

const compressionBreakdown = [
  { type: 'Text', requests: 456789, percentage: 36.6, color: 'bg-green-500' },
  { type: 'Image', requests: 389234, percentage: 31.2, color: 'bg-amber-500' },
  { type: 'Audio', requests: 234567, percentage: 18.8, color: 'bg-red-500' },
  { type: 'Batch', requests: 167242, percentage: 13.4, color: 'bg-lime-500' },
];

const recentRequests = [
  {
    id: 'req_1',
    type: 'Text',
    endpoint: '/api/v1/compress/text',
    status: 'success',
    size: '2.4KB → 1.1KB',
    latency: '38ms',
    timestamp: '2 minutes ago',
  },
  {
    id: 'req_2',
    type: 'Image',
    endpoint: '/api/v1/compress/image',
    status: 'success',
    size: '1.2MB → 340KB',
    latency: '125ms',
    timestamp: '5 minutes ago',
  },
  {
    id: 'req_3',
    type: 'Audio',
    endpoint: '/api/v1/compress/audio',
    status: 'success',
    size: '45MB → 18MB',
    latency: '892ms',
    timestamp: '12 minutes ago',
  },
  {
    id: 'req_4',
    type: 'Text',
    endpoint: '/api/v1/compress/text',
    status: 'error',
    size: 'N/A',
    latency: 'N/A',
    timestamp: '18 minutes ago',
  },
  {
    id: 'req_5',
    type: 'Batch',
    endpoint: '/api/v1/compress/batch',
    status: 'success',
    size: '12 files processed',
    latency: '2.3s',
    timestamp: '1 hour ago',
  },
];

export default function UsagePage() {
  const [selectedRange, setSelectedRange] = useState(timeRanges[1]);

  return (
    <>
      <Script
        src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
        strategy="afterInteractive"
      />

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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(usageStats).map(([key, stat]) => (
            <div key={key} className="p-4 rounded-2xl bg-white border border-neutral-200">
              <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">{stat.label}</h3>
              <div className="flex items-baseline gap-2">
                <div className="font-jakarta font-bold text-2xl text-slate-900">{stat.value}</div>
                <span
                  className={`font-manrope text-xs font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Chart */}
        <div>
          <h2 className="font-jakarta font-semibold text-xl text-slate-900 mb-3">Request Volume</h2>
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            {/* SVG Line Chart */}
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#16a34a" />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 50}
                    x2="800"
                    y2={i * 50}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                
                {/* Smooth curved line path using cubic bezier */}
                <path
                  d="M 0,160 C 80,140 160,120 240,100 C 320,85 400,75 480,70 C 560,65 640,60 720,55 C 760,52 800,50 800,50"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                
                {/* Area fill under curve */}
                <path
                  d="M 0,160 C 80,140 160,120 240,100 C 320,85 400,75 480,70 C 560,65 640,60 720,55 C 760,52 800,50 800,50 L 800,200 L 0,200 Z"
                  fill="url(#gradient)"
                  opacity="0.15"
                />
                
                {/* Data points */}
                {[
                  { x: 0, y: 160 },
                  { x: 240, y: 100 },
                  { x: 480, y: 70 },
                  { x: 720, y: 55 },
                  { x: 800, y: 50 },
                ].map((point, i) => (
                  <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#16a34a"
                    className="hover:r-6 transition-all"
                  />
                ))}
              </svg>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                <span className="font-manrope text-xs text-slate-500">Requests</span>
              </div>
              <span className="font-manrope text-xs text-slate-400">Last 30 days</span>
            </div>
          </div>
        </div>

        {/* Compression Breakdown */}
        <div>
          <h2 className="font-jakarta font-semibold text-xl text-slate-900 mb-3">By Compression Type</h2>
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <div className="space-y-4">
              {compressionBreakdown.map((item) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="font-manrope text-sm font-medium text-slate-900">{item.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-manrope text-sm text-slate-500">
                        {item.requests.toLocaleString()}
                      </span>
                      <span className="font-manrope text-sm font-semibold text-slate-900">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Requests */}
        <div>
          <h2 className="font-jakarta font-semibold text-xl text-slate-900 mb-3">Recent Requests</h2>
          <div className="space-y-1">
            {recentRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-manrope text-sm font-medium text-slate-900">{request.type}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold font-manrope ${
                        request.status === 'success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                  <p className="font-manrope text-xs text-slate-500 truncate">{request.endpoint}</p>
                  <p className="font-manrope text-xs text-slate-400">
                    {request.size} • {request.latency}
                  </p>
                </div>
                <span className="font-manrope text-xs text-slate-400 whitespace-nowrap">
                  {request.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
