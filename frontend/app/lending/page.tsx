"use client"
import { useState } from "react"
import { addBlock } from "../../lib/ledger"

export default function LendingPage() {
  const [collateral, setCollateral] = useState("")
  const [loan, setLoan] = useState("")
  const [result, setResult] = useState<string | null>(null)

  const compute = (e?: React.FormEvent) => {
    e?.preventDefault()
    const c = parseFloat(collateral || "0")
    const l = parseFloat(loan || "0")
    const ltv = c === 0 ? 100 : (l / c) * 100
    const status = ltv <= 70 ? "Approved" : "Rejected"
    setResult(`${status} — LTV ${ltv.toFixed(2)}%`)
    // record evaluation on ledger
    ;(async () => {
      await addBlock({ type: 'loan-eval', collateral: c, loan: l, ltv: Number(ltv.toFixed(2)), status, ts: Date.now() })
    })()
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lending Portal</h1>
      <form onSubmit={compute} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Collateral Value</label>
          <input value={collateral} onChange={e => setCollateral(e.target.value)} type="number" className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Loan Amount</label>
          <input value={loan} onChange={e => setLoan(e.target.value)} type="number" className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Evaluate Loan</button>
        </div>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p className="font-medium">{result}</p>
        </div>
      )}
    </main>
  )
}
