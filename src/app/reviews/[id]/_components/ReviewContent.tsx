import HashTag from '@/components/ui/HashTag'

interface ReviewContentProps {
  content: string
  tagNames?: string[]
}

export default function ReviewContent({ content, tagNames }: ReviewContentProps) {
  return (
    <>
      <p className="text-sm leading-[23px] whitespace-pre-wrap break-words">{content}</p>
      {tagNames && tagNames.length > 0 && (
        <div className="flex flex-wrap gap-[7px] mt-5">
          {tagNames.map((tag: string, index: number) => (
            <HashTag key={index} tag={tag} variant="secondary" />
          ))}
        </div>
      )}
    </>
  )
}
