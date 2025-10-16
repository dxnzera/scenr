import { useState } from 'react'

type Props = {
  onSearch: (q: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const [q, setQ] = useState('')
  return (
    <form onSubmit={e => { e.preventDefault(); onSearch(q); }} className="w-full max-w-xl mx-auto p-4">
      <div className="flex gap-2">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Pesquisar filmes ou séries..."
          className="flex-1 rounded-md border px-3 py-2 focus:outline-none focus:ring-1 border-[#7847ff] focus:ring-[#7847ff]"
        />
        <button className="rounded-md px-4 py-2 bg-[#7847ff] text-white">Pesquisar</button>
      </div>
    </form>
  )
}
