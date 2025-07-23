type StarsProps = {
  rating: number; // scale: 0 - 10
  max?: number; // default: 5 stars
};

export function Stars({ rating, max = 5 }: StarsProps) {
  const clampedRating = Math.max(0, Math.min(rating, 10));
  const starRating = (clampedRating / 10) * max;
  const roundedRating = Math.round(starRating * 2) / 2;

  const full = Math.floor(roundedRating);
  const half = roundedRating - full === 0.5;
  const empty = max - full - (half ? 1 : 0);

  return (
    <span className="inline-flex items-center gap-[2px]">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} state="full" />
      ))}
      {half && <Star state="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} state="empty" />
      ))}
    </span>
  );
}

type StarState = "full" | "half" | "empty";

export function Star({ state }: { state: StarState }) {
  const className = "h-4 w-4 text-highlight"; // or use 'text-highlight'

  if (state === "full") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path
          stroke="currentColor"
          d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    );
  }

  if (state === "half") {
    return (
      <svg viewBox="0 0 24 24" className={className}>
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
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
