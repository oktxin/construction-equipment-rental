import { Button, Card } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";

function buildPaginationItems(page: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, 4, "ellipsis-right", totalPages] as const;
  }

  if (page >= totalPages - 2) {
    return [1, "ellipsis-left", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, "ellipsis-left", page - 1, page, page + 1, "ellipsis-right", totalPages] as const;
}

export type CatalogPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function CatalogPagination({ page, totalPages, onPageChange }: CatalogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const items = buildPaginationItems(page, totalPages);

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-foreground/62">
          Навигация по каталогу. Страница {page} из {totalPages}.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Назад
          </Button>

          {items.map((item, index) =>
            typeof item === "number" ? (
              <button
                key={`${item}-${index}`}
                type="button"
                className={cn(
                  "inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border px-3 text-sm font-semibold transition",
                  item === page
                    ? "border-secondary bg-secondary text-background shadow-industrial-dark"
                    : "border-border/70 bg-white/35 text-foreground hover:bg-card",
                )}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            ) : (
              <span key={`${item}-${index}`} className="px-1 text-sm text-foreground/45">
                ...
              </span>
            ),
          )}

          <Button
            variant="ghost"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Далее
          </Button>
        </div>
      </div>
    </Card>
  );
}
