"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Building2,
  Plus,
  Users,
  Settings,
  MoreHorizontal,
  Crown,
  Shield,
  User,
} from "lucide-react"

const organizations = [
  {
    id: "org_1",
    name: "Acme Corporation",
    slug: "acme-corp",
    plan: "Enterprise",
    members: 24,
    role: "owner",
    createdAt: "2024-01-10",
  },
  {
    id: "org_2",
    name: "Startup Labs",
    slug: "startup-labs",
    plan: "Pro",
    members: 8,
    role: "admin",
    createdAt: "2024-02-15",
  },
  {
    id: "org_3",
    name: "Personal Projects",
    slug: "personal",
    plan: "Free",
    members: 1,
    role: "owner",
    createdAt: "2024-03-01",
  },
]

const teamMembers = [
  { id: 1, name: "John Doe", email: "john@acme.com", role: "owner", avatar: "JD" },
  { id: 2, name: "Jane Smith", email: "jane@acme.com", role: "admin", avatar: "JS" },
  { id: 3, name: "Mike Johnson", email: "mike@acme.com", role: "member", avatar: "MJ" },
  { id: 4, name: "Sarah Williams", email: "sarah@acme.com", role: "member", avatar: "SW" },
  { id: 5, name: "Alex Brown", email: "alex@acme.com", role: "member", avatar: "AB" },
]

const getRoleIcon = (role: string) => {
  switch (role) {
    case "owner":
      return <Crown className="h-3.5 w-3.5 text-robin-red-600" />
    case "admin":
      return <Shield className="h-3.5 w-3.5 text-robin-neon" style={{ color: '#00C16C' }} />
    default:
      return <User className="h-3.5 w-3.5 text-ink/70" />
  }
}

const getRoleBadge = (role: string) => {
  switch (role) {
    case "owner":
      return "bg-parchment text-ink border-2 border-ink"
    case "admin":
      return "bg-robin-neon text-ink border-2 border-ink"
    default:
      return "bg-parchment text-ink/70 border-2 border-ink"
  }
}

export default function OrganizationsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-serif text-ink">Organizations</h1>
          <p className="text-ink/80 mt-1 font-sans">
            Manage your organizations and team members.
          </p>
        </div>
        <Button variant="primary">
          Create Organization
        </Button>
      </div>

      {/* Organizations List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org) => (
          <Card
            key={org.id}
            className="cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-none border-2 border-ink ${org.id === "org_2" ? "bg-robin-red-600" : "bg-robin-neon"} flex items-center justify-center`} style={{ backgroundColor: org.id === "org_2" ? '#DC2626' : '#00C16C' }}>
                    <Building2 className="h-5 w-5 text-parchment" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-ink">{org.name}</CardTitle>
                    <CardDescription className="text-xs font-mono">/{org.slug}</CardDescription>
                  </div>
                </div>
                <button className="p-1 text-ink/70">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-ink/80 font-mono">
                    <Users className="h-4 w-4" />
                    {org.members} members
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-none border-2 text-xs font-medium font-mono ${getRoleBadge(
                      org.role
                    )}`}
                    style={org.role === "admin" ? { backgroundColor: '#00C16C' } : {}}
                  >
                    {org.role}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-none border-2 border-ink text-xs font-medium font-mono ${
                    org.plan === "Enterprise"
                      ? "bg-robin-neon text-ink"
                      : org.plan === "Pro"
                      ? "bg-parchment text-ink"
                      : "bg-parchment text-ink/70"
                  }`}
                  style={org.plan === "Enterprise" ? { backgroundColor: '#00C16C' } : {}}
                >
                  {org.plan}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Organization Details */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Team Members */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-ink flex items-center gap-2">
                  <div className="rounded-none border-2 border-ink bg-robin-red-600 p-1.5" style={{ backgroundColor: '#DC2626' }}>
                    <Users className="h-4 w-4 text-parchment" />
                  </div>
                  Team Members
                </CardTitle>
                <CardDescription>Acme Corporation team</CardDescription>
              </div>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Invite
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-none border-2 border-ink bg-parchment"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border-2 border-ink">
                      <AvatarFallback className="bg-robin-neon text-ink text-sm font-medium" style={{ backgroundColor: '#00C16C' }}>
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium font-serif text-ink">{member.name}</p>
                      <p className="text-sm text-ink/80 font-mono">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-none border-2 text-xs font-medium font-mono ${getRoleBadge(
                        member.role
                      )}`}
                      style={member.role === "admin" ? { backgroundColor: '#00C16C' } : {}}
                    >
                      {getRoleIcon(member.role)}
                      {member.role}
                    </span>
                    <button className="p-1 text-ink/70">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Organization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ink flex items-center gap-2">
              <div className="rounded-none border-2 border-ink bg-robin-neon p-1.5" style={{ backgroundColor: '#00C16C' }}>
                <Settings className="h-4 w-4 text-parchment" />
              </div>
              Quick Settings
            </CardTitle>
            <CardDescription>Acme Corporation settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-none border-2 border-ink bg-parchment">
                <p className="text-sm font-medium font-serif text-ink">Organization ID</p>
                <code className="text-xs text-ink/80 font-mono">org_acme_x7k9p2m1</code>
              </div>
              <div className="p-3 rounded-none border-2 border-ink bg-parchment">
                <p className="text-sm font-medium font-serif text-ink">Current Plan</p>
                <p className="text-sm text-ink/80 font-mono">Enterprise</p>
              </div>
              <div className="p-3 rounded-none border-2 border-ink bg-parchment">
                <p className="text-sm font-medium font-serif text-ink">API Keys</p>
                <p className="text-sm text-ink/80 font-mono">4 active keys</p>
              </div>
              <Button variant="outline" className="w-full">
                Manage Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
