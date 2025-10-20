import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

// Typing
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function App() {
  const [count] = useState(0)
  const [movies, setMovies] = useState<Movie[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchMovies()
    inputRef.current?.focus()
  }, [])

  async function fetchMovies() {
    const { data } = await axios.get(
      'https://omdbapi.com?apikey=7035c60c&s=frozen'
    ) // 겨울왕국
    const movies = data.Search
    setMovies(movies)
  }
  return (
    <>
      <input
        ref={inputRef}
        type="text"
        onKeyDown={event => {
          if (event.nativeEvent.isComposing) return
          if (event.key === 'Enter') {
            console.log('KeyDown event!!', event)
          }
        }}
      />
      <button id="btn">클릭</button>
      <h1 className="text-4xl font-bold">App.tsx</h1>
      <h2>{count}</h2>
      {movies.map(movie => (
        <div key={movie.imdbID}>
          <div>{movie.Title}</div>
          <img
            src={movie.Poster}
            alt={movie.Title}
          />
        </div>
      ))}
    </>
  )
}
