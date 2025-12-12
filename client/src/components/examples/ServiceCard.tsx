import ServiceCard from "../ServiceCard";
import { Armchair } from "lucide-react";
import furnitureImage from "@assets/generated_images/custom_furniture_piece.png";

export default function ServiceCardExample() {
  return (
    <div className="max-w-sm p-4">
      <ServiceCard
        title="Möbelbau"
        description="Individuelle Möbel nach Maß – perfekt auf Ihre Räume und Wünsche abgestimmt."
        image={furnitureImage}
        href="/leistungen/moebelbau"
        icon={<Armchair className="w-5 h-5" />}
      />
    </div>
  );
}
