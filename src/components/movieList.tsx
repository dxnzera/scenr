'use client';

import { useEffect, useRef, useState } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import { Movie } from '../types';

interface MovieListProps {
  type?: 'movie' | 'tv';
}

export default function MovieList({ type = 'movie' }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cacheKey = `movies-cache-${type}`;

    const fetchMovies = async () => {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          console.log('Usando cache local:', cacheKey);
          setMovies(JSON.parse(cached));
          setLoading(false);
          return;
        }

        setLoading(true);
        const url =
          type === 'tv'
            ? 'https://imdb236.p.rapidapi.com/api/imdb/most-popular-tv'
            : 'https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies';

        const res = await fetch(url, {
          headers: {
            'X-RapidAPI-Key':
              process.env.NEXT_PUBLIC_RAPIDAPI_KEY ||
              '8ad153253bmsh90da055a0cf4e79p15be8ajsn0d98656ff7cb',
            'X-RapidAPI-Host':
              process.env.NEXT_PUBLIC_RAPIDAPI_HOST ||
              'imdb236.p.rapidapi.com',
          },
        });

        const data = await res.json();
        console.log('🔍 Dados crus da API:', data);

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];

        console.log(`✅ ${list.length} resultados recebidos`);

        const formattedMovies: Movie[] = list.map((item: any) => ({
          id: item.id || item.imdb_id || Math.random().toString(),
          type,
          primaryTitle: item.primaryTitle || item.title || item.name || 'Sem título',
          originalTitle: item.originalTitle || '',
          description: item.description || item.plot || '',
          primaryImage:
            item.primaryImage ||
            item.image ||
            item.poster ||
            item.posterUrl ||
            undefined,
          averageRating: item.averageRating || item.rating || undefined,
          releaseDate: item.releaseDate || item.year || '',
          startYear: item.startYear,
          endYear: item.endYear ?? null,
          genres: item.genres || [],
          runtime: item.runtime || '',
          runtimeMinutes: item.runtimeMinutes || undefined,
          trailer: item.trailer || '',
          whereToWatch: item.whereToWatch || [],
          contentRating: item.contentRating || '',
          budget: item.budget || undefined,
          grossWorldwide: item.grossWorldwide || undefined,
          numVotes: item.numVotes || undefined,
          metascore: item.metascore || undefined,
          isAdult: item.isAdult ?? false,
          externalLinks: item.externalLinks || [],
        }));

        console.log('🎬 Filmes formatados:', formattedMovies.slice(0, 3));

        setMovies(formattedMovies);
        localStorage.setItem(cacheKey, JSON.stringify(formattedMovies));
        setLoading(false);
      } catch (err) {
        console.error('❌ Erro ao buscar filmes:', err);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [type]);

  if (loading) return <p>Carregando...</p>;
  if (!movies.length) return <p>Nenhum filme encontrado</p>;

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth p-4"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 transition-transform duration-300"
            onClick={() => {
              setSelectedMovie(movie);
              setModalOpen(true);
            }}
          >
            <MovieCard movie={movie} onClick={() => {
              setSelectedMovie(movie);
              setModalOpen(true);
            }} />
          </div>
        ))}
      </div>

      {modalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} setOpen={setModalOpen} />
      )}
    </div>
  );
}
