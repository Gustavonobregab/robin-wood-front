"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import {
  CreditCard,
  Receipt,
  Download,
  CheckCircle2,
  Zap,
  Users,
  Activity,
  ArrowRight,
} from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "For hobby projects",
    features: ["1,000 requests/month", "1 API key", "Community support"],
    current: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams",
    features: ["100,000 requests/month", "10 API keys", "Email support", "Analytics dashboard"],
    current: false,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For large organizations",
    features: [
      "Unlimited requests",
      "Unlimited API keys",
      "Priority support",
      "Advanced analytics",
      "Custom SLA",
      "Dedicated account manager",
    ],
    current: true,
  },
]

const invoices = [
  { id: "INV-2024-001", date: "Jan 1, 2024", amount: "$199.00", status: "paid" },
  { id: "INV-2024-002", date: "Feb 1, 2024", amount: "$199.00", status: "paid" },
  { id: "INV-2024-003", date: "Mar 1, 2024", amount: "$199.00", status: "paid" },
  { id: "INV-2024-004", date: "Apr 1, 2024", amount: "$199.00", status: "pending" },
]

const usageStats = {
  requests: { used: 856000, limit: "Unlimited" },
  keys: { used: 4, limit: "Unlimited" },
  members: { used: 24, limit: "Unlimited" },
}

export default function BillingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-serif text-ink">Billing</h1>
        <p className="text-ink/80 mt-1 font-sans">
          Manage your subscription and billing information.
        </p>
      </div>

      {/* Current Plan Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ink">Current Plan</CardTitle>
            <div className="rounded-none border-2 border-ink bg-robin-red-600 p-2" style={{ backgroundColor: '#DC2626' }}>
              <Zap className="h-4 w-4 text-parchment" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif text-ink">Enterprise</div>
            <p className="text-sm text-ink/80 font-mono">$199/month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ink">API Requests</CardTitle>
            <div className="rounded-none border-2 border-ink bg-robin-neon p-2" style={{ backgroundColor: '#00C16C' }}>
              <Activity className="h-4 w-4 text-parchment" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif text-ink">856K</div>
            <p className="text-sm text-ink/80 font-mono">Unlimited</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ink">Team Members</CardTitle>
            <div className="rounded-none border-2 border-ink bg-robin-red-600 p-2" style={{ backgroundColor: '#DC2626' }}>
              <Users className="h-4 w-4 text-parchment" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif text-ink">24</div>
            <p className="text-sm text-ink/80 font-mono">Unlimited</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ink">Subscription Plans</CardTitle>
          <CardDescription>Choose the plan that best fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-6 rounded-none border-2 border-ink ${
                  plan.current
                    ? "bg-robin-neon text-ink"
                    : "bg-parchment text-ink"
                }`}
                style={plan.current ? { backgroundColor: '#00C16C' } : {}}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold font-serif text-lg text-ink">{plan.name}</h3>
                  {plan.current && (
                    <span className="px-2 py-0.5 rounded-none border-2 border-ink text-xs font-medium font-mono bg-parchment text-ink">
                      Current
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold font-serif text-ink">{plan.price}</span>
                  <span className="text-ink/80 font-mono">{plan.period}</span>
                </div>
                <p className="text-sm text-ink/80 mb-4 font-sans">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-ink font-mono">
                      <CheckCircle2 className="h-4 w-4 text-ink flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {!plan.current && (
                  <Button
                    variant={plan.name === "Enterprise" ? "primary" : "outline"}
                    className="w-full"
                  >
                    {plan.name === "Free" ? "Downgrade" : "Upgrade"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
                {plan.current && (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method & Invoices */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ink flex items-center gap-2">
              <div className="rounded-none border-2 border-ink bg-robin-neon p-1.5" style={{ backgroundColor: '#00C16C' }}>
                <CreditCard className="h-4 w-4 text-parchment" />
              </div>
              Payment Method
            </CardTitle>
            <CardDescription>Your default payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-none border-2 border-ink bg-parchment">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-robin-red-600 rounded-none border-2 border-ink flex items-center justify-center">
                    <span className="text-parchment text-xs font-bold font-mono">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium font-serif text-ink">•••• •••• •••• 4242</p>
                    <p className="text-sm text-ink/80 font-mono">Expires 12/2025</p>
                  </div>
                </div>
                <Button variant="outline">
                  Update
                </Button>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-none border-2 border-ink bg-parchment">
              <p className="text-sm font-medium font-serif text-ink">Billing Address</p>
              <p className="text-sm text-ink/80 mt-1 font-mono">
                Acme Corporation<br />
                123 Tech Street<br />
                San Francisco, CA 94102
              </p>
              <Button variant="link" className="mt-2 p-0 h-auto text-robin-neon font-mono" style={{ color: '#00C16C' }}>
                Edit address
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ink flex items-center gap-2">
              <div className="rounded-none border-2 border-ink bg-robin-red-600 p-1.5" style={{ backgroundColor: '#DC2626' }}>
                <Receipt className="h-4 w-4 text-parchment" />
              </div>
              Recent Invoices
            </CardTitle>
            <CardDescription>Download your past invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-3 rounded-none border-2 border-ink bg-parchment"
                >
                  <div className="flex items-center gap-4">
                    <Receipt className="h-4 w-4 text-ink/70" />
                    <div>
                      <p className="font-medium font-serif text-ink">{invoice.id}</p>
                      <p className="text-sm text-ink/80 font-mono">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium font-serif text-ink">{invoice.amount}</span>
                    <span
                      className={`px-2 py-0.5 rounded-none border-2 border-ink text-xs font-medium font-mono ${
                        invoice.status === "paid"
                          ? "bg-robin-neon text-ink"
                          : "bg-parchment text-ink"
                      }`}
                      style={invoice.status === "paid" ? { backgroundColor: '#00C16C' } : {}}
                    >
                      {invoice.status}
                    </span>
                    <button className="p-1 text-ink/70">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Invoices
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
