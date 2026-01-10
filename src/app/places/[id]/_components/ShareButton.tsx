import { BsShare } from 'react-icons/bs'

interface ShareButtonProps {
  onClick: () => void
}

export default function ShareButton({ onClick }: ShareButtonProps) {
  return (
    <button
      className="w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <BsShare size={20} />
    </button>
  )
}
