import JobCard from "../JobCard";

export default function JobCardExample() {
  return (
    <div className="max-w-2xl p-4">
      <JobCard
        title="Schreiner / Tischler (m/w/d)"
        type="Vollzeit"
        location="Esslingen"
        description="Wir suchen einen erfahrenen Schreiner für die Fertigung und Montage hochwertiger Möbel."
        requirements={[
          "Abgeschlossene Ausbildung als Schreiner/Tischler",
          "Mehrjährige Berufserfahrung wünschenswert",
          "Führerschein Klasse B",
        ]}
        onApply={() => console.log("Apply clicked")}
      />
    </div>
  );
}
