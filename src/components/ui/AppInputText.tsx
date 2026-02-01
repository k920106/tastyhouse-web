import AppInput from './AppInput'

type AppInputTextProps = Omit<React.ComponentProps<typeof AppInput>, 'type'>

export default function AppInputText(props: AppInputTextProps) {
  return <AppInput type="text" {...props} />
}
