import React, { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine
} from 'recharts'
import { mockLoanHistory } from '../data/mockData'
import { addEventBlock } from '../store/chain'

export default function Lending() {
  const [collateral, setCollateral] = useState('')
  const [loan, setLoan] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [ltv, setLtv] = useState<number | null>(null)
  const [approved, setApproved] = useState<boolean | null>(null)

  const calculate = (e?: React.FormEvent) => {
    e?.preventDefault()
    const c = parseFloat(collateral || '0')
    const l = parseFloat(loan || '0')
    if (c <= 0 || l <= 0) {
      setResult('Enter positive numbers')
      setLtv(null)
      setApproved(null)
      return
    }

    const value = (l / c) * 100
    setLtv(value)
    const isApproved = value <= 70
    setApproved(isApproved)
    setResult(isApproved ? 'Khoản vay được duyệt tự động' : 'Khoản vay bị từ chối vì vượt ngưỡng LTV')

    addEventBlock({
      type: 'loan',
      source: 'lending',
      title: isApproved ? 'Loan approved' : 'Loan rejected',
      summary: `Collateral ${c}, loan ${l}, LTV ${value.toFixed(2)}%`,
      collateral: c,
      loan: l,
      ltv: Number(value.toFixed(2)),
      status: isApproved ? 'approved' : 'rejected'
    })
  }

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-card">
          <span className="tag dark">US-02 Lending</span>
          <h2>Đăng ký khoản vay tự động với LTV decisioning tức thì.</h2>
          <p>
            Hệ thống tính LTV = khoản vay / tài sản thế chấp × 100%. Nếu LTV ≤ 70%, trạng thái là Được duyệt.
            Ngược lại khoản vay bị từ chối.
          </p>
          <div className="tag-row" style={{ marginTop: 18 }}>
            <span className="tag dark">LTV calculator</span>
            <span className="tag dark">Approval rule</span>
            <span className="tag dark">Historical analytics</span>
          </div>
        </div>

        <div className="hero-stack">
          <div className="panel">
            <div className="panel-title">
              <div>
                <h3>Loan snapshot</h3>
                <p>Instant evaluation summary</p>
              </div>
            </div>
            <div className="inline-kpis">
              <div className="kpi">
                <div className="label">LTV</div>
                <div className="value">{ltv !== null ? `${ltv.toFixed(1)}%` : '-'}</div>
              </div>
              <div className="kpi">
                <div className="label">Threshold</div>
                <div className="value">70%</div>
              </div>
              <div className="kpi">
                <div className="label">Status</div>
                <div className="value">{approved === null ? 'Idle' : approved ? 'OK' : 'Reject'}</div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">
              <div>
                <h3>Acceptance criteria</h3>
                <p>Auto decision based on ratio</p>
              </div>
            </div>
            <div className="stack">
              <div className={approved === null ? 'status-pill warn' : approved ? 'status-pill good' : 'status-pill bad'}>
                <span className="status-dot" />
                {approved === null ? 'Awaiting evaluation' : approved ? 'Khoản vay được duyệt' : 'Khoản vay bị từ chối'}
              </div>
              <div className="subtle">Rule</div>
              <div>Approval is automatic. No manual review is needed for the MVP flow.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="panel">
          <div className="panel-title">
            <div>
              <h3>Loan application</h3>
              <p>Enter collateral and requested amount</p>
            </div>
          </div>
          <form onSubmit={calculate} className="form">
            <div className="form-grid">
              <label>
                Collateral Value
                <input type="number" value={collateral} onChange={(e) => setCollateral(e.target.value)} placeholder="100000" />
              </label>
              <label>
                Loan Amount
                <input type="number" value={loan} onChange={(e) => setLoan(e.target.value)} placeholder="50000" />
              </label>
            </div>
            <button type="submit">Evaluate</button>
          </form>

          {ltv !== null && (
            <div className="result">
              <div className="panel-title" style={{ marginBottom: 4 }}>
                <div>
                  <h3 style={{ marginBottom: 0 }}>Decision result</h3>
                </div>
                <div className={approved ? 'status-pill good' : 'status-pill bad'}>
                  <span className="status-dot" />
                  {approved ? 'Approved' : 'Rejected'}
                </div>
              </div>
              <div className="divider" />
              <div className="subtle">{result}</div>
              <div style={{ height: 260, marginTop: 12 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockLoanHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e6e9ef" />
                    <XAxis dataKey="month" stroke="#667085" />
                    <YAxis stroke="#667085" domain={[0, 100]} />
                    <Tooltip />
                    <ReferenceLine y={70} stroke="#0b5cff" strokeDasharray="4 4" label="Approval threshold" />
                    <Line type="monotone" dataKey="ltv" stroke="#0b5cff" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="tag-row" style={{ marginTop: 8 }}>
                <span className="tag">History line</span>
                <span className="tag">Threshold 70%</span>
                <span className="tag">Approval analytics</span>
              </div>
            </div>
          )}
        </div>

        <div className="panel">
          <div className="panel-title">
            <div>
              <h3>How it works</h3>
              <p>Simple policy for the MVP</p>
            </div>
          </div>
          <div className="stack">
            <div>1. User enters collateral value and desired loan amount.</div>
            <div>2. App calculates LTV and compares it against the 70% threshold.</div>
            <div>3. Result is rendered immediately as approved or rejected.</div>
          </div>
        </div>
      </section>
    </div>
  )
}
