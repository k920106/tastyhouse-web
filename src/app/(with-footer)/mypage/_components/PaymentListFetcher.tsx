'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getMyPayments } from '@/services/member'
import { useQuery } from '@tanstack/react-query'
import PaymentList from './PaymentList'

function PaymentListSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-20 w-full" />
        </div>
      ))}
    </div>
  )
}

export default function PaymentListFetcher() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['mypage', 'payments'],
    queryFn: async () => {
      const response = await getMyPayments(0, 10)
      return {
        payments: response.data?.data || [],
        hasMorePayments: (response.data?.pagination?.totalElements ?? 0) > 10,
      }
    },
  })

  if (isLoading) {
    return <PaymentListSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('결제 내역')}
        className="py-10 bg-white"
      />
    )
  }

  if (!data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('결제 내역')}
        className="py-10 bg-white"
      />
    )
  }

  return <PaymentList payments={data.payments} hasMorePayments={data.hasMorePayments} />
}
