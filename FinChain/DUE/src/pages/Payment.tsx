import React, { useEffect, useState } from 'react'
import { addEventBlock, getChain, parseBlockData } from '../store/chain'
import { mockPayments } from '../data/mockData'

async function sha256Hex(message: string) {
  const data = new TextEncoder().encode(message)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export default function Payment() {
  const [sender, setSender] = useState('')
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('Invoice payment')
  const [txHash, setTxHash] = useState<string | null>(null)
  const [recent, setRecent] = useState<any[]>([])
  const totalTx = getChain().length > 1 ? getChain().length - 1 : 0
  const mocked = mockPayments.slice().reverse()

  useEffect(() => {
    setRecent(getChain().slice(-5).reverse())
    const onUpdate = () => setRecent(getChain().slice(-5).reverse())
    window.addEventListener('finchain:chain-updated', onUpdate as EventListener)
    return () => window.removeEventListener('finchain:chain-updated', onUpdate as EventListener)
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payloadObj = { sender, receiver, amount, memo, timestamp: Date.now() }
    const payload = JSON.stringify(payloadObj)
    const hash = await sha256Hex(payload)
    setTxHash(hash)

    addEventBlock({
      type: 'payment',
      source: 'payment',
      title: 'Transfer completed',
      summary: `${sender} sent ${amount} to ${receiver}`,
      sender,
      receiver,
      amount,
      memo,
      payload,
      hash
    })
    setSender('')
    setReceiver('')
    setAmount('')
  }

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-card">
          <span className="tag dark">US-01 Payment</span>
          <h2>Thanh toán hóa đơn và chuyển tiền qua Smart Contract.</h2>
          <p>
            Nhập người gửi, người nhận và số tiền. Khi xác nhận, hệ thống tạo hash SHA-256 và ghi giao dịch vào
            ledger như bằng chứng tức thì.
          </p>
          <div className="tag-row" style={{ marginTop: 18 }}>
            <span className="tag dark">Hash SHA-256</span>
            <span className="tag dark">On-chain receipt</span>
            <span className="tag dark">Instant trace</span>
          </div>
        </div>

        <div className="hero-stack">
          <div className="panel">
            <div className="panel-title">
              <div>
                <h3>Payment summary</h3>
                <p>Quick operational stats</p>
              </div>
            </div>
            <div className="inline-kpis">
              <div className="kpi"><div className="label">Total TX</div><div className="value">{totalTx}</div></div>
              <div className="kpi"><div className="label">Ledger blocks</div><div className="value">{getChain().length}</div></div>
              <div className="kpi"><div className="label">Status</div><div className="value">Live</div></div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">
              <div>
                <h3>Transaction proof</h3>
                <p>The generated hash is the user-facing proof</p>
              </div>
            </div>
            <div className="stack">
              <div>
                <div className="subtle">Acceptance criteria</div>
                <div>Sender, Receiver, Amount and hash output are all visible in one screen.</div>
              </div>
              <div>
                <div className="subtle">Hash status</div>
                <div className={txHash ? 'status-pill good' : 'status-pill warn'}>
                  <span className="status-dot" />
                  {txHash ? 'Transaction recorded' : 'Waiting for confirmation'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="panel">
          <div className="panel-title">
            <div>
              <h3>Transfer form</h3>
              <p>Smart contract simulation fields</p>
            </div>
          </div>
          <form onSubmit={submit} className="form">
            <div className="form-grid">
              <label>
                Sender
                <input value={sender} onChange={(e) => setSender(e.target.value)} placeholder="0xSender or customer name" required />
              </label>
              <label>
                Receiver
                <input value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="0xReceiver or merchant name" required />
              </label>
            </div>
            <div className="form-grid">
              <label>
                Amount
                <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" required />
              </label>
              <label>
                Memo
                <input value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="Invoice, salary, transfer..." />
              </label>
            </div>
            <button type="submit">Confirm transfer</button>
          </form>

          {txHash && (
            <div className="result">
              <div className="subtle">Transaction Hash (SHA-256)</div>
              <div className="mono">{txHash}</div>
            </div>
          )}
        </div>

        <div className="panel">
          <div className="panel-title">
            <div>
              <h3>Recent activity</h3>
              <p>Latest blockchain receipts and seeded mock payments</p>
            </div>
          </div>
          <div className="timeline">
            {mocked.map((payment) => (
              <div key={payment.hash} className="timeline-item">
                <div className="timeline-head">
                  <strong>{payment.sender} → {payment.receiver}</strong>
                  <span className="status-pill good"><span className="status-dot" />{payment.amount}</span>
                </div>
                <div className="timeline-meta">
                  <div>{payment.memo}</div>
                  <div>{new Date(payment.timestamp).toLocaleString()}</div>
                  <div className="mono">{payment.hash}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="divider" style={{ margin: '18px 0' }} />
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Time</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 && (
                <tr>
                  <td colSpan={3} className="subtle">No transaction yet</td>
                </tr>
              )}
              {recent.map((r: any) => {
                const payload = parseBlockData(r.data)
                const summary = payload.type === 'text'
                  ? payload.summary
                  : payload.summary || (payload as any).memo || payload.title
                return (
                  <tr key={r.index}>
                    <td>{r.index}</td>
                    <td>{new Date(r.timestamp).toLocaleString()}</td>
                    <td>
                      {summary}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
