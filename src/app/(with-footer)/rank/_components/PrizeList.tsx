import ErrorFallback from '@/components/ui/error-fallback'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api/common'
import { PrizeItem } from '@/types/api/rank'
import Image from 'next/image'
import { retryRankPage } from '../actions'

export function PrizeListSkeletonItem() {
  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <div className="relative w-full max-w-[144px] mb-[15px] aspect-square">
        <Skeleton className="w-full h-full flex items-center justify-center border border-[#eeeeee] rounded-full" />
      </div>
      <div className="flex flex-col items-center gap-2 w-full text-center">
        <Skeleton className="w-14 h-3" />
        <Skeleton className="w-20 h-3" />
      </div>
    </div>
  )
}

export function PrizeListSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <PrizeListSkeletonItem key={i} />
      ))}
    </>
  )
}

export default async function PrizeList() {
  // API 호출
  const { error, data } = await api.get<ApiResponse<PrizeItem[]>>('/api/prizes/v1')

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <ErrorFallback
        message={'네트워크 연결이 원활하지 않습니다. 인터넷 상태를 확인해주세요.'}
        showRetry
        onRetry={retryRankPage}
      />
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data.data) {
    const errorMessage =
      data?.message || '경품 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.'
    return <ErrorFallback message={errorMessage} showRetry onRetry={retryRankPage} />
  }

  const prizes = data.data

  return (
    <div className="flex justify-between items-end gap-2">
      {prizes.map((product) => (
        <div key={product.id} className="flex flex-col flex-1 items-center min-w-0">
          <div className="relative w-full max-w-[144px] mb-[15px] aspect-square">
            <div className="absolute top-0 left-0 z-10 w-[25%]">
              <Image
                src={`/images/rank/icon-rank-0${product.prizeRank}.png`}
                alt={`${product.prizeRank}등`}
                width={70}
                height={70}
                className="w-full h-auto"
              />
            </div>
            <div className="flex items-center justify-center w-full h-full bg-white border border-[#eeeeee] rounded-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={80}
                height={80}
                className="w-[55%] h-auto"
              />
            </div>
          </div>
          <div className="flex flex-col gap-0.5 w-full text-center">
            <p className="text-[11px] truncate">{product.brand}</p>
            <p className="text-[11px] truncate">{product.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
