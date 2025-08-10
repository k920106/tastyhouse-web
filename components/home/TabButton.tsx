import { GiHamburgerMenu } from 'react-icons/gi'

export default function TabButton() {
  return (
    <button className="fixed top-4 left-4 z-50 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-100 transition">
      <GiHamburgerMenu />
    </button>
  )
}
