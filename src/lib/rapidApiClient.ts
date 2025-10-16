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
      'x-rapidapi-key': RAPIDAPI_KEY || '8ad153253bmsh90da055a0cf4e79p15be8ajsn0d98656ff7cb',
      'x-rapidapi-host': IMDB_HOST || '8ad153253bmsh90da055a0cf4e79p15be8ajsn0d98656ff7cb'
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
      'x-rapidapi-key': RAPIDAPI_KEY || '8ad153253bmsh90da055a0cf4e79p15be8ajsn0d98656ff7cb',
      'x-rapidapi-host': IMDB_HOST || '8ad153253bmsh90da055a0cf4e79p15be8ajsn0d98656ff7cb'
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
      'x-rapidapi-key': RAPIDAPI_KEY || '8ad153253bmsh90da055a0cf4e79p15be8ajsn0d98656ff7cb',
      'x-rapidapi-host': TMDB_HOST || '8ad153253bmsh90da055a0cf4e79p15be8ajsn0d98656ff7cb'
    }
  }
  const res = await axios.request(options)
  return res.data
}
