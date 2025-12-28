'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const estimateIsClamped = (text: string | undefined, maxLines: number) => {
  if (!text) return false
  const charsPerLine = 20
  return text.length > charsPerLine * maxLines
}

interface ClampedTextProps {
  text: string
  maxLines?: number
  className?: string
  href?: string
}

export default function ClampedText({
  text,
  maxLines = 5,
  className = '',
  href,
}: ClampedTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [isClamped, setIsClamped] = useState(() => estimateIsClamped(text, maxLines))
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const checkClamped = () => {
      setIsClamped(element.scrollHeight > element.clientHeight)
    }

    checkClamped()

    const observer = new ResizeObserver(checkClamped)
    observer.observe(element)

    return () => observer.disconnect()
  }, [text])

  const lineHeight = 23
  const maxHeight = lineHeight * maxLines

  const textContent = (
    <p
      ref={textRef}
      className={`text-sm leading-[23px] whitespace-pre-wrap break-words ${className}`}
      style={!isExpanded ? { maxHeight: `${maxHeight}px`, overflow: 'hidden' } : undefined}
    >
      {text}
    </p>
  )

  return (
    <div className="relative">
      {href ? <Link href={href}>{textContent}</Link> : textContent}
      {isClamped && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="absolute bottom-1 right-0 text-sm leading-[14px] text-[#cccccc] bg-white pl-1"
        >
          <span className="text-black">... </span>
          <span className="cursor-pointer">더보기</span>
        </button>
      )}
    </div>
  )
}
