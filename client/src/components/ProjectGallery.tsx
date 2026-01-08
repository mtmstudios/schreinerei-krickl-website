import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
}

interface ProjectGalleryProps {
  projects: Project[];
}

const categories = [
  { id: "all", label: "Alle" },
  { id: "moebel", label: "Möbel" },
  { id: "kueche", label: "Küchen" },
  { id: "boden", label: "Böden" },
  { id: "tueren", label: "Türen" },
  { id: "sonder", label: "Sonderanfertigungen" },
];

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.id)}
            data-testid={`button-filter-${cat.id}`}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
            data-testid={`card-project-${project.id}`}
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-white font-semibold text-lg mb-1">{project.title}</h3>
              <p className="text-white/70 text-sm">{project.location}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Keine Projekte in dieser Kategorie gefunden.
        </div>
      )}
    </div>
  );
}
