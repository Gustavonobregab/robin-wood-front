import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  TrendingUp,
} from "lucide-react"

const stats = [
  {
    title: "Total Requests",
    value: "1.2M",
    change: "+18.2%",
    trend: "up",
    icon: Activity,
    description: "vs. last month",
  },
  {
    title: "Success Rate",
    value: "99.8%",
    change: "+0.3%",
    trend: "up",
    icon: CheckCircle2,
    description: "vs. last month",
  },
  {
    title: "Avg Latency",
    value: "45ms",
    change: "-12ms",
    trend: "up",
    icon: Zap,
    description: "vs. last month",
  },
  {
    title: "Error Rate",
    value: "0.2%",
    change: "-0.1%",
    trend: "up",
    icon: AlertTriangle,
    description: "vs. last month",
  },
]

const recentActivity = [
  { endpoint: "/api/v1/keys", method: "POST", status: 201, latency: "32ms", time: "2 min ago" },
  { endpoint: "/api/v1/usage", method: "GET", status: 200, latency: "18ms", time: "5 min ago" },
  { endpoint: "/api/v1/organizations", method: "GET", status: 200, latency: "24ms", time: "8 min ago" },
  { endpoint: "/api/v1/billing/invoice", method: "GET", status: 200, latency: "56ms", time: "12 min ago" },
  { endpoint: "/api/v1/keys/verify", method: "POST", status: 401, latency: "12ms", time: "15 min ago" },
]

const usageByEndpoint = [
  { endpoint: "/api/v1/keys/verify", requests: 456000, percentage: 38 },
  { endpoint: "/api/v1/usage", requests: 312000, percentage: 26 },
  { endpoint: "/api/v1/keys", requests: 198000, percentage: 16.5 },
  { endpoint: "/api/v1/organizations", requests: 156000, percentage: 13 },
  { endpoint: "/api/v1/billing", requests: 78000, percentage: 6.5 },
]

const dailyUsage = [
  { day: "Mon", requests: 180000 },
  { day: "Tue", requests: 195000 },
  { day: "Wed", requests: 210000 },
  { day: "Thu", requests: 178000 },
  { day: "Fri", requests: 225000 },
  { day: "Sat", requests: 145000 },
  { day: "Sun", requests: 132000 },
]

const maxRequests = Math.max(...dailyUsage.map(d => d.requests))

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-serif text-ink">Dashboard</h1>
        <p className="text-ink/80 mt-1 font-sans">
          Monitor your API usage and performance metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const useRed = index % 2 === 1; // Alternate colors: index 1 and 3 use red
          const iconBg = useRed ? 'bg-robin-red-600' : 'bg-robin-neon';
          const iconBgStyle = useRed ? { backgroundColor: '#DC2626' } : { backgroundColor: '#00C16C' };
          const trendColor = useRed ? 'text-robin-red-600' : 'text-robin-neon';
          const trendColorStyle = useRed ? { color: '#DC2626' } : { color: '#00C16C' };
          
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-ink">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-none border-2 border-ink ${iconBg} p-2`} style={iconBgStyle}>
                  <stat.icon className="h-4 w-4 text-parchment" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-serif text-ink">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className={`h-4 w-4 ${trendColor}`} style={trendColorStyle} />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-robin-red-600" />
                  )}
                  <span className={`${trendColor} font-medium text-sm font-mono`} style={trendColorStyle}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-ink/70 font-mono">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Weekly Usage Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-ink flex items-center gap-2">
              <div className="rounded-none border-2 border-ink bg-robin-red-600 p-1.5" style={{ backgroundColor: '#DC2626' }}>
                <TrendingUp className="h-4 w-4 text-parchment" />
              </div>
              Weekly API Requests
            </CardTitle>
            <CardDescription>Request volume over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-48">
              {dailyUsage.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-parchment border-2 border-ink rounded-none relative" style={{ height: '160px' }}>
                    <div
                      className="absolute bottom-0 w-full rounded-none"
                      style={{ 
                        height: `${(day.requests / maxRequests) * 100}%`,
                        backgroundColor: '#00C16C'
                      }}
                    />
                  </div>
                  <span className="text-xs text-ink/80 font-mono font-medium">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage by Endpoint */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-ink flex items-center gap-2">
              <div className="rounded-none border-2 border-ink bg-robin-neon p-1.5" style={{ backgroundColor: '#00C16C' }}>
                <Activity className="h-4 w-4 text-parchment" />
              </div>
              Usage by Endpoint
            </CardTitle>
            <CardDescription>Top endpoints by request volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageByEndpoint.map((item) => (
                <div key={item.endpoint} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono text-ink truncate">{item.endpoint}</span>
                    <span className="text-ink/80 font-medium font-mono">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-parchment border-2 border-ink rounded-none overflow-hidden">
                    <div
                      className="h-full rounded-none"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: '#00C16C'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ink flex items-center gap-2">
            <div className="rounded-none border-2 border-ink bg-robin-red-600 p-1.5" style={{ backgroundColor: '#DC2626' }}>
              <Clock className="h-4 w-4 text-parchment" />
            </div>
            Recent API Activity
          </CardTitle>
          <CardDescription>Latest requests to your API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-none border-2 border-ink bg-parchment"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded-none border-2 border-ink text-xs font-bold font-mono ${
                      activity.method === "GET"
                        ? "bg-parchment text-ink"
                        : activity.method === "POST"
                        ? "bg-robin-neon text-ink"
                        : "bg-parchment text-ink"
                    }`}
                    style={activity.method === "POST" ? { backgroundColor: '#00C16C' } : {}}
                  >
                    {activity.method}
                  </span>
                  <span className="font-mono text-sm text-ink">{activity.endpoint}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span
                    className={`px-2 py-0.5 rounded-none border-2 border-ink text-xs font-medium font-mono ${
                      activity.status >= 200 && activity.status < 300
                        ? "bg-robin-neon text-ink"
                        : activity.status >= 400
                        ? "bg-robin-red-600 text-parchment"
                        : "bg-parchment text-ink"
                    }`}
                    style={activity.status >= 200 && activity.status < 300 ? { backgroundColor: '#00C16C' } : {}}
                  >
                    {activity.status}
                  </span>
                  <span className="text-sm text-ink/80 w-16 text-right font-mono">{activity.latency}</span>
                  <span className="text-xs text-ink/70 w-20 text-right font-mono">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
