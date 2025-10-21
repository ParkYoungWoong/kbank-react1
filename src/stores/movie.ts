import { create } from 'zustand'
import { combine } from 'zustand/middleware'
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
  )
)

const obj = {
  a: function () {
    console.log(this)
  },
  b: () => {
    console.log(this)
  },
  c() {
    console.log(this)
  }
}

obj.a()
obj.b()
obj.c()
