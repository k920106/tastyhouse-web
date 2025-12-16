'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { IoChevronBack, IoSearch, IoClose } from 'react-icons/io5'
import { BsThreeDotsVertical } from 'react-icons/bs'

interface FollowUser {
  id: number
  userName: string
  userProfileImage: string | null
  memberBadge: string
  isFollowing: boolean
}

// �� T� pt0
const getDummyFollowers = (): FollowUser[] => [
  {
    id: 1,
    userName: '9��|�D',
    userProfileImage: null,
    memberBadge: 'LXd�',
    isFollowing: true,
  },
  {
    id: 2,
    userName: '9��|�D',
    userProfileImage: null,
    memberBadge: 'LXd�',
    isFollowing: false,
  },
  {
    id: 3,
    userName: '9��|�D',
    userProfileImage: null,
    memberBadge: 'LXd�',
    isFollowing: true,
  },
  {
    id: 4,
    userName: '9��|�D',
    userProfileImage: null,
    memberBadge: 'LXd�',
    isFollowing: true,
  },
]

const getDummyFollowing = (): FollowUser[] => [
  {
    id: 1,
    userName: '�$���',
    userProfileImage: null,
    memberBadge: 'LXd�',
    isFollowing: false,
  },
  {
    id: 2,
    userName: '�$���02',
    userProfileImage: null,
    memberBadge: 'LXd�',
    isFollowing: false,
  },
  {
    id: 3,
    userName: '�$���03',
    userProfileImage: null,
    memberBadge: 'LXd�',
    isFollowing: true,
  },
  {
    id: 4,
    userName: '�$���03',
    userProfileImage: null,
    memberBadge: 'LXd�',
    isFollowing: true,
  },
  {
    id: 5,
    userName: '�$���03',
    userProfileImage: null,
    memberBadge: 'LXd�',
    isFollowing: true,
  },
]

export default function FollowsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'following' | 'follower'>('following')
  const [searchQuery, setSearchQuery] = useState('')
  const [followStates, setFollowStates] = useState<Record<number, boolean>>({})

  const followers = getDummyFollowers()
  const following = getDummyFollowing()

  const currentList = activeTab === 'following' ? following : followers

  const filteredList = currentList.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFollowToggle = (userId: number, currentState: boolean) => {
    setFollowStates((prev) => ({
      ...prev,
      [userId]: prev[userId] !== undefined ? !prev[userId] : !currentState,
    }))
    // TODO: API ��
  }

  const getFollowState = (userId: number, defaultState: boolean) => {
    return followStates[userId] !== undefined ? followStates[userId] : defaultState
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative h-[60px] bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-full">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10"
          >
            <IoChevronBack size={28} className="text-black" />
          </button>
          <h1 className="text-[18px] font-bold">�$�DP|�X�</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-200">
        <button
          onClick={() => setActiveTab('following')}
          className={`flex-1 h-[60px] flex items-center justify-center relative ${
            activeTab === 'following' ? 'text-main' : 'text-gray-400'
          }`}
        >
          <span className="text-[16px] font-bold">\�</span>
          {activeTab === 'following' && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-main" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('follower')}
          className={`flex-1 h-[60px] flex items-center justify-center relative ${
            activeTab === 'follower' ? 'text-main' : 'text-gray-400'
          }`}
        >
          <span className="text-[16px] font-bold">\�</span>
          {activeTab === 'follower' && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-main" />
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4 bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder=""
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[50px] pl-4 pr-12 bg-gray-100 rounded-lg text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-gray-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-12 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center"
            >
              <IoClose size={20} className="text-gray-400" />
            </button>
          )}
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
            <IoSearch size={24} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* User List */}
      <div className="px-4">
        {filteredList.map((user) => {
          const isFollowing = getFollowState(user.id, user.isFollowing)
          return (
            <div
              key={user.id}
              className="flex items-center justify-between py-4 border-b border-gray-100"
            >
              {/* Left: Profile */}
              <div className="flex items-center gap-3">
                <div className="relative w-[50px] h-[50px] rounded-full bg-gray-200 overflow-hidden">
                  {user.userProfileImage ? (
                    <Image
                      src={user.userProfileImage}
                      alt={user.userName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <div className="w-8 h-8 rounded-full bg-white" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[16px] font-bold">{user.userName}</span>
                  <div className="flex items-center gap-1">
                    <Image src="/images/icon-member-badge.png" alt="d� C�" width={16} height={16} />
                    <span className="text-[12px] text-[#FFA500]">{user.memberBadge}</span>
                  </div>
                </div>
              </div>

              {/* Right: Follow Button and Menu */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFollowToggle(user.id, user.isFollowing)}
                  className={`px-5 py-2 rounded-md text-[14px] font-medium ${
                    isFollowing ? 'bg-white border border-main text-main' : 'bg-main text-white'
                  }`}
                >
                  {isFollowing ? '\�' : activeTab === 'follower' ? '�' : '\�'}
                </button>
                <button className="w-8 h-8 flex items-center justify-center">
                  <BsThreeDotsVertical size={18} className="text-gray-400" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredList.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 mb-4">
            <svg viewBox="0 0 100 100" className="text-gray-300 fill-current">
              <circle cx="35" cy="30" r="15" />
              <path d="M10 70 Q10 50 35 50 Q60 50 60 70 Z" />
              <circle cx="70" cy="35" r="12" />
              <path d="M55 80 Q55 65 70 65 Q85 65 85 80 Z" />
            </svg>
          </div>
          <p className="text-gray-400 text-[15px]">
            {searchQuery ? '�� ��  Ƶ��.' : `${activeTab === 'following' ? '\�' : '\�'}  Ƶ��.`}
          </p>
        </div>
      )}
    </div>
  )
}
