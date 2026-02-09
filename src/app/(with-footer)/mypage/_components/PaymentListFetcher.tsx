'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getMyPayments } from '@/services/member'
import { useQuery } from '@tanstack/react-query'
import PaymentList from './PaymentList'

function PaymentListSkeleton() {
  return (
    <div className="px-[15px] py-[5px] bg-white divide-y divide-[#eeeeee]">
      {Array.from({ length: 3 }).map((_, index) => (
        <PaymentListItemSkeleton key={index} />
      ))}
    </div>
  )
}

function PaymentListItemSkeleton() {
  return (
    <div className="flex items-center justify-between py-[15px]">
      <div className="flex items-center gap-[15px]">
        <Skeleton className="w-[60px] h-[60px] rounded-md" />
        <div className="flex flex-col">
          <Skeleton className="h-[11px] w-[60px]" />
          <Skeleton className="h-[14px] w-[120px] mt-[7px]" />
          <Skeleton className="h-[14px] w-[80px] mt-2.5" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-[7px]">
        <Skeleton className="h-[11px] w-[55px]" />
        <Skeleton className="h-[11px] w-[45px]" />
      </div>
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
