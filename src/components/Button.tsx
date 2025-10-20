import type { ReactNode, ButtonHTMLAttributes } from 'react'
import Loader from '@/components/Loader'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: ReactNode
}
// type ButtonProps = {
//   children: ReactNode
// } & ButtonHTMLAttributes<HTMLButtonElement>
export default function Button({
  loading,
  children,
  ...restProps
}: ButtonProps) {
  return <button {...restProps}>{loading ? <Loader /> : children}</button>
}

// <Button
//  name="Hello button!"
//  type="submit"
//  disabled={true}
//  loading={true}
// >제출</Button>
