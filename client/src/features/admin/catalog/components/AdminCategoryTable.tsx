import { Button, Card, EmptyState } from "../../../../shared/ui";
import { AdminDataTable } from "../../components/AdminDataTable";
import type { AdminCategory } from "../adminCatalogTypes";

function MobileCategoryCard({
  category,
  onEdit,
  onDelete,
}: {
  category: AdminCategory;
  onEdit: (category: AdminCategory) => void;
  onDelete: (category: AdminCategory) => void;
}) {
  return (
    <Card tone="admin" className="p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-medium text-white">{category.name}</p>
          <p className="text-sm text-white/56">{category.slug}</p>
        </div>

        <div className="grid gap-3 rounded-[22px] border border-white/8 bg-adminBackground/60 p-4 text-sm text-white/64">
          <div className="flex items-center justify-between gap-4">
            <span>Иконка</span>
            <span className="text-right text-white">{category.iconName || "Не указана"}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Позиций</span>
            <span className="text-right text-white">{category.equipmentCount}</span>
          </div>
        </div>

        <p className="text-sm leading-6 text-white/62">{category.description || "Описание пока не добавлено."}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
            onClick={() => onEdit(category)}
          >
            Редактировать
          </Button>
          <Button variant="danger" onClick={() => onDelete(category)}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
}

export type AdminCategoryTableProps = {
  items: AdminCategory[];
  onEdit: (category: AdminCategory) => void;
  onDelete: (category: AdminCategory) => void;
};

export function AdminCategoryTable({
  items,
  onEdit,
  onDelete,
}: AdminCategoryTableProps) {
  return (
    <AdminDataTable
      rows={items}
      getRowKey={(item) => item.id}
      emptyState={
        <EmptyState
          tone="admin"
          title="Категории не найдены"
          description="Снимите часть фильтров или создайте новую категорию каталога."
        />
      }
      renderMobileCard={(item) => (
        <MobileCategoryCard category={item} onEdit={onEdit} onDelete={onDelete} />
      )}
      columns={[
        {
          key: "name",
          header: "Название",
          cellClassName: "min-w-[220px]",
          render: (item) => (
            <div className="space-y-1">
              <p className="font-medium text-white">{item.name}</p>
              <p className="text-sm text-white/48">Позиций: {item.equipmentCount}</p>
            </div>
          ),
        },
        {
          key: "slug",
          header: "Slug",
          cellClassName: "min-w-[170px]",
          render: (item) => <p className="text-white/72">{item.slug}</p>,
        },
        {
          key: "description",
          header: "Описание",
          cellClassName: "min-w-[280px]",
          render: (item) => (
            <p className="text-sm leading-6 text-white/68">
              {item.description || "Описание не заполнено"}
            </p>
          ),
        },
        {
          key: "iconName",
          header: "Icon name",
          cellClassName: "min-w-[160px]",
          render: (item) => <p className="text-white/72">{item.iconName || "Не указано"}</p>,
        },
        {
          key: "actions",
          header: "Действия",
          className: "text-right",
          cellClassName: "min-w-[180px] text-right",
          render: (item) => (
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                onClick={() => onEdit(item)}
              >
                Редактировать
              </Button>
              <Button size="sm" variant="danger" onClick={() => onDelete(item)}>
                Удалить
              </Button>
            </div>
          ),
        },
      ]}
    />
  );
}
