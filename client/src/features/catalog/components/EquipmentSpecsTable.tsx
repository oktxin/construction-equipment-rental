import { Card, EmptyState } from "../../../shared/ui";
import { localizeSpecLabel, localizeSpecUnit, localizeSpecValue } from "../../../shared/utils/specLabels";
import type { EquipmentSpec } from "../catalogTypes";

type EquipmentSpecsTableProps = {
  specs: EquipmentSpec[];
};

function formatSpecValue(spec: EquipmentSpec) {
  const localizedValue = localizeSpecValue(spec.value);
  const localizedUnit = localizeSpecUnit(spec.unit);

  return localizedUnit ? `${localizedValue} ${localizedUnit}` : localizedValue;
}

export function EquipmentSpecsTable({ specs }: EquipmentSpecsTableProps) {
  if (specs.length === 0) {
    return (
      <EmptyState
        title="Характеристики еще не добавлены"
        description="Мы обновляем техническую карточку. Основные условия аренды уже доступны в верхнем блоке."
        className="p-6"
      />
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="divide-y divide-border/45">
        {specs.map((spec) => (
          <dl
            key={spec.id}
            className="grid gap-2 px-5 py-4 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:gap-6 sm:px-6"
          >
            <dt className="text-sm font-medium text-foreground/62">{localizeSpecLabel(spec.name)}</dt>
            <dd className="text-sm font-semibold leading-6 text-foreground">
              {formatSpecValue(spec)}
            </dd>
          </dl>
        ))}
      </div>
    </Card>
  );
}
