import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// export const useUserStore = create(
//   미들웨어(
//     미들웨어(
//       미들웨어()
//     )
//   )
// )

export const useUserStore = create(
  immer(
    combine(
      {
        user: {
          name: '',
          age: -1,
          address: {
            city: '',
            emails: ['a@test.com', 'b@test.com'] as string[]
          }
        }
      },
      set => {
        return {
          updateFirstEmail(newEmail: string) {
            set(state => {
              state.user.address.emails[0] = newEmail
            })
            // set(state => {
            //   return {
            //     user: {
            //       ...state.user,
            //       address: {
            //         ...state.user.address,
            //         emails: [newEmail, state.user.address.emails[1]]
            //       }
            //     }
            //   }
            // })
          },
          addUserAge(ageToAdd = 1) {
            // const state = get()
            // const { user } = state
            // set({
            //   user: {
            //     ...user,
            //     age: user.age + ageToAdd
            //   }
            // })
            set(state => {
              return {
                user: {
                  ...state.user,
                  age: state.user.age + ageToAdd
                }
              }
            })
          },
          signin() {
            // API 호출...
          }
        }
      }
    )
  )
)
