'use client'

import { Event } from '@/types/api/event'
import Image from 'next/image'
import { useState } from 'react'

// �� T� pt0
const dummyEvents: Event[] = [
  {
    id: 1,
    title: '8� �܌� �� `x t��',
    imageUrl: '/images/events/event1.png',
    startDate: '2020-08-03',
    endDate: '2020-08-31',
    status: 'ongoing',
    type: 'ongoing',
  },
  {
    id: 2,
    title: '8� �܌� �� `x t��',
    imageUrl: '/images/events/event2.png',
    startDate: '2020-08-03',
    endDate: '2020-08-31',
    status: 'ongoing',
    type: 'ongoing',
  },
  {
    id: 3,
    title: '8� �܌� �� `x t��',
    imageUrl: '/images/events/event3.png',
    startDate: '2020-08-03',
    endDate: '2020-08-31',
    status: 'ongoing',
    type: 'ongoing',
  },
]

type TabType = 'ongoing' | 'ended' | 'winner'

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('ongoing')

  const filteredEvents = dummyEvents.filter((event) => event.type === activeTab)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center h-[56px] px-4">
          <button className="p-2 -ml-2" onClick={() => window.history.back()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#1A1A1A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-[18px] font-semibold pr-10">t��</h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white sticky top-[56px] z-10">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`flex-1 py-4 text-[15px] relative ${
            activeTab === 'ongoing' ? 'text-[#FF6B35]' : 'text-gray-500'
          }`}
        >
          ĉ t��
          {activeTab === 'ongoing' && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B35]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('ended')}
          className={`flex-1 py-4 text-[15px] relative ${
            activeTab === 'ended' ? 'text-[#FF6B35]' : 'text-gray-500'
          }`}
        >
          �� t��
          {activeTab === 'ended' && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B35]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('winner')}
          className={`flex-1 py-4 text-[15px] relative ${
            activeTab === 'winner' ? 'text-[#FF6B35]' : 'text-gray-500'
          }`}
        >
          ��� \
          {activeTab === 'winner' && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B35]" />
          )}
        </button>
      </div>

      {/* Event List */}
      <div className="p-4 space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg overflow-hidden cursor-pointer"
            onClick={() => (window.location.href = `/events/${event.id}`)}
          >
            <div className="relative w-full aspect-[2/1] bg-gray-100">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-[16px] font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-[14px] text-gray-400">
                {event.startDate} ~ {event.endDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
