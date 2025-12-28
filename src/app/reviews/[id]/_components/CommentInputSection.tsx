import CommentInput from './CommentInput'

interface CommentInputSectionProps {
  reviewId: number
}

export default async function CommentInputSection({ reviewId }: CommentInputSectionProps) {
  const userProfileImage: string | null = null

  return (
    <section className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#eeeeee] box-border">
      <div className="flex items-center gap-[17px] px-[15px] py-[15px]">
        <CommentInput reviewId={reviewId} userProfileImage={userProfileImage} />
      </div>
    </section>
  )
}
