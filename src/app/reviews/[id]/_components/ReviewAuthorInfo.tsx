import Avatar from '@/components/ui/Avatar'
import Nickname from '@/components/ui/Nickname'
import TimeAgo from '@/components/ui/TimeAgo'

interface ReviewAuthorInfoProps {
  profileImageUrl: string | null
  nickname: string
  createdAt: string
}

export default function ReviewAuthorInfo({
  profileImageUrl,
  nickname,
  createdAt,
}: ReviewAuthorInfoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar src={profileImageUrl} alt={nickname} />
      <div className="flex flex-col gap-2">
        <Nickname>{nickname}</Nickname>
        <TimeAgo date={createdAt} />
      </div>
    </div>
  )
}
