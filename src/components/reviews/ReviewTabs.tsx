'use client'

interface ReviewTabsProps {
  activeTab: 'all' | 'following'
  onTabChange: (tab: 'all' | 'following') => void
}

export default function ReviewTabs({ activeTab, onTabChange }: ReviewTabsProps) {
  return (
    <div className="sticky top-[60px] z-40 flex bg-white border-b border-gray-200">
      <button
        onClick={() => onTabChange('all')}
        className={`flex-1 h-[50px] text-[15px] relative ${
          activeTab === 'all' ? 'text-main' : 'text-gray-500'
        }`}
      >
        전체
        {activeTab === 'all' && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-main" />
        )}
      </button>
      <button
        onClick={() => onTabChange('following')}
        className={`flex-1 h-[50px] text-[15px] relative ${
          activeTab === 'following' ? 'text-main' : 'text-gray-500'
        }`}
      >
        팔로잉
        {activeTab === 'following' && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-main" />
        )}
      </button>
    </div>
  )
}
