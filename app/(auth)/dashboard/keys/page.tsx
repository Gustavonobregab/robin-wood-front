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
          <h1 className="text-3xl font-bold font-serif text-ink">API Keys</h1>
          <p className="text-ink/80 mt-1 font-sans">
            Manage your API keys for authentication.
          </p>
        </div>
        <Button variant="primary">
          <Plus className="h-4 w-4 mr-2" />
          Create New Key
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ink">Active Keys</CardTitle>
            <div className="rounded-none border-2 border-ink bg-robin-neon p-2" style={{ backgroundColor: '#00C16C' }}>
              <CheckCircle2 className="h-4 w-4 text-parchment" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif text-ink">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ink">Total Requests</CardTitle>
            <div className="rounded-none border-2 border-ink bg-robin-red-600 p-2" style={{ backgroundColor: '#DC2626' }}>
              <Key className="h-4 w-4 text-parchment" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif text-ink">1.7M</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ink">Revoked Keys</CardTitle>
            <div className="rounded-none border-2 border-ink bg-robin-red-600 p-2" style={{ backgroundColor: '#DC2626' }}>
              <AlertCircle className="h-4 w-4 text-parchment" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif text-ink">1</div>
          </CardContent>
        </Card>
      </div>

      {/* API Keys List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ink flex items-center gap-2">
            <div className="rounded-none border-2 border-ink bg-robin-neon p-1.5" style={{ backgroundColor: '#00C16C' }}>
              <Key className="h-4 w-4 text-parchment" />
            </div>
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
                className={`p-4 rounded-none border-2 border-ink ${
                  key.status === "revoked"
                    ? "bg-parchment opacity-60"
                    : "bg-parchment"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold font-serif text-ink">{key.name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-none border-2 border-ink text-xs font-medium font-mono ${
                          key.status === "active"
                            ? "bg-robin-neon text-ink"
                            : "bg-parchment text-ink/70"
                        }`}
                        style={key.status === "active" ? { backgroundColor: '#00C16C' } : {}}
                      >
                        {key.status}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <code className="px-3 py-1.5 bg-parchment border-2 border-ink rounded-none text-sm font-mono text-ink">
                        {visibleKeys.has(key.id)
                          ? `${key.prefix}sk_xxxxxxxxxxxx${key.lastChars}`
                          : `${key.prefix}sk_••••••••••••${key.lastChars}`}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="p-1.5 text-ink/70"
                      >
                        {visibleKeys.has(key.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(key.id)}
                        className="p-1.5 text-ink/70"
                      >
                        {copiedKey === key.id ? (
                          <CheckCircle2 className="h-4 w-4 text-robin-neon" style={{ color: '#00C16C' }} />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-6 text-sm text-ink/80 font-mono">
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
                      variant="outline"
                      className="bg-robin-red-600 text-parchment border-ink"
                      style={{ backgroundColor: '#DC2626' }}
                    >
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
