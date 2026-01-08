'use client'

import PlaceOwnerMessageModal from '@/components/modals/PlaceOwnerMessageModal'
import ClampedText, { MoreButton } from '@/components/ui/ClampedText'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { PlaceOwnerMessageHistoryResponse } from '@/types/api/place-detail'
import { useState } from 'react'

export function PlaceOwnerMessageSkeleton() {
  return (
    <div className="relative px-[15px] py-[23px] pb-4 bg-[#f9f9f9] border border-[#cccccc] box-border rounded-[5px]">
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

interface PlaceOwnerMessageProps {
  placeOwnerMessageHistory: PlaceOwnerMessageHistoryResponse
}

export default function PlaceOwnerMessage({ placeOwnerMessageHistory }: PlaceOwnerMessageProps) {
  const { message, createdAt } = placeOwnerMessageHistory

  const [isPlaceOwnerMessageModalOpen, setIsPlaceOwnerMessageModalOpen] = useState(false)

  return (
    <>
      <div className="relative px-[15px] py-[23px] pb-4 bg-[#f9f9f9] border border-[#cccccc] box-border rounded-[5px]">
        <div className="absolute -top-3 left-[10px] inline-block px-3.5 py-[6.5px] mb-3 bg-main text-xs leading-[12px] text-white rounded-full">
          사장님 한마디
        </div>
        <ClampedText
          text={message}
          maxLines={1}
          className="text-xs bg-[#f9f9f9]"
          MoreButton={
            <MoreButton
              onClick={() => setIsPlaceOwnerMessageModalOpen(true)}
              className="bg-[#f9f9f9]! text-xs leading-[12px]"
            />
          }
        />
      </div>
      <PlaceOwnerMessageModal
        open={isPlaceOwnerMessageModalOpen}
        onOpenChange={(open) => setIsPlaceOwnerMessageModalOpen(open)}
        message={message}
        createdAt={createdAt}
      />
    </>
  )
}
