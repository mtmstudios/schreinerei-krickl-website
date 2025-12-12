import Breadcrumbs from "../layout/Breadcrumbs";

export default function BreadcrumbsExample() {
  return (
    <div className="p-4">
      <Breadcrumbs
        items={[
          { label: "Leistungen", href: "/leistungen" },
          { label: "Möbelbau" },
        ]}
      />
    </div>
  );
}
