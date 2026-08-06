export type Block = {
  index: number
  timestamp: string
  data: any
  hash: string
  previousHash: string
}

async function sha256Hex(message: string) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await (globalThis.crypto.subtle || (window as any).crypto.subtle).digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function loadLedger(): Promise<Block[]> {
  try {
    const raw = localStorage.getItem('finchain-ledger')
    if (!raw) return []
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

export async function saveLedger(blocks: Block[]) {
  localStorage.setItem('finchain-ledger', JSON.stringify(blocks))
}

export async function addBlock(data: any): Promise<Block> {
  const blocks = await loadLedger()
  const index = blocks.length === 0 ? 1 : blocks[blocks.length - 1].index + 1
  const previousHash = blocks.length === 0 ? '0' : blocks[blocks.length - 1].hash
  const timestamp = new Date().toISOString()
  const payload = JSON.stringify({ index, timestamp, data, previousHash })
  const hash = await sha256Hex(payload)
  const block: Block = { index, timestamp, data, hash, previousHash }
  blocks.push(block)
  await saveLedger(blocks)
  return block
}
