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
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Monitor your API usage and performance metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-slate-200 hover:border-robin-green-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className="rounded-full bg-robin-green-50 p-2">
                <stat.icon className="h-4 w-4 text-robin-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-rose-500" />
                )}
                <span className="text-emerald-600 font-medium text-sm">
                  {stat.change}
                </span>
                <span className="text-xs text-slate-400">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Weekly Usage Chart */}
        <Card className="lg:col-span-4 border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-robin-green-600" />
              Weekly API Requests
            </CardTitle>
            <CardDescription>Request volume over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-48">
              {dailyUsage.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-100 rounded-t-md relative" style={{ height: '160px' }}>
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-robin-green-600 to-robin-green-400 rounded-t-md transition-all hover:from-robin-green-500 hover:to-robin-green-300"
                      style={{ height: `${(day.requests / maxRequests) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage by Endpoint */}
        <Card className="lg:col-span-3 border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Activity className="h-5 w-5 text-robin-green-600" />
              Usage by Endpoint
            </CardTitle>
            <CardDescription>Top endpoints by request volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageByEndpoint.map((item) => (
                <div key={item.endpoint} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono text-slate-600 truncate">{item.endpoint}</span>
                    <span className="text-slate-500 font-medium">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-robin-green-500 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Clock className="h-5 w-5 text-robin-green-600" />
            Recent API Activity
          </CardTitle>
          <CardDescription>Latest requests to your API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-robin-green-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      activity.method === "GET"
                        ? "bg-blue-100 text-blue-700"
                        : activity.method === "POST"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {activity.method}
                  </span>
                  <span className="font-mono text-sm text-slate-700">{activity.endpoint}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      activity.status >= 200 && activity.status < 300
                        ? "bg-emerald-100 text-emerald-700"
                        : activity.status >= 400
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {activity.status}
                  </span>
                  <span className="text-sm text-slate-500 w-16 text-right">{activity.latency}</span>
                  <span className="text-xs text-slate-400 w-20 text-right">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
