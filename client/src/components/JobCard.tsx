import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, ArrowRight } from "lucide-react";

interface JobCardProps {
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  onApply: () => void;
}

export default function JobCard({
  title,
  type,
  location,
  description,
  requirements,
  onApply,
}: JobCardProps) {
  return (
    <div className="bg-card border border-card-border rounded-xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {type}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </span>
          </div>
        </div>
        <Badge variant="secondary">Sofort verfügbar</Badge>
      </div>

      <p className="text-muted-foreground mb-4">{description}</p>

      <div className="mb-6">
        <p className="text-sm font-medium mb-2">Anforderungen:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          {requirements.map((req, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={onApply} className="w-full sm:w-auto" data-testid={`button-apply-${title.toLowerCase().replace(/\s/g, "-")}`}>
        In 60 Sekunden bewerben
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
