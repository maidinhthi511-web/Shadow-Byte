"use client"
import { useState } from "react"
import { addBlock } from "../../lib/ledger"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Alert from "@/components/ui/alert"

export default function LendingPage() {
  const [collateral, setCollateral] = useState("")
  const [loan, setLoan] = useState("")
  const [result, setResult] = useState<string | null>(null)

  const compute = (e?: React.FormEvent) => {
    e?.preventDefault()
    const c = parseFloat(collateral || "0")
    const l = parseFloat(loan || "0")
    const ltv = c === 0 ? 100 : (l / c) * 100
    const status = ltv <= 70 ? "Được duyệt" : "Từ chối"
    setResult(`${status} — LTV ${ltv.toFixed(2)}%`)
    ;(async () => {
      await addBlock({ type: 'loan-eval', collateral: c, loan: l, ltv: Number(ltv.toFixed(2)), status, ts: Date.now() })
    })()
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lending — Đăng ký khoản vay</h1>
      <Card>
        <form onSubmit={compute} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Giá trị tài sản thế chấp (VND)</label>
            <Input value={collateral} onChange={e => setCollateral(e.target.value)} type="number" />
          </div>
          <div>
            <label className="block text-sm font-medium">Số tiền muốn vay (VND)</label>
            <Input value={loan} onChange={e => setLoan(e.target.value)} type="number" />
          </div>
          <div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded">Đánh giá khoản vay</button>
          </div>
        </form>
      </Card>

      {result && (
        <div className="mt-6">
          <Alert variant={result.includes('Từ chối') ? 'danger' : 'success'}>{result}</Alert>
        </div>
      )}
    </main>
  )
}
