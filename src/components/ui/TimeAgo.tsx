import { formatTimeAgo } from '@/lib/date'

interface TimeAgoProps {
  date: string
  className?: string
}

export default function TimeAgo({ date, className = '' }: TimeAgoProps) {
  return (
    <p className={`text-xs leading-[12px] text-[#999999] ${className}`.trim()}>
      {formatTimeAgo(date)}
    </p>
  )
}
