import AppButton from './AppButton'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './shadcn/dialog'

interface AppDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export default function AppDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent showCloseButton={false} className="sm:max-w-sm gap-0 p-0 overflow-hidden">
        <DialogHeader className="gap-[17px] px-7 pt-[30px] pb-6 text-center sm:text-center">
          <DialogTitle className="text-[17px] leading-[17px] font-normal">{title}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-[#999999] whitespace-pre-line">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-0 sm:flex-row">
          <DialogClose asChild>
            <AppButton
              className="flex-1 py-4 text-[16px] leading-[16px] text-black bg-[#eeeeee] cursor-pointer"
              onClick={onCancel}
            >
              {cancelLabel}
            </AppButton>
          </DialogClose>
          <DialogClose asChild>
            <AppButton
              className="flex-1 py-4 text-[16px] leading-[16px] text-white bg-main cursor-pointer"
              onClick={onConfirm}
            >
              {confirmLabel}
            </AppButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
