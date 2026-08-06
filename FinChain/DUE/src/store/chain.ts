import { mockLedger } from '../data/mockData'

export type Block = {
  index: number
  timestamp: string
  data: string
  currentHash: string
  previousHash: string
}

export type ChainEventType = 'genesis' | 'payment' | 'loan' | 'risk' | 'liquidation'

export type ChainEventPayload = {
  type: ChainEventType
  title: string
  summary: string
  source: 'payment' | 'lending' | 'risk' | 'system'
  [key: string]: unknown
}

export type ParsedChainEvent = ChainEventPayload | { type: 'text'; title: string; summary: string }

const KEY = 'finchain_chain_v1'

function defaultChain(): Block[] {
  return mockLedger
}

export function parseBlockData(data: string): ParsedChainEvent {
  try {
    return JSON.parse(data) as ParsedChainEvent
  } catch {
    return { type: 'text', title: 'Raw entry', summary: data }
  }
}

export function createBlockFromEvent(event: ChainEventPayload): Block {
  const chain = getChain()
  const previousHash = chain.length ? chain[chain.length - 1].currentHash : '0'

  return {
    index: chain.length,
    timestamp: new Date().toISOString(),
    data: JSON.stringify(event),
    currentHash: crypto.randomUUID().replace(/-/g, ''),
    previousHash
  }
}

export function getChain(): Block[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      const c = defaultChain()
      localStorage.setItem(KEY, JSON.stringify(c))
      return c
    }
    return JSON.parse(raw) as Block[]
  } catch (e) {
    console.error('getChain parse error', e)
    const c = defaultChain()
    localStorage.setItem(KEY, JSON.stringify(c))
    return c
  }
}

export function saveChain(chain: Block[]) {
  localStorage.setItem(KEY, JSON.stringify(chain))
  // notify other parts of the app
  try {
    window.dispatchEvent(new CustomEvent('finchain:chain-updated', { detail: { length: chain.length } }))
  } catch (e) {
    // ignore
  }
}

export function addBlock(b: Block) {
  const chain = getChain()
  chain.push(b)
  saveChain(chain)
}

export function addEventBlock(event: ChainEventPayload) {
  const block = createBlockFromEvent(event)
  addBlock(block)
  return block
}

export function clearChain() {
  const c = defaultChain()
  saveChain(c)
}
