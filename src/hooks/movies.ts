import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export const useMovieStore = create(
  combine(
    {
      searchText: ''
    },
    set => {
      return {
        setSearchText(searchText: string) {
          set({
            searchText
          })
        }
      }
    }
  )
)

export function useMovies() {
  const searchText = useMovieStore(state => state.searchText)
  return useQuery<Movie[]>({
    queryKey: ['movies', searchText],
    queryFn: async function () {
      const { data } = await axios.get(
        `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
      )
      const movies = data.Search || []
      return movies
    },
    staleTime: 1000 * 60, // ms
    enabled: Boolean(searchText),
    placeholderData: prev => prev
  })
}
