import { cn } from '@/lib/utils'
import { Input } from './shadcn/input'

type AppInputProps = React.ComponentProps<'input'>

export default function AppInput({ className, ...props }: AppInputProps) {
  return (
    <Input
      className={cn(
        'w-full h-[50px] pl-[16px] pr-[40px] py-5 text-sm leading-[14px] border border-[#eeeeee] box-border rounded-none focus-visible:ring-0 focus-visible:border-[#666666]',
        className,
      )}
      {...props}
    />
  )
}
