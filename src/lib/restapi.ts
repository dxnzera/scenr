export async function fetchMovies(query: string) {
  const url = `https://imdb236.p.rapidapi.com/imdb/search/title/${encodeURIComponent(query)}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "8ad153253bmsh90da055a0cf4e79p15be8ajsn0d98656ff7cb",
      "x-rapidapi-host": "imdb236.p.rapidapi.com",
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      console.error("Erro na API:", res.statusText);
      return [];
    }

    const data = await res.json();

    return data.results || data || [];
  } catch (err) {
    console.error("Erro ao buscar filmes:", err);
    return [];
  }
}
