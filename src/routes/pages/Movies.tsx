import { Link, Outlet } from 'react-router'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useMovieStore } from '@/stores/movie'
import { useQuery } from '@tanstack/react-query'

export default function Movies() {
  const searchText = useMovieStore(s => s.searchText)
  const setSearchText = useMovieStore(s => s.setSearchText)
  const fetchMovies = useMovieStore(s => s.fetchMovies)
  const loading = useMovieStore(s => s.loading)
  const movies = useMovieStore(s => s.movies)
  useQuery({
    queryKey: [],
    queryFn: async function () {},
    enabled: false
  })

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
