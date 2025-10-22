import { useState } from 'react'
import { Link, Outlet } from 'react-router'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useMovieStore, useMovies } from '@/hooks/movies'

export default function Movies() {
  const [inputText, setInputText] = useState('')
  const setSearchText = useMovieStore(s => s.setSearchText)
  const { data: movies = [], isFetching: loading, refetch } = useMovies()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSearchText(inputText)
  }
  return (
    <>
      <button onClick={() => refetch()}>다시 가져오기!</button>
      <form onSubmit={handleSubmit}>
        <input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
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
