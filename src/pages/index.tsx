
import { useEffect, useState } from 'react'
import { searchTmdb } from '@/lib/rapidApiClient'
import Header from '@/components/Header'
import MovieModal from '@/components/MovieModal'
import MovieList from '@/components/movieList'
import Footer from '@/components/Footer'

interface Category {
  title: string
  movies: any[]
}

const defaultCategories = [
  { title: 'Terror', query: 'horror' },
  { title: 'Drama', query: 'drama' },
  { title: 'Comédia', query: 'comedy' },
  { title: 'Ação', query: 'action' },
]

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    setLoading(true)
    try {
      const cats: Category[] = []
      for (const c of defaultCategories) {
        const res = await searchTmdb(c.query)
        const movies = res?.results?.map((r: any) => ({
          id: String(r.id),
          title: r.title || r.name,
          poster: r.poster_path ? `https://image.tmdb.org/t/p/w500${r.poster_path}` : undefined,
          overview: r.overview,
          year: (r.release_date || '').split('-')[0]
        })) || []
        cats.push({ title: c.title, movies })
      }
      setCategories(cats)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <Header onMovieSelect={setSelectedMovie} />
      <div className="p-6">
        {loading && <p className="text-center text-lg animate-pulse mt-8">Carregando...</p>}
        <h2 className="text-2xl font-magseva p-4">Most Popular Movies</h2>
        <MovieList type="movie" />
        <h2 className="text-2xl font-magseva p-4">Most Popular TV Shows</h2>
        <MovieList type="tv" />
      </div>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} setOpen={(open) => {
          if (!open) setSelectedMovie(null)
        }} />
      )}
      <Footer />
    </main>
  )
}
