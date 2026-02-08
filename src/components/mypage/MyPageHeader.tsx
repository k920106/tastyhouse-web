'use client'

import { IoSettingsOutline } from 'react-icons/io5'

export default function MyPageHeader() {
  return (
    <div className="bg-main flex-1">
      <div className="flex items-center justify-end px-4 pt-4">
        <button className="flex items-center justify-center w-10 h-10">
          <IoSettingsOutline size={28} className="text-white" />
        </button>
      </div>
    </div>
  )
}
