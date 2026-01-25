import { BsShare } from 'react-icons/bs'

interface ShareButtonProps {
  onClick: () => void
}

export default function ShareButton({ onClick }: ShareButtonProps) {
  return (
    <button
      className="w-[20px] h-[20px] flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <BsShare size={20} />
    </button>
  )
}
