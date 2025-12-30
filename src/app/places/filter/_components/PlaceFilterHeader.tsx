'use client'

import Header, { HeaderCenter, HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { RxReload } from 'react-icons/rx'

interface PlaceFilterHeaderProps {
  onReset: () => void
}

export default function PlaceFilterHeaderSection({ onReset }: PlaceFilterHeaderProps) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        <h1 className="text-[17px] leading-[17px]">필터</h1>
      </HeaderCenter>
      <HeaderRight>
        <button
          className="w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
          onClick={onReset}
        >
          <RxReload size={20} />
        </button>
      </HeaderRight>
    </Header>
  )
}
