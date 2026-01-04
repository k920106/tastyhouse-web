import FixedBottomSection from '@/components/ui/FixedBottomSection'
import CommentInputServer from './CommentInputServer'

interface CommentInputSectionProps {
  params: Promise<{ id: string }>
}

export default function CommentInputSection({ params }: CommentInputSectionProps) {
  return (
    <FixedBottomSection className="px-[15px] py-[15px]">
      <div className="flex items-center gap-[17px]">
        <CommentInputServer params={params} />
      </div>
    </FixedBottomSection>
  )
}
