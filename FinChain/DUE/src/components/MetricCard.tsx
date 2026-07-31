import React from 'react'

export default function MetricCard({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <div className="card metric-card">
      <div className="card-title">{title}</div>
      <div className="card-body" style={{ fontSize: 20 }}>{value}</div>
    </div>
  )
}
