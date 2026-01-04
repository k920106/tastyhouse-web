'use client'

import { formatTimeAgo } from '@/lib/date'
import { useEffect, useState } from 'react'

interface TimeAgoProps {
  date: string
  className?: string
}

export default function TimeAgo({ date, className = '' }: TimeAgoProps) {
  const [timeAgo, setTimeAgo] = useState<string>('')

  useEffect(() => {
    setTimeAgo(formatTimeAgo(date))
  }, [date])

  return <p className={`text-xs leading-[12px] text-[#999999] ${className}`.trim()}>{timeAgo}</p>
}
