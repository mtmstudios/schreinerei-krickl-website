import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  icon: React.ReactNode;
}

export default function ServiceCard({ title, description, image, href, icon }: ServiceCardProps) {
  return (
    <div className="group bg-card border border-card-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        <Button variant="outline" asChild className="w-full" data-testid={`button-service-${href.split("/").pop()}`}>
          <Link href={href}>
            Mehr erfahren
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
