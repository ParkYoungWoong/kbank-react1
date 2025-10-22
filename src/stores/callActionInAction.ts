import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useUserStore = create(
  combine(
    {
      user: null
    },
    () => {
      function a() {
        // ...
        b()
      }
      function b() {
        // ...
      }
      return {
        a,
        b
      }
    }
  )
)
