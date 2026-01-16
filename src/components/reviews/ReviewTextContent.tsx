import { CSSProperties, RefObject } from 'react'

interface TextContentProps {
  text: string
  className?: string
  style?: CSSProperties
  innerRef?: RefObject<HTMLParagraphElement | null>
}

export default function ReviewTextContent({
  text,
  className = '',
  style,
  innerRef,
}: TextContentProps) {
  return (
    <p
      ref={innerRef}
      className={`text-sm leading-[23px] whitespace-pre-wrap break-words ${className}`}
      style={style}
    >
      {text}
    </p>
  )
}
