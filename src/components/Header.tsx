'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { searchImdbMovies } from '@/lib/rapidApiClient';
// Removido MovieModal do Header
import { Input } from '@/components/ui/input';
import ThemeToggle from '../components/ThemeToggle';
import User from '@/components/User';

interface HeaderProps {
  onMovieSelect?: (movie: any) => void;
}

export default function Header({ onMovieSelect }: HeaderProps) {
  // Handle selection from dropdown
  function handleSelect(movie: any) {
    // Mapeamento robusto para o formato Movie esperado pelo MovieModal
    // Extrai trailer, url do IMDb, imagem, gêneros, etc
    const mappedMovie = {
      id: movie.id,
      primaryTitle: movie.primaryTitle || movie.title || movie.name || '',
      originalTitle: movie.originalTitle || '',
      description: movie.description || movie.plot || '',
      primaryImage:
        (typeof movie.primaryImage === 'string' && movie.primaryImage) ||
        movie.primaryImage?.url ||
        movie.image ||
        movie.poster ||
        movie.posterUrl ||
        undefined,
      averageRating: movie.averageRating || movie.rating || undefined,
      releaseDate: movie.releaseDate || movie.year || movie.startYear || '',
      type: movie.type,
      genres:
        Array.isArray(movie.genres)
          ? movie.genres
          : typeof movie.genre === 'string'
          ? [movie.genre]
          : [],
      trailer:
        movie.trailer?.url ||
        movie.trailer ||
        (movie.videos && movie.videos.length > 0 ? movie.videos[0].url : undefined) ||
        '',
      url:
        (typeof movie.url === 'string' && movie.url.startsWith('http') && movie.url.includes('imdb.com'))
          ? movie.url
          : movie.imdbUrl ||
            (movie.id ? `https://www.imdb.com/title/${movie.id}/` : undefined),
      contentRating: movie.contentRating || movie.ratingCertificate || '',
      runtimeMinutes: movie.runtimeMinutes || undefined,
      averageVote: movie.averageVote || undefined,
      numVotes: movie.numVotes || undefined,
      metascore: movie.metascore || undefined,
      // outros campos opcionais podem ser mapeados conforme necessário
    };
    if (onMovieSelect) onMovieSelect(mappedMovie);
    setShowDropdown(false);
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // Removido selectedMovie do Header
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  // Debounced input handler for search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchResults(value, true);
    }, 400);
  };

  // Handle Enter key (form submit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResults(searchQuery, true);
  };

  // Fetch real search results from RapidAPI
  const fetchResults = async (query: string, forceShow = false) => {
    if (!query) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    try {
      // Busca usando autocomplete
      const url = `https://imdb236.p.rapidapi.com/api/imdb/autocomplete?query=${encodeURIComponent(query)}`;
      const headers = {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '8ad153253bmsh90da055a0cf4e79p15be8ajsn0d98656ff7cb',
        'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'imdb236.p.rapidapi.com',
      };
      console.log('Fetching (autocomplete):', url);
      console.log('Headers:', headers);
  const res = await fetch(url, { headers });
  const data = await res.json();
  console.log('API response:', data);
  let list = Array.isArray(data) ? data : (Array.isArray(data.results) ? data.results : []);
  setResults(list);
  setShowDropdown(forceShow || list.length > 0);
    } catch (err) {
      console.error('API error:', err);
      setResults([]);
      setShowDropdown(forceShow);
    }
    setLoading(false);
  };

  return (
  <header className="flex items-center justify-between p-4 sticky top-0 z-50 bg-[var(--color-background)] shadow-lg shadow-purple-500/10 backdrop-blur-md">
      {/* Logo */}
      <div className="flex flex-col justify-center items-center relative">
        <Image
          src="/images/LogotipoLight.png"
          alt="Logo"
          width={120}
          height={40}
          className="pb-1 opacity-100 dark:opacity-0 transition-opacity"
        />
        <Image
          src="/images/Logotipo.png"
          alt="Logo"
          width={120}
          height={40}
          className="absolute pb-1 opacity-0 dark:opacity-100 transition-opacity"
        />
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-4 relative">
        <form onSubmit={handleSubmit} autoComplete="off">
          <Input
            placeholder="Pesquisar filmes e séries"
            value={searchQuery}
            onChange={handleInputChange}
            className="card w-full"
            autoComplete="off"
            onFocus={() => searchQuery && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
        </form>
        {showDropdown && (
          <div className="absolute bg-color-background left-0 right-0 top-full shadow-lg z-50 mt-1 max-h-72 overflow-auto">
            {loading ? (
              <div className="p-3 text-center text-sm text-muted-foreground">Carregando...</div>
            ) : results.length ? (
              results.map((movie: any, idx: number) => (
                <div
                  key={movie.id || idx}
                  className="px-4 py-2 cursor-pointer hover:bg-accent"
                  onMouseDown={() => handleSelect(movie)}
                >
                  <span className="font-medium">{movie.primaryTitle || movie.title || movie.name}</span>
                  {movie.releaseDate && <span className="ml-2 text-xs text-muted-foreground">({movie.releaseDate.slice(0,4)})</span>}
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-sm text-muted-foreground">Nenhum resultado</div>
            )}
          </div>
        )}
      </div>

  {/* MovieModal removido do Header, agora será controlado pelo componente pai */}

      {/* User */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <User />
      </div>
    </header>
  );
}