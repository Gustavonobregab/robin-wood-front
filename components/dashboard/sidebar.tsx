"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/components/ui/utils"
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-parchment border-2 border-ink shadow-hard"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} className="text-ink" /> : <Menu size={24} className="text-ink" />}
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
          "fixed inset-y-0 left-0 z-40 w-16 transform transition-transform duration-300 ease-in-out lg:translate-x-0 bg-parchment",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-6 py-6">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href
            const useRed = index % 2 === 1; 
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-center p-3 border-2 border-ink shadow-hard transition-colors",
                  isActive
                    ? useRed ? "bg-robin-red-600 text-parchment" : "bg-robin-neon text-parchment"
                    : useRed 
                      ? "bg-parchment text-ink hover:bg-robin-red-600 hover:text-parchment" 
                      : "bg-parchment text-ink hover:bg-robin-neon hover:text-parchment"
                )}
                style={isActive 
                  ? { backgroundColor: useRed ? '#DC2626' : '#00C16C' } 
                  : {}
                }
                title={item.name}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
