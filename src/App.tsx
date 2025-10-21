import { useState } from 'react'
import { useInput } from '@/hooks/input'

export default function App() {
  const name = useInput()
  const password = useInput()

  return (
    <form>
      <input
        type="text"
        {...name}
      />
      <input
        type="password"
        {...password}
      />
    </form>
  )
}
