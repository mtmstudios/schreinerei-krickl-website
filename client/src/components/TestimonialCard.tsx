import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
  project: string;
}

export default function TestimonialCard({ name, text, rating, project }: TestimonialCardProps) {
  return (
    <div className="bg-card border border-card-border rounded-xl p-6">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
          />
        ))}
      </div>
      <p className="text-foreground mb-4 leading-relaxed">"{text}"</p>
      <div>
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{project}</p>
      </div>
    </div>
  );
}
