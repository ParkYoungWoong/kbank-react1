import { create } from 'zustand'
import { combine, persist, devtools } from 'zustand/middleware'
import axios from 'axios'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

// 타입 단언(Assertion): 개발자가 TS에게
// 후행!
// as 타입

export const useMovieStore = create(
  devtools(
    persist(
      combine(
        {
          searchText: '',
          loading: false,
          movies: [] as Movie[]
        },
        function (set, get) {
          return {
            setSearchText(searchText: string) {
              set({
                searchText
              })
            },
            async fetchMovies() {
              set({
                loading: true
              })
              const { searchText } = get()
              const { data } = await axios.get(
                `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
              )
              const movies = data.Search
              set({
                movies,
                loading: false
              })
            }
          }
        }
      ),
      {
        name: 'movie store',
        version: 1
      }
    )
  )
)

// const obj = {
//   a: function () {
//     console.log(this) // 호출 위치
//   },
//   b: () => {
//     console.log(this) // 선언 위치
//   },
//   c() {
//     console.log(this) // 호출 위치
//   }
// }

// obj.a()
// obj.b()
// obj.c()
