export default function Alert({ children, variant = 'info' }: { children: React.ReactNode; variant?: 'info' | 'danger' | 'success' }) {
  const base = 'rounded p-3 text-sm'
  const cls =
    variant === 'danger'
      ? base + ' bg-destructive/20 text-destructive'
      : variant === 'success'
      ? base + ' bg-primary/20 text-primary'
      : base + ' bg-muted/20 text-muted-foreground'
  return <div className={cls}>{children}</div>
}
