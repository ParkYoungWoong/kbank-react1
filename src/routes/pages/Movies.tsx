import { useState } from 'react'
import { Link, Outlet } from 'react-router'
import axios from 'axios'
import Button from '@/components/Button'
import Loader from '@/components/Loader'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export default function Movies() {
  const [searchText, setSearchText] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchMovies() {
    setLoading(true)
    const { data } = await axios.get(
      `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
    )
    const movies = data.Search
    setMovies(movies)
    setLoading(false)
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    fetchMovies()
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button type="submit">검색</Button>
      </form>
      {loading ? <Loader /> : null}
      <ul>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  )
}
