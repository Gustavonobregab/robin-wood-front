"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/components/ui/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Key,
  Building2,
  CreditCard,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "API Keys", href: "/dashboard/keys", icon: Key },
  { name: "Organizations", href: "/dashboard/organizations", icon: Building2 },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
]

export function Sidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-robin-green-700 text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col bg-gradient-to-b from-robin-green-800 to-robin-green-900 text-white">
          {/* Logo */}
          <div className="flex h-20 items-center justify-center gap-3 border-b border-robin-green-700/50">
            <Image 
              src="/robin-logo.png" 
              alt="Robin Wood Logo" 
              width={48} 
              height={48}
            />
            <div>
              <h1 className="text-xl font-bold">Robin Wood</h1>
              <p className="text-xs text-robin-green-300">Dashboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-white/15 text-white shadow-lg"
                      : "text-robin-green-100 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-robin-red-400" : "text-robin-green-300"
                    )}
                  />
                  {item.name}
                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-robin-red-500" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-robin-green-700/50 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-robin-green-700/30 p-3">
              <Avatar className="h-10 w-10 border-2 border-robin-green-500">
                <AvatarImage src="/avatar.png" alt="Usuario" />
                <AvatarFallback className="bg-robin-red-600 text-white font-semibold">
                  RW
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Robin Hood</p>
                <p className="text-xs text-robin-green-300 truncate">
                  admin@robinwood.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
