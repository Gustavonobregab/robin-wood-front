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
        <h1 className="text-3xl font-bold text-slate-800">Billing</h1>
        <p className="text-slate-500 mt-1">
          Manage your subscription and billing information.
        </p>
      </div>

      {/* Current Plan Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Current Plan</CardTitle>
            <Zap className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">Enterprise</div>
            <p className="text-sm text-slate-500">$199/month</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">API Requests</CardTitle>
            <Activity className="h-4 w-4 text-robin-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">856K</div>
            <p className="text-sm text-slate-500">Unlimited</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Team Members</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">24</div>
            <p className="text-sm text-slate-500">Unlimited</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Plans */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-800">Subscription Plans</CardTitle>
          <CardDescription>Choose the plan that best fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-6 rounded-xl border-2 transition-all ${
                  plan.current
                    ? "border-robin-green-500 bg-robin-green-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-slate-800">{plan.name}</h3>
                  {plan.current && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-robin-green-100 text-robin-green-700">
                      Current
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-slate-800">{plan.price}</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-robin-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {!plan.current && (
                  <Button
                    variant={plan.name === "Enterprise" ? "default" : "outline"}
                    className={`w-full ${
                      plan.name === "Enterprise"
                        ? "bg-robin-green-600 hover:bg-robin-green-700"
                        : ""
                    }`}
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
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-robin-green-600" />
              Payment Method
            </CardTitle>
            <CardDescription>Your default payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">•••• •••• •••• 4242</p>
                    <p className="text-sm text-slate-500">Expires 12/2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-lg border border-slate-200">
              <p className="text-sm font-medium text-slate-700">Billing Address</p>
              <p className="text-sm text-slate-500 mt-1">
                Acme Corporation<br />
                123 Tech Street<br />
                San Francisco, CA 94102
              </p>
              <Button variant="link" size="sm" className="mt-2 p-0 h-auto text-robin-green-600">
                Edit address
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Receipt className="h-5 w-5 text-robin-green-600" />
              Recent Invoices
            </CardTitle>
            <CardDescription>Download your past invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-robin-green-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Receipt className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-700">{invoice.id}</p>
                      <p className="text-sm text-slate-500">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-slate-700">{invoice.amount}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        invoice.status === "paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {invoice.status}
                    </span>
                    <button className="p-1 text-slate-400 hover:text-robin-green-600 transition-colors">
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
