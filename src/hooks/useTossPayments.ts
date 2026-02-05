'use client'

import { loadTossPayments } from '@tosspayments/tosspayments-sdk'
import type { TossPaymentsPayment } from '@tosspayments/tosspayments-sdk'
import { useEffect, useState } from 'react'

const TOSS_CLIENT_KEY = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
const TOSS_CUSTOMER_KEY = 'G8oetVW6rvGiNKBFV1W0F'

export function useTossPayments() {
  const [tossPayment, setTossPayment] = useState<TossPaymentsPayment | null>(null)

  useEffect(() => {
    async function initTossPayments() {
      try {
        const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY)
        const payment = tossPayments.payment({ customerKey: TOSS_CUSTOMER_KEY })
        setTossPayment(payment)
      } catch (error) {
        console.error('토스페이먼츠 초기화 실패:', error)
      }
    }

    initTossPayments()
  }, [])

  return { tossPayment }
}
