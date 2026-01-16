"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import {
  Key,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"

const apiKeys = [
  {
    id: "key_1",
    name: "Production API Key",
    prefix: "rw_live_",
    lastChars: "...x7Kp",
    createdAt: "2024-01-15",
    lastUsed: "2 minutes ago",
    status: "active",
    requests: "456,789",
  },
  {
    id: "key_2",
    name: "Development Key",
    prefix: "rw_test_",
    lastChars: "...m3Qs",
    createdAt: "2024-02-20",
    lastUsed: "1 hour ago",
    status: "active",
    requests: "12,345",
  },
  {
    id: "key_3",
    name: "Staging Environment",
    prefix: "rw_test_",
    lastChars: "...p9Lw",
    createdAt: "2024-03-10",
    lastUsed: "3 days ago",
    status: "active",
    requests: "8,921",
  },
  {
    id: "key_4",
    name: "Old Production Key",
    prefix: "rw_live_",
    lastChars: "...k2Rt",
    createdAt: "2023-11-05",
    lastUsed: "30 days ago",
    status: "revoked",
    requests: "1,234,567",
  },
]

export default function KeysPage() {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId)
    } else {
      newVisible.add(keyId)
    }
    setVisibleKeys(newVisible)
  }

  const copyToClipboard = (keyId: string) => {
    setCopiedKey(keyId)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">API Keys</h1>
          <p className="text-slate-500 mt-1">
            Manage your API keys for authentication.
          </p>
        </div>
        <Button className="bg-robin-green-600 hover:bg-robin-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create New Key
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Active Keys</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">3</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Requests</CardTitle>
            <Key className="h-4 w-4 text-robin-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">1.7M</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Revoked Keys</CardTitle>
            <AlertCircle className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">1</div>
          </CardContent>
        </Card>
      </div>

      {/* API Keys List */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Key className="h-5 w-5 text-robin-green-600" />
            Your API Keys
          </CardTitle>
          <CardDescription>
            Keep your API keys secure. Do not share them publicly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className={`p-4 rounded-lg border ${
                  key.status === "revoked"
                    ? "bg-slate-50 border-slate-200 opacity-60"
                    : "bg-white border-slate-200 hover:border-robin-green-300"
                } transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-slate-800">{key.name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          key.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {key.status}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <code className="px-3 py-1.5 bg-slate-100 rounded-md text-sm font-mono text-slate-700">
                        {visibleKeys.has(key.id)
                          ? `${key.prefix}sk_xxxxxxxxxxxx${key.lastChars}`
                          : `${key.prefix}sk_••••••••••••${key.lastChars}`}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {visibleKeys.has(key.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(key.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {copiedKey === key.id ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-6 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Created {key.createdAt}
                      </span>
                      <span>Last used: {key.lastUsed}</span>
                      <span>{key.requests} requests</span>
                    </div>
                  </div>
                  {key.status === "active" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Revoke
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
