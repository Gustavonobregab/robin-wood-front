"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
      return <Crown className="h-3.5 w-3.5 text-amber-500" />
    case "admin":
      return <Shield className="h-3.5 w-3.5 text-robin-green-600" />
    default:
      return <User className="h-3.5 w-3.5 text-slate-400" />
  }
}

const getRoleBadge = (role: string) => {
  switch (role) {
    case "owner":
      return "bg-amber-100 text-amber-700"
    case "admin":
      return "bg-robin-green-100 text-robin-green-700"
    default:
      return "bg-slate-100 text-slate-600"
  }
}

export default function OrganizationsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Organizations</h1>
          <p className="text-slate-500 mt-1">
            Manage your organizations and team members.
          </p>
        </div>
        <Button className="bg-robin-green-600 hover:bg-robin-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Organization
        </Button>
      </div>

      {/* Organizations List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org) => (
          <Card
            key={org.id}
            className="border-slate-200 hover:border-robin-green-300 transition-colors cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-robin-green-100 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-robin-green-700" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-slate-800">{org.name}</CardTitle>
                    <CardDescription className="text-xs">/{org.slug}</CardDescription>
                  </div>
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Users className="h-4 w-4" />
                    {org.members} members
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(
                      org.role
                    )}`}
                  >
                    {org.role}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    org.plan === "Enterprise"
                      ? "bg-purple-100 text-purple-700"
                      : org.plan === "Pro"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
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
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <Users className="h-5 w-5 text-robin-green-600" />
                  Team Members
                </CardTitle>
                <CardDescription>Acme Corporation team</CardDescription>
              </div>
              <Button variant="outline" size="sm">
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
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-robin-green-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-robin-green-100 text-robin-green-700 text-sm font-medium">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-700">{member.name}</p>
                      <p className="text-sm text-slate-500">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(
                        member.role
                      )}`}
                    >
                      {getRoleIcon(member.role)}
                      {member.role}
                    </span>
                    <button className="p-1 text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Organization Settings */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Settings className="h-5 w-5 text-robin-green-600" />
              Quick Settings
            </CardTitle>
            <CardDescription>Acme Corporation settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg border border-slate-200">
                <p className="text-sm font-medium text-slate-700">Organization ID</p>
                <code className="text-xs text-slate-500 font-mono">org_acme_x7k9p2m1</code>
              </div>
              <div className="p-3 rounded-lg border border-slate-200">
                <p className="text-sm font-medium text-slate-700">Current Plan</p>
                <p className="text-sm text-slate-500">Enterprise</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200">
                <p className="text-sm font-medium text-slate-700">API Keys</p>
                <p className="text-sm text-slate-500">4 active keys</p>
              </div>
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Manage Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
