import { FiMoreVertical } from 'react-icons/fi'

interface ReviewOptionButtonProps {
  onClick?: () => void
  disabled?: boolean
}

export default function ReviewOptionButton({ onClick, disabled }: ReviewOptionButtonProps) {
  return (
    <button className="h-[18px] cursor-pointer" onClick={onClick} disabled={disabled}>
      <FiMoreVertical size={20} color="#999999" />
    </button>
  )
}
