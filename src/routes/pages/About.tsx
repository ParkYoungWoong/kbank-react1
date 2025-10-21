import { useCountStore } from '@/stores/count'

export default function About() {
  const count = useCountStore(s => s.count)
  const increase = useCountStore(s => s.increase)
  // const { count, increase } = useCountStore(s => s)
  // throw new Error('에러가 발생했네요~😘')
  return (
    <>
      <h1>About Page!</h1>
      <h2 onClick={increase}>{count}</h2>
    </>
  )
}
