/**
 * Represents the difference between two points in time.
 */
export interface TimeDifference {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMilliseconds: number
}

/**
 * Calculates the time difference between now and a given end date.
 * @param end The future date (string or Date object).
 * @returns A TimeDifference object.
 */
export function getTimeDifference(end: string | Date): TimeDifference {
  const endDate = new Date(end)
  const now = new Date()

  // Ensure the difference is not negative
  const totalMilliseconds = Math.max(0, endDate.getTime() - now.getTime())

  const days = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24))
  const hours = Math.floor((totalMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, totalMilliseconds }
}

/**
 * Formats a date according to the specified format string.
 */
export function formatDate(date: string | Date, format: 'YYYY.MM.DD' | 'MM.DD' | 'YYYY-MM-DD' | 'MM-DD'): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  if (format === 'YYYY.MM.DD') {
    return `${year}.${month}.${day}`
  }
  if (format === 'MM.DD') {
    return `${month}.${day}`
  }
  if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`
  }
  if (format === 'MM-DD') {
    return `${month}-${day}`
  }

  // 기본값 혹은 에러 처리
  return `${year}.${month}.${day}`
}

/**
 * Formats a TimeDifference object into a string like "X일 Y시간 Z분".
 * Only displays non-zero parts, up to the minute.
 * @param diff The TimeDifference object.
 * @returns A formatted string.
 */
export function formatRemainingTime(diff: TimeDifference): string {
  const parts = []
  if (diff.days > 0) {
    parts.push(`${diff.days}일`)
  }
  if (diff.hours > 0) {
    parts.push(`${diff.hours}시간`)
  }
  if (diff.minutes > 0) {
    parts.push(`${diff.minutes}분`)
  }

  if (parts.length === 0) {
    // If less than a minute, show "0분" or "방금"
    return '0분'
  }

  return parts.join(' ')
}

/**
 * A simple utility to get only the remaining days, for components that don't need detailed time.
 * @param end The future date (string or Date object).
 * @returns The number of full days remaining.
 */
export function getRemainingDays(end: string | Date): number {
  return getTimeDifference(end).days
}
