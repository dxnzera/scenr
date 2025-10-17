// Search using the correct endpoint for movies (not autocomplete)
export async function searchImdbMovies({
  type = 'movie',
  genre = '',
  rows = 25,
  sortOrder = 'ASC',
  sortField = 'id',
  query = ''
}: {
  type?: string;
  genre?: string;
  rows?: number;
  sortOrder?: string;
  sortField?: string;
  query?: string;
}) {
  const url = `https://imdb236.p.rapidapi.com/api/imdb/search`;
  const params = new URLSearchParams({
    type,
    rows: String(rows),
    sortOrder,
    sortField,
  });
  if (genre && genre.trim() !== '') params.append('genre', genre);
  if (query) params.append('query', query);
  const res = await fetch(`${url}?${params.toString()}`,
    {
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || 'a805010bfbmshf8009517592661ap155849jsnec47ef936a96',
        'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'imdb236.p.rapidapi.com',
      },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}
import axios from 'axios'

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY
const IMDB_HOST = process.env.IMDB_HOST
const ROTTEN_HOST = process.env.ROTTEN_HOST
const TMDB_HOST = process.env.TMDB_HOST

if (!RAPIDAPI_KEY) {
  console.warn('RAPIDAPI_KEY not set. Create .env.local from .env.example')
}

export async function searchImdb(query: string) {
  const options = {
    method: 'GET',
    url: `https://${IMDB_HOST}/title/find`,
    params: { q: query },
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY || 'a805010bfbmshf8009517592661ap155849jsnec47ef936a96',
      'x-rapidapi-host': IMDB_HOST || 'a805010bfbmshf8009517592661ap155849jsnec47ef936a96'
    }
  }
  const res = await axios.request(options)
  return res.data
}

export async function getMovieImdbById(id: string) {
  const options = {
    method: 'GET',
    url: `https://${IMDB_HOST}/title/get-overview-details`,
    params: { tconst: id },
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY || 'a805010bfbmshf8009517592661ap155849jsnec47ef936a96',
      'x-rapidapi-host': IMDB_HOST || 'a805010bfbmshf8009517592661ap155849jsnec47ef936a96'
    }
  }
  const res = await axios.request(options)
  return res.data
}
export async function searchTmdb(query: string) {
  const options = {
    method: 'GET',
    url: `https://${TMDB_HOST}/search/movie`,
    params: { query },
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY || 'a805010bfbmshf8009517592661ap155849jsnec47ef936a96',
      'x-rapidapi-host': TMDB_HOST || 'a805010bfbmshf8009517592661ap155849jsnec47ef936a96'
    }
  }
  const res = await axios.request(options)
  return res.data
}
