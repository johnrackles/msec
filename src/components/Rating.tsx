"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Props = { id: string; className?: string };

export function Rating({ id, className }: Props) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // load rating from localStorage
  useEffect(() => {
    const rating = localStorage.getItem(`rating-${id}`);
    if (rating) {
      setRating(parseInt(rating, 10));
    }
  }, [id]);

  const handleClick = (rating: number) => {
    setRating(rating);
    localStorage.setItem(`rating-${id}`, rating.toString());
  };

  const handleHover = (rating: number) => {
    setHoverRating(rating);
  };

  const array = [...Array(5).keys()];

  return (
    <div className={cn("rating z-10 flex flex-row", className)}>
      {array.map((item) => (
        <TooltipProvider key={item}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="rating-button m-0 p-0 transition-colors"
                onClick={() => {
                  handleClick(item + 1);
                }}
                onMouseEnter={() => {
                  handleHover(item + 1);
                }}
                onMouseLeave={() => {
                  handleHover(0);
                }}
              >
                <Star
                  className={cn(
                    "pointer-events-none cursor-pointer text-gray-300",
                    hoverRating === 0 && rating > item && "text-yellow-500",
                    hoverRating > 0 && hoverRating > item && "text-yellow-500",
                  )}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Rate {item + 1} Stars</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
