import React, { useState } from "react"
import Link from "next/link"
import type { NextPage } from "next"
// Fetch hook
import { useFetchMovies } from "../api/fetchHooks"
// Config
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../config"
// Components
import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import Grid from "../components/Grid/Grid"
import Card from "../components/Card/Card"
import Spinner from "../components/Spinner/Spinner"

const Home: NextPage = () => {
  const [query, setQuery] = useState("")

  const { data, fetchNextPage, isLoading, isFetching, error } = useFetchMovies(query)

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget

    if (scrollHeight - scrollTop === clientHeight) fetchNextPage()
  }

  if (error) return <div>Something went wrong</div>

  return (
    <main className="relative h-screen overflow-y-scroll bg-zinc-700" onScroll={handleScroll}>
      <Header setQuery={setQuery} />
      {!query && data && data.pages ? (
        <Hero
          imgUrl={data.pages[0].results[0]?.backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + data.pages[0].results[0].backdrop_path : "/no_image.jpg"}
          title={data.pages[0].results[0].title}
          text={data.pages[0].results[0].overview}
        />
      ) : null}
      <Grid
        className="p-4 max-w-7xl m-auto"
        title={query ? `Search Results: ${data?.pages[0].total_results}` : "Popular Movies"}
      >
        {data && data.pages
          ? data.pages.map(page =>
            page.results.map(movie =>
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <div className="cursor-pointer hover:opacity-80 duration-300">
                  <Card
                    imgUrl={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : "/no_image.jpg"}
                    title={movie.original_title}
                  />
                </div>
              </Link>
            ))
          : null}
      </Grid>

      {isLoading || isFetching ? <Spinner /> : null}
    </main >
  )
}

export default Home
