import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useCountStore = create(
  combine(
    {
      count: 0
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
