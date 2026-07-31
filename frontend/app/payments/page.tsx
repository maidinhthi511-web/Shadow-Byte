"use client"
import { useState } from "react"
import { addBlock } from "../../lib/ledger"
import Card from "@/components/ui/card"
import Input from "@/components/ui/input"
import Alert from "@/components/ui/alert"

type FormErrors = {
  sender?: string
  receiver?: string
  amount?: string
}

export default function PaymentsPage() {
  const [sender, setSender] = useState("")
  const [receiver, setReceiver] = useState("")
  const [amount, setAmount] = useState("")
  const [txHash, setTxHash] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = (): FormErrors => {
    const out: FormErrors = {}
    if (!sender || sender.trim().length < 3) out.sender = 'Vui lòng nhập tên người gửi (ít nhất 3 ký tự)'
    if (!receiver || receiver.trim().length < 3) out.receiver = 'Vui lòng nhập tên người nhận (ít nhất 3 ký tự)'
    const n = Number(amount)
    if (!amount || isNaN(n) || n <= 0) out.amount = 'Số tiền phải lớn hơn 0'
    return out
  }

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length === 0) setShowConfirm(true)
  }

  const handleConfirm = async () => {
    setLoading(true)
    try {
      const payload = { sender: sender.trim(), receiver: receiver.trim(), amount: Number(amount), ts: Date.now() }
      const block = await addBlock({ type: 'payment', data: payload })
      setTxHash(block.hash)
      setShowConfirm(false)
    } catch (e) {
      setErrors({ ...(errors || {}), amount: 'Ghi giao dịch thất bại' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>
      <Card>
        <form onSubmit={handlePreview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Người gửi</label>
            <Input value={sender} onChange={e => setSender(e.target.value)} />
            {errors.sender && <div className="text-sm text-red-600 mt-1">{errors.sender}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium">Người nhận</label>
            <Input value={receiver} onChange={e => setReceiver(e.target.value)} />
            {errors.receiver && <div className="text-sm text-red-600 mt-1">{errors.receiver}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium">Số tiền (VND)</label>
            <Input value={amount} onChange={e => setAmount(e.target.value)} type="number" />
            {errors.amount && <div className="text-sm text-red-600 mt-1">{errors.amount}</div>}
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded">Xem lại & Ghi</button>
            <button type="button" onClick={() => { setSender(''); setReceiver(''); setAmount(''); setTxHash(null); setErrors({}) }} className="px-4 py-2 rounded border">Xóa</button>
          </div>
        </form>
      </Card>

      {showConfirm && (
        <div className="mt-4 p-4 border rounded bg-background">
          <h3 className="font-medium">Xác nhận giao dịch</h3>
          <div className="mt-2 text-sm">
            <div><strong>Người gửi:</strong> {sender}</div>
            <div><strong>Người nhận:</strong> {receiver}</div>
            <div><strong>Số tiền:</strong> {amount} VND</div>
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={handleConfirm} disabled={loading} className="bg-primary text-primary-foreground px-3 py-1 rounded">{loading ? 'Đang ghi...' : 'Xác nhận'}</button>
            <button onClick={() => setShowConfirm(false)} className="px-3 py-1 rounded border">Hủy</button>
          </div>
        </div>
      )}

      {txHash && (
        <div className="mt-6">
          <h2 className="font-medium">Giao dịch đã được ghi nhận</h2>
          <p className="text-sm break-all mt-2">Mã băm: {txHash}</p>
        </div>
      )}
    </main>
  )
}
