import type { ReactNode } from "react";

import { cn } from "../../../shared/utils/cn";

export type AdminDataTableColumn<TItem> = {
  key: string;
  header: string;
  render: (item: TItem) => ReactNode;
  className?: string;
  cellClassName?: string;
};

export type AdminDataTableProps<TItem> = {
  columns: AdminDataTableColumn<TItem>[];
  rows: TItem[];
  getRowKey: (item: TItem) => string;
  className?: string;
  emptyState?: ReactNode;
  renderMobileCard?: (item: TItem) => ReactNode;
};

export function AdminDataTable<TItem>({
  columns,
  rows,
  getRowKey,
  className,
  emptyState,
  renderMobileCard,
}: AdminDataTableProps<TItem>) {
  if (!rows.length) {
    return <>{emptyState ?? null}</>;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {renderMobileCard ? (
        <div className="space-y-4 lg:hidden">
          {rows.map((row) => (
            <div key={getRowKey(row)}>{renderMobileCard(row)}</div>
          ))}
        </div>
      ) : null}

      <div
        className={cn(
          "overflow-hidden rounded-[28px] border border-white/10 bg-adminSurface shadow-industrial-dark",
          renderMobileCard && "hidden lg:block",
        )}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.03] text-left">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "px-5 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/45",
                      column.className,
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={getRowKey(row)}
                  className={cn(
                    "align-top transition-colors hover:bg-white/[0.02]",
                    index < rows.length - 1 && "border-b border-white/8",
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn("px-5 py-4 text-sm text-white/78", column.cellClassName)}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

