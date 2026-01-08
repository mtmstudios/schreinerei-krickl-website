"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Card = ({
  card,
  index,
  hovered,
  setHovered,
  onClick,
  isMobile,
}: {
  card: CardType;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  onClick?: () => void;
  isMobile: boolean;
}) => (
  <div
    onClick={onClick}
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-80 w-full transition-all duration-300 ease-out cursor-pointer",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}
    data-testid={`card-service-${index}`}
  >
    <img
      src={card.src}
      alt={card.title}
      loading="lazy"
      className="object-cover absolute inset-0 w-full h-full scale-125"
    />
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end py-6 px-4 transition-opacity duration-300",
        isMobile ? "opacity-100" : (hovered === index ? "opacity-100" : "opacity-0")
      )}
    >
      <div className="text-xl md:text-2xl font-medium text-white mb-2">
        {card.title}
      </div>
      {card.description && (
        <p className="text-sm text-white/80">{card.description}</p>
      )}
    </div>
  </div>
);

type CardType = {
  title: string;
  src: string;
  id?: string;
  description?: string;
};

export function FocusCards({ 
  cards, 
  onCardClick 
}: { 
  cards: CardType[];
  onCardClick?: (cardId: string) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onClick={() => onCardClick?.(card.id || card.title)}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}
