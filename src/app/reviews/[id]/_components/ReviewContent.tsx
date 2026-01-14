interface ReviewContentProps {
  content: string
}

export default function ReviewContent({ content }: ReviewContentProps) {
  return <p className="text-sm leading-[23px] whitespace-pre-wrap break-words mt-5">{content}</p>
}
