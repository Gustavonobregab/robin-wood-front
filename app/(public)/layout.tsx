export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h2>Public Section</h2>
      {children}
    </div>
  )
}
