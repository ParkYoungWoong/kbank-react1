import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

type Abc = number[]

export default function Test() {
  const queryClient = useQueryClient()

  // useQuery
  const { data: abc } = useQuery<Abc>({
    queryKey: ['abc'],
    queryFn: async function () {
      console.log('Abc Query!!!')
      return [1, 2, 3, 4, 5]
    },
    staleTime: 0
  })

  // useMutation
  const { mutateAsync } = useMutation({
    mutationFn: async function (num: number) {
      return new Promise(resolve => {
        setTimeout(() => {
          // reject(new Error('Mutation Error!!!!!!'))
          resolve(num + 1) // 처리된 실제 결과
        }, 3000)
      })
    },
    onMutate: function (num) {
      // 낙관적 업데이트
      const backupAbc = queryClient.getQueryData<Abc>(['abc'])
      if (backupAbc) {
        const newAbc = [...backupAbc, num + 1]
        queryClient.setQueryData(['abc'], newAbc) // [1, 2, 3, 4, 5, 8]
      }
      return backupAbc
    },
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ['abc'] })
    },
    onError: function (_a, _b, backupAbc) {
      queryClient.setQueryData(['abc'], backupAbc)
    },
    onSettled: function () {}
  })

  return (
    <>
      {abc?.map(num => <div key={num}>{num}</div>)}
      <button onClick={() => mutateAsync(7)}>전송</button>
    </>
  )
}
