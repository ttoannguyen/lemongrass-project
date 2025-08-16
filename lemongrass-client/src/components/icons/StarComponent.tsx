import { useState } from "react";

type StarsProps = {
  rating: number; // scale: 0 - 10
  max?: number; // default: 5 stars
  onRate?: (rating: number) => void; // Callback for when a star is clicked
  interactive?: boolean; // Whether the stars are clickable
};

export function Stars({
  rating,
  max = 5,
  onRate,
  interactive = false,
}: StarsProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const clampedRating = Math.max(0, Math.min(rating, 10));
  const starRating = (clampedRating / 10) * max;
  const roundedRating = Math.round(starRating * 2) / 2;

  const full = Math.floor(roundedRating);
  const half = roundedRating - full === 0.5;
  // const empty = max - full - (half ? 1 : 0);
  const handleStarClick = (index: number) => {
    if (interactive && onRate) {
      // Convert the clicked star index (1-based) to a 0–10 scale rating
      const newRating = ((index + 1) / max) * 10;
      onRate(newRating);
    }
  };

  const handleStarHover = (index: number) => {
    if (interactive) {
      setHoveredRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoveredRating(null);
    }
  };
  return (
    <span
      className="inline-flex items-center gap-[2px]"
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={`star-${i}`}
          state={
            interactive && hoveredRating !== null
              ? i < hoveredRating
                ? "full"
                : "empty"
              : i < full
              ? "full"
              : i === full && half
              ? "half"
              : "empty"
          }
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          className={interactive ? "cursor-pointer" : ""}
        />
      ))}
    </span>
  );
}

type StarState = "full" | "half" | "empty";

export function Star({
  state,
  onClick,
  onMouseEnter,
  className = "",
}: {
  state: StarState;
  onClick?: () => void;
  onMouseEnter?: () => void;
  className?: string;
}) {
  const baseClass = `h-4 w-4 text-highlight ${className}`;

  if (state === "full") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={baseClass}
        fill="currentColor"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        <path
          stroke="currentColor"
          d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    );
  }

  if (state === "half") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={baseClass}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        <defs>
          <linearGradient id="halfGrad" x1="0" x2="1">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
          fill="url(#halfGrad)"
          stroke="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={baseClass}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
