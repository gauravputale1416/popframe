import React from "react";

function Rating({ rating = 0, onClick }) {
  const MAX = 5;
  const rounded = Math.round(Number(rating) || 0);

  return (
    <div className="flex items-center justify-center mb-4 cursor-pointer" role="img" aria-label={`Rating: ${rating} out of ${MAX}`}>
      {Array.from({ length: MAX }).map((_, i) => {
        const pos = i + 1;
        const filled = pos <= rounded;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onClick && onClick(pos)}
            className={`text-amber-400 text-2xl px-1 focus:outline-none ${filled ? "" : "opacity-60"}`}
            aria-label={`${pos} star`}
            title={`${pos} star`}
          >
            {filled ? "★" : "☆"}
          </button>
        );
      })}
    </div>
  );
}

export default Rating;
