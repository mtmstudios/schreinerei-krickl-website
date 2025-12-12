import TestimonialCard from "../TestimonialCard";

export default function TestimonialCardExample() {
  return (
    <div className="max-w-md p-4">
      <TestimonialCard
        name="Familie Müller"
        text="Unser neues Wohnzimmerregal ist ein Traum! Perfekte Handwerksarbeit und super freundliche Beratung."
        rating={5}
        project="Maßgefertigtes Regal"
      />
    </div>
  );
}
