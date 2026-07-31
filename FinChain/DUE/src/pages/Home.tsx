import React from 'react'
import MetricCard from '../components/MetricCard'
import { getChain, parseBlockData } from '../store/chain'
import { mockPayments, mockUsers } from '../data/mockData'

export default function Home() {
  const chain = getChain()
  const latestBlock = chain[chain.length - 1]
  const latestHash = latestBlock ? latestBlock.currentHash : 'No transactions yet'
  const latestTime = latestBlock ? new Date(latestBlock.timestamp).toLocaleString() : 'Waiting for first transaction'
  const lastPayment = mockPayments[mockPayments.length - 1]
  const parsedEvents = chain.map((block) => ({ block, event: parseBlockData(block.data) }))
  const paymentCount = parsedEvents.filter(({ event }) => event.type === 'payment').length
  const loanCount = parsedEvents.filter(({ event }) => event.type === 'loan').length
  const riskCount = parsedEvents.filter(({ event }) => event.type === 'risk').length
  const liquidationCount = parsedEvents.filter(({ event }) => event.type === 'liquidation').length
  const latestEvents = parsedEvents.slice(-4).reverse()

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-card">
          <span className="tag dark">FinChain DaNang MVP</span>
          <h2>DeFi screens for payments, lending, risk control, and blockchain ledger.</h2>
          <p>
            This prototype maps directly to the user stories from <strong>user-story.md</strong> and the Figma
            reference. The layout emphasizes quick actions, live status, and traceable blockchain state.
          </p>
          <div className="tag-row" style={{ marginTop: 18 }}>
            <span className="tag dark">Smart contract flow</span>
            <span className="tag dark">LTV decisioning</span>
            <span className="tag dark">Risk alerts</span>
            <span className="tag dark">Immutable ledger</span>
          </div>
        </div>

        <div className="hero-stack">
          <div className="panel">
            <div className="panel-title">
              <div>
                <h3>Current chain state</h3>
                <p>Live value from the local ledger store</p>
              </div>
            </div>
            <div className="metric-grid">
                <MetricCard title="Payment Blocks" value={paymentCount} />
                <MetricCard title="Loan Blocks" value={loanCount} />
                <MetricCard title="Risk Blocks" value={riskCount + liquidationCount} />
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">
              <div>
                <h3>Recent activity</h3>
                <p>Most recent hash and timestamp</p>
              </div>
            </div>
            <div className="stack">
              <div>
                <div className="subtle">Latest Hash</div>
                <div className="mono">{latestHash}</div>
              </div>
              <div>
                <div className="subtle">Latest Timestamp</div>
                <div>{latestTime}</div>
              </div>
              <div>
                <div className="subtle">Latest Mock Payment</div>
                <div>{lastPayment.sender} → {lastPayment.receiver}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section single">
        <div className="panel">
          <div className="panel-title">
            <div>
              <h3>What each page covers</h3>
              <p>Mapped to the original user stories</p>
            </div>
          </div>
          <div className="mini-grid">
            <div className="card">
              <div className="card-title">Payment</div>
              <div className="card-body">Transfer money, generate SHA-256 hash, and append the transaction to the shared chain.</div>
            </div>
            <div className="card">
              <div className="card-title">Lending</div>
              <div className="card-body">Enter collateral and loan amount to get instant LTV approval or rejection, then save it as a loan block.</div>
            </div>
            <div className="card">
              <div className="card-title">Risk Control</div>
              <div className="card-body">Simulate collateral price drops, record a liquidation mock, and keep the event on the same ledger.</div>
            </div>
          </div>
          <div className="divider" style={{ margin: '18px 0' }} />
          <div className="panel-title" style={{ marginBottom: 12 }}>
            <div>
              <h3>Latest chain events</h3>
              <p>One ledger for payment, lending, and risk</p>
            </div>
          </div>
          <div className="timeline">
            {latestEvents.map(({ block, event }) => (
              <div key={block.index} className="timeline-item">
                <div className="timeline-head">
                  <strong>{event.title}</strong>
                  <span className={event.type === 'liquidation' ? 'status-pill bad' : event.type === 'risk' ? 'status-pill warn' : 'status-pill good'}>
                    <span className="status-dot" />
                    {event.type}
                  </span>
                </div>
                <div className="timeline-meta">
                  <div>{event.summary}</div>
                  <div>{new Date(block.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
