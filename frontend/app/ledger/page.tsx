"use client"
import { useEffect, useState } from "react"
import { addBlock, loadLedger } from "@/lib/ledger"
import type { Block } from "@/lib/ledger"

export default function LedgerPage() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const l = async () => {
      const data = await loadLedger()
      setBlocks(data)
    }
    l()
  }, [])

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Blockchain Ledger</h1>
      <p className="mb-4">Total blocks: {blocks.length}</p>

      <div className="space-y-3">
        {blocks.map(b => (
          <div key={b.index} className="border rounded p-3">
            <div className="flex justify-between items-center">
              <div>Block #{b.index} — {new Date(b.timestamp).toLocaleString()}</div>
              <button onClick={() => setOpenIndex(openIndex === b.index ? null : b.index)} className="text-sm text-blue-600">{openIndex === b.index ? 'Collapse' : 'Expand'}</button>
            </div>
            {openIndex === b.index && (
              <div className="mt-3 text-sm bg-gray-50 p-2 rounded">
                <div><strong>Index:</strong> {b.index}</div>
                <div><strong>Timestamp:</strong> {new Date(b.timestamp).toISOString()}</div>
                <div><strong>Data:</strong> <pre className="whitespace-pre-wrap">{typeof b.data === 'string' ? b.data : JSON.stringify(b.data, null, 2)}</pre></div>
                <div><strong>Current Hash:</strong> <code className="break-all">{b.hash}</code></div>
                <div><strong>Previous Hash:</strong> <code className="break-all">{b.previousHash}</code></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          className="bg-primary text-primary-foreground px-3 py-1 rounded"
          onClick={async () => {
            // seed example blocks for demo
            await addBlock({ type: 'seed', info: 'Initial demo block', ts: Date.now() })
            const data = await loadLedger()
            setBlocks(data)
          }}
        >
          Seed demo block
        </button>
      </div>
    </main>
  )
}
