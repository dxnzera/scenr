import { GetServerSideProps } from 'next'
import { getMovieImdbById } from '@/lib/rapidApiClient'
import MovieCard from '@/components/MovieCard'

type Props = {
  data?: any
}

export default function MoviePage({ data }: Props) {
  if (!data) return <main className="p-6">Filme não encontrado.</main>

  return (
    <main className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{data.title || data.fullTitle}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <MovieCard id={data.id} title={data.title || data.fullTitle} poster={data.image && data.image.url} overview={data.plot && data.plot.plotText} />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold">Notas</h2>
            <ul className="list-disc ml-6">
              <li>IMDb: {data.ratings && data.ratings.rating ? data.ratings.rating : '—'}</li>
              <li>Rotten Tomatoes: {data.rottenTomatoesScore || '—'}</li>
            </ul>

            <section className="mt-6">
              <h3 className="font-semibold">Onde assistir</h3>
              <p>Integre Utelly/JustWatch para obter provedores (ex: Netflix, Prime).</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as any
  try {
    const data = await getMovieImdbById(id)
    return { props: { data } }
  } catch (e) {
    return { props: {} }
  }
}
