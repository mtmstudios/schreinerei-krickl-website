import BenefitCard from "../BenefitCard";
import { Users } from "lucide-react";

export default function BenefitCardExample() {
  return (
    <div className="max-w-xs p-4">
      <BenefitCard
        icon={<Users className="w-7 h-7" />}
        title="Familiärer Betrieb"
        description="Kollegiales Miteinander in einem eingespielten Team"
      />
    </div>
  );
}
