import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialState = {
  count: 0
}

export const useCountStore = create(
  combine(initialState, function (set, get) {
    return {
      actions: {
        resetCount: function () {
          set({
            count: initialState.count
          })
        },
        increase: function () {
          const { count } = get()
          set({
            count: count + 1
          })
        },
        decrease: function () {
          const { count } = get()
          set({
            count: count - 1
          })
        }
      }
    }
  })
)
