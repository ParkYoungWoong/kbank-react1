import { create } from 'zustand'
import { combine, subscribeWithSelector } from 'zustand/middleware'

export const useCountStore = create(
  subscribeWithSelector(
    combine(
      {
        count: 0,
        double: 0 // Getter | Computed
      },
      function (set, get) {
        return {
          increase: function () {
            const { count } = get()
            set({
              count: count + 1
            })
          }
        }
      }
    )
  )
)

// Vuex Getters | Vue Computed
// useCountStore.subscribe(선택자, 콜백)
useCountStore.subscribe(
  state => state.count,
  count => {
    useCountStore.setState({
      double: count * 2
    })
  }
)
