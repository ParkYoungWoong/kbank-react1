import { useState, useEffect, Fragment } from 'react'
import { Link, Outlet } from 'react-router'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useMovieStore, useInfiniteMovies } from '@/hooks/movies'
import { useInView } from 'react-intersection-observer'

export default function Movies() {
  const [inputText, setInputText] = useState('')
  const setSearchText = useMovieStore(s => s.setSearchText)
  const {
    data,
    isFetching: loading,
    fetchNextPage,
    hasNextPage
  } = useInfiniteMovies()
  const { ref, inView } = useInView({
    rootMargin: '0px 0px 200px 0px' // only bottom!
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSearchText(inputText)
  }
  return (
    <>
      {/* <button onClick={() => refetch()}>다시 가져오기!</button> */}
      <form onSubmit={handleSubmit}>
        <input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <Button type="submit">검색</Button>
      </form>
      <ul>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            <li>
              ---------------------------{index + 1}---------------------------
            </li>
            {page.Search.map(movie => (
              <li key={movie.imdbID}>
                <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      {loading ? <Loader /> : null}
      <div
        ref={ref}
        style={{ display: loading ? 'none' : 'block', height: '10px' }}></div>
      <Outlet />
    </>
  )
}
