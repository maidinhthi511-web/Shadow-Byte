export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"rounded-lg border px-4 py-3 bg-card/60 " + (className || "")}>
      {children}
    </div>
  )
}
