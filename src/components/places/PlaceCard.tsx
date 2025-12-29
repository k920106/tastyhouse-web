import HashTag from '@/components/ui/HashTag'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { formatDecimal } from '@/lib/number'
import { PAGE_PATHS } from '@/lib/paths'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

interface PlaceCardProps {
  placeId: number
  children: React.ReactNode
  className?: string
}

export function PlaceCard({ placeId, children, className }: PlaceCardProps) {
  return (
    <Link
      href={PAGE_PATHS.PLACE_DETAIL(placeId)}
      className={cn('group block overflow-hidden', className)}
    >
      {children}
    </Link>
  )
}

interface PlaceCardImageProps {
  src: string
  alt: string
  className?: string
}

export function PlaceCardImage({ src, alt, className }: PlaceCardImageProps) {
  return (
    <div className={cn('relative mb-[15px] aspect-square overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-300"
      />
    </div>
  )
}

export function PlaceCardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export function PlaceCardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-between mb-[9px]', className)} {...props}>
      {children}
    </div>
  )
}

export function PlaceCardStation({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-xs leading-[12px] text-[#999999] truncate', className)} {...props}>
      {children}
    </span>
  )
}

interface PlaceCardRatingProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number
}

export function PlaceCardRating({ value, className, ...props }: PlaceCardRatingProps) {
  return (
    <span className={cn('text-[17px] leading-[17px] text-main', className)} {...props}>
      {formatDecimal(value, 1)}
    </span>
  )
}

export function PlaceCardName({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-base leading-[16px] truncate', className)} {...props}>
      {children}
    </h3>
  )
}

interface PlaceCardStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  reviewCount: number
  favoriteCount: number
}

export function PlaceCardStats({
  reviewCount,
  favoriteCount,
  className,
  ...props
}: PlaceCardStatsProps) {
  return (
    <div className={cn('flex gap-[11px] mt-2.5', className)} {...props}>
      <p className="text-xs leading-[12px] text-[#666666] tracking-tighter">리뷰 {reviewCount}</p>
      <p className="text-xs leading-[12px] text-[#666666] tracking-tighter">찜 {favoriteCount}</p>
    </div>
  )
}

interface PlaceCardTagsProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: string[]
  variant?: 'primary' | 'secondary'
}

export function PlaceCardTags({
  tags,
  variant = 'primary',
  className,
  ...props
}: PlaceCardTagsProps) {
  return (
    <div className={cn('flex gap-1.5 mt-[15px] overflow-hidden', className)} {...props}>
      {tags.map((tag, index) => (
        <HashTag key={index} tag={tag} variant={variant} />
      ))}
    </div>
  )
}

// Skeleton Components
export function PlaceCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('group block overflow-hidden', className)}>
      <PlaceCardImageSkeleton />
      <PlaceCardContentSkeleton />
    </div>
  )
}

export function PlaceCardImageSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('relative mb-[15px] aspect-square overflow-hidden', className)}>
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  )
}

export function PlaceCardContentSkeleton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-[9px]">
        <Skeleton className="w-1/4 h-3" />
        <Skeleton className="w-1/6 h-[17px]" />
      </div>
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-[11px] mt-2.5">
        <Skeleton className="h-3 w-1/5" />
        <Skeleton className="h-3 w-1/5" />
      </div>
      <div className="flex gap-1.5 overflow-hidden mt-[15px]">
        <Skeleton className="w-16 h-[28px] rounded-[12.5px]" />
        <Skeleton className="w-16 h-[28px] rounded-[12.5px]" />
      </div>
    </div>
  )
}
