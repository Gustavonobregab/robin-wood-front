import { Sidebar } from "@/components/dashboard/sidebar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="p-6 lg:p-10">{children}</div>
      </main>
    </div>
  )
}
