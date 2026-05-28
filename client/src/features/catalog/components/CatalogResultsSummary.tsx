import { Badge, Button, Card } from "../../../shared/ui";

const numberFormatter = new Intl.NumberFormat("ru-BY");

export type CatalogResultsSummaryProps = {
  total: number;
  page: number;
  totalPages: number;
  activeFilters: string[];
  onResetFilters: () => void;
};

export function CatalogResultsSummary({
  total,
  page,
  totalPages,
  activeFilters,
  onResetFilters,
}: CatalogResultsSummaryProps) {
  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-[0.16em] text-foreground/42">Сводка выдачи</p>
          <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
            Найдено: {numberFormatter.format(total)} позиций
          </h2>
          <p className="text-sm leading-6 text-foreground/62">
            Страница {page} из {totalPages}
          </p>
        </div>

        {activeFilters.length > 0 ? (
          <div className="flex flex-col gap-3 xl:max-w-[60%] xl:items-end">
            <div className="flex flex-wrap gap-2 xl:justify-end">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="neutral">
                  {filter}
                </Badge>
              ))}
            </div>
            <Button variant="ghost" size="sm" onClick={onResetFilters}>
              Сбросить фильтры
            </Button>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
