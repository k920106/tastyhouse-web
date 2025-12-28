'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ProfileEditPage() {
  const router = useRouter()
  const [nickname, setNickname] = useState('�$�DP|�X�')
  const [statusMessage, setStatusMessage] = useState('��T8�� P|� �%t|X�')
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* �T */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => router.back()} className="p-2 -ml-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px]">가나다라</h1>
        </div>
      </header>

      {/* \D t�� 9X */}
      <div className="flex justify-center pt-12 pb-8">
        <div className="relative">
          <div className="w-[140px] h-[140px] rounded-full bg-gradient-to-br from-yellow-100 to-green-200 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="\D t��"
                width={140}
                height={140}
                className="object-cover"
              />
            ) : (
              <div className="relative w-full h-full">
                <div className="absolute top-6 left-10 w-8 h-8 bg-yellow-400 rounded-full" />
                <div className="absolute top-6 right-10 w-8 h-8 bg-yellow-400 rounded-full" />
                <div className="absolute top-8 left-1/2 -translate-x-1/2">
                  <Image src="/images/tomato.png" alt="�Ƞ" width={40} height={40} />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2">
                  <svg width="60" height="40" viewBox="0 0 60 40">
                    <text x="30" y="25" textAnchor="middle" fontSize="40" fill="#000">
                      GE
                    </text>
                  </svg>
                </div>
                <div className="absolute top-1/2 right-4 flex flex-col gap-1">
                  <div className="w-3 h-3 bg-pink-400 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-pink-300 rounded-full ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* tT| �� */}
          <label
            htmlFor="profile-image"
            className="absolute bottom-0 right-0 w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {/* �$� �% */}
      <div className="px-6 mb-6">
        <label className="block mb-2 text-[15px] text-gray-900">�$�</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="�$�DP|�X�"
          className="w-full px-4 py-4 text-[15px] text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300"
        />
      </div>

      {/* ��T8� �% */}
      <div className="px-6 mb-8">
        <label className="block mb-2 text-[15px] text-gray-900">��T8�</label>
        <input
          type="text"
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
          placeholder="��T8�� P|� �%t|X�"
          className="w-full px-4 py-4 text-[15px] text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300"
        />
      </div>

      {/* D� �� */}
      <div className="px-6">
        <button
          onClick={handleSubmit}
          className="w-full py-4 text-white bg-[#D32F2F] rounded-lg hover:bg-[#C62828] active:bg-[#B71C1C] transition-colors"
        >
          가나다라
        </button>
      </div>
    </div>
  )
}
