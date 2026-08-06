import React, { useEffect, useState } from 'react'
import { getChain, parseBlockData } from '../store/chain'

export default function Ledger() {
  const [chain, setChain] = useState(getChain())
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const onUpdate = () => setChain(getChain())
    window.addEventListener('finchain:chain-updated', onUpdate as EventListener)
    return () => window.removeEventListener('finchain:chain-updated', onUpdate as EventListener)
  }, [])

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-card">
          <span className="tag dark">US-04 Ledger</span>
          <h2>Blockchain ledger minh bạch và không thể chỉnh sửa.</h2>
          <p>
            Tất cả blocks được hiển thị rõ ràng để người dùng tra cứu lịch sử thanh toán và khoản vay. Mỗi block có
            thể mở rộng để xem Index, Timestamp, Data, Current Hash, và Previous Hash.
          </p>
          <div className="tag-row" style={{ marginTop: 18 }}>
            <span className="tag dark">Transparent</span>
            <span className="tag dark">Immutable</span>
            <span className="tag dark">Expandable blocks</span>
          </div>
        </div>

        <div className="hero-stack">
          <div className="panel">
            <div className="panel-title">
              <div>
                <h3>Ledger summary</h3>
                <p>Current chain snapshot</p>
              </div>
            </div>
            <div className="inline-kpis">
              <div className="kpi"><div className="label">Blocks</div><div className="value">{chain.length}</div></div>
              <div className="kpi"><div className="label">Expanded</div><div className="value">{Object.keys(expanded).filter((k) => expanded[Number(k)]).length}</div></div>
              <div className="kpi"><div className="label">Chain</div><div className="value">Healthy</div></div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">
              <div>
                <h3>Inspectability</h3>
                <p>Every block has traceable metadata</p>
              </div>
            </div>
            <div className="stack">
              <div className="status-pill good"><span className="status-dot" />Read-only historical view</div>
              <div className="subtle">The ledger is appended only. No delete or edit actions are exposed in the MVP.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section single">
        <div className="panel">
          <div className="panel-title">
            <div>
              <h3>Blockchain blocks</h3>
              <p>Click each block to expand details</p>
            </div>
          </div>

          <ul className="blocks">
            {chain.map((b) => {
              const isOpen = !!expanded[b.index]
              const event = parseBlockData(b.data)
              return (
                <li key={b.index} className="block">
                  <div className="block-summary" onClick={() => setExpanded((s) => ({ ...s, [b.index]: !s[b.index] }))}>
                    <div>
                      <div className="subtle">Blockchain block</div>
                      <strong>Block #{b.index} · {event.type}</strong>
                    </div>
                    <div className={isOpen ? 'status-pill good' : 'status-pill warn'}>
                      <span className="status-dot" />
                      {isOpen ? 'Collapse' : 'Expand'}
                    </div>
                  </div>
                  {isOpen && (
                    <div className="block-details">
                      <p><strong>Index:</strong> {b.index}</p>
                      <p><strong>Timestamp:</strong> {new Date(b.timestamp).toLocaleString()}</p>
                      <p><strong>Title:</strong> {event.title}</p>
                      <p><strong>Summary:</strong> {event.summary}</p>
                      <p><strong>Data:</strong> <span className="mono">{typeof b.data === 'string' ? b.data : JSON.stringify(b.data)}</span></p>
                      <p><strong>Current Hash:</strong> <span className="mono">{b.currentHash}</span></p>
                      <p><strong>Previous Hash:</strong> <span className="mono">{b.previousHash}</span></p>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}
