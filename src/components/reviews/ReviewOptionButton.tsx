import { FiMoreVertical } from 'react-icons/fi'

interface ReviewOptionButtonProps {
  onClick?: () => void
}

export default function ReviewOptionButton({ onClick }: ReviewOptionButtonProps) {
  return (
    <button className="h-[18px] cursor-pointer" onClick={onClick}>
      <FiMoreVertical size={20} color="#999999" />
    </button>
  )
}
