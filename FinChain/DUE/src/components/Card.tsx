import React from 'react'

export default function Card({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="card">
      {title && <div className="card-title">{title}</div>}
      <div className="card-body">{children}</div>
    </div>
  )
}
