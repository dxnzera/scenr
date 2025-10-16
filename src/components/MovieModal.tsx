'use client';

import { Movie } from '@/types';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { X, Star } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

interface MovieModalProps {
  movie: Movie;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MovieModal({ movie, setOpen }: MovieModalProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof movie.primaryImage === 'string') {
      setImageUrl(movie.primaryImage);
    } else if (movie.primaryImage?.url) {
      setImageUrl(movie.primaryImage.url);
    }
  }, [movie.primaryImage]);

  const isHorizontal = useMemo(() => {
    if (!imageUrl) return false;
    return (
      imageUrl.includes('landscape') ||
      imageUrl.includes('banner') ||
      imageUrl.includes('backdrop')
    );
  }, [imageUrl]);

  const year = movie.releaseDate ? movie.releaseDate.slice(0, 4) : '';

  const InfoLine = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap items-center text-sm text-[var(--color-primary)] gap-2 mb-2">
      {items.map((text, idx) => (
        <span key={idx}>
          {text}
          {idx < items.length - 1 && <span className="mx-2 text-gray-500">•</span>}
        </span>
      ))}
    </div>
  );

  const TechLine = ({ techs }: { techs: string[] }) => (
    <div className="flex flex-wrap items-center text-xs text-[var(--color-primary)] gap-2 mb-3">
      {techs.map((t, i) => (
        <span
          key={i}
          className="border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight"
        >
          {t}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 p-4 overflow-y-auto"
      onClick={() => setOpen(false)}
    >
      <div
        className={`relative card w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl transition-all ${
          isHorizontal ? 'h-[70vh]' : 'flex flex-col md:flex-row p-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Layout com imagem de fundo (horizontal) */}
        {isHorizontal && imageUrl ? (
          <div className="relative w-full h-full rounded-md overflow-hidden">
            <Image
              src={imageUrl}
              alt={movie.primaryTitle}
              fill
              className="object-cover rounded-md"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent rounded-md" />

            <div className="absolute bottom-10 left-10 right-10 text-color-text">
              <p className="text-xs uppercase font-semibold text-[var(--color-primary)] mb-2">
                Novos episódios toda quarta
              </p>

              <h2 className="text-5xl font-magseva font-bold mb-3">
                {movie.primaryTitle}
              </h2>

              {movie.genres && movie.genres.length > 0 && (
                <InfoLine
                  items={[
                    movie.type === 'tv' ? 'Programa de TV' : 'Filme',
                    ...movie.genres,
                    movie.contentRating || 'A16',
                  ]}
                />
              )}

              {movie.description && (
                <p className="text-[var(--color-secondary)] max-w-2xl mb-3 line-clamp-3">
                  {movie.description}
                </p>
              )}

              {/* Linha de tecnologias com rating no início */}
              <div className="flex flex-wrap items-center text-xs text-[var(--color-primary)] gap-2 mb-4">
                {movie.averageRating && (
                  <span className="flex items-center gap-1 border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight">
                    <Star size={14} className="fill-yellow-500 text-yellow-400" />
                    <span>{movie.averageRating}</span>
                  </span>
                )}
                <span className="border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight">4K</span>
                <span className="border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight">
                  Dolby Vision
                </span>
                <span className="border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight">
                  Dolby Atmos
                </span>
                <span className="border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight">CC</span>
                <span className="border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight">AD</span>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {movie.trailer && (
                  <a
                    href={
                      typeof movie.trailer === 'string'
                        ? movie.trailer
                        : movie.trailer?.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black font-semibold rounded-full px-6 py-3 text-sm hover:bg-gray-100 transition"
                  >
                    Reproduzir trailer
                  </a>
                )}

                {movie.url && (
                  <a
                    href={movie.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline text-[var(--color-primary)] hover:text-color-text transition"
                  >
                    Ver no IMDb →
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Layout vertical (imagem à esquerda) */
          <>
            {imageUrl && (
              <div className="flex-shrink-0 md:w-1/3 w-full relative rounded-md overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={movie.primaryTitle}
                  width={400}
                  height={600}
                  className="object-cover h-full w-full rounded-md"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-md" />
              </div>
            )}

            <div className="flex-1 p-6 bg-[var(--color-background)]/90 text-color-text flex flex-col">
              <h2 className="text-4xl font-magseva font-bold mb-3">
                {movie.primaryTitle}
              </h2>

              {movie.genres && movie.genres.length > 0 && (
                <InfoLine
                  items={[
                    movie.type === 'tv' ? 'Programa de TV' : 'Filme',
                    ...movie.genres,
                    movie.contentRating || 'A16',
                  ]}
                />
              )}

              {/* Tech line com rating no início */}
              <div className="flex flex-wrap items-center text-xs text-[var(--color-primary)] gap-2 mb-4">
                {movie.averageRating && (
                  <span className="flex items-center gap-1 border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight">
                    <Star size={14} className="fill-purple-400 text-purple-300" />
                    <span>{movie.averageRating}</span>
                  </span>
                )}
                <span className="border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight">4K</span>
                <span className="border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight">
                  Dolby Vision
                </span>
                <span className="border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight">
                  Dolby Atmos
                </span>
                <span className="border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight">CC</span>
                <span className="border border-gray-500/40 rounded-md px-2 py-0.5 leading-tight">AD</span>
              </div>

              {movie.description && (
                <p className="text-sm text-[var(--color-primary)] leading-relaxed mb-4">
                  {movie.description}
                </p>
              )}

              <div className="flex flex-wrap gap-3 mt-auto">
                {movie.trailer && (
                  <a
                    href={
                      typeof movie.trailer === 'string'
                        ? movie.trailer
                        : movie.trailer?.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black font-semibold rounded-full px-6 py-3 text-sm hover:bg-gray-100 transition"
                  >
                    Reproduzir trailer
                  </a>
                )}

                {movie.url && (
                  <a
                    href={movie.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline text-[var(--color-primary)] hover:text-color-text transition"
                  >
                    Ver no IMDb →
                  </a>
                )}
              </div>
            </div>
          </>
        )}

        <Button
          className="absolute top-4 right-4 text-color-text"
          size={'icon-sm'}
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </Button>
      </div>
    </div>
  );
}
