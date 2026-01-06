import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiInstagram } from "react-icons/si";

import image1 from "@assets/PHOTO-2023-09-01-14-_1767712905635.jpg";
import image2 from "@assets/PHOTO-2023-09-01-14_1767712905635.jpg";
import image3 from "@assets/PHOTO-2023-09-01-15_1767712905635.jpg";
import image4 from "@assets/PHOTO-2023-10-17-21-_1767712905635.jpg";
import image5 from "@assets/PHOTO-2023-10-17-23_1767712905635.jpg";
import image6 from "@assets/PHOTO-2023-10-17-24_1767712905635.jpg";
import image7 from "@assets/PHOTO-2023-10-17-25_1767712905635.jpg";
import image8 from "@assets/115_Tomay_1767713116539.jpg";

const instagramImages = [
  { src: image1, alt: "Epoxytisch" },
  { src: image2, alt: "Waschtischanlage" },
  { src: image3, alt: "Küche" },
  { src: image4, alt: "Holzdetail" },
  { src: image5, alt: "Schrank" },
  { src: image6, alt: "Möbel" },
  { src: image7, alt: "Projekt" },
  { src: image8, alt: "Werkstatt" },
];

interface InstagramFeedProps {
  variant?: "default" | "compact";
  title?: string;
  subtitle?: string;
}

export default function InstagramFeed({ 
  variant = "default",
  title = "Folgen Sie uns auf Instagram",
  subtitle = "Machen Sie sich ein Bild von unserer Arbeit – täglich neue Einblicke in unsere Werkstatt und Projekte"
}: InstagramFeedProps) {
  const displayImages = variant === "compact" ? instagramImages.slice(0, 4) : instagramImages;
  const gridCols = variant === "compact" 
    ? "grid-cols-2 md:grid-cols-4" 
    : "grid-cols-2 md:grid-cols-4 lg:grid-cols-8";

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <SiInstagram className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className={`grid ${gridCols} gap-2 mb-8`}>
          {displayImages.map((image, index) => (
            <motion.a
              key={index}
              href="https://www.instagram.com/krickl_innenausbau/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-md group"
              data-testid={`link-instagram-image-${index}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <SiInstagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" data-testid="button-instagram-follow">
            <a
              href="https://www.instagram.com/krickl_innenausbau/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <SiInstagram className="w-5 h-5" />
              @krickl_innenausbau folgen
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
