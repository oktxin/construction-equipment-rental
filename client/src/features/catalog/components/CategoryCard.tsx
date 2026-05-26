import { Link } from "react-router-dom";

import { Card } from "../../../shared/ui";
import type { Category } from "../catalogTypes";

const iconLabelMap: Record<string, string> = {
  mixer: "MX",
  plate: "VP",
  generator: "GN",
  demolition: "DM",
  compactor: "CP",
  concrete: "BT",
  tool: "TL",
};

function getCategoryGlyph(category: Category) {
  if (category.iconName) {
    const iconKey = category.iconName.toLowerCase();
    if (iconLabelMap[iconKey]) {
      return iconLabelMap[iconKey];
    }
  }

  return category.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

export type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/catalog?categorySlug=${category.slug}`} className="block">
      <Card hoverable className="group relative h-full overflow-hidden p-5">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0 opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="flex h-full flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-background text-xs font-bold uppercase tracking-[0.18em] text-accent-strong">
              {getCategoryGlyph(category)}
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-foreground/42">
              {category.equipmentCount} ед.
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-foreground">
              {category.name}
            </h3>
            <p className="text-sm leading-6 text-foreground/66">
              {category.description ?? "Категория уже готова для быстрого перехода в каталог и подбора техники по задаче."}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4 text-sm font-medium text-foreground/74">
            <span>Открыть подборку</span>
            <span className="transition duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
