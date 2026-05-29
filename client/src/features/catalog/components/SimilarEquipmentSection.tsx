import type { EquipmentListItem } from "../catalogTypes";
import { EquipmentCard } from "./EquipmentCard";

type SimilarEquipmentSectionProps = {
  items: EquipmentListItem[];
};

export function SimilarEquipmentSection({
  items,
}: SimilarEquipmentSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
          Похожее оборудование
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-foreground/68">
          Еще несколько позиций из той же категории, чтобы можно было быстро подобрать замену или сравнить условия аренды.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </div>
    </section>
  );
}
