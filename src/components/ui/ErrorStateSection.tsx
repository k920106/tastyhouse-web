'use client'

import { MdRefresh } from 'react-icons/md'
import Header, { HeaderCenter, HeaderLeft } from '../layouts/Header'
import { BackButton } from '../layouts/header-parts'
import AppButton from './AppButton'
import ErrorMessage from './ErrorMessage'

interface ErrorStateSectionProps {
  onRetry?: () => void | Promise<void>
  message: string
}

export default function ErrorStateSection({ onRetry, message }: ErrorStateSectionProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    } else {
      window.location.reload()
    }
  }

  return (
    <section className="flex flex-col min-h-screen">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <h1 className="text-[17px] leading-[17px]">ERROR</h1>
        </HeaderCenter>
      </Header>
      <div className="flex-1 flex items-center justify-center">
        <ErrorMessage message={message} />
      </div>
      <div className="p-4">
        <AppButton onClick={handleRetry} className="bg-main w-full">
          <MdRefresh size={20} />
          다시 시도
        </AppButton>
      </div>
    </section>
  )
}
