import { useCountStore } from '@/stores/count'

export default function About() {
  const count = useCountStore(s => s.count)
  // const increase = useCountStore(s => s.increase)
  // const decrease = useCountStore(s => s.decrease)
  const { increase, decrease } = useCountStore(s => s.actions)

  return (
    <>
      <h1>About Page!</h1>
      <h2>{count}</h2>
      <h2 onClick={increase}>+1</h2>
      <h2 onClick={decrease}>-1</h2>
    </>
  )
}
