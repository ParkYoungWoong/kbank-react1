import { useState, useCallback } from 'react'

export function useInput(initialText = '') {
  const [value, setValue] = useState(initialText)

  // 입력 변경 핸들러
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  return {
    value,
    onChange
  }
}
