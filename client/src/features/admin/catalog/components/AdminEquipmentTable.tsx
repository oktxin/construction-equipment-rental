import { Badge, Button, Card, EmptyState } from "../../../../shared/ui";
import { AdminDataTable } from "../../components/AdminDataTable";
import { adminBadgeStyles } from "../../components/adminBadgeStyles";
import type { AdminEquipment } from "../adminCatalogTypes";
import { formatInventoryLabel } from "../adminCatalogUtils";
import { formatCurrency } from "../../../rentalOrders/rentalOrdersUtils";
import { AdminEquipmentStatusBadge } from "./AdminEquipmentStatusBadge";

function MobileEquipmentCard({
  equipment,
  onEdit,
  onEditImages,
  onEditSpecs,
  onDelete,
}: {
  equipment: AdminEquipment;
  onEdit: (equipment: AdminEquipment) => void;
  onEditImages: (equipment: AdminEquipment) => void;
  onEditSpecs: (equipment: AdminEquipment) => void;
  onDelete: (equipment: AdminEquipment) => void;
}) {
  return (
    <Card tone="admin" className="p-4">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <AdminEquipmentStatusBadge status={equipment.status} />
            <div>
              <p className="font-medium text-white">{equipment.name}</p>
              <p className="mt-1 text-sm text-white/68">{equipment.category.name}</p>
            </div>
          </div>
          <Badge variant={equipment.isFeatured ? "accent" : "neutral"} className={equipment.isFeatured ? adminBadgeStyles.accent : adminBadgeStyles.neutral}>
            {equipment.isFeatured ? "Витрина" : "Обычная"}
          </Badge>
        </div>

        <div className="grid gap-3 rounded-[22px] border border-white/8 bg-adminBackground/60 p-4 text-sm text-white/64">
          <div className="flex items-center justify-between gap-4">
            <span>Бренд и модель</span>
            <span className="text-right text-white">
              {[equipment.brand, equipment.model].filter(Boolean).join(" / ") || "Не указано"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Цена в сутки</span>
            <span className="text-right text-white">{formatCurrency(equipment.dailyPrice)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Остаток</span>
            <span className="text-right text-white">
              {formatInventoryLabel(equipment.quantityAvailable, equipment.quantityTotal)}
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
            onClick={() => onEdit(equipment)}
          >
            Редактировать
          </Button>
          <Button
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
            onClick={() => onEditImages(equipment)}
          >
            Изображения
          </Button>
          <Button
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
            onClick={() => onEditSpecs(equipment)}
          >
            Характеристики
          </Button>
          <Button variant="danger" onClick={() => onDelete(equipment)}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
}

export type AdminEquipmentTableProps = {
  items: AdminEquipment[];
  onEdit: (equipment: AdminEquipment) => void;
  onEditImages: (equipment: AdminEquipment) => void;
  onEditSpecs: (equipment: AdminEquipment) => void;
  onDelete: (equipment: AdminEquipment) => void;
};

export function AdminEquipmentTable({
  items,
  onEdit,
  onEditImages,
  onEditSpecs,
  onDelete,
}: AdminEquipmentTableProps) {
  return (
    <AdminDataTable
      rows={items}
      getRowKey={(item) => item.id}
      emptyState={
        <EmptyState
          tone="admin"
          title="Оборудование не найдено"
          description="Попробуйте снять часть фильтров или очистить поиск, чтобы показать другие позиции."
        />
      }
      renderMobileCard={(item) => (
        <MobileEquipmentCard
          equipment={item}
          onEdit={onEdit}
          onEditImages={onEditImages}
          onEditSpecs={onEditSpecs}
          onDelete={onDelete}
        />
      )}
      columns={[
        {
          key: "name",
          header: "Оборудование",
          cellClassName: "min-w-[240px]",
          render: (item) => (
            <div className="space-y-2">
              <p className="font-medium text-white">{item.name}</p>
              <p className="text-sm text-white/68">{item.shortDescription || item.slug}</p>
            </div>
          ),
        },
        {
          key: "category",
          header: "Категория",
          cellClassName: "min-w-[180px]",
          render: (item) => (
            <div className="space-y-1">
              <p className="text-white">{item.category.name}</p>
              <p className="text-sm text-white/60">{item.category.slug}</p>
            </div>
          ),
        },
        {
          key: "brand-model",
          header: "Бренд / модель",
          cellClassName: "min-w-[180px]",
          render: (item) => (
            <div className="space-y-1">
              <p className="text-white">{item.brand || "Не указано"}</p>
              <p className="text-sm text-white/60">{item.model || "Без модели"}</p>
            </div>
          ),
        },
        {
          key: "dailyPrice",
          header: "Цена в сутки",
          cellClassName: "min-w-[150px]",
          render: (item) => (
            <p className="font-heading text-lg font-semibold tracking-[-0.03em] text-white">
              {formatCurrency(item.dailyPrice)}
            </p>
          ),
        },
        {
          key: "quantity",
          header: "Доступно / всего",
          cellClassName: "min-w-[150px]",
          render: (item) => (
            <p className="text-white/80">
              {formatInventoryLabel(item.quantityAvailable, item.quantityTotal)}
            </p>
          ),
        },
        {
          key: "status",
          header: "Статус",
          cellClassName: "min-w-[160px]",
          render: (item) => <AdminEquipmentStatusBadge status={item.status} />,
        },
        {
          key: "featured",
          header: "Витрина",
          cellClassName: "min-w-[140px]",
          render: (item) => (
            <Badge variant={item.isFeatured ? "accent" : "neutral"} className={item.isFeatured ? adminBadgeStyles.accent : adminBadgeStyles.neutral}>
              {item.isFeatured ? "Да" : "Нет"}
            </Badge>
          ),
        },
        {
          key: "actions",
          header: "Действия",
          className: "text-right",
          cellClassName: "min-w-[340px] text-right",
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
              <Button
                variant="ghost"
                size="sm"
                className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                onClick={() => onEditImages(item)}
              >
                Изображения
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                onClick={() => onEditSpecs(item)}
              >
                Характеристики
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
