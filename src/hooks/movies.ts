import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export interface Page {
  Response: 'True' | 'False'
  Search: Movie[]
  totalResults: `${number}`
}
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

export function useInfiniteMovies() {
  const searchText = useMovieStore(state => state.searchText)
  return useInfiniteQuery<Page>({
    queryKey: ['movies', searchText],
    queryFn: async function ({ pageParam }) {
      const { data } = await axios.get(
        `https://omdbapi.com?apikey=7035c60c&s=${searchText}&page=${pageParam}`
      )
      return data
    },
    staleTime: 1000 * 60, // ms
    enabled: Boolean(searchText),
    placeholderData: prev => prev,
    initialPageParam: 1,
    getNextPageParam: function (lastPage, pages) {
      const maxPage = Math.ceil(Number.parseInt(lastPage.totalResults, 10) / 10)
      if (lastPage.Response === 'True' && pages.length < maxPage) {
        return pages.length + 1
      }
      return null
    }
  })
}
