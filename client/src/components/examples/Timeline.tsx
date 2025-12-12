import Timeline from "../Timeline";

const timelineItems = [
  {
    year: "1962",
    title: "Gründung der Schreinerei",
    description: "Die Schreinerei wird in Esslingen als kleiner Familienbetrieb gegründet.",
  },
  {
    year: "1985",
    title: "Meistertitel",
    description: "Mit dem Erhalt des Meistertitels wird die Grundlage für die nächste Generation gelegt.",
  },
  {
    year: "Heute",
    title: "Meisterbetrieb Krickl",
    description: "Über 60 Jahre Erfahrung, ein eingespieltes Team und der Anspruch, jeden Kunden individuell zu betreuen.",
  },
];

export default function TimelineExample() {
  return (
    <div className="max-w-4xl p-8">
      <Timeline items={timelineItems} />
    </div>
  );
}
