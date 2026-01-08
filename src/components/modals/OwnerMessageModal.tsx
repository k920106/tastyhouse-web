import AppButton from '@/components/ui/AppButton'
import {
  Modal,
  ModalContentWrapper,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/Modal'

interface OwnerMessageModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message: string
  createdAt: string
}

export function OwnerMessageModal({
  open,
  onOpenChange,
  message,
  createdAt,
}: OwnerMessageModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalHeader>
        <ModalTitle className="pt-10 pb-[30px] text-base leading-[16px] text-center font-bold">
          사장님 한마디
        </ModalTitle>
      </ModalHeader>
      <ModalDescription className="sr-only">사장님 한마디</ModalDescription>
      <ModalContentWrapper className="px-5 pb-[30px]">
        <p className="mb-10 text-[14px] leading-relaxed whitespace-pre-wrap">{message}</p>
        <p className="text-xs leading-[12px] text-[#cccccc] text-right">{createdAt} 작성됨</p>
      </ModalContentWrapper>
      <ModalFooter>
        <AppButton className="bg-main" onClick={() => onOpenChange(false)}>
          확인
        </AppButton>
      </ModalFooter>
    </Modal>
  )
}
