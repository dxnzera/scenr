import Image from "next/image";
import { Star } from "lucide-react";
import { Movie } from "../types";

interface MovieCardProps {
  movie: Movie | any;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {  
  const rawImage =
    typeof movie.primaryImage === "string"
      ? movie.primaryImage
      : movie.primaryImage?.url ||
        movie.primaryImage?.id ||
        movie.primaryImage?.imageUrl ||
        movie.image ||
        movie?.poster ||
        movie?.posterUrl;
  
  const imageUrl =
    rawImage && /^https?:\/\//.test(rawImage)
      ? rawImage
      : "/images/placeholder.png";
  
  const title =
    movie.primaryTitle ||
    movie.originalTitle ||
    movie.title ||
    movie.name ||
    "Untitled";

  return (
    <div
      className="card bg-[var(--color-surface)] transition-transform duration-300 cursor-pointer w-[250px] p-3 h-full"
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt={title}
        width={220}
        height={330}
        className="rounded-lg object-cover w-full h-[330px]"
        unoptimized
      />

      <div className="p-2">
        <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>

        {movie.releaseDate && (
          <p className="text-xs text-muted-foreground">{movie.releaseDate}</p>
        )}
        
        {movie.averageRating && (
          <div className="flex flex-row items-center gap-1 mt-1">
            <Star size={16} className="fill-purple-400 text-purple-300" />
            <p className="text-sm text-purple-800 dark:text-purple-200">
              {movie.averageRating.toFixed(1)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
