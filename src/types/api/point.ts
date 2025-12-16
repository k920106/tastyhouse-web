export interface PointHistory {
  id: number
  description: string
  date: string
  amount: number
  type: 'earn' | 'spend'
}

export interface PointBalance {
  availablePoints: number
  expiringPoints: number
  expiringDate: string | null
}
