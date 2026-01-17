import { Sidebar } from "@/components/dashboard/sidebar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-parchment">
      <Sidebar />
      <main className="lg:pl-16">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
