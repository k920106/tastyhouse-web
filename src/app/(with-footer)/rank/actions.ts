'use server'

import { revalidatePath } from 'next/cache'

/**
 * 랭킹 페이지 데이터 재시도 Server Action
 *
 * Next.js의 revalidatePath()를 사용하여 현재 페이지의 캐시를 무효화하고 재검증합니다.
 * - 해당 경로의 모든 Server Component가 다시 실행됩니다
 * - 캐시된 데이터가 무효화되고 최신 데이터를 fetch합니다
 * - 클라이언트 측 상태는 유지됩니다
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/revalidatePath
 */
export async function retryRankPage() {
  // /rank 경로의 캐시를 무효화하여 Server Component를 재실행
  revalidatePath('/rank')
}
