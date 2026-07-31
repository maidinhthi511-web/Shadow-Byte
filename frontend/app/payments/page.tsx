"use client"
import { useState } from "react"
import { addBlock } from "../../lib/ledger"

export default function PaymentsPage() {
  const [sender, setSender] = useState("")
  const [receiver, setReceiver] = useState("")
  const [amount, setAmount] = useState("")
  const [txHash, setTxHash] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = JSON.stringify({ sender, receiver, amount, ts: Date.now() })
    const block = await addBlock({ type: 'payment', payload })
    setTxHash(block.hash)
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Sender</label>
          <input value={sender} onChange={e => setSender(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Receiver</label>
          <input value={receiver} onChange={e => setReceiver(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input value={amount} onChange={e => setAmount(e.target.value)} type="number" className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit Transaction</button>
      </form>

      {txHash && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h2 className="font-medium">Transaction recorded</h2>
          <p className="text-sm break-all mt-2">{txHash}</p>
        </div>
      )}
    </main>
  )
}
