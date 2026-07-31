import React, { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine
} from 'recharts'
import { mockRiskScenarios, mockRiskTimeline, type RiskTimelineItem } from '../data/mockData'
import { addEventBlock } from '../store/chain'

export default function RiskControl() {
  const [collateralValue, setCollateralValue] = useState(1000)
  const [loanAmount, setLoanAmount] = useState(500)
  const [dropPercent, setDropPercent] = useState(0)
  const [timeline, setTimeline] = useState<RiskTimelineItem[]>(mockRiskTimeline)

  const adjustedCollateral = collateralValue * (1 - dropPercent / 100)
  const ltv = adjustedCollateral > 0 ? (loanAmount / adjustedCollateral) * 100 : Infinity
  const isDanger = ltv > 80
  const isWarning = ltv > 70 && ltv <= 80

  const recordScenario = () => {
    const status: RiskTimelineItem['status'] = isDanger ? 'liquidation' : isWarning ? 'warning' : 'safe'
    const title = isDanger
      ? 'Liquidation mock triggered'
      : isWarning
        ? 'Risk warning recorded'
        : 'Safe scenario recorded'
    const detail = isDanger
      ? `LTV ${ltv.toFixed(2)}% exceeded 80%, so liquidation was triggered.`
      : isWarning
        ? `LTV ${ltv.toFixed(2)}% moved into the warning zone.`
        : `LTV ${ltv.toFixed(2)}% stayed in the safe zone.`

    const nextItem: RiskTimelineItem = {
      id: `rt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      title,
      status,
      detail
    }

    setTimeline((current) => [nextItem, ...current])
    addEventBlock({
      type: status === 'liquidation' ? 'liquidation' : 'risk',
      source: 'risk',
      title,
      summary: detail,
      dropPercent,
      collateralValue,
      loanAmount,
      adjustedCollateral: Number(adjustedCollateral.toFixed(2)),
      ltv: Number(ltv.toFixed(2)),
      status
    })
  }

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-card">
          <span className="tag dark">US-03 Risk Control</span>
          <h2>Giám sát biến động tài sản thế chấp theo thời gian thực.</h2>
          <p>
            Kéo slider để mô phỏng giảm giá 0% đến 50%. Khi LTV vượt ngưỡng 80%, hệ thống hiển thị cảnh báo đỏ
            và kích hoạt thanh lý tự động bằng Smart Contract.
          </p>
          <div className="tag-row" style={{ marginTop: 18 }}>
            <span className="tag dark">Live LTV</span>
            <span className="tag dark">Liquidation trigger</span>
            <span className="tag dark">Scenario testing</span>
          </div>
        </div>

        <div className="hero-stack">
          <div className="panel">
            <div className="panel-title">
              <div>
                <h3>Risk state</h3>
                <p>Thresholds and current simulated status</p>
              </div>
            </div>
            <div className="inline-kpis">
              <div className="kpi"><div className="label">Adjusted collateral</div><div className="value">{adjustedCollateral.toFixed(0)}</div></div>
              <div className="kpi"><div className="label">Current LTV</div><div className="value">{Number.isFinite(ltv) ? `${ltv.toFixed(1)}%` : '∞'}</div></div>
              <div className="kpi"><div className="label">Risk level</div><div className="value">{isDanger ? 'High' : isWarning ? 'Warn' : 'Safe'}</div></div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">
              <div>
                <h3>Automation policy</h3>
                <p>What the smart contract should do</p>
              </div>
            </div>
            <div className={isDanger ? 'status-pill bad' : isWarning ? 'status-pill warn' : 'status-pill good'}>
              <span className="status-dot" />
              {isDanger ? 'Liquidation should be triggered now' : isWarning ? 'Monitor closely' : 'Position is safe'}
            </div>
            <div className="subtle" style={{ marginTop: 12 }}>Trigger levels</div>
            <div className="stack">
              <div>0% - 70%: safe region</div>
              <div>70% - 80%: warning region</div>
              <div>&gt; 80%: liquidation region</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="panel">
          <div className="panel-title">
            <div>
              <h3>Scenario simulator</h3>
              <p>Change the inputs to watch LTV move</p>
            </div>
          </div>
          <div className="form range-row">
            <label>
              Collateral Value
              <input type="number" value={collateralValue} onChange={(e) => setCollateralValue(Number(e.target.value))} />
            </label>
            <label>
              Loan Amount
              <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
            </label>
            <label>
              Market Drop: {dropPercent}%
              <input type="range" min={0} max={50} value={dropPercent} onChange={(e) => setDropPercent(Number(e.target.value))} />
            </label>
          </div>

          <div className="result">
            <div className="panel-title" style={{ marginBottom: 4 }}>
              <div>
                <h3 style={{ marginBottom: 0 }}>Impact analysis</h3>
              </div>
              <div className={isDanger ? 'status-pill bad' : isWarning ? 'status-pill warn' : 'status-pill good'}>
                <span className="status-dot" />
                {isDanger ? 'Danger' : isWarning ? 'Warning' : 'Safe'}
              </div>
            </div>
            <div className="divider" />
            <div className="mini-grid" style={{ marginBottom: 14 }}>
              <div className="card"><div className="card-title">Original collateral</div><div className="card-body">{collateralValue.toFixed(2)}</div></div>
              <div className="card"><div className="card-title">Adjusted collateral</div><div className="card-body">{adjustedCollateral.toFixed(2)}</div></div>
              <div className="card"><div className="card-title">LTV after drop</div><div className="card-body">{Number.isFinite(ltv) ? `${ltv.toFixed(2)}%` : '∞'}</div></div>
            </div>
            <div style={{ height: 260, marginTop: 12 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockRiskScenarios}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e6e9ef" />
                  <XAxis dataKey="dropPercent" stroke="#667085" tickFormatter={(value) => `${value}%`} />
                  <YAxis stroke="#667085" domain={[0, 110]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'LTV']} labelFormatter={(label) => `Drop ${label}%`} />
                  <ReferenceLine y={80} stroke="#d92d20" strokeDasharray="4 4" label="Liquidation threshold" />
                  <Area type="monotone" dataKey="ltv" stroke="#0b5cff" fill="rgba(11,92,255,0.18)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="tag-row" style={{ marginTop: 8 }}>
              <span className="tag">Stress test</span>
              <span className="tag">Liquidation 80%</span>
              <span className="tag">Collateral shock</span>
            </div>
            <div style={{ marginTop: 14 }}>
              <button type="button" className="button secondary" onClick={recordScenario}>
                Record scenario to ledger
              </button>
            </div>
            {isDanger && <p className="alert" style={{ marginTop: 12 }}>ALERT: LTV above 80% - liquidation triggered by Smart Contract.</p>}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">
            <div>
              <h3>Liquidation timeline</h3>
              <p>Mock event history for safe, warning, and liquidation states</p>
            </div>
          </div>
          <div className="timeline">
            {timeline.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-head">
                  <strong>{item.title}</strong>
                  <span className={item.status === 'liquidation' ? 'status-pill bad' : item.status === 'warning' ? 'status-pill warn' : 'status-pill good'}>
                    <span className="status-dot" />
                    {item.status}
                  </span>
                </div>
                <div className="timeline-meta">
                  <div>{item.detail}</div>
                  <div>{new Date(item.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
