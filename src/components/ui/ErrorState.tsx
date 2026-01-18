'use client'

import { MdRefresh } from 'react-icons/md'
import AppButton from './AppButton'
import ErrorMessage from './ErrorMessage'
import FixedBottomSection from './FixedBottomSection'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export default function ErrorState({
  message,
  onRetry,
}: ErrorStateProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <ErrorMessage message={message} />
      <FixedBottomSection className="px-[15px] py-2.5">
        <AppButton
          onClick={handleRetry}
          className="bg-main"
        >
          <MdRefresh size={20} />
          다시 시도
        </AppButton>
      </FixedBottomSection>
    </div>
  )
}
