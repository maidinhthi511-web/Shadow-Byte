"use client"
import { useState, useMemo, useEffect } from "react"
import { addBlock } from "../../lib/ledger"

export default function RiskPage() {
  const [collateralValue, setCollateralValue] = useState<number>(10000)
  const [loanAmount, setLoanAmount] = useState<number>(5000)
  const [dropPercent, setDropPercent] = useState<number>(0)

  const currentLtv = useMemo(() => {
    const adjustedCollateral = collateralValue * (1 - dropPercent / 100)
    if (adjustedCollateral === 0) return Infinity
    return (loanAmount / adjustedCollateral) * 100
  }, [collateralValue, loanAmount, dropPercent])

  const [alerted, setAlerted] = useState(false)

  useEffect(() => {
    if (currentLtv > 80 && !alerted) {
      setAlerted(true)
      ;(async () => {
        await addBlock({ type: 'liquidation', collateralValue, loanAmount, dropPercent, ltv: Number(currentLtv.toFixed(2)), ts: Date.now() })
      })()
    }
    if (currentLtv <= 80 && alerted) setAlerted(false)
  }, [currentLtv, alerted, collateralValue, loanAmount, dropPercent])

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản trị rủi ro</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <label className="block text-sm">Giá trị tài sản thế chấp (VND)</label>
          <input type="number" value={collateralValue} onChange={e => setCollateralValue(Number(e.target.value))} className="mt-1 w-full rounded border px-3 py-2" />
          <label className="block text-sm mt-3">Số tiền vay (VND)</label>
          <input type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="mt-1 w-full rounded border px-3 py-2" />
        </div>

        <div className="p-4 border rounded">
          <label className="block text-sm">Giả lập giảm giá tài sản ({dropPercent}%)</label>
          <input type="range" min={0} max={50} value={dropPercent} onChange={e => setDropPercent(Number(e.target.value))} className="w-full mt-3" />
          <div className="mt-4">
            <p>Adjusted LTV: <span className={currentLtv > 80 ? "text-red-600 font-bold" : "font-medium"}>{isFinite(currentLtv) ? currentLtv.toFixed(2) + "%" : "—"}</span></p>
            {currentLtv > 80 && <div className="mt-2"><span className="text-red-600 font-bold">CẢNH BÁO:</span> LTV vượt ngưỡng 80% — kích hoạt thanh lý</div>}
          </div>
        </div>
      </div>
    </main>
  )
}
