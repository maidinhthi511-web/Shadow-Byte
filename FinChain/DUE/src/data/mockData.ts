export type LedgerBlock = {
  index: number
  timestamp: string
  data: string
  currentHash: string
  previousHash: string
}

export type AppUser = {
  id: string
  name: string
  role: 'admin' | 'user'
  wallet: string
  team: string
}

export type LoanScenario = {
  month: string
  collateral: number
  loan: number
  ltv: number
}

export type RiskScenario = {
  month: string
  dropPercent: number
  ltv: number
}

export type RiskTimelineItem = {
  id: string
  timestamp: string
  title: string
  status: 'safe' | 'warning' | 'liquidation'
  detail: string
}

export type PaymentRecord = {
  sender: string
  receiver: string
  amount: string
  memo: string
  timestamp: string
  hash: string
}

export const mockUsers: AppUser[] = [
  { id: 'u1', name: 'Nguyen Minh Anh', role: 'user', wallet: '0x8F12...A91D', team: 'Retail' },
  { id: 'u2', name: 'Tran Minh Duc', role: 'admin', wallet: '0x9C22...B7F1', team: 'Risk Manager' }
]

export const mockPayments: PaymentRecord[] = [
  {
    sender: '0x8F12...A91D',
    receiver: 'Merchant - DaNang',
    amount: '2.500.000 VND',
    memo: 'Invoice 2026-08',
    timestamp: '2026-08-01T08:14:00.000Z',
    hash: '9f7bc0b4c915d8d8ff54ae5ad2fef6f4b6c638d1a2d27d76ab2bff13b7c64ea1'
  },
  {
    sender: '0x8F12...A91D',
    receiver: 'Savings Vault',
    amount: '18.000.000 VND',
    memo: 'Vault top-up',
    timestamp: '2026-08-01T09:40:00.000Z',
    hash: 'b4c3fd7fe9fd7f8720d3a1cfbb5e2a87d4c7a4a3f1f1ad692b4fcd85ed01dd44'
  }
]

export const mockLoanHistory: LoanScenario[] = [
  { month: 'Jan', collateral: 120, loan: 72, ltv: 60 },
  { month: 'Feb', collateral: 135, loan: 82, ltv: 60.7 },
  { month: 'Mar', collateral: 128, loan: 86, ltv: 67.2 },
  { month: 'Apr', collateral: 145, loan: 89, ltv: 61.4 },
  { month: 'May', collateral: 150, loan: 100, ltv: 66.7 },
  { month: 'Jun', collateral: 138, loan: 102, ltv: 73.9 }
]

export const mockRiskScenarios: RiskScenario[] = [
  { month: 'S-1', dropPercent: 0, ltv: 61 },
  { month: 'S-2', dropPercent: 10, ltv: 67 },
  { month: 'S-3', dropPercent: 20, ltv: 72 },
  { month: 'S-4', dropPercent: 30, ltv: 79 },
  { month: 'S-5', dropPercent: 40, ltv: 86 },
  { month: 'S-6', dropPercent: 50, ltv: 98 }
]

export const mockRiskTimeline: RiskTimelineItem[] = [
  {
    id: 'rt-1',
    timestamp: '2026-08-01T10:05:00.000Z',
    title: 'Collateral price stable',
    status: 'safe',
    detail: 'LTV remained within the safe range after initial market check.'
  },
  {
    id: 'rt-2',
    timestamp: '2026-08-01T10:12:00.000Z',
    title: 'Warning threshold reached',
    status: 'warning',
    detail: 'Price drop pushed the position above 70% LTV, so the admin should monitor closely.'
  },
  {
    id: 'rt-3',
    timestamp: '2026-08-01T10:18:00.000Z',
    title: 'Liquidation triggered',
    status: 'liquidation',
    detail: 'LTV crossed 80%, causing a mock liquidation signal to be emitted.'
  }
]

export const mockLedger: LedgerBlock[] = [
  {
    index: 0,
    timestamp: '2026-08-01T00:00:00.000Z',
    data: JSON.stringify({ type: 'genesis', source: 'system', title: 'Genesis Block', summary: 'Initial chain state' }),
    currentHash: '0000000000000000',
    previousHash: '0'
  },
  {
    index: 1,
    timestamp: '2026-08-01T08:14:00.000Z',
    data: JSON.stringify({ type: 'payment', source: 'payment', title: 'Invoice payment', summary: '0x8F12...A91D paid Merchant - DaNang 2.500.000 VND', sender: '0x8F12...A91D', receiver: 'Merchant - DaNang', amount: '2.500.000 VND' }),
    currentHash: '9f7bc0b4c915d8d8ff54ae5ad2fef6f4b6c638d1a2d27d76ab2bff13b7c64ea1',
    previousHash: '0000000000000000'
  },
  {
    index: 2,
    timestamp: '2026-08-01T09:40:00.000Z',
    data: JSON.stringify({ type: 'payment', source: 'payment', title: 'Vault top-up', summary: '0x8F12...A91D moved 18.000.000 VND into Savings Vault', sender: '0x8F12...A91D', receiver: 'Savings Vault', amount: '18.000.000 VND' }),
    currentHash: 'b4c3fd7fe9fd7f8720d3a1cfbb5e2a87d4c7a4a3f1f1ad692b4fcd85ed01dd44',
    previousHash: '9f7bc0b4c915d8d8ff54ae5ad2fef6f4b6c638d1a2d27d76ab2bff13b7c64ea1'
  },
  {
    index: 3,
    timestamp: '2026-08-01T10:00:00.000Z',
    data: JSON.stringify({ type: 'loan', source: 'lending', title: 'Loan approved', summary: 'Collateral 150, loan 90, LTV 60%', collateral: 150, loan: 90, ltv: 60, status: 'approved' }),
    currentHash: 'd18d0df5d98744aa8d4cc4c918ad8b26f8a3e17bb8c83de0c7a0cc85a3f11111',
    previousHash: 'b4c3fd7fe9fd7f8720d3a1cfbb5e2a87d4c7a4a3f1f1ad692b4fcd85ed01dd44'
  },
  {
    index: 4,
    timestamp: '2026-08-01T10:18:00.000Z',
    data: JSON.stringify({ type: 'liquidation', source: 'risk', title: 'Liquidation mock', summary: 'LTV crossed 80%, liquidation signal emitted', dropPercent: 40, ltv: 86, status: 'liquidation' }),
    currentHash: 'a73be6aa0f0f4f5d90c0b8bce06f50d2e52bcd74ad5b5a3b2a0a9d2bba9a8888',
    previousHash: 'd18d0df5d98744aa8d4cc4c918ad8b26f8a3e17bb8c83de0c7a0cc85a3f11111'
  }
]
