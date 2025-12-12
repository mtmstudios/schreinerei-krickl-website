import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground py-4" aria-label="Breadcrumb">
      <Link
        href="/"
        className="flex items-center gap-1 hover-elevate rounded-md p-1 -ml-1"
        data-testid="link-breadcrumb-home"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Startseite</span>
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover-elevate rounded-md p-1 -ml-1"
              data-testid={`link-breadcrumb-${index}`}
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium" data-testid={`text-breadcrumb-${index}`}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
