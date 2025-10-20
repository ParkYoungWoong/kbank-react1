import { useState, useCallback } from 'react'

export default function Test() {
  const [count, setCount] = useState(0)

  const abc = useCallback(function () {
    console.log(123)
  }, [])

  return (
    <>
      <h1 onClick={() => setCount(count + 1)}>{count}</h1>
    </>
  )
}
