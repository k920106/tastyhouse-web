import { cookies } from 'next/headers'
import CommentInput from './CommentInput'

interface CommentInputServerProps {
  params: Promise<{ id: string }>
}

export default async function CommentInputServer({ params }: CommentInputServerProps) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')

  const { id } = await params
  const reviewId = Number(id)

  return <CommentInput isLoggedIn={!!accessToken} reviewId={reviewId} />
}
