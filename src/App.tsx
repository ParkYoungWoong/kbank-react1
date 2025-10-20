import { useState, useRef, useLayoutEffect } from 'react'

export default function App() {
  const [width, setWidth] = useState(0)
  const divRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect()
      setWidth(rect.width)
    }
  }, [])

  return (
    <div
      ref={divRef}
      style={{ width: '222px' }}>
      <p>Width: {width}px</p>
    </div>
  )
}
